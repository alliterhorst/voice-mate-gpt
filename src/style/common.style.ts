import styled from 'styled-components';
import { Theme } from '../theme/theme';

const Divider = styled.div<{ theme: Theme }>`
  border-top: 1px solid ${(props): string => props.theme.colors.border};
`;

const ContainerColumn = styled.div<{ theme: Theme }>`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContainerRow = styled.div<{ theme: Theme }>`
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  padding: 6px;
`;

const VolumeBar = styled.div<{ theme: Theme; color?: string }>`
  background-color: ${({ color, theme }): string => color || theme.colors.backgroundBars};
  width: 4px;
  height: 16px;
  border-radius: ${(props): string => props.theme.borderRadius};
`;

export { Divider, ContainerColumn, ContainerRow, VolumeBar };
