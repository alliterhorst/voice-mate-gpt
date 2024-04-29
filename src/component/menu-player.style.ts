import styled from 'styled-components';

interface DraggablePlayerProps {
  position: {
    top: number;
    right: number;
  };
}

const DraggablePlayer = styled.div<DraggablePlayerProps>`
  position: fixed;
  top: ${(props) => props.position.top}px;
  right: ${(props) => props.position.right}px;
  display: inline-block;
  background: #41464cdd;
  color: white;
  padding: 0;
  font-size: 14px;
  border-radius: 4px;
  text-align: center;
  cursor: grab;
  font-weight: bold;
  z-index: 1111;
`;

const TitleBar = styled.div`
  padding: 4px 30px;
  border-bottom: 1px solid grey;
`;

const CustomLink = styled.a`
  display: inline-block;
  font-size: 16px;
  line-height: 80%;
  padding: 4px 0;
`;

const TextDiv = styled.div`
  text-align: right;
  font-size: 11px;
  color: grey;
`;

const Section = styled.div`
  font-size: 14px;
  padding: 6px;
`;

const Button = styled.button`
  border: 2px solid grey;
  padding: 3px 30px;
  margin: 4px;
  border-radius: 4px;
  opacity: 0.7;
`;

const ActionButtonSection = styled.div`
  font-size: 16px;
  padding: 8px 4px;
  padding-bottom: 0px;
`;

interface IconSpanProps {
  isActive: boolean;
}

const IconSpan = styled.span<IconSpanProps>`
  opacity: 0.7;
  color: ${(props) => (props.isActive ? 'inherit' : 'red')};
`;

const StatusDiv = styled.div`
  background: grey;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
`;

const SuspendedArea = styled.div`
  display: none;
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const MenuPlayerStyle = {
  DraggablePlayer,
  TitleBar,
  CustomLink,
  TextDiv,
  Section,
  Button,
  ActionButtonSection,
  IconSpan,
  StatusDiv,
  SuspendedArea,
};
