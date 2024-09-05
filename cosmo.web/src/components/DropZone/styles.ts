import styled from 'styled-components';

export const WrapperDropZone = styled.div`
  width: 400px;
  height: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 16px;

  border: 1px dashed ${({ theme }) => theme.COLORS.GRAY_200};
  border-radius: 12px;

  transition: all 0.3s;
`;

export const Title = styled.label`
  font-size: 16px;
  font-weight: 300;

  color: ${({ theme }) => theme.COLORS.GRAY_200};
`;
