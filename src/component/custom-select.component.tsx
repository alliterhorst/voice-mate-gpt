import React, { useState } from 'react';
import styled, { css, RuleSet } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface CustomSelectComponentProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const CustomSelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SelectButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 8px;
  padding-right: 32px;
  border: 1px solid #41596d;
  border-radius: 4px;
  background-color: #2f2f2f;
  color: #fff;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  position: relative;

  &:focus {
    border-color: #90caf9;
  }

  ${({ isOpen }): false | RuleSet =>
    isOpen &&
    css`
      border-color: #90caf9;
    `}
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #fff;
`;

const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #2f2f2f;
  border: 1px solid #41596d;
  color: #fff;
  border-radius: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const OptionItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #41596d;
  }
`;

const CustomSelectComponent: React.FC<CustomSelectComponentProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (selectedValue: string): void => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <CustomSelectWrapper>
      <SelectButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)}
      >
        {value ? options.find(option => option.value === value)?.label : placeholder}
        <IconWrapper>
          <FontAwesomeIcon icon={faChevronDown} />
        </IconWrapper>
      </SelectButton>
      {isOpen && (
        <OptionsList>
          {options.map(option => (
            <OptionItem key={option.value} onMouseDown={() => handleOptionClick(option.value)}>
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </CustomSelectWrapper>
  );
};

export default CustomSelectComponent;
