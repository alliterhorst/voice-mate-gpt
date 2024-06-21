import React, { useEffect, useState } from 'react';
import { ContainerRow, VolumeBar } from '../style/common.style';
import { generateGradient } from '../common/utils.common';
import RecognitionEventEnum from '../enum/recognition-event.enum';

interface VolumeBarsProps {
  startColor: string;
  endColor: string;
  steps: number;
}

const VolumeBarsComponent: React.FC<VolumeBarsProps> = ({ startColor, endColor, steps }) => {
  const [colors, setColors] = useState<string[]>([]);
  const [volume, setVolume] = useState<number>(0);

  useEffect(() => {
    const handleStateChange = (
      service: typeof window.SpeechRecognitionService,
      recognitionEventEnum: RecognitionEventEnum,
    ): void => {
      if (recognitionEventEnum === RecognitionEventEnum.UPDATE_MICROPHONE_VOLUME) {
        setVolume(service.getMicrophoneVolume());
      }
    };

    window.SpeechRecognitionService.subscribe(handleStateChange, [
      RecognitionEventEnum.UPDATE_MICROPHONE_VOLUME,
    ]);
    return (): void => {
      window.SpeechRecognitionService.unsubscribe(handleStateChange);
    };
  }, []);

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
          color={index < Math.ceil((volume / 30) * steps) ? color : undefined}
        />
      ))}
    </ContainerRow>
  );
};

export default VolumeBarsComponent;
