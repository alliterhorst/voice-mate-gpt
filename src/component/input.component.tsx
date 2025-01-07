import React from 'react';
import styled, { css, RuleSet } from 'styled-components';

interface InputComponentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isFilled?: boolean;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input<{ isFilled: boolean }>`
  padding: 8px 8px;
  border: 1px solid #41596d;
  border-radius: 4px;
  background-color: #2f2f2f;
  outline: none;
  font-size: 16px;
  width: 100%;

  &:focus {
    border-color: #90caf9;
  }

  ${({ isFilled }): false | RuleSet =>
    isFilled &&
    css`
      border-color: #41596d;
    `}
`;

const InputComponent: React.FC<InputComponentProps> = ({
  value,
  onChange,
  placeholder = '',
  isFilled = false,
}) => (
  <InputWrapper>
    <StyledInput
      value={value}
      onChange={onChange}
      isFilled={Boolean(value) || isFilled}
      placeholder={placeholder}
    />
  </InputWrapper>
);

export default InputComponent;
