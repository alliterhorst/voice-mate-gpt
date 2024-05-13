import styled from 'styled-components';
import { Theme } from '../theme/theme';

const DraggableCardContainer = styled.div<{
  theme: Theme;
}>`
  font-family: ${props => props.theme.fontFamily};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  width: 300px;
  height: 100px;
  background-color: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  position: fixed;

  z-index: 1111;
`;

const CardHeader = styled.div<{ theme: Theme }>`
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  height: 40px;
`;

const DraggableHeader = styled.div<{ theme: Theme }>`
  display: flex;
  flex: 1;
  align-items: center;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const CardTitle = styled.div<{ theme: Theme }>`
  flex: auto;
  padding-top: 4px;
`;

const HeaderButton = styled.div<{ theme: Theme }>`
  margin: 0 8px;
  padding-top: 4px;
  cursor: pointer;
`;

const CardContent = styled.div<{ theme: Theme }>`
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export {
  DraggableCardContainer,
  CardHeader,
  DraggableHeader,
  CardTitle,
  HeaderButton,
  CardContent,
};
