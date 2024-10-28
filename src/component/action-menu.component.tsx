import React from 'react';
import {
  faCog,
  faForward,
  faMicrophone,
  faMicrophoneSlash,
  faPlay,
  faVolumeUp,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from './button.component';
import { usePlayerContext } from '../context/player.context';
import { translate } from '../interface/translate.interface';
import VariantEnum from '../enum/variant.enum';
import { ContainerColumn, ContainerRow, Divider } from '../style/common.style';
import VolumeBarsComponent from './volume-bars.component';

const ActionMenuComponent: React.FC = () => {
  const {
    hasPlayerStarted,
    startPlayer,
    isMicrophoneEnabled,
    setIsMicrophoneEnabled,
    isTextToSpeechEnabled,
    setIsTextToSpeechEnabled,
    isOpenSettingsMenu,
    setIsOpenSettingsMenu,
    skipMessage,
  } = usePlayerContext();

  return (
    <ContainerColumn>
      <ContainerRow>
        {!hasPlayerStarted && (
          <ButtonComponent
            onClick={() => startPlayer()}
            $configButton={{
              alt: translate.menuPlayer.start,
              label: translate.menuPlayer.start,
              icon: faPlay,
              variant: VariantEnum.PRIMARY,
            }}
          />
        )}
        {hasPlayerStarted && (
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
        )}
        {hasPlayerStarted && (
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
        )}
        {hasPlayerStarted && (
          <ButtonComponent
            onClick={skipMessage}
            $configButton={{
              alt: translate.menuPlayer.skipMessage,
              variant: VariantEnum.PRIMARY,
              icon: faForward,
            }}
          />
        )}
        <ButtonComponent
          onClick={() => setIsOpenSettingsMenu(!isOpenSettingsMenu)}
          $configButton={{
            alt: translate.menuPlayer.openSettingsMenu,
            variant: VariantEnum.PRIMARY,
            icon: faCog,
            ...(hasPlayerStarted ? {} : { label: translate.menuPlayer.configurations }),
          }}
        />
      </ContainerRow>
      {isMicrophoneEnabled && <Divider />}
      {isMicrophoneEnabled && (
        <VolumeBarsComponent startColor="#E0B44B" endColor="#00FF00" steps={30} />
      )}
    </ContainerColumn>
  );
};

export default ActionMenuComponent;
