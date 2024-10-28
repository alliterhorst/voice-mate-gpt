import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { syncGetStorage, throwContextError } from '../common/utils.common';
import { RecognitionLanguageInterface } from '../interface/language.interface';
import StorageKeyEnum from '../enum/storage-key.enum';
import {
  defaultRecognitionLanguage,
  getRecognitionLanguageByCode,
} from '../config/speech-recognition-languages.config';
import ConfigurationInterface from '../interface/configuration.interface';
import DOMManipulationEventEnum from '../enum/dom-manipulation-event.enum';

const businessContext = 'Player';
const defaultLanguageCode = 'pt-BR';

interface OptionContextInterface {
  recognitionLanguage: RecognitionLanguageInterface;
  setRecognitionLanguageCode: (recognitionLanguageCode: string) => void;
  optionChange: () => void;
  config: ConfigurationInterface | null;
}

const OptionContext = createContext<OptionContextInterface | null>(null);

export function OptionProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [timeStorageWasLoaded, setTimeStorageWasLoaded] = useState<string>(
    new Date().toISOString(),
  );
  const [recognitionLanguageCode, setRecognitionLanguageCode] =
    useState<string>(defaultLanguageCode);
  const [recognitionLanguage, setRecognitionLanguage] = useState<RecognitionLanguageInterface>(
    defaultRecognitionLanguage,
  );
  const [config, setConfig] = useState<ConfigurationInterface | null>(
    window?.VoiceMateGPT?.DOMManipulationService?.config,
  );
  const optionChange = (): void => {
    setTimeStorageWasLoaded(new Date().toISOString());
  };

  useEffect(() => {
    const handleConfigChange = (
      service: typeof window.VoiceMateGPT.DOMManipulationService,
      domManipulationEventEnum: DOMManipulationEventEnum,
    ): void => {
      switch (domManipulationEventEnum) {
        case DOMManipulationEventEnum.CONFIG_UPDATED:
          setConfig(window?.VoiceMateGPT?.DOMManipulationService?.config);
          break;
        default:
          console.info('Other DOM Manipulation Event:', domManipulationEventEnum);
          break;
      }
    };

    window.VoiceMateGPT.DOMManipulationService.subscribe(handleConfigChange, [
      DOMManipulationEventEnum.CONFIG_UPDATED,
    ]);
    return (): void => {
      window.VoiceMateGPT.DOMManipulationService.unsubscribe(handleConfigChange);
    };
  }, []);

  useEffect(() => {
    if (chrome?.storage?.sync) {
      syncGetStorage([
        {
          storageKey: StorageKeyEnum.RECOGNITION_LANGUAGE,
          initialValue: defaultLanguageCode,
          setCallback: setRecognitionLanguageCode,
        },
      ]);
    } else {
      setRecognitionLanguageCode(
        localStorage.getItem(StorageKeyEnum.RECOGNITION_LANGUAGE) || defaultLanguageCode,
      );
    }
  }, [timeStorageWasLoaded]);

  useEffect(() => {
    const language = getRecognitionLanguageByCode(recognitionLanguageCode);
    setRecognitionLanguage(language);
  }, [recognitionLanguageCode, setRecognitionLanguage]);

  const value = useMemo<OptionContextInterface>(
    () => ({
      recognitionLanguage,
      setRecognitionLanguageCode,
      optionChange,
      config,
    }),
    [recognitionLanguage, config],
  );

  return <OptionContext.Provider value={value}>{children}</OptionContext.Provider>;
}

export function useOptionContext(): OptionContextInterface {
  const context = useContext(OptionContext);
  if (!context) throwContextError(businessContext);
  return context as OptionContextInterface;
}
