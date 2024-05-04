import React, { useCallback, useEffect, useState } from 'react';
import { IdentifierEnum } from '../enum/identifier.enum';
import { ConfigEnum } from '../enum/config.enum';
import { translate } from '../interface/translate.interface';
import { usePlayerContext } from '../context/player.context';

type Position = {
  right: number;
  top: number;
};

const MenuPlayerComponent: React.FC = () => {
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
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ right: 16, top: 50 });

  // Atualiza os manipuladores para lidar com o arrasto no nível do documento
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      // Calcula a nova posição com base na posição do mouse no documento
      setPosition((prevPosition) => ({
        right: Math.max(0, prevPosition.right - e.movementX),
        top: Math.max(0, prevPosition.top + e.movementY),
      }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.cursor = '';
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      document.body.style.cursor = 'grabbing';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    // Limpa os event listeners quando o componente desmontar
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const startDrag = () => {
    setIsDragging(true);
  };

  return (
    <div
      id={IdentifierEnum.PLAYER_COMPONENT_ID}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        right: `${position.right}px`,
        display: 'inline-block',
        background: '#41464cDD',
        color: 'white',
        padding: 0,
        fontSize: '14px',
        borderRadius: '4px',
        textAlign: 'center',
        cursor: 'grab',
        fontWeight: 'bold',
        zIndex: 1111,
      }}
      onMouseDown={startDrag}
    >
      <div style={{ padding: '4px 30px', borderBottom: '1px solid grey' }}>
        <a
          href={ConfigEnum.GIT_URL}
          style={{ display: 'inline-block', fontSize: '16px', lineHeight: '80%', padding: '4px 0' }}
          target="_blank"
          rel="noopener noreferrer"
          title={translate.menuPlayer.visitProjectWebsite}
        >
          {ConfigEnum.PROJECT_NAME}
          <br />
          <div style={{ textAlign: 'right', fontSize: '11px', color: 'grey' }}>
            {ConfigEnum.VERSION}
          </div>
        </a>
      </div>
      <div>
        <div
          style={{ fontSize: '14px', padding: '6px' }}
          className={IdentifierEnum.PLAYER_COMPONENT_START_ZONE_CN}
        >
          <button
            style={{
              border: '2px solid grey',
              padding: '3px 30px',
              margin: '4px',
              borderRadius: '4px',
              opacity: 0.7,
            }}
            id={IdentifierEnum.PLAYER_COMPONENT_START_BUTTON_ID}
            title={ConfigEnum.SHORTCUT_START}
          >
            <i className="fa fa-play"></i>&nbsp;&nbsp;{translate.menuPlayer.start}
          </button>
        </div>
        <div
          style={{ fontSize: '16px', padding: '8px 4px', paddingBottom: '0px' }}
          className={IdentifierEnum.PLAYER_COMPONENT_ACTION_BUTTONS_CN}
        >
          <table width="100%" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td width="24%" style={{ textAlign: 'center' }}>
                  <span
                    onClick={() => setIsMicrophoneEnabled(!isMicrophoneEnabled)}
                    title={
                      (isMicrophoneEnabled
                        ? translate.menuPlayer.voiceRecognitionEnabled
                        : translate.menuPlayer.voiceRecognitionDisabled) +
                      ConfigEnum.SHORTCUT_MICROPHONE
                    }
                    style={{ opacity: 0.7, ...(isMicrophoneEnabled ? {} : { color: 'red' }) }}
                  >
                    <i
                      className={`fa ${
                        isMicrophoneEnabled ? 'fa-microphone' : 'fa-microphone-slash'
                      }`}
                    ></i>
                  </span>
                </td>
                <td
                  width="1%"
                  style={{
                    borderLeft: '1px solid grey',
                    paddingLeft: 0,
                    paddingRight: 0,
                    fontSize: '1px',
                    width: '1px',
                  }}
                >
                  &nbsp;
                </td>
                <td width="24%" style={{ textAlign: 'center' }}>
                  <span
                    onClick={() => setIsTextToSpeechEnabled(!isTextToSpeechEnabled)}
                    title={
                      (isTextToSpeechEnabled
                        ? translate.menuPlayer.textToSpeechEnabled
                        : translate.menuPlayer.textToSpeechDisabled) +
                      ConfigEnum.SHORTCUT_TEXT_TO_SPEAK
                    }
                    style={{ opacity: 0.7, ...(isTextToSpeechEnabled ? {} : { color: 'red' }) }}
                  >
                    <i
                      className={`fa ${isTextToSpeechEnabled ? 'fa-volume-up' : 'fa-volume-off'}`}
                    ></i>
                  </span>
                </td>
                <td
                  width="1%"
                  style={{
                    borderLeft: '1px solid grey',
                    paddingLeft: 0,
                    paddingRight: 0,
                    fontSize: '1px',
                    width: '1px',
                  }}
                >
                  &nbsp;
                </td>
                <td width="24%" style={{ textAlign: 'center' }}>
                  <span
                    title={`${translate.menuPlayer.skipMessage} ${ConfigEnum.SHORTCUT_SKIP_READ_MESSAGE}`}
                    style={{ opacity: 0.7 }}
                  >
                    <i className="fa fa-forward"></i>
                  </span>
                </td>
                <td
                  width="1%"
                  style={{
                    borderLeft: '1px solid grey',
                    paddingLeft: 0,
                    paddingRight: 0,
                    fontSize: '1px',
                    width: '1px',
                  }}
                >
                  &nbsp;
                </td>
                <td width="24%" style={{ textAlign: 'center' }}>
                  <span
                    onClick={() => setIsOpenSettingsMenu(!isOpenSettingsMenu)}
                    title={translate.menuPlayer.openSettingsMenu}
                    style={{ opacity: 0.7 }}
                  >
                    <i className="fa fa-cogs"></i>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ paddingTop: '12px', paddingBottom: '6px' }}>
            <div
              id={IdentifierEnum.PLAYER_COMPONENT_STATUS_BAR_ID}
              style={{
                background: 'grey',
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              &nbsp;
            </div>
          </div>
          <div
            style={{ paddingTop: '12px', paddingBottom: '12px', display: 'none' }}
            id={IdentifierEnum.PLAYER_COMPONENT_SUSPENDED_AREA_ID}
          >
            <div style={{ fontSize: '11px', color: 'grey' }}>
              <b>{translate.menuPlayer.conversationPaused}</b>
              <br />
              {translate.menuPlayer.clickButtonBelowOrSpeakThePauseWordToResume}
            </div>
            <div style={{ padding: '10px' }}>
              <button
                style={{
                  fontSize: '13px',
                  border: '2px solid grey',
                  padding: '6px 40px',
                  margin: '6px',
                  borderRadius: '6px',
                  opacity: 0.7,
                }}
                id={IdentifierEnum.PLAYER_COMPONENT_RESUME_BUTTON_ID}
              >
                <i className="fa fa-play"></i>&nbsp;&nbsp;{translate.menuPlayer.resume}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPlayerComponent;
