import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getMaxDecimalPlaces } from '../common/utils.common';

interface SliderComponentProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  valueLabelDisplay?: 'off' | 'on' | 'auto';
}

const SliderWrapper = styled.div`
  padding: 10px 12px 0 12px;
  min-width: 100px;
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

const SliderTrack = styled.div`
  position: relative;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background-color: #41596d;
`;

const SliderFilledTrack = styled.div<{ value: number; min: number; max: number }>`
  position: absolute;
  height: 8px;
  border-radius: 4px;
  background-color: #90caf9;
  width: ${({ value, min, max }): string => `${((value - min) / (max - min)) * 100}%`};
`;

const SliderThumb = styled.div<{ value: number; min: number; max: number }>`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background-color: #90caf9;
  border-radius: 50%;
  cursor: pointer;
  left: ${({ value, min, max }): string => `${((value - min) / (max - min)) * 100}%`};
`;

const Tooltip = styled.div<{ value: number; min: number; max: number }>`
  position: absolute;
  bottom: 20px;
  left: ${({ value, min, max }): string => `${((value - min) / (max - min)) * 100}%`};
  transform: translateX(-50%);
  padding: 4px 8px;
  background-color: #616161;
  color: #ffffff;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
`;

const SliderComponent: React.FC<SliderComponentProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  valueLabelDisplay = 'auto',
}): JSX.Element => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [showValueLabelDisplay, setShowValueLabelDisplay] = useState<boolean>(
    valueLabelDisplay === 'on',
  );
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const maxDecimalPlaces = getMaxDecimalPlaces([min, max, step]);

  useEffect(() => {
    if (['on', 'off'].includes(valueLabelDisplay)) return;
    setShowValueLabelDisplay(isHovering);
  }, [isHovering, valueLabelDisplay]);

  const disableUserSelect = (): void => {
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  };

  const enableUserSelect = (): void => {
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
  };

  const handleMouseDown = (): void => {
    setIsDragging(true);
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const newValue = Math.min(
      Math.max(min, ((e.clientX - rect.left) / rect.width) * (max - min) + min),
      max,
    );
    onChange(Math.round(newValue / step) * step);

    const displayValue = newValue.toFixed(maxDecimalPlaces);

    onChange(Number(displayValue));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return (): void => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <SliderWrapper>
      <SliderContainer
        ref={sliderRef}
        onMouseEnter={() => {
          setIsHovering(true);
          disableUserSelect();
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          enableUserSelect();
        }}
      >
        <SliderTrack>
          <SliderFilledTrack value={value} min={min} max={max} />
          <SliderThumb value={value} min={min} max={max} onMouseDown={handleMouseDown} />
          {showValueLabelDisplay && (
            <Tooltip value={value} min={min} max={max}>
              {value}
            </Tooltip>
          )}
        </SliderTrack>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ width: '100%', position: 'absolute', opacity: 0, cursor: 'pointer' }}
        />
      </SliderContainer>
    </SliderWrapper>
  );
};

export default SliderComponent;
