import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  padding: 4px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledCheckbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 8px;
  outline: none;
`;

interface CheckboxComponentProps {
  checked: boolean;
  onChange: (newValue: boolean) => void;
  labels?: {
    labelOn: string;
    labelOff: string;
  };
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({ checked, onChange, labels }) => (
  <CheckboxWrapper>
    <StyledCheckbox type="checkbox" checked={checked} onChange={() => onChange(!checked)} />
    {labels && <Label>{checked ? labels.labelOn : labels.labelOff}</Label>}
  </CheckboxWrapper>
);

export default CheckboxComponent;
