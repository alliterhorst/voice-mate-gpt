import React from 'react';
import styled, { css, RuleSet } from 'styled-components';

interface SelectComponentProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  isFilled?: boolean;
}

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select<{ isFilled: boolean }>`
  padding: 8px 8px;
  border: 1px solid #41596d;
  border-radius: 4px;
  background-color: #2f2f2f;
  outline: none;
  font-size: 16px;
  width: 100%;
  color: #fff;

  &:focus {
    border-color: #90caf9;
  }

  ${({ isFilled }): false | RuleSet =>
    isFilled &&
    css`
      border-color: #41596d;
    `}
`;

const Option = styled.option`
  background-color: #2f2f2f;
  color: #fff;
  padding: 18px;
`;

const SelectComponent: React.FC<SelectComponentProps> = ({
  value,
  onChange,
  options,
  placeholder = '',
  isFilled = false,
}) => (
  <SelectWrapper>
    <StyledSelect value={value} onChange={onChange} isFilled={Boolean(value) || isFilled}>
      {placeholder && !value && (
        <Option value="" disabled hidden>
          {placeholder}
        </Option>
      )}
      {options.map(option => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </StyledSelect>
  </SelectWrapper>
);

export default SelectComponent;
