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

interface Transcript {
  text: string;
  transcriptAt: string;
}

interface SpeechRecognitionContextInterface {
  isListening: boolean;
  startSpeechRecognition: () => void;
  stopSpeechRecognition: () => void;
  changeLanguage: (lang: string) => void;
  transcript: Transcript | null;
  error: string;
}

const SpeechRecognitionContext = createContext<SpeechRecognitionContextInterface | null>(null);

export function SpeechRecognitionProvider({ children }: { children: ReactNode }): JSX.Element {
  const { isMicrophoneEnabled } = usePlayerContext();
  const { recognitionLanguage } = useOptionContext();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [error, setError] = useState<string>('');

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
      switch (recognitionEventEnum) {
        case RecognitionEventEnum.UPDATE_TRANSCRIPT:
          setTranscript({
            text: service.getTranscript()?.trim(),
            transcriptAt: new Date().toISOString(),
          });
          break;
        case RecognitionEventEnum.UPDATE_IS_LISTENING:
          setIsListening(service.getIsListening());
          break;
        case RecognitionEventEnum.UPDATE_ERROR:
          setError(service.getError());
          break;
        default:
          console.info('Other recognition event:', recognitionEventEnum);
          break;
      }
    };

    window.SpeechRecognitionService.subscribe(handleStateChange, [
      RecognitionEventEnum.UPDATE_TRANSCRIPT,
      RecognitionEventEnum.UPDATE_IS_LISTENING,
      RecognitionEventEnum.UPDATE_ERROR,
    ]);
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
    console.log('Transcript:', transcript?.text);
  }, [transcript]);

  const value = useMemo<SpeechRecognitionContextInterface>(
    () => ({
      isListening,
      startSpeechRecognition,
      stopSpeechRecognition,
      changeLanguage,
      transcript,
      error,
    }),
    [isListening, startSpeechRecognition, stopSpeechRecognition, changeLanguage, transcript, error],
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
