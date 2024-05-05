export interface LanguageInterface {
  language: string;
  code?: string;
  countries?: {
    name: string;
    code: string;
  }[];
}
