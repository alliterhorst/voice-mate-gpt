export interface TranslateInterface {
  menuPlayer: {
    start: string;
    stop: string;

    configurations: string;
    visitProjectWebsite: string;

    voiceRecognitionEnabled: string;
    voiceRecognitionDisabled: string;

    textToSpeechEnabled: string;
    textToSpeechDisabled: string;

    skipMessage: string;

    openSettingsMenu: string;
    conversationPaused: string;

    clickButtonBelowOrSpeakThePauseWordToResume: string;
    resume: string;
  };
}

export const translateEN: TranslateInterface = {
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
};

export const translatePT: TranslateInterface = {
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
};

export const translate = translatePT;
