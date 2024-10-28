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
  configuration: {
    whatIsYourLanguage: string;
    confirmYourLanguage: string;
    selectPluginLanguage: string;
    automaticallySendMessageAfterRecognizingSpeech: string;
    readCodeBlocksAloud: string;
    useCommasAndSemicolonsToDivideSentences: string;
    selectSpeechRecognitionLanguage: string;
    useChatGPTVoiceForResponses: string;
    enterElevenLabsAPIKey: string;
    useElevenLabsVoiceForResponses: string;
    chooseElevenLabsVoice: string;
    setElevenLabsVoiceSimilarity: string;
    setElevenLabsVoiceStability: string;
    chooseWebSpeechAPIVoice: string;
    setSpeechRateForWebSpeechAPI: string;
    setPitchForWebSpeechAPI: string;
    setVolumeForWebSpeechAPI: string;

    enableVoiceCommands: string;
    enableVoiceCommandToPauseConversation: string;
    enableVoiceCommandToResumeConversation: string;
    enableVoiceCommandToEndConversation: string;
    enableVoiceCommandToDeleteMessage: string;
    enableVoiceCommandToSendMessage: string;
    enableVoiceCommandToDisableReading: string;
    enableVoiceCommandToEnableReading: string;

    voiceCommandToPauseConversation: string;
    voiceCommandToResumeConversation: string;
    voiceCommandToEndConversation: string;
    voiceCommandToDeleteMessage: string;
    voiceCommandToSendMessage: string;
    voiceCommandToDisableReading: string;
    voiceCommandToEnableReading: string;

    voiceCommandToPauseConversationLabel: string;
    voiceCommandToResumeConversationLabel: string;
    voiceCommandToEndConversationLabel: string;
    voiceCommandToDeleteMessageLabel: string;
    voiceCommandToSendMessageLabel: string;
    voiceCommandToDisableReadingLabel: string;
    voiceCommandToEnableReadingLabel: string;

    enableShortcutToStartVoiceMate: string;
    enableShortcutToSkipCurrentReading: string;
    enableShortcutToPauseConversation: string;
    enableShortcutToResumeConversation: string;
    enableShortcutToEndConversation: string;
    enableShortcutToDeleteMessage: string;
    enableShortcutToSendMessage: string;
    enableShortcutToDisableReading: string;
    enableShortcutToEnableReading: string;

    shortcutToStartVoiceMate: string;
    shortcutToSkipCurrentReading: string;
    shortcutToPauseConversation: string;
    shortcutToResumeConversation: string;
    shortcutToEndConversation: string;
    shortcutToDeleteMessage: string;
    shortcutToSendMessage: string;
    shortcutToDisableReading: string;
    shortcutToEnableReading: string;

    shortcutToStartVoiceMateLabel: string;
    shortcutToSkipCurrentReadingLabel: string;
    shortcutToPauseConversationLabel: string;
    shortcutToResumeConversationLabel: string;
    shortcutToEndConversationLabel: string;
    shortcutToDeleteMessageLabel: string;
    shortcutToSendMessageLabel: string;
    shortcutToDisableReadingLabel: string;
    shortcutToEnableReadingLabel: string;
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
  configuration: {
    whatIsYourLanguage: 'What is your language?',
    confirmYourLanguage: 'Confirm your language:',
    selectPluginLanguage: 'Select the plugin language:',
    automaticallySendMessageAfterRecognizingSpeech:
      'Automatically send message after recognizing speech:',
    readCodeBlocksAloud: 'Read code blocks aloud:',
    useCommasAndSemicolonsToDivideSentences: 'Use commas and semicolons to divide sentences:',
    selectSpeechRecognitionLanguage: 'Select the speech recognition language:',
    useChatGPTVoiceForResponses: 'Use ChatGPT’s voice for responses:',
    enterElevenLabsAPIKey: 'Enter your ElevenLabs API key:',
    useElevenLabsVoiceForResponses: 'Use ElevenLabs voice for responses:',
    chooseElevenLabsVoice: 'Choose the ElevenLabs voice:',
    setElevenLabsVoiceSimilarity: 'Set ElevenLabs voice similarity (0 to 1):',
    setElevenLabsVoiceStability: 'Set ElevenLabs voice stability (0 to 1):',
    chooseWebSpeechAPIVoice: 'Choose the Web Speech API voice:',
    setSpeechRateForWebSpeechAPI: 'Set speech rate for Web Speech API:',
    setPitchForWebSpeechAPI: 'Set pitch for Web Speech API:',
    setVolumeForWebSpeechAPI: 'Set volume for Web Speech API:',

    enableVoiceCommands: 'Enable voice commands',
    enableVoiceCommandToPauseConversation: 'Enable voice command to pause conversation',
    enableVoiceCommandToResumeConversation: 'Enable voice command to resume conversation',
    enableVoiceCommandToEndConversation: 'Enable voice command to end conversation',
    enableVoiceCommandToDeleteMessage: 'Enable voice command to delete message',
    enableVoiceCommandToSendMessage: 'Enable voice command to send message',
    enableVoiceCommandToDisableReading: 'Enable voice command to disable reading',
    enableVoiceCommandToEnableReading: 'Enable voice command to enable reading',

    voiceCommandToPauseConversation: 'pause conversation',
    voiceCommandToResumeConversation: 'resume conversation',
    voiceCommandToEndConversation: 'end conversation',
    voiceCommandToDeleteMessage: 'delete message',
    voiceCommandToSendMessage: 'send message',
    voiceCommandToDisableReading: 'disable reading',
    voiceCommandToEnableReading: 'enable reading',

    voiceCommandToPauseConversationLabel: 'Voice command to pause conversation',
    voiceCommandToResumeConversationLabel: 'Voice command to resume conversation',
    voiceCommandToEndConversationLabel: 'Voice command to end conversation',
    voiceCommandToDeleteMessageLabel: 'Voice command to delete message',
    voiceCommandToSendMessageLabel: 'Voice command to send message',
    voiceCommandToDisableReadingLabel: 'Voice command to disable reading',
    voiceCommandToEnableReadingLabel: 'Voice command to enable reading',

    enableShortcutToStartVoiceMate: 'Enable shortcut to start Voice Mate',
    enableShortcutToSkipCurrentReading: 'Enable shortcut to skip current reading',
    enableShortcutToPauseConversation: 'Enable shortcut to pause conversation',
    enableShortcutToResumeConversation: 'Enable shortcut to resume conversation',
    enableShortcutToEndConversation: 'Enable shortcut to end conversation',
    enableShortcutToDeleteMessage: 'Enable shortcut to delete message',
    enableShortcutToSendMessage: 'Enable shortcut to send message',
    enableShortcutToDisableReading: 'Enable shortcut to disable reading',
    enableShortcutToEnableReading: 'Enable shortcut to enable reading',

    shortcutToStartVoiceMateLabel: 'Shortcut to start Voice Mate',
    shortcutToSkipCurrentReadingLabel: 'Shortcut to skip current reading',
    shortcutToPauseConversationLabel: 'Shortcut to pause conversation',
    shortcutToResumeConversationLabel: 'Shortcut to resume conversation',
    shortcutToEndConversationLabel: 'Shortcut to end conversation',
    shortcutToDeleteMessageLabel: 'Shortcut to delete message',
    shortcutToSendMessageLabel: 'Shortcut to send message',
    shortcutToDisableReadingLabel: 'Shortcut to disable reading',
    shortcutToEnableReadingLabel: 'Shortcut to enable reading',

    shortcutToStartVoiceMate: '+Shift+I',
    shortcutToSkipCurrentReading: '+Shift+S',
    shortcutToPauseConversation: '+Shift+P',
    shortcutToResumeConversation: '+Shift+R',
    shortcutToEndConversation: '+Shift+E',
    shortcutToDeleteMessage: '+Shift+D',
    shortcutToSendMessage: '+Shift+M',
    shortcutToDisableReading: '+Shift+D',
    shortcutToEnableReading: '+Shift+L',
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
  configuration: {
    whatIsYourLanguage: 'Qual é o seu idioma?',
    confirmYourLanguage: 'Confirme seu idioma:',
    selectPluginLanguage: 'Selecione o idioma do plugin:',
    automaticallySendMessageAfterRecognizingSpeech:
      'Enviar mensagem automaticamente após reconhecimento de fala:',
    readCodeBlocksAloud: 'Ler blocos de código em voz alta:',
    useCommasAndSemicolonsToDivideSentences: 'Usar vírgulas e ponto e vírgula para dividir frases:',
    selectSpeechRecognitionLanguage: 'Selecione o idioma de reconhecimento de fala:',
    useChatGPTVoiceForResponses: 'Usar a voz do ChatGPT para as respostas:',
    enterElevenLabsAPIKey: 'Digite sua chave de API do ElevenLabs:',
    useElevenLabsVoiceForResponses: 'Usar a voz do ElevenLabs para respostas:',
    chooseElevenLabsVoice: 'Escolha a voz do ElevenLabs:',
    setElevenLabsVoiceSimilarity: 'Defina a similaridade da voz do ElevenLabs (0 a 1):',
    setElevenLabsVoiceStability: 'Defina a estabilidade da voz do ElevenLabs (0 a 1):',
    chooseWebSpeechAPIVoice: 'Escolha a voz da Web Speech API:',
    setSpeechRateForWebSpeechAPI: 'Defina a velocidade da fala para Web Speech API:',
    setPitchForWebSpeechAPI: 'Defina o tom de voz para Web Speech API:',
    setVolumeForWebSpeechAPI: 'Defina o volume da Web Speech API:',

    enableVoiceCommands: 'Ativar comandos de voz',
    enableVoiceCommandToPauseConversation: 'Ativar comando de voz para pausar conversa',
    enableVoiceCommandToResumeConversation: 'Ativar comando de voz para retomar conversa',
    enableVoiceCommandToEndConversation: 'Ativar comando de voz para encerrar conversa',
    enableVoiceCommandToDeleteMessage: 'Ativar comando de voz para deletar mensagem',
    enableVoiceCommandToSendMessage: 'Ativar comando de voz para enviar mensagem',
    enableVoiceCommandToDisableReading: 'Ativar comando de voz para desativar leitura',
    enableVoiceCommandToEnableReading: 'Ativar comando de voz para ativar leitura',

    voiceCommandToPauseConversation: 'pausar conversa',
    voiceCommandToResumeConversation: 'retomar conversa',
    voiceCommandToEndConversation: 'encerrar conversa',
    voiceCommandToDeleteMessage: 'deletar mensagem',
    voiceCommandToSendMessage: 'enviar mensagem',
    voiceCommandToDisableReading: 'desativar leitura',
    voiceCommandToEnableReading: 'ativar leitura',

    voiceCommandToPauseConversationLabel: 'Comando de voz para pausar conversa',
    voiceCommandToResumeConversationLabel: 'Comando de voz para retomar conversa',
    voiceCommandToEndConversationLabel: 'Comando de voz para encerrar conversa',
    voiceCommandToDeleteMessageLabel: 'Comando de voz para deletar mensagem',
    voiceCommandToSendMessageLabel: 'Comando de voz para enviar mensagem',
    voiceCommandToDisableReadingLabel: 'Comando de voz para desativar leitura',
    voiceCommandToEnableReadingLabel: 'Comando de voz para ativar leitura',

    enableShortcutToStartVoiceMate: 'Ativar atalho para iniciar Voice Mate',
    enableShortcutToSkipCurrentReading: 'Ativar atalho para pular leitura atual',
    enableShortcutToPauseConversation: 'Ativar atalho para pausar conversa',
    enableShortcutToResumeConversation: 'Ativar atalho para retomar conversa',
    enableShortcutToEndConversation: 'Ativar atalho para encerrar conversa',
    enableShortcutToDeleteMessage: 'Ativar atalho para deletar mensagem',
    enableShortcutToSendMessage: 'Ativar atalho para enviar mensagem',
    enableShortcutToDisableReading: 'Ativar atalho para desativar leitura',
    enableShortcutToEnableReading: 'Ativar atalho para ativar leitura',

    shortcutToStartVoiceMateLabel: 'Atalho para iniciar Voice Mate',
    shortcutToSkipCurrentReadingLabel: 'Atalho para pular leitura atual',
    shortcutToPauseConversationLabel: 'Atalho para pausar conversa',
    shortcutToResumeConversationLabel: 'Atalho para retomar conversa',
    shortcutToEndConversationLabel: 'Atalho para encerrar conversa',
    shortcutToDeleteMessageLabel: 'Atalho para deletar mensagem',
    shortcutToSendMessageLabel: 'Atalho para enviar mensagem',
    shortcutToDisableReadingLabel: 'Atalho para desativar leitura',
    shortcutToEnableReadingLabel: 'Atalho para ativar leitura',

    shortcutToStartVoiceMate: '+Shift+I',
    shortcutToSkipCurrentReading: '+Shift+S',
    shortcutToPauseConversation: '+Shift+P',
    shortcutToResumeConversation: '+Shift+R',
    shortcutToEndConversation: '+Shift+E',
    shortcutToDeleteMessage: '+Shift+D',
    shortcutToSendMessage: '+Shift+M',
    shortcutToDisableReading: '+Shift+D',
    shortcutToEnableReading: '+Shift+L',
  },
};

export const translate = translatePT;
