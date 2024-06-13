import React, { useEffect, useState } from 'react';
import { ContainerRow, VolumeBar } from '../style/common.style';
import { generateGradient } from '../common/utils.common';

interface VolumeBarsProps {
  startColor: string;
  endColor: string;
  steps: number;
  currentVolume: number;
}

const VolumeBarsComponent: React.FC<VolumeBarsProps> = ({
  startColor,
  endColor,
  steps,
  currentVolume,
}) => {
  const [colors, setColors] = useState<string[]>([]);

  useEffect((): void => {
    const gradientColors = generateGradient(startColor, endColor, steps);
    setColors(gradientColors);
  }, [startColor, endColor, steps]);

  return (
    <ContainerRow>
      {colors.map((color, index) => (
        <VolumeBar
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          color={index < Math.ceil((currentVolume / 30) * steps) ? color : undefined}
        />
      ))}
    </ContainerRow>
  );
};

export default VolumeBarsComponent;
