import styled from 'styled-components';

export const WrapperMain = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: 1000px;
  min-height: 600px;

  background-color: ${({ theme }) => theme.COLORS.HIGHLIGHT};

  padding: 16px 16px 32px 0px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
