import SystemLanguageEnum from '../enum/system-language.enum';
import { translateEN, TranslateInterface, translatePT } from '../interface/translate.interface';

export interface SystemLanguageConfigInterface {
  language: SystemLanguageEnum;
  label: string;
  translate: TranslateInterface;
}

export const LANGUAGES: SystemLanguageConfigInterface[] = [
  {
    language: SystemLanguageEnum.EN_US,
    label: 'English (United States)',
    translate: translateEN,
  },
  {
    language: SystemLanguageEnum.PT_BR,
    label: 'Português (Brasil)',
    translate: translatePT,
  },
];

export const getSystemLanguageConfigByCode = (
  code: string = 'en-UK',
): SystemLanguageConfigInterface =>
  LANGUAGES.find(language => language.language === code) ||
  LANGUAGES.find(language => language.language.split('-')[0] === code.split('-')[0]) ||
  LANGUAGES[0];
