import React from 'react';
import styled, { keyframes } from 'styled-components';
import Keyframes from 'styled-components/dist/models/Keyframes';

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50px);
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ $isOpen }): Keyframes => ($isOpen ? fadeIn : fadeOut)} 0.3s ease;
  visibility: ${({ $isOpen }): string => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }): number => ($isOpen ? 1 : 0)};
  transition:
    visibility 0.3s,
    opacity 0.3s;
`;

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  background: ${(props): string => props.theme.colors.background};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 90%;
  max-width: 90%;
  overflow: auto;
  animation: ${({ $isOpen }): Keyframes => ($isOpen ? slideIn : slideOut)} 0.3s ease;
`;

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      <ModalContainer $isOpen={isOpen} onClick={e => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default ModalComponent;
