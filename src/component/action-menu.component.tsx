import React from 'react';
import {
  faCog,
  faForward,
  faMicrophone,
  faMicrophoneSlash,
  faPlay,
  faStop,
  faVolumeUp,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from './button.component';
import { usePlayerContext } from '../context/player.context';
import { translate } from '../interface/translate.interface';
import VariantEnum from '../enum/variant.enum';

const ActionMenuComponent: React.FC = () => {
  const {
    hasPlayerStarted,
    setHasPlayerStarted,
    isMicrophoneEnabled,
    setIsMicrophoneEnabled,
    isTextToSpeechEnabled,
    setIsTextToSpeechEnabled,
    isOpenSettingsMenu,
    setIsOpenSettingsMenu,
  } = usePlayerContext();

  return (
    <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'space-evenly' }}>
      <ButtonComponent
        onClick={() => setHasPlayerStarted(!hasPlayerStarted)}
        $configButton={[
          {
            uniqueId: '1',
            alt: translate.menuPlayer.start,
            label: translate.menuPlayer.start,
            icon: faPlay,
            variant: VariantEnum.PRIMARY,
          },
          {
            uniqueId: '2',
            alt: translate.menuPlayer.stop,
            label: translate.menuPlayer.stop,
            icon: faStop,
            variant: VariantEnum.CANCEL,
          },
        ]}
        $currentUniqueId={hasPlayerStarted ? '2' : '1'}
      />
      <ButtonComponent
        onClick={() => setIsMicrophoneEnabled(!isMicrophoneEnabled)}
        $configButton={[
          {
            uniqueId: '1',
            alt: translate.menuPlayer.voiceRecognitionEnabled,
            icon: faMicrophone,
            variant: VariantEnum.PRIMARY,
          },
          {
            uniqueId: '2',
            alt: translate.menuPlayer.voiceRecognitionDisabled,
            icon: faMicrophoneSlash,
            variant: VariantEnum.CANCEL,
          },
        ]}
        $currentUniqueId={isMicrophoneEnabled ? '1' : '2'}
      />
      <ButtonComponent
        onClick={() => setIsTextToSpeechEnabled(!isTextToSpeechEnabled)}
        $configButton={[
          {
            uniqueId: '1',
            alt: translate.menuPlayer.textToSpeechEnabled,
            variant: VariantEnum.PRIMARY,
            icon: faVolumeUp,
          },
          {
            uniqueId: '2',
            alt: translate.menuPlayer.textToSpeechDisabled,
            variant: VariantEnum.CANCEL,
            icon: faVolumeXmark,
          },
        ]}
        $currentUniqueId={isTextToSpeechEnabled ? '1' : '2'}
      />
      <ButtonComponent
        onClick={() => console.log(translate.menuPlayer.skipMessage)}
        $configButton={{
          alt: translate.menuPlayer.skipMessage,
          variant: VariantEnum.PRIMARY,
          icon: faForward,
        }}
      />
      <ButtonComponent
        onClick={() => setIsOpenSettingsMenu(!isOpenSettingsMenu)}
        $configButton={{
          alt: translate.menuPlayer.openSettingsMenu,
          variant: VariantEnum.PRIMARY,
          icon: faCog,
        }}
      />
    </div>
  );
};

export default ActionMenuComponent;
