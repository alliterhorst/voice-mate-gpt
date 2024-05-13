import { LanguageInterface, RecognitionLanguageInterface } from '../interface/language.interface';

export const SPEECH_RECOGNITION_LANGUAGES: LanguageInterface[] = [
  {
    language: 'Afrikaans',
    code: 'af-ZA',
  },
  {
    language: 'አማርኛ',
    code: 'am-ET',
  },
  {
    language: 'Azərbaycanca',
    code: 'az-AZ',
  },
  {
    language: 'বাংলা',
    countries: [
      {
        name: 'বাংলাদেশ',
        code: 'bn-BD',
      },
      {
        name: 'ভারত',
        code: 'bn-IN',
      },
    ],
  },
  {
    language: 'Bahasa Indonesia',
    code: 'id-ID',
  },
  {
    language: 'Bahasa Melayu',
    code: 'ms-MY',
  },
  {
    language: 'Català',
    code: 'ca-ES',
  },
  {
    language: 'Čeština',
    code: 'cs-CZ',
  },
  {
    language: 'Dansk',
    code: 'da-DK',
  },
  {
    language: 'Deutsch',
    code: 'de-DE',
  },
  {
    language: 'English',
    countries: [
      {
        name: 'Australia',
        code: 'en-AU',
      },
      {
        name: 'Canada',
        code: 'en-CA',
      },
      {
        name: 'India',
        code: 'en-IN',
      },
      {
        name: 'Kenya',
        code: 'en-KE',
      },
      {
        name: 'Tanzania',
        code: 'en-TZ',
      },
      {
        name: 'Ghana',
        code: 'en-GH',
      },
      {
        name: 'New Zealand',
        code: 'en-NZ',
      },
      {
        name: 'Nigeria',
        code: 'en-NG',
      },
      {
        name: 'South Africa',
        code: 'en-ZA',
      },
      {
        name: 'Philippines',
        code: 'en-PH',
      },
      {
        name: 'United Kingdom',
        code: 'en-GB',
      },
      {
        name: 'United States',
        code: 'en-US',
      },
    ],
  },
  {
    language: 'Español',
    countries: [
      {
        name: 'Argentina',
        code: 'es-AR',
      },
      {
        name: 'Bolivia',
        code: 'es-BO',
      },
      {
        name: 'Chile',
        code: 'es-CL',
      },
      {
        name: 'Colombia',
        code: 'es-CO',
      },
      {
        name: 'Costa Rica',
        code: 'es-CR',
      },
      {
        name: 'Ecuador',
        code: 'es-EC',
      },
      {
        name: 'El Salvador',
        code: 'es-SV',
      },
      {
        name: 'España',
        code: 'es-ES',
      },
      {
        name: 'Estados Unidos',
        code: 'es-US',
      },
      {
        name: 'Guatemala',
        code: 'es-GT',
      },
      {
        name: 'Honduras',
        code: 'es-HN',
      },
      {
        name: 'México',
        code: 'es-MX',
      },
      {
        name: 'Nicaragua',
        code: 'es-NI',
      },
      {
        name: 'Panamá',
        code: 'es-PA',
      },
      {
        name: 'Paraguay',
        code: 'es-PY',
      },
      {
        name: 'Perú',
        code: 'es-PE',
      },
      {
        name: 'Puerto Rico',
        code: 'es-PR',
      },
      {
        name: 'República Dominicana',
        code: 'es-DO',
      },
      {
        name: 'Uruguay',
        code: 'es-UY',
      },
      {
        name: 'Venezuela',
        code: 'es-VE',
      },
    ],
  },
  {
    language: 'Euskara',
    code: 'eu-ES',
  },
  {
    language: 'Filipino',
    code: 'fil-PH',
  },
  {
    language: 'Français',
    code: 'fr-FR',
  },
  {
    language: 'Basa Jawa',
    code: 'jv-ID',
  },
  {
    language: 'Galego',
    code: 'gl-ES',
  },
  {
    language: 'ગુજરાતી',
    code: 'gu-IN',
  },
  {
    language: 'Hrvatski',
    code: 'hr-HR',
  },
  {
    language: 'IsiZulu',
    code: 'zu-ZA',
  },
  {
    language: 'Íslenska',
    code: 'is-IS',
  },
  {
    language: 'Italiano',
    countries: [
      {
        name: 'Italia',
        code: 'it-IT',
      },
      {
        name: 'Svizzera',
        code: 'it-CH',
      },
    ],
  },
  {
    language: 'ಕನ್ನಡ',
    code: 'kn-IN',
  },
  {
    language: 'ភាសាខ្មែរ',
    code: 'km-KH',
  },
  {
    language: 'Latviešu',
    code: 'lv-LV',
  },
  {
    language: 'Lietuvių',
    code: 'lt-LT',
  },
  {
    language: 'മലയാളം',
    code: 'ml-IN',
  },
  {
    language: 'मराठी',
    code: 'mr-IN',
  },
  {
    language: 'Magyar',
    code: 'hu-HU',
  },
  {
    language: 'ລາວ',
    code: 'lo-LA',
  },
  {
    language: 'Nederlands',
    code: 'nl-NL',
  },
  {
    language: 'नेपाली भाषा',
    code: 'ne-NP',
  },
  {
    language: 'Norsk bokmål',
    code: 'nb-NO',
  },
  {
    language: 'Polski',
    code: 'pl-PL',
  },
  {
    language: 'Português',
    countries: [
      {
        name: 'Brasil',
        code: 'pt-BR',
      },
      {
        name: 'Portugal',
        code: 'pt-PT',
      },
    ],
  },
  {
    language: 'Română',
    code: 'ro-RO',
  },
  {
    language: 'සිංහල',
    code: 'si-LK',
  },
  {
    language: 'Slovenščina',
    code: 'sl-SI',
  },
  {
    language: 'Basa Sunda',
    code: 'su-ID',
  },
  {
    language: 'Slovenčina',
    code: 'sk-SK',
  },
  {
    language: 'Suomi',
    code: 'fi-FI',
  },
  {
    language: 'Svenska',
    code: 'sv-SE',
  },
  {
    language: 'Kiswahili',
    countries: [
      {
        name: 'Tanzania',
        code: 'sw-TZ',
      },
      {
        name: 'Kenya',
        code: 'sw-KE',
      },
    ],
  },
  {
    language: 'ქართული',
    code: 'ka-GE',
  },
  {
    language: 'Հայերեն',
    code: 'hy-AM',
  },
  {
    language: 'தமிழ்',
    countries: [
      {
        name: 'இந்தியா',
        code: 'ta-IN',
      },
      {
        name: 'சிங்கப்பூர்',
        code: 'ta-SG',
      },
      {
        name: 'இலங்கை',
        code: 'ta-LK',
      },
      {
        name: 'மலேசியா',
        code: 'ta-MY',
      },
    ],
  },
  {
    language: 'తెలుగు',
    code: 'te-IN',
  },
  {
    language: 'Tiếng Việt',
    code: 'vi-VN',
  },
  {
    language: 'Türkçe',
    code: 'tr-TR',
  },
  {
    language: 'اُردُو',
    countries: [
      {
        name: 'پاکستان',
        code: 'ur-PK',
      },
      {
        name: 'بھارت',
        code: 'ur-IN',
      },
    ],
  },
  {
    language: 'Ελληνικά',
    code: 'el-GR',
  },
  {
    language: 'български',
    code: 'bg-BG',
  },
  {
    language: 'Pусский',
    code: 'ru-RU',
  },
  {
    language: 'Српски',
    code: 'sr-RS',
  },
  {
    language: 'Українська',
    code: 'uk-UA',
  },
  {
    language: '한국어',
    code: 'ko-KR',
  },
  {
    language: '中文',
    countries: [
      {
        name: '普通话 (中国大陆)',
        code: 'cmn-Hans-CN',
      },
      {
        name: '普通话 (香港)',
        code: 'cmn-Hans-HK',
      },
      {
        name: '中文 (台灣)',
        code: 'cmn-Hant-TW',
      },
      {
        name: '粵語 (香港)',
        code: 'yue-Hant-HK',
      },
    ],
  },
  {
    language: '日本語',
    code: 'ja-JP',
  },
  {
    language: 'हिन्दी',
    code: 'hi-IN',
  },
  {
    language: 'ภาษาไทย',
    code: 'th-TH',
  },
];

export const ALL_RECOGNITION_LANGUAGES: RecognitionLanguageInterface[] =
  SPEECH_RECOGNITION_LANGUAGES.reduce((acc, language) => {
    if (language.code) {
      acc.push({
        language: language.language,
        code: language.code,
      });
    } else {
      language.countries?.forEach(country => {
        acc.push({
          language: language.language,
          countryName: country.name,
          code: country.code,
        });
      });
    }
    return acc;
  }, [] as RecognitionLanguageInterface[]);

export const defaultRecognitionLanguage: RecognitionLanguageInterface = {
  language: 'Português',
  countryName: 'Brasil',
  code: 'pt-BR',
};

export const getRecognitionLanguageByCode = (code: string): RecognitionLanguageInterface =>
  ALL_RECOGNITION_LANGUAGES.find(language => language.code === code) || defaultRecognitionLanguage;
