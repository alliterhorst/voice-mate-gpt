import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ActionButton from '../style/action-button.style';
import VariantEnum from '../enum/variant.enum';

interface ConfigButtonInterface {
  uniqueId?: string;
  label?: string;
  alt: string;
  icon?: IconProp;
  variant: VariantEnum;
}

interface ButtonComponentProps {
  $configButton: ConfigButtonInterface | ConfigButtonInterface[];
  $currentUniqueId?: string;
  onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  $configButton,
  $currentUniqueId,
  onClick,
}) => {
  const currentConfig: ConfigButtonInterface =
    $configButton instanceof Array
      ? $configButton.find(config => config.uniqueId === $currentUniqueId) || $configButton[0]
      : $configButton;
  return (
    <ActionButton
      $variant={currentConfig.variant}
      onClick={onClick}
      title={currentConfig.alt}
      $hasLabel={!!currentConfig.label}
    >
      {currentConfig.icon && (
        <FontAwesomeIcon icon={currentConfig.icon} style={{ height: '18px' }} />
      )}
      {!!currentConfig.label && (
        <span style={{ marginLeft: '8px', fontSize: '14px', fontWeight: 'bold' }}>
          {currentConfig.label}
        </span>
      )}
    </ActionButton>
  );
};

export default ButtonComponent;
