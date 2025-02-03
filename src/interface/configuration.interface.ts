interface ConfigurationInterface {
  pluginLanguageCode: string;
  automaticallySendMessage: boolean;
  codeBlockIsRead: boolean;
  useCommasAndSemicolonsToDivideSentences: boolean;
  speechRecognitionLanguageCode: string;

  microphoneEchoCancellation: boolean;
  microphoneNoiseSuppression: boolean;
  frequencyFiltersInSpeechRecognition: boolean;

  useChatgptVoice: boolean;
  useElevenlabsVoice: boolean;
  elevenlabsApiKey: string;
  elevenlabsVoice: string;
  elevenlabsSimilarity: number;
  elevenlabsStability: number;
  webSpeechApiVoice: string;
  webSpeechApiSpeechRate: number;
  webSpeechApiPitch: number;
  webSpeechApiVolume: number;
  isVoiceCommandActive: boolean;
  isVoiceCommandToPauseConversationActive: boolean;
  isVoiceCommandToResumeConversationActive: boolean;
  isVoiceCommandToEndConversationActive: boolean;
  isVoiceCommandToDeleteMessageActive: boolean;
  isVoiceCommandToSendMessageActive: boolean;
  isVoiceCommandToDisableReadingActive: boolean;
  isVoiceCommandToEnableReadingActive: boolean;
  voiceCommandToPauseConversation: string;
  voiceCommandToResumeConversation: string;
  voiceCommandToEndConversation: string;
  voiceCommandToDeleteMessage: string;
  voiceCommandToSendMessage: string;
  voiceCommandToDisableReading: string;
  voiceCommandToEnableReading: string;
  isStartVoiceMateShortcutActive: boolean;
  isSkipCurrentReadingShortcutActive: boolean;
  isPauseConversationShortcutActive: boolean;
  isResumeConversationShortcutActive: boolean;
  isEndConversationShortcutActive: boolean;
  isDeleteMessageShortcutActive: boolean;
  isSendMessageShortcutActive: boolean;
  isDisableReadingShortcutActive: boolean;
  isEnableReadingShortcutActive: boolean;
  startVoiceMateShortcut: string;
  skipCurrentReadingShortcut: string;
  pauseConversationShortcut: string;
  resumeConversationShortcut: string;
  endConversationShortcut: string;
  deleteMessageShortcut: string;
  sendMessageShortcut: string;
  disableReadingShortcut: string;
  enableReadingShortcut: string;
}

export default ConfigurationInterface;
