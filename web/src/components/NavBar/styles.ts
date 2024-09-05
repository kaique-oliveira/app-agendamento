import { HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

type WrapperNavBarType = {
  $isBig: boolean;
};

export const WrapperNavBar = styled(VStack)<WrapperNavBarType>`
  width: ${({ $isBig }) => ($isBig ? '32px' : '132px')};
  height: 100%;

  align-items: flex-start;
  justify-content: space-between;

  transition: all 0.2s width;
  margin-left: 8px;

  background-color: ${({ theme }) => theme.COLORS.HIGHLIGHT};
`;

export const WrapperMenu = styled(VStack)`
  width: 100%;
  height: 100%;
  align-items: flex-start;
`;

export const BtnResizeNavBar = styled(IconButton)`
  padding: 4px 0px;

  align-self: flex-start;
  transition: all 0.2s linear;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.ACCENT_100};

    & > svg path {
      stroke: ${({ theme }) => theme.COLORS.ACCENT_300};
    }
  }
`;

export const BtnNav = styled(Link)`
  width: 100%;
  height: 32px;

  border-radius: 8px;

  flex-direction: row;
  transition: all 0.4s linear;
`;

export const BtnNavContent = styled(HStack)<WrapperNavBarType>`
  height: 32px;
  border-radius: 8px;

  align-items: center;

  ${({ $isBig }) =>
    !$isBig
      ? css`
          justify-content: flex-start;
          padding-left: 7px;
        `
      : css`
          justify-content: center;
        `}
`;

export const TitleBtn = styled(Text)<WrapperNavBarType>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.COLORS.GRAY_200};

  ${({ $isBig }) =>
    $isBig
      ? css`
          transition: all 0.1s linear;
          visibility: hidden;
          font-size: 1px;
          overflow: auto;
          max-width: 0.1px;
          position: absolute;
          z-index: -1;
        `
      : css`
          visibility: visible;
          transition: all 0.1s linear;
        `}
`;
