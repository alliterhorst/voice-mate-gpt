import React, { useState } from 'react';
import styled from 'styled-components';
import AccordionComponent from './accordion.component';
import LabelControlWrapperComponent from './label-control-wrapper.component';
import SliderComponent from './slider.component';
import { useOptionContext } from '../context/option.context';
import { LANGUAGES } from '../config/system-languages.config';
import CustomSelectComponent from './custom-select.component';
import CheckboxComponent from './checkbox.component';
import { ALL_RECOGNITION_LANGUAGES } from '../config/speech-recognition-languages.config';

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

const SettingsHeader = styled.h2`
  margin-bottom: 16px;
  color: ${(props): string => props.theme.colors.text};
`;

// eslint-disable-next-line complexity
const SystemSettingsComponent: React.FC = () => {
  const {
    systemLanguageConfig: { translate },
    config,
  } = useOptionContext();
  const [pluginLanguageCode, setPluginLanguageCode] = useState<string>(
    config?.pluginLanguageCode || '',
  );
  const [automaticallySendMessage, setAutomaticallySendMessage] = useState<boolean>(
    config?.automaticallySendMessage || false,
  );
  const [codeBlockIsRead, setCodeBlockIsRead] = useState<boolean>(config?.codeBlockIsRead || false);
  const [voiceRecognitionLanguageCode, setVoiceRecognitionLanguageCode] = useState<string>(
    config?.speechRecognitionLanguageCode || '',
  );
  const [useCommasAndSemicolonsToDivideSentences, setUseCommasAndSemicolonsToDivideSentences] =
    useState<boolean>(config?.useCommasAndSemicolonsToDivideSentences || false);
  const [microphoneEchoCancellation, setMicrophoneEchoCancellation] = useState<boolean>(
    config?.microphoneEchoCancellation || false,
  );
  const [microphoneNoiseSuppression, setMicrophoneNoiseSuppression] = useState<boolean>(
    config?.microphoneNoiseSuppression || false,
  );
  const [frequencyFiltersInSpeechRecognition, setFrequencyFiltersInSpeechRecognition] =
    useState<boolean>(config?.frequencyFiltersInSpeechRecognition || false);
  const [webSpeechApiVoice, setWebSpeechApiVoice] = useState<string>(
    config?.webSpeechApiVoice || '',
  );
  const [webSpeechApiSpeechRate, setWebSpeechApiSpeechRate] = useState<number>(
    config?.webSpeechApiSpeechRate || 1,
  );
  const [webSpeechApiPitch, setWebSpeechApiPitch] = useState<number>(
    config?.webSpeechApiPitch || 1,
  );
  const [webSpeechApiVolume, setWebSpeechApiVolume] = useState<number>(
    config?.webSpeechApiVolume || 1,
  );

  return (
    <SettingsContainer>
      <SettingsHeader>{translate.menuPlayer.configurations}</SettingsHeader>
      <AccordionComponent
        items={[
          {
            title: translate.configuration.pluginSettings,
            content: (
              <div>
                <LabelControlWrapperComponent label={translate.configuration.selectPluginLanguage}>
                  <CustomSelectComponent
                    options={LANGUAGES.map(language => ({
                      value: language.language as string,
                      label: language.label,
                    }))}
                    placeholder="Selecione"
                    onChange={setPluginLanguageCode}
                    value={pluginLanguageCode}
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
                    checked={automaticallySendMessage}
                    onChange={setAutomaticallySendMessage}
                  />
                </LabelControlWrapperComponent>
                <LabelControlWrapperComponent label={translate.configuration.readCodeBlocksAloud}>
                  <CheckboxComponent
                    labels={{
                      labelOn: `(${translate.configuration.yes})`,
                      labelOff: `(${translate.configuration.no})`,
                    }}
                    checked={codeBlockIsRead}
                    onChange={setCodeBlockIsRead}
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
                    checked={useCommasAndSemicolonsToDivideSentences}
                    onChange={setUseCommasAndSemicolonsToDivideSentences}
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
                    onChange={setVoiceRecognitionLanguageCode}
                    value={voiceRecognitionLanguageCode}
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
                    checked={microphoneEchoCancellation}
                    onChange={setMicrophoneEchoCancellation}
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
                    checked={microphoneNoiseSuppression}
                    onChange={setMicrophoneNoiseSuppression}
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
                    checked={frequencyFiltersInSpeechRecognition}
                    onChange={setFrequencyFiltersInSpeechRecognition}
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
                    options={window?.speechSynthesis?.getVoices().map(voice => ({
                      value: voice.voiceURI,
                      label: voice.name,
                    }))}
                    onChange={setWebSpeechApiVoice}
                    value={webSpeechApiVoice}
                  />
                </LabelControlWrapperComponent>
                <LabelControlWrapperComponent
                  label={`${translate.configuration.speechRate} (${webSpeechApiSpeechRate})`}
                >
                  <SliderComponent
                    min={0.5}
                    max={3}
                    step={0.1}
                    value={webSpeechApiSpeechRate}
                    onChange={setWebSpeechApiSpeechRate}
                  />
                </LabelControlWrapperComponent>
                <LabelControlWrapperComponent
                  label={`${translate.configuration.voicePitch} (${webSpeechApiPitch})`}
                >
                  <SliderComponent
                    min={0}
                    max={2}
                    step={0.1}
                    value={webSpeechApiPitch}
                    onChange={setWebSpeechApiPitch}
                  />
                </LabelControlWrapperComponent>
                <LabelControlWrapperComponent
                  label={`${translate.configuration.voiceVolume} (${webSpeechApiVolume})`}
                >
                  <SliderComponent
                    min={0}
                    max={1}
                    step={0.1}
                    value={webSpeechApiVolume}
                    onChange={setWebSpeechApiVolume}
                  />
                </LabelControlWrapperComponent>
              </div>
            ),
          },
          {
            title: translate.configuration.advancedSpeechSynthesis,
            content: 'Nem aqui...',
          },
          { title: translate.configuration.voiceCommandsControl, content: 'Aqui piorou...' },
          { title: translate.configuration.keyboardShortcuts, content: 'Aff...' },
        ]}
      />
    </SettingsContainer>
  );
};

export default SystemSettingsComponent;
