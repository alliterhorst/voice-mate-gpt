import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { throwContextError } from '../common/utils.common';
import { RecognitionLanguageInterface } from '../interface/language.interface';
import { getRecognitionLanguageByCode } from '../config/speech-recognition-languages.config';
import ConfigurationInterface from '../interface/configuration.interface';
import DOMManipulationEventEnum from '../enum/dom-manipulation-event.enum';
import {
  getSystemLanguageConfigByCode,
  SystemLanguageConfigInterface,
} from '../config/system-languages.config';

const businessContext = 'Player';
const defaultSystemLanguageConfig = getSystemLanguageConfigByCode(navigator.language);
const defaultRecognitionLanguage = getRecognitionLanguageByCode(navigator.language);

interface OptionContextInterface {
  systemLanguageConfig: SystemLanguageConfigInterface;
  recognitionLanguage: RecognitionLanguageInterface;
  config: ConfigurationInterface | null;
}

const OptionContext = createContext<OptionContextInterface | null>(null);

export function OptionProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [systemLanguageConfig, setSystemLanguageConfig] = useState<SystemLanguageConfigInterface>(
    defaultSystemLanguageConfig,
  );
  const [recognitionLanguage, setRecognitionLanguage] = useState<RecognitionLanguageInterface>(
    defaultRecognitionLanguage,
  );
  const [config, setConfig] = useState<ConfigurationInterface | null>(
    window?.VoiceMateGPT?.DOMManipulationService?.config,
  );

  useEffect(() => {
    if (!config?.pluginLanguageCode) return;
    setSystemLanguageConfig(getSystemLanguageConfigByCode(config.pluginLanguageCode));
  }, [config?.pluginLanguageCode]);

  useEffect(() => {
    if (!config?.speechRecognitionLanguageCode) return;
    setRecognitionLanguage(getRecognitionLanguageByCode(config?.speechRecognitionLanguageCode));
  }, [config?.speechRecognitionLanguageCode]);

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

  const value = useMemo<OptionContextInterface>(
    () => ({
      recognitionLanguage,
      config,
      systemLanguageConfig,
    }),
    [recognitionLanguage, config, systemLanguageConfig],
  );

  return <OptionContext.Provider value={value}>{children}</OptionContext.Provider>;
}

export function useOptionContext(): OptionContextInterface {
  const context = useContext(OptionContext);
  if (!context) throwContextError(businessContext);
  return context as OptionContextInterface;
}
