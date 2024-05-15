import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { throwContextError } from '../common/utils.common';

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
}

const PlayerContext = createContext<PlayerContextInterface | null>(null);

export function PlayerProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [hasPlayerStarted, setHasPlayerStarted] = useState<boolean>(false);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState<boolean>(false);
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState<boolean>(false);
  const [isOpenSettingsMenu, setIsOpenSettingsMenu] = useState<boolean>(false);

  const startPlayer = useCallback(() => {
    setHasPlayerStarted(true);
    setIsMicrophoneEnabled(true);
    setIsTextToSpeechEnabled(true);
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
    }),
    [hasPlayerStarted, startPlayer, isMicrophoneEnabled, isTextToSpeechEnabled, isOpenSettingsMenu],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayerContext(): PlayerContextInterface {
  const context = useContext(PlayerContext);
  if (!context) throwContextError(businessContext);
  return context as PlayerContextInterface;
}
