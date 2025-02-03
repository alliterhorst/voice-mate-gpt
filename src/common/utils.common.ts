/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSystemLanguageConfigByCode } from '../config/system-languages.config';
import StorageKeyEnum from '../enum/storage-key.enum';
import ConfigurationInterface from '../interface/configuration.interface';

export function throwContextError(businessContext: string): void {
  throw new Error(
    `use${businessContext}Context deve ser utilizando dentro do ${businessContext}Provider`,
  );
}

export function convertToPersistStorage<T>(value: T): string {
  let stringValue = '';
  switch (typeof value) {
    case 'object':
      stringValue = JSON.stringify(value);
      break;
    case 'boolean':
    case 'number':
    case 'string':
      stringValue = `${value}`;
      break;
    default:
      stringValue = '';
      break;
  }
  return stringValue;
}

export function syncGetStorage(
  params: {
    storageKey: StorageKeyEnum;
    initialValue: any;
    setCallback: (value: any) => void;
  }[],
): void {
  const items: { [key: string]: any } = {};
  const setters: {
    setCallback: (value: any) => void;
    storageKey: string;
  }[] = [];

  params.forEach(({ storageKey, initialValue, setCallback }) => {
    items[storageKey] = initialValue;
    setters.push({ setCallback, storageKey });
  });

  chrome.storage.sync.get(items, result => {
    setters.forEach(({ setCallback, storageKey }) => {
      setCallback(result[storageKey]);
    });
  });
}

export function setStorage(
  params: {
    storageKey: StorageKeyEnum;
    value: any;
  }[],
  callback?: () => void,
): void {
  chrome.storage.sync.set(
    params.reduce(
      (acc, { storageKey, value }) => {
        acc[storageKey] = value;
        return acc;
      },
      {} as { [key: string]: any },
    ),
    callback,
  );
}

// Função para converter hex para RGB
function hexToRgb(hex: string): [number, number, number] {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function interpolateColor(color1: string, color2: string, factor: number): string {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));
  return rgbToHex(r, g, b);
}

export function generateGradient(startColor: string, endColor: string, steps: number): string[] {
  const colors: string[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= steps; i++) {
    const factor = i / steps;
    colors.push(interpolateColor(startColor, endColor, factor));
  }
  return colors;
}

export const getPlatformShortcut: () => string = () => {
  const isMac = navigator?.userAgentData?.platform
    ? navigator.userAgentData.platform.toUpperCase().includes('MAC')
    : navigator.platform?.toUpperCase()?.includes('MAC');

  return isMac ? 'Cmd' : 'Ctrl';
};

export const createDefaultConfig = (): ConfigurationInterface => {
  const { translate, language } = getSystemLanguageConfigByCode(navigator.language);
  return {
    pluginLanguageCode: language,
    automaticallySendMessage: false,
    codeBlockIsRead: false,
    useCommasAndSemicolonsToDivideSentences: true,
    speechRecognitionLanguageCode: language,
    microphoneEchoCancellation: true,
    microphoneNoiseSuppression: true,
    frequencyFiltersInSpeechRecognition: false,
    useChatgptVoice: true,
    elevenlabsApiKey: '',
    useElevenlabsVoice: false,
    elevenlabsVoice: '',
    elevenlabsSimilarity: 0,
    elevenlabsStability: 0,
    webSpeechApiVoice: window?.speechSynthesis?.getVoices()[0]?.voiceURI || '',
    webSpeechApiSpeechRate: 1,
    webSpeechApiPitch: 1,
    webSpeechApiVolume: 1,
    isVoiceCommandActive: true,
    isVoiceCommandToPauseConversationActive: true,
    isVoiceCommandToResumeConversationActive: true,
    isVoiceCommandToEndConversationActive: true,
    isVoiceCommandToDeleteMessageActive: true,
    isVoiceCommandToSendMessageActive: true,
    isVoiceCommandToDisableReadingActive: true,
    isVoiceCommandToEnableReadingActive: true,
    voiceCommandToPauseConversation: translate.configuration.voiceCommandToPauseConversation,
    voiceCommandToResumeConversation: translate.configuration.voiceCommandToResumeConversation,
    voiceCommandToEndConversation: translate.configuration.voiceCommandToEndConversation,
    voiceCommandToDeleteMessage: translate.configuration.voiceCommandToDeleteMessage,
    voiceCommandToSendMessage: translate.configuration.voiceCommandToSendMessage,
    voiceCommandToDisableReading: translate.configuration.voiceCommandToDisableReading,
    voiceCommandToEnableReading: translate.configuration.voiceCommandToEnableReading,
    isStartVoiceMateShortcutActive: true,
    isSkipCurrentReadingShortcutActive: true,
    isPauseConversationShortcutActive: true,
    isResumeConversationShortcutActive: true,
    isEndConversationShortcutActive: true,
    isDeleteMessageShortcutActive: true,
    isSendMessageShortcutActive: true,
    isDisableReadingShortcutActive: true,
    isEnableReadingShortcutActive: true,
    startVoiceMateShortcut: `${getPlatformShortcut()}${translate.configuration.shortcutToStartVoiceMate}`,
    skipCurrentReadingShortcut: `${getPlatformShortcut()}${translate.configuration.shortcutToSkipCurrentReading}`,
    pauseConversationShortcut: `${getPlatformShortcut()}${translate.configuration.shortcutToPauseConversation}`,
    resumeConversationShortcut: `${getPlatformShortcut()}${translate.configuration.shortcutToResumeConversation}`,
    endConversationShortcut: `${getPlatformShortcut()}${translate.configuration.shortcutToEndConversation}`,
    deleteMessageShortcut: `${getPlatformShortcut()}${translate.configuration.shortcutToDeleteMessage}`,
    sendMessageShortcut: `${getPlatformShortcut()}${translate.configuration.shortcutToSendMessage}`,
    disableReadingShortcut: `${getPlatformShortcut()}${translate.configuration.shortcutToDisableReading}`,
    enableReadingShortcut: `${getPlatformShortcut()}${translate.configuration.shortcutToEnableReading}`,
  };
};

export const setConfigurations = (
  configuration: ConfigurationInterface,
  onSaved?: () => void,
): void => {
  chrome.storage.sync.set(configuration, onSaved);
};

export const loadConfigurations = (): Promise<ConfigurationInterface> =>
  new Promise(resolve => {
    if (!chrome?.storage) {
      resolve(createDefaultConfig());
    } else {
      chrome.storage.sync.get(null, items => {
        if (JSON.stringify(items) === '{}') {
          const config = createDefaultConfig();
          setConfigurations(config, () => resolve(config));
        } else {
          resolve(items as ConfigurationInterface);
        }
      });
    }
  });

export const countDecimalPlaces = (value: number): number => {
  const valueString = value.toString();
  if (valueString.includes('.')) {
    return valueString.split('.')[1].length;
  }
  return 0;
};

export const getMaxDecimalPlaces = (values: number[]): number =>
  Math.max(...values.map(countDecimalPlaces));
