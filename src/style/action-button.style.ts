import styled from 'styled-components';
import { Theme } from '../theme/theme';
import VariantEnum from '../enum/variant.enum';

const ActionButton = styled.button<{ theme: Theme; $variant: VariantEnum; $hasLabel?: boolean }>`
  height: 40px;
  width: ${props => (props.$hasLabel ? 'auto' : '40px')};
  background-color: ${props => {
    switch (props.$variant) {
      case VariantEnum.PRIMARY:
        return props.theme.colors.primary;
      case VariantEnum.CANCEL:
        return props.theme.colors.cancel;
      default:
        return '';
    }
  }};
  border-radius: ${props => (props.$hasLabel ? props.theme.borderRadius : '50%')};
  padding: 10px;
  border: none;
  color: ${props => props.theme.colors.text};
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
    background-color: ${props => {
      switch (props.$variant) {
        case VariantEnum.PRIMARY:
          return props.theme.colors.primaryHover;
        case VariantEnum.CANCEL:
          return props.theme.colors.cancelHover;
        default:
          return '';
      }
    }};
    ${props => props.theme.colors.hover};
  }

  &:focus {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

export default ActionButton;
