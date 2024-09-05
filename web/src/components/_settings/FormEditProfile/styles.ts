import styled from 'styled-components';

export const WrapperForm = styled.div`
  width: 400px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
`;

export const GroupWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;

  :nth-child(2) {
    max-width: 100px;
  }
`;
