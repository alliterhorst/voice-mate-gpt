import React, { createContext, useContext, useEffect, useState } from 'react';
import { syncGetStorage, throwContextError } from '../common/utils.common';
import { LanguageInterface, RecognitionLanguageInterface } from '../interface/language.interface';
import { StorageKeyEnum } from '../enum/storage-key.enum';
import { getRecognitionLanguageByCode } from '../config/speech-recognition-languages.config';

const businessContext = 'Player';
const defaultLanguageCode = 'pt-BR';

interface OptionContextInterface {
  recognitionLanguage?: LanguageInterface;
  setRecognitionLanguageCode: (recognitionLanguageCode: string) => void;
}

const OptionContext = createContext<OptionContextInterface | null>(null);

export function OptionProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [timeStorageWasLoaded, setTimeStorageWasLoaded] = useState<string>(
    new Date().toISOString()
  );
  const [recognitionLanguageCode, setRecognitionLanguageCode] =
    useState<string>(defaultLanguageCode);
  const [recognitionLanguage, setRecognitionLanguage] = useState<RecognitionLanguageInterface>();

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
        localStorage.getItem(StorageKeyEnum.RECOGNITION_LANGUAGE) || defaultLanguageCode
      );
    }
  }, [timeStorageWasLoaded]);

  useEffect(() => {
    const language = getRecognitionLanguageByCode(recognitionLanguageCode);
    setRecognitionLanguage(language);
  }, [recognitionLanguageCode, setRecognitionLanguage]);

  return (
    <OptionContext.Provider
      value={{
        recognitionLanguage,
        setRecognitionLanguageCode,
      }}
    >
      {children}
    </OptionContext.Provider>
  );
}

export function useOptionContext(): OptionContextInterface {
  const context = useContext(OptionContext);
  if (!context) throwContextError(businessContext);
  return context as OptionContextInterface;
}
