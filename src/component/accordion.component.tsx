import React, { useState } from 'react';
import styled from 'styled-components';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AccordionComponentProps {
  items: { title: string; content: React.ReactNode }[];
}

const AccordionContainer = styled.div`
  border: 1px solid #24282d;
  border-radius: 4px;
`;

const AccordionItem = styled.div`
  border-bottom: 1px solid #24282d;

  &:last-child {
    border-bottom: none;
  }
`;

const AccordionHeader = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: #2e3237;
  color: #e0e0e0;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #393e43;
  }

  svg {
    transition: transform 0.3s;
    transform: ${({ $isOpen }): string => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

const AccordionContent = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }): string => ($isOpen ? '500px' : '0')};
  overflow: ${({ $isOpen }): string => ($isOpen ? 'visible' : 'hidden')};
  padding: ${({ $isOpen }): string => ($isOpen ? '16px' : '0 16px')};
  color: #e0e0e0;
  background-color: #292b2d;
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
`;

const AccordionComponent: React.FC<AccordionComponentProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AccordionContainer>
      {items.map((item, index) => (
        <AccordionItem key={item.title}>
          <AccordionHeader $isOpen={openIndex === index} onClick={() => toggleItem(index)}>
            {item.title}
            <FontAwesomeIcon icon={faChevronDown} />
          </AccordionHeader>
          <AccordionContent $isOpen={openIndex === index}>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};

export default AccordionComponent;
