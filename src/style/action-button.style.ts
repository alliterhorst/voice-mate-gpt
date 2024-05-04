import styled from 'styled-components';
import { Theme } from '../theme/theme';

const ActionButton = styled.button<{ theme: Theme }>`
  height: 40px;
  width: 40px;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 50%;
  border: none;
  color: ${(props) => props.theme.colors.text};
  font-size: 24px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
    background-color: ${(props) => props.theme.colors.hover};
  }

  &:focus {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const BaseButton = styled.button<{ theme: Theme }>`
  background-color: ${(props) => props.theme.colors.background};
  border: none;
  color: ${(props) => props.theme.colors.text};
  font-size: 24px;
  cursor: pointer;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
    background-color: ${(props) => props.theme.colors.hover};
  }

  &:focus {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const IconButton = styled(BaseButton)`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;

export { ActionButton };
