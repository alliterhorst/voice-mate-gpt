import React, { useEffect, useState } from 'react';
import {
  CardContent,
  CardHeader,
  CardTitle,
  DraggableCardContainer,
  DraggableHeader,
  HeaderButton,
} from '../style/draggable-card.style';

type Position = {
  right: number;
  top: number;
};

const DraggableCard: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ right: 16, top: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      setPosition((prevPosition: Position) => ({
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

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const startDrag = () => {
    setIsDragging(true);
  };

  return (
    <DraggableCardContainer style={{ top: `${position.top}px`, right: `${position.right}px` }}>
      <CardHeader>
        <DraggableHeader onMouseDown={startDrag}>
          <HeaderButton>:::</HeaderButton>
          <CardTitle>{title}</CardTitle>
        </DraggableHeader>
        <HeaderButton>x</HeaderButton>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </DraggableCardContainer>
  );
};

export default DraggableCard;
