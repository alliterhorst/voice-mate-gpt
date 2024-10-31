import React from 'react';
import styled from 'styled-components';

interface LabelControlWrapperProps {
  label: string;
  children: React.ReactNode;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
  padding: 8px;
`;

const Label = styled.label`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  padding: 8px;
`;

const ControlContainer = styled.div`
  flex: 1;
  padding: 8px;
`;

const LabelControlWrapperComponent: React.FC<LabelControlWrapperProps> = ({ label, children }) => (
  <Wrapper>
    <Label>{label}</Label>
    <ControlContainer>{children}</ControlContainer>
  </Wrapper>
);

export default LabelControlWrapperComponent;
