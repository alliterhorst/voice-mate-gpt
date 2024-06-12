import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { throwContextError } from '../common/utils.common';
import { usePlayerContext } from './player.context';
import { useOptionContext } from './option.context';
import RecognitionEventEnum from '../enum/recognition-event.enum';

const businessContext = 'SpeechRecognition';

interface SpeechRecognitionContextInterface {
  isListening: boolean;
  startSpeechRecognition: () => void;
  stopSpeechRecognition: () => void;
  changeLanguage: (lang: string) => void;
  transcript: string;
  microphoneVolume: number;
  error: string;
}

const SpeechRecognitionContext = createContext<SpeechRecognitionContextInterface | null>(null);

export function SpeechRecognitionProvider({ children }: { children: ReactNode }): JSX.Element {
  const { isMicrophoneEnabled } = usePlayerContext();
  const { recognitionLanguage } = useOptionContext();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [microphoneVolume, setMicrophoneVolume] = useState<number>(0);

  const startSpeechRecognition = useCallback(() => {
    window.SpeechRecognitionService.start();
  }, []);

  const stopSpeechRecognition = useCallback(() => {
    window.SpeechRecognitionService.stop(true);
  }, []);

  const changeLanguage = useCallback((lang: string) => {
    window.SpeechRecognitionService.changeLanguage(lang);
  }, []);

  useEffect(() => {
    const handleStateChange = (
      service: typeof window.SpeechRecognitionService,
      recognitionEventEnum: RecognitionEventEnum,
    ): void => {
      if (recognitionEventEnum === RecognitionEventEnum.UPDATE_MICROPHONE_VOLUME) {
        setMicrophoneVolume(service.getMicrophoneVolume());
      } else {
        setIsListening(service.getIsListening());
        setTranscript(service.getTranscript());
        setError(service.getError());
      }
    };

    window.SpeechRecognitionService.subscribe(handleStateChange);
    return (): void => {
      window.SpeechRecognitionService.unsubscribe(handleStateChange);
    };
  }, []);

  useEffect(() => {
    if (isMicrophoneEnabled) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }
  }, [isMicrophoneEnabled, startSpeechRecognition, stopSpeechRecognition]);

  useEffect(() => {
    changeLanguage(recognitionLanguage.code);
  }, [recognitionLanguage.code, changeLanguage]);

  useEffect(() => {
    console.log('Transcript:', transcript);
  }, [transcript]);

  const value = useMemo<SpeechRecognitionContextInterface>(
    () => ({
      isListening,
      startSpeechRecognition,
      stopSpeechRecognition,
      changeLanguage,
      transcript,
      microphoneVolume,
      error,
    }),
    [
      isListening,
      startSpeechRecognition,
      stopSpeechRecognition,
      changeLanguage,
      transcript,
      microphoneVolume,
      error,
    ],
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
