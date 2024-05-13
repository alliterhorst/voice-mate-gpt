import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { throwContextError } from '../common/utils.common';
import { usePlayerContext } from './player.context';
import { useOptionContext } from './option.context';

const businessContext = 'SpeechRecognition';

const SpeechRecognitionConstructor = window.webkitSpeechRecognition || window.SpeechRecognition;

interface SpeechRecognitionContextInterface {
  isListening: boolean;
  startSpeechRecognition: () => void;
  stopSpeechRecognition: () => void;
  setIsListening: (listening: boolean) => void;
  transcript: string;
  error: string;
}

const SpeechRecognitionContext = createContext<SpeechRecognitionContextInterface | null>(null);

export function SpeechRecognitionProvider({ children }: { children: JSX.Element }): JSX.Element {
  const { isMicrophoneEnabled } = usePlayerContext();
  const { recognitionLanguage } = useOptionContext();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [error, setError] = useState<string>('');

  const speechRecognition: SpeechRecognition | null = useMemo(() => {
    console.log(
      'isMicrophoneEnabled, recognitionLanguage.code',
      isMicrophoneEnabled,
      recognitionLanguage.code,
    );

    if (!isMicrophoneEnabled) return null;

    const recognition = SpeechRecognitionConstructor ? new SpeechRecognitionConstructor() : null;
    if (recognition) {
      recognition.continuous = true;
      recognition.lang = recognitionLanguage.code;
      recognition.onstart = () => {
        setIsListening(true);
        console.log("[SPEECH-REC] I'm listening");
      };
      recognition.onend = () => {
        setIsListening(false);
        console.log("[SPEECH-REC] I've stopped listening");
      };
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        setIsListening(false);
        setError(`Error occurred in speech recognition: ${event.error}`);
        console.error('[SPEECH-REC] Error while listening', event);
      };
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);
        console.log('[SPEECH-REC] Voice recognition transcript:', currentTranscript);
        console.log('[SPEECH-REC] Voice recognition event:', event);
      };
    }
    return recognition;
  }, [isMicrophoneEnabled, recognitionLanguage.code]);

  const startSpeechRecognition = useCallback(() => {
    if (speechRecognition && !isListening) {
      speechRecognition.start();
    }
  }, [speechRecognition, isListening]);

  const stopSpeechRecognition = useCallback(() => {
    if (speechRecognition && isListening) {
      speechRecognition.stop();
    }
  }, [speechRecognition, isListening]);

  useEffect(() => {
    console.log('speechRecognition, isListening', speechRecognition, isListening);
    if (!speechRecognition) {
      console.error('[SPEECH-REC] Speech recognition is not available', speechRecognition);
      return;
    }
    console.log('[SPEECH-REC] Speech recognition is available', speechRecognition);
    // if (isListening) speechRecognition.start();
  }, [speechRecognition, isListening]);

  useEffect(
    () => () => {
      if (speechRecognition && isListening) {
        speechRecognition.stop();
      }
    },
    [speechRecognition, isListening],
  );

  const value = useMemo<SpeechRecognitionContextInterface>(
    () => ({
      isListening,
      startSpeechRecognition,
      stopSpeechRecognition,
      setIsListening,
      transcript,
      error,
    }),
    [isListening, startSpeechRecognition, stopSpeechRecognition, transcript, error],
  );

  return (
    <SpeechRecognitionContext.Provider value={value}>{children}</SpeechRecognitionContext.Provider>
  );
}

export function useSpeechRecognitionContext(): SpeechRecognitionContextInterface {
  const context = useContext(SpeechRecognitionContext);
  if (!context) throwContextError(businessContext);
  return context as SpeechRecognitionContextInterface;
}
