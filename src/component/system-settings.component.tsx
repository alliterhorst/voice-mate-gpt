import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faSave, faUndo, faTimes } from '@fortawesome/free-solid-svg-icons';
import AccordionComponent from './accordion.component';
import LabelControlWrapperComponent from './label-control-wrapper.component';
import SliderComponent from './slider.component';
import { useOptionContext } from '../context/option.context';
import { LANGUAGES } from '../config/system-languages.config';
import CustomSelectComponent from './custom-select.component';
import CheckboxComponent from './checkbox.component';
import { ALL_RECOGNITION_LANGUAGES } from '../config/speech-recognition-languages.config';
import InputComponent from './input.component';
import ButtonComponent from './button.component';
import VariantEnum from '../enum/variant.enum';
import { ContainerRow } from '../style/common.style';
import ConfigurationInterface from '../interface/configuration.interface';

const MockElevenLabsVoices = ['Voice 1', 'Voice 2'];

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: ${(props): string => props.theme.colors.background};
  color: ${(props): string => props.theme.colors.text};
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
`;

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: ${(props): string => props.theme.colors.text};
`;

const SettingsContent = styled.div`
  flex: 1;
  overflow-y: auto;
  max-height: 60vh;
`;

interface SystemSettingsComponentProps {
  onSettingsClose: () => void;
}

