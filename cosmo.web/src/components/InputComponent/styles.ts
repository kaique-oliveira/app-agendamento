import styled, { css } from 'styled-components';

export const WrapperInput = styled.div`
  width: 100%;
  height: 36px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  position: relative;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};

  transition: all 0.2s;
  cursor: text;
  border-radius: 10px;

  &:focus-within {
    ${({ theme }) =>
      css`
        border-color: ${theme.COLORS.ACCENT_200};

        div svg path {
          stroke: ${theme.COLORS.ACCENT_200};
        }
      `}
  }

  border-color: ${({ theme }) => theme.COLORS.GRAY_200};

  div svg path {
    stroke: ${({ theme }) => theme.COLORS.ACCENT_200};
  }
`;

export const Input = styled.input`
  all: unset;

  width: 100%;
  height: 100%;

  border-radius: 10px;
  padding: 0px 8px;

  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};

  ::placeholder {
    color: ${({ theme }) => theme.COLORS.GRAY_200};
  }
`;
