import styled from 'styled-components';

export const WrapperSearchBar = styled.div`
  width: 100%;
  height: 36px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  border-radius: 10px;
  position: relative;

  align-items: center;

  border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};

  &:focus-within {
    border-color: ${({ theme }) => theme.COLORS.ACCENT_200};
    transition: all 0.2s;

    & > svg path {
      stroke: ${({ theme }) => theme.COLORS.ACCENT_200};
      transition: all 0.2s;
    }
  }
`;

export const InputSearchBar = styled.input`
  all: unset;
  width: 100%;
  height: 32px;

  border-radius: 8px;
  padding: 0px 16px 0px 32px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: 14px;
`;
