import React, { createContext, useContext, useState } from 'react';
import { throwContextError } from '../common/utils.common';

const businessContext = 'Player';

interface PlayerContextInterface {
  hasPlayerStarted: boolean;
  setHasPlayerStarted: (hasPlayerStarted: boolean) => void;
  isMicrophoneEnabled: boolean;
  setIsMicrophoneEnabled: (isMicrophoneEnabled: boolean) => void;
  isTextToSpeechEnabled: boolean;
  setIsTextToSpeechEnabled: (isTextToSpeechEnabled: boolean) => void;
  isOpenSettingsMenu: boolean;
  setIsOpenSettingsMenu: (isOpenSettingsMenu: boolean) => void;
}

const PlayerContext = createContext<PlayerContextInterface | null>(null);

export function PlayerProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [hasPlayerStarted, setHasPlayerStarted] = useState<boolean>(true);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState<boolean>(true);
  const [isTextToSpeechEnabled, setIsTextToSpeechEnabled] = useState<boolean>(true);
  const [isOpenSettingsMenu, setIsOpenSettingsMenu] = useState<boolean>(false);

  return (
    <PlayerContext.Provider
      value={{
        hasPlayerStarted,
        setHasPlayerStarted,
        isMicrophoneEnabled,
        setIsMicrophoneEnabled,
        isTextToSpeechEnabled,
        setIsTextToSpeechEnabled,
        isOpenSettingsMenu,
        setIsOpenSettingsMenu,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext(): PlayerContextInterface {
  const context = useContext(PlayerContext);
  if (!context) throwContextError(businessContext);
  return context as PlayerContextInterface;
}