// eslint-disable-next-line complexity
const SystemSettingsComponent: React.FC<SystemSettingsComponentProps> = ({ onSettingsClose }) => {
  const {
    systemLanguageConfig: { translate },
    config,
    updateConfig,
    voiceAvailable,
  } = useOptionContext();
  const [localConfig, setLocalConfig] = useState<ConfigurationInterface>({
    pluginLanguageCode: config?.pluginLanguageCode || '',
    automaticallySendMessage: config?.automaticallySendMessage || false,
    codeBlockIsRead: config?.codeBlockIsRead || false,
    speechRecognitionLanguageCode: config?.speechRecognitionLanguageCode || '',
    useCommasAndSemicolonsToDivideSentences:
      config?.useCommasAndSemicolonsToDivideSentences || false,
    microphoneEchoCancellation: config?.microphoneEchoCancellation || false,
    microphoneNoiseSuppression: config?.microphoneNoiseSuppression || false,
    frequencyFiltersInSpeechRecognition: config?.frequencyFiltersInSpeechRecognition || false,
    useChatgptVoice: config?.useChatgptVoice || true,
    webSpeechApiVoice:
      config?.webSpeechApiVoice || voiceAvailable.find(voice => voice.default)?.voiceURI || '',
    webSpeechApiSpeechRate: config?.webSpeechApiSpeechRate || 1,
    webSpeechApiPitch: config?.webSpeechApiPitch || 1,
    webSpeechApiVolume: config?.webSpeechApiVolume || 1,
    useElevenlabsVoice: config?.useElevenlabsVoice || false,
    elevenlabsApiKey: config?.elevenlabsApiKey || '',
    elevenlabsVoice: config?.elevenlabsVoice || '',
    elevenlabsSimilarity: config?.elevenlabsSimilarity || 0,
    elevenlabsStability: config?.elevenlabsStability || 0,
    isVoiceCommandActive: config?.isVoiceCommandActive || true,
    isVoiceCommandToPauseConversationActive:
      config?.isVoiceCommandToPauseConversationActive || true,
    isVoiceCommandToResumeConversationActive:
      config?.isVoiceCommandToResumeConversationActive || true,
    isVoiceCommandToEndConversationActive: config?.isVoiceCommandToEndConversationActive || true,
    isVoiceCommandToDeleteMessageActive: config?.isVoiceCommandToDeleteMessageActive || true,
    isVoiceCommandToSendMessageActive: config?.isVoiceCommandToSendMessageActive || true,
    isVoiceCommandToDisableReadingActive: config?.isVoiceCommandToDisableReadingActive || true,
    isVoiceCommandToEnableReadingActive: config?.isVoiceCommandToEnableReadingActive || true,
    voiceCommandToPauseConversation: config?.voiceCommandToPauseConversation || '',
    voiceCommandToResumeConversation: config?.voiceCommandToResumeConversation || '',
    voiceCommandToEndConversation: config?.voiceCommandToEndConversation || '',
    voiceCommandToDeleteMessage: config?.voiceCommandToDeleteMessage || '',
    voiceCommandToSendMessage: config?.voiceCommandToSendMessage || '',
    voiceCommandToDisableReading: config?.voiceCommandToDisableReading || '',
    voiceCommandToEnableReading: config?.voiceCommandToEnableReading || '',
    isStartVoiceMateShortcutActive: config?.isStartVoiceMateShortcutActive || true,
    isSkipCurrentReadingShortcutActive: config?.isSkipCurrentReadingShortcutActive || true,
    isPauseConversationShortcutActive: config?.isPauseConversationShortcutActive || true,
    isResumeConversationShortcutActive: config?.isResumeConversationShortcutActive || true,
    isEndConversationShortcutActive: config?.isEndConversationShortcutActive || true,
    isDeleteMessageShortcutActive: config?.isDeleteMessageShortcutActive || true,
    isSendMessageShortcutActive: config?.isSendMessageShortcutActive || true,
    isDisableReadingShortcutActive: config?.isDisableReadingShortcutActive || true,
    isEnableReadingShortcutActive: config?.isEnableReadingShortcutActive || true,
    startVoiceMateShortcut: config?.startVoiceMateShortcut || '',
    skipCurrentReadingShortcut: config?.skipCurrentReadingShortcut || '',
    pauseConversationShortcut: config?.pauseConversationShortcut || '',
    resumeConversationShortcut: config?.resumeConversationShortcut || '',
    endConversationShortcut: config?.endConversationShortcut || '',
    deleteMessageShortcut: config?.deleteMessageShortcut || '',
    sendMessageShortcut: config?.sendMessageShortcut || '',
    disableReadingShortcut: config?.disableReadingShortcut || '',
    enableReadingShortcut: config?.enableReadingShortcut || '',
  });

  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const handleInputChange = <T extends keyof ConfigurationInterface>(
    field: T,
    value: ConfigurationInterface[T],
  ): void => {
    setLocalConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = (): void => {
    updateConfig(localConfig);
    console.log('Update config:', localConfig);
  };

  const handleRestore = (): void => {
    // TODO: Restore default settings
    setLocalConfig({ ...config } as ConfigurationInterface);
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(localConfig) !== JSON.stringify(config));
  }, [localConfig, config]);

  return (
    <SettingsContainer>
      <SettingsHeader>
        <h2>{translate.menuPlayer.configurations}</h2>
        <ContainerRow style={{ justifyContent: 'flex-end' }}>
          <ButtonComponent
            onClick={handleSave}
            $configButton={{
              alt: translate.configuration.save,
              label: translate.configuration.save,
              icon: faSave,
              variant: VariantEnum.PRIMARY,
            }}
            disabled={!hasChanges}
          />
          <div style={{ margin: '0 10px' }}>
            <ButtonComponent
              onClick={handleRestore}
              $configButton={{
                alt: translate.configuration.restoreDefaultSettings,
                icon: faUndo,
                variant: VariantEnum.PRIMARY,
              }}
            />
          </div>
          <ButtonComponent
            onClick={onSettingsClose}
            $configButton={{
              alt: translate.configuration.cancel,
              icon: faTimes,
              variant: VariantEnum.PRIMARY,
            }}
          />
        </ContainerRow>
      </SettingsHeader>
      <SettingsContent>
        <AccordionComponent
          items={[
            {
              title: translate.configuration.pluginSettings,
              content: (
                <div>
                  <LabelControlWrapperComponent
                    label={translate.configuration.selectPluginLanguage}
                  >
                    <CustomSelectComponent
                      options={LANGUAGES.map(language => ({
                        value: language.language as string,
                        label: language.label,
                      }))}
                      placeholder={translate.configuration.selectAnOption}
                      onChange={(value): void => handleInputChange('pluginLanguageCode', value)}
                      value={localConfig.pluginLanguageCode}
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent
                    label={translate.configuration.automaticallySendMessageAfterRecognizingSpeech}
                  >
                    <CheckboxComponent
                      labels={{
                        labelOn: `(${translate.configuration.yes})`,
                        labelOff: `(${translate.configuration.no})`,
                      }}
                      checked={localConfig.automaticallySendMessage}
                      onChange={(value): void =>
                        handleInputChange('automaticallySendMessage', value)
                      }
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent label={translate.configuration.readCodeBlocksAloud}>
                    <CheckboxComponent
                      labels={{
                        labelOn: `(${translate.configuration.yes})`,
                        labelOff: `(${translate.configuration.no})`,
                      }}
                      checked={localConfig.codeBlockIsRead}
                      onChange={(value): void => handleInputChange('codeBlockIsRead', value)}
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent
                    label={translate.configuration.useCommasAndSemicolonsToDivideSentences}
                  >
                    <CheckboxComponent
                      labels={{
                        labelOn: `(${translate.configuration.yes})`,
                        labelOff: `(${translate.configuration.no})`,
                      }}
                      checked={localConfig.useCommasAndSemicolonsToDivideSentences}
                      onChange={(value): void =>
                        handleInputChange('useCommasAndSemicolonsToDivideSentences', value)
                      }
                    />
                  </LabelControlWrapperComponent>
                </div>
              ),
            },
            {
              title: translate.configuration.voiceRecognition,
              content: (
                <div>
                  <LabelControlWrapperComponent label={translate.configuration.voiceRecognition}>
                    <CustomSelectComponent
                      options={ALL_RECOGNITION_LANGUAGES.map(recognitionLanguage => ({
                        value: recognitionLanguage.code as string,
                        label: `${recognitionLanguage.language} ${recognitionLanguage.countryName ? ` (${recognitionLanguage.countryName})` : ''}`,
                      }))}
                      placeholder={translate.configuration.selectAnOption}
                      onChange={(value): void =>
                        handleInputChange('speechRecognitionLanguageCode', value)
                      }
                      value={localConfig.speechRecognitionLanguageCode}
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent
                    label={translate.configuration.microphoneEchoCancellation}
                  >
                    <CheckboxComponent
                      labels={{
                        labelOn: `(${translate.configuration.yes})`,
                        labelOff: `(${translate.configuration.no})`,
                      }}
                      checked={localConfig.microphoneEchoCancellation}
                      onChange={(value): void =>
                        handleInputChange('microphoneEchoCancellation', value)
                      }
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent
                    label={translate.configuration.microphoneNoiseSuppression}
                  >
                    <CheckboxComponent
                      labels={{
                        labelOn: `(${translate.configuration.yes})`,
                        labelOff: `(${translate.configuration.no})`,
                      }}
                      checked={localConfig.microphoneNoiseSuppression}
                      onChange={(value): void =>
                        handleInputChange('microphoneNoiseSuppression', value)
                      }
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent
                    label={translate.configuration.frequencyFiltersInSpeechRecognition}
                  >
                    <CheckboxComponent
                      labels={{
                        labelOn: `(${translate.configuration.yes})`,
                        labelOff: `(${translate.configuration.no})`,
                      }}
                      checked={localConfig.frequencyFiltersInSpeechRecognition}
                      onChange={(value): void =>
                        handleInputChange('frequencyFiltersInSpeechRecognition', value)
                      }
                    />
                  </LabelControlWrapperComponent>
                </div>
              ),
            },
            {
              title: translate.configuration.voiceLanguage,
              content: (
                <div>
                  <LabelControlWrapperComponent label={translate.configuration.speechVoice}>
                    <CustomSelectComponent
                      options={voiceAvailable.map(voice => ({
                        value: voice.voiceURI,
                        label: `${voice.name} (${voice.lang})`,
                      }))}
                      placeholder={translate.configuration.selectAnOption}
                      onChange={(value): void => handleInputChange('webSpeechApiVoice', value)}
                      value={localConfig.webSpeechApiVoice}
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent
                    label={`${translate.configuration.speechRate} (${localConfig.webSpeechApiSpeechRate})`}
                  >
                    <SliderComponent
                      min={0.5}
                      max={3}
                      step={0.1}
                      value={localConfig.webSpeechApiSpeechRate}
                      onChange={(value): void => handleInputChange('webSpeechApiSpeechRate', value)}
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent
                    label={`${translate.configuration.voicePitch} (${localConfig.webSpeechApiPitch})`}
                  >
                    <SliderComponent
                      min={0}
                      max={2}
                      step={0.1}
                      value={localConfig.webSpeechApiPitch}
                      onChange={(value): void => handleInputChange('webSpeechApiPitch', value)}
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent
                    label={`${translate.configuration.voiceVolume} (${localConfig.webSpeechApiVolume})`}
                  >
                    <SliderComponent
                      min={0}
                      max={1}
                      step={0.1}
                      value={localConfig.webSpeechApiVolume}
                      onChange={(value): void => handleInputChange('webSpeechApiVolume', value)}
                    />
                  </LabelControlWrapperComponent>
                </div>
              ),
            },
            {
              title: translate.configuration.advancedSpeechSynthesis,
              content: (
                <div>
                  <LabelControlWrapperComponent
                    label={translate.configuration.useElevenLabsSpeechSynthesis}
                  >
                    <CheckboxComponent
                      labels={{
                        labelOn: `(${translate.configuration.yes})`,
                        labelOff: `(${translate.configuration.no})`,
                      }}
                      checked={localConfig.useElevenlabsVoice}
                      onChange={(value): void => handleInputChange('useElevenlabsVoice', value)}
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent
                    label={translate.configuration.enterElevenLabsAPIKey}
                  >
                    <InputComponent
                      value={localConfig.elevenlabsApiKey}
                      onChange={(e): void => handleInputChange('elevenlabsApiKey', e.target.value)}
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent label={translate.configuration.elevenLabsVoice}>
                    <CustomSelectComponent
                      options={MockElevenLabsVoices.map(voice => ({
                        value: voice,
                        label: voice,
                      }))}
                      placeholder={translate.configuration.selectAnOption}
                      onChange={(value): void => handleInputChange('elevenlabsVoice', value)}
                      value={localConfig.elevenlabsVoice}
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent
                    label={`${translate.configuration.elevenlabsVoiceStability} (${localConfig.elevenlabsStability})`}
                  >
                    <SliderComponent
                      min={0}
                      max={1}
                      step={0.1}
                      value={localConfig.elevenlabsStability}
                      onChange={(value): void => handleInputChange('elevenlabsStability', value)}
                    />
                  </LabelControlWrapperComponent>
                  <LabelControlWrapperComponent
                    label={`${translate.configuration.elevenlabsVoiceSimilarity} (${localConfig.elevenlabsSimilarity})`}
                  >
                    <SliderComponent
                      min={0}
                      max={1}
                      step={0.1}
                      value={localConfig.elevenlabsSimilarity}
                      onChange={(value): void => handleInputChange('elevenlabsSimilarity', value)}
                    />
                  </LabelControlWrapperComponent>
                </div>
              ),
            },
            {
              title: translate.configuration.voiceCommandsControl,
              content: translate.configuration.nothingHere,
            },
            {
              title: translate.configuration.keyboardShortcuts,
              content: translate.configuration.nothingHere,
            },
          ]}
        />
      </SettingsContent>
    </SettingsContainer>
  );
};

export default SystemSettingsComponent;
