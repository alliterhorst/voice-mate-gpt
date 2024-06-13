import React, { useCallback, useEffect, useState } from 'react';
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
import { translate } from '../interface/translate.interface';
import { theme } from '../theme/theme';

type Position = {
  right: number;
  top: number;
};

const defaultPosition: Position = { right: 16, top: 50 };

const DraggableCardComponent: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>(defaultPosition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!isDragging) return;

      setPosition((prevPosition: Position) => ({
        right: Math.max(0, prevPosition.right - e.movementX),
        top: Math.max(0, prevPosition.top + e.movementY),
      }));
    };

    const handleMouseUp = (): void => {
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

    return (): void => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const setDefaultPosition = useCallback((): void => {
    setPosition(defaultPosition);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', setDefaultPosition);
    return (): void => {
      window.removeEventListener('resize', setDefaultPosition);
    };
  }, [setDefaultPosition]);

  const startDrag = (): void => {
    setIsDragging(true);
  };

  return (
    <DraggableCardContainer style={{ top: `${position.top}px`, right: `${position.right}px` }}>
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
      <CardContent>{children}</CardContent>
    </DraggableCardContainer>
  );
};

export default DraggableCardComponent;
