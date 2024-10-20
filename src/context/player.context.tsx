import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { throwContextError } from '../common/utils.common';
import AudioStatusEnum from '../enum/audio-status.enum';
import DOMManipulationEventEnum from '../enum/dom-manipulation-event.enum';

const businessContext = 'Player';

interface PlayerContextInterface {
  hasPlayerStarted: boolean;
  startPlayer: () => void;
  isMicrophoneEnabled: boolean;
  setIsMicrophoneEnabled: (isMicrophoneEnabled: boolean) => void;
  isTextToSpeechEnabled: boolean;
  setIsTextToSpeechEnabled: (isTextToSpeechEnabled: boolean) => void;
  isOpenSettingsMenu: boolean;
  setIsOpenSettingsMenu: (isOpenSettingsMenu: boolean) => void;
  audioStatus: AudioStatusEnum;
  setAudioStatus: (audioStatus: AudioStatusEnum) => void;
}

const PlayerContext = createContext<PlayerContextInterface | null>(null);

export function PlayerProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [hasPlayerStarted, setHasPlayerStarted] = useState<boolean>(false);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState<boolean>(false);
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState<boolean>(false);
  const [isOpenSettingsMenu, setIsOpenSettingsMenu] = useState<boolean>(false);
  const [audioStatus, setAudioStatus] = useState<AudioStatusEnum>(AudioStatusEnum.STOPPED);

  const startPlayer = useCallback(() => {
    setHasPlayerStarted(true);
    setIsMicrophoneEnabled(true);
    setIsTextToSpeechEnabled(true);
  }, []);

  useEffect(() => {
    const handleAudioStatusChange = (
      service: typeof window.VoiceMateGPT.DOMManipulationService,
      domManipulationEventEnum: DOMManipulationEventEnum,
    ): void => {
      switch (domManipulationEventEnum) {
        case DOMManipulationEventEnum.AUDIO_PLAYING:
          setAudioStatus(AudioStatusEnum.PLAYING);
          break;
        case DOMManipulationEventEnum.AUDIO_STOPPED:
          setAudioStatus(AudioStatusEnum.STOPPED);
          break;
        default:
          console.info('Other DOM Manipulation Event:', domManipulationEventEnum);
          break;
      }
    };

    window.VoiceMateGPT.DOMManipulationService.subscribe(handleAudioStatusChange, [
      DOMManipulationEventEnum.AUDIO_PLAYING,
      DOMManipulationEventEnum.AUDIO_STOPPED,
    ]);
    return (): void => {
      window.VoiceMateGPT.DOMManipulationService.unsubscribe(handleAudioStatusChange);
    };
  }, []);

  const value = useMemo<PlayerContextInterface>(
    () => ({
      hasPlayerStarted,
      startPlayer,
      isMicrophoneEnabled,
      setIsMicrophoneEnabled,
      isTextToSpeechEnabled,
      setIsTextToSpeechEnabled,
      isOpenSettingsMenu,
      setIsOpenSettingsMenu,
      audioStatus,
      setAudioStatus,
    }),
    [
      hasPlayerStarted,
      startPlayer,
      isMicrophoneEnabled,
      isTextToSpeechEnabled,
      isOpenSettingsMenu,
      audioStatus,
    ],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayerContext(): PlayerContextInterface {
  const context = useContext(PlayerContext);
  if (!context) throwContextError(businessContext);
  return context as PlayerContextInterface;
}
