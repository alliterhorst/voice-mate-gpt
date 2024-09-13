import SystemLanguageEnum from '../enum/system-language.enum';
import { TranslateInterface } from '../interface/translate.interface';

export interface SystemLanguageConfigInterface {
  language: SystemLanguageEnum;
  label: string;
  translate?: TranslateInterface;
}

export const LANGUAGES: SystemLanguageConfigInterface[] = [
  {
    language: SystemLanguageEnum.EN_US,
    label: 'English (United States)',
    translate: {
      menuPlayer: {
        start: 'Start',
        stop: 'Stop',
        configurations: 'Configurations',
        visitProjectWebsite: 'Visit our website and learn more about the project.',
        voiceRecognitionEnabled: 'Voice recognition enabled. Click to disable.',
        voiceRecognitionDisabled: 'Voice recognition disabled. Click to enable.',
        textToSpeechEnabled: 'Text-to-speech (bot voice) enabled. Click to disable.',
        textToSpeechDisabled: 'Text-to-speech (bot voice) disabled. Click to enable.',
        skipMessage: 'Skip the message currently being read by the bot.',
        openSettingsMenu: 'Open settings menu to change bot voice, language, and other settings',
        conversationPaused: 'Conversation paused',
        clickButtonBelowOrSpeakThePauseWordToResume:
          'Click button below or speak the pause word to resume',
        resume: 'Resume',
      },
      configuration: {
        whatIsYourLanguage: 'What is your language?',
        confirmYourLanguage: 'Confirm your language:',
      },
    },
  },
  {
    language: SystemLanguageEnum.PT_BR,
    label: 'Português (Brasil)',
    translate: {
      menuPlayer: {
        start: 'Iniciar',
        stop: 'Parar',
        configurations: 'Configurações',
        visitProjectWebsite: 'Visite nosso site e conheça mais sobre o projeto.',
        voiceRecognitionEnabled: 'O reconhecimento de voz está ativado. Clique para desativar.',
        voiceRecognitionDisabled: 'O reconhecimento de voz está desativado. Clique para ativar.',
        textToSpeechEnabled: 'A voz do bot está ativada. Clique para desativar.',
        textToSpeechDisabled: 'A voz do bot está desativada. Clique para ativar.',
        skipMessage: 'Pular a mensagem que está sendo lida pelo bot.',
        openSettingsMenu:
          'Abra o menu de configurações para alterar a voz do bot, o idioma e outras configurações',
        conversationPaused: 'Conversa pausada',
        clickButtonBelowOrSpeakThePauseWordToResume:
          'Clique no botão abaixo ou fale a palavra de pausa para retomar',
        resume: 'Retomar',
      },
      configuration: {
        whatIsYourLanguage: 'Qual é o seu idioma?',
        confirmYourLanguage: 'Confirme seu idioma:',
      },
    },
  },
];

export const getSystemLanguageConfigByCode = (
  code: string = 'en-UK',
): SystemLanguageConfigInterface =>
  LANGUAGES.find(language => language.language === code) ||
  LANGUAGES.find(language => language.language.split('-')[0] === code.split('-')[0]) ||
  LANGUAGES[0];
