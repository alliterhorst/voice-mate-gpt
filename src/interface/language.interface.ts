type LanguageBase = {
  language: string;
};

type LanguageWithCode = LanguageBase & {
  code: string;
  countries?: {
    name: string;
    code: string;
  }[];
};

type LanguageWithCountries = LanguageBase & {
  code?: string;
  countries: {
    name: string;
    code: string;
  }[];
};

export type LanguageInterface = LanguageWithCode | LanguageWithCountries;

export interface RecognitionLanguageInterface {
  language: string;
  countryName?: string;
  code: string;
}
