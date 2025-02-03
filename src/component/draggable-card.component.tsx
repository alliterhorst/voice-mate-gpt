import React, { useCallback, useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import {
  CardContent,
  CardHeader,
  CardTitle,
  DraggableCardContainer,
  DraggableHeader,
} from '../style/draggable-card.style';
import ConfigEnum from '../enum/config.enum';
import { theme } from '../theme/theme';
import { useOptionContext } from '../context/option.context';
import { usePlayerContext } from '../context/player.context';
import ModalComponent from './modal.component';
import SystemSettingsComponent from './system-settings.component';

type Position = {
  left: number;
  top: number;
};

const defaultPosition: Position = { left: Math.max(0, window.innerWidth - 300), top: 50 };

const DraggableCardComponent: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  const {
    systemLanguageConfig: { translate },
  } = useOptionContext();
  const { isOpenSettingsMenu, setIsOpenSettingsMenu } = usePlayerContext();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>(defaultPosition);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const disableUserSelect = (): void => {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
    };

    const enableUserSelect = (): void => {
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };

    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const newLeft = Math.min(
        Math.max(0, position.left + e.movementX),
        window.innerWidth - rect.width,
      );
      const newTop = Math.min(
        Math.max(0, position.top + e.movementY),
        window.innerHeight - rect.height,
      );
      setPosition({ left: newLeft, top: newTop });
    };

    const handleMouseUp = (): void => {
      setIsDragging(false);
      enableUserSelect();
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      disableUserSelect();
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return (): void => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  const setDefaultPosition = useCallback((): void => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        left: Math.min(Math.max(0, window.innerWidth - rect.width), window.innerWidth - 300),
        top: Math.min(Math.max(0, defaultPosition.top), window.innerHeight - rect.height),
      });
    }
  }, []);

  useEffect(() => {
    setDefaultPosition();
    window.addEventListener('resize', setDefaultPosition);
    return (): void => {
      window.removeEventListener('resize', setDefaultPosition);
    };
  }, [setDefaultPosition]);

  const startDrag = (e: React.MouseEvent): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <DraggableCardContainer
      ref={cardRef}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      <CardHeader>
        <DraggableHeader onMouseDown={startDrag}>
          <FontAwesomeIcon
            style={{ position: 'relative', left: '8px', marginRight: '-10px', height: '16px' }}
            icon={faGripHorizontal}
          />
          <CardTitle>{title}</CardTitle>
        </DraggableHeader>
        <a
          aria-label={translate.menuPlayer.visitProjectWebsite}
          href={ConfigEnum.GIT_URL}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            style={{
              position: 'relative',
              left: '-10px',
              top: '10px',
              height: '16px',
              color: theme.colors.text,
            }}
            icon={faArrowUpRightFromSquare}
          />
        </a>
      </CardHeader>
      <CardContent>
        <ModalComponent onClose={() => setIsOpenSettingsMenu(false)} $isOpen={isOpenSettingsMenu}>
          <SystemSettingsComponent onSettingsClose={() => setIsOpenSettingsMenu(false)} />
        </ModalComponent>
        {children}
      </CardContent>
    </DraggableCardContainer>
  );
};

export default DraggableCardComponent;
