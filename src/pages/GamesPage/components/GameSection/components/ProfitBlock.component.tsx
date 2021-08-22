import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    align-items: center;
  }
`;
const Label = styled.div`
  text-transform: uppercase;
  display: block;
  font-size: 14px;
  line-height: 19px;
  color: #80a2cc;
  user-select: none;
  margin: 0;
`;

const Value = styled.div``;

interface Props {
  label: React.ReactNode;
  value: React.ReactNode;
}

export const ProfitBlock: React.FC<Props> = ({ label, value }) => (
  <Container>
    <Label>{label}</Label>
    <Value>{value}</Value>
  </Container>
);
