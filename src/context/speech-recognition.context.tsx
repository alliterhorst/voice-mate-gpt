import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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

  const prevMicEnabledRef = useRef(isMicrophoneEnabled);
  const prevLangCodeRef = useRef(recognitionLanguage.code);

  const speechRecognition = useRef<SpeechRecognition | null>(null);

  useMemo(() => {
    if (!isMicrophoneEnabled) return;

    if (
      prevMicEnabledRef.current === isMicrophoneEnabled &&
      prevLangCodeRef.current === recognitionLanguage.code
    ) {
      console.log('No significant changes. Reusing the existing speech recognition setup.');
      return;
    }

    console.log(
      'isMicrophoneEnabled, recognitionLanguage.code',
      isMicrophoneEnabled,
      recognitionLanguage.code,
    );

    const recognition = SpeechRecognitionConstructor ? new SpeechRecognitionConstructor() : null;
    if (recognition) {
      recognition.continuous = true;
      recognition.lang = recognitionLanguage.code;
      recognition.onstart = (): void => {
        setIsListening(true);
        console.log("[SPEECH-REC] I'm listening");
      };
      recognition.onend = (): void => {
        setIsListening(false);
        console.log("[SPEECH-REC] I've stopped listening");
      };
      recognition.onerror = (event: SpeechRecognitionErrorEvent): void => {
        setIsListening(false);
        setError(`Error occurred in speech recognition: ${event.error}`);
        console.error('[SPEECH-REC] Error while listening', event);
      };
      recognition.onresult = (event: SpeechRecognitionEvent): void => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);
        console.log('[SPEECH-REC] Voice recognition transcript:', currentTranscript);
        console.log('[SPEECH-REC] Voice recognition event:', event);
      };
      recognition.start();
    }

    speechRecognition.current = recognition;
    prevMicEnabledRef.current = isMicrophoneEnabled;
    prevLangCodeRef.current = recognitionLanguage.code;
  }, [isMicrophoneEnabled, recognitionLanguage.code]);

  const startSpeechRecognition = useCallback(() => {
    if (speechRecognition?.current && !isListening) {
      speechRecognition.current.start();
    }
  }, [speechRecognition, isListening]);

  const stopSpeechRecognition = useCallback(() => {
    if (speechRecognition?.current && isListening) {
      speechRecognition.current.stop();
    }
  }, [speechRecognition, isListening]);

  useEffect(
    () => (): void => {
      if (speechRecognition?.current && isListening) {
        speechRecognition.current.stop();
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
