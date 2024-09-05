import styled from 'styled-components';

export const WrapperCreate = styled.div`
  width: 430px;
  height: max-content;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  flex-direction: column;
  gap: 24px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  padding: 16px;
  border-radius: 12px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 4px 0px;
`;

export const WrapperForm = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 24px 0px;

  gap: 16px;
`;
