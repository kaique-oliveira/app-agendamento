import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

type Props = {
  $isOpenOptions: boolean;
};

export const WrapperDropDown = styled.div<Props>`
  width: 100%;
  height: 36px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;

  position: relative;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};

  transition: all 0.2s;
  cursor: pointer;

  ${({ theme, $isOpenOptions }) =>
    $isOpenOptions &&
    css`
      border-color: ${theme.COLORS.ACCENT_200};

      div svg path {
        stroke: ${theme.COLORS.ACCENT_300};
      }
    `}

  ${({ theme, $isOpenOptions }) =>
    !$isOpenOptions &&
    css`
      border-color: ${theme.COLORS.GRAY_200};

      div svg path {
        stroke: ${theme.COLORS.ACCENT_200};
      }
    `}
`;

export const Icon = styled(motion.div)`
  width: 16px;
  height: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 8px;
  transform: translateY(50%, -50%);
  z-index: 0;
`;

export const WrapperOptions = styled(motion.div)`
  min-height: 40px;

  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;

  gap: 2px;

  position: absolute;
  top: 38px;
  right: 0;
  box-shadow: rgba(99, 99, 99, 0.08) 0px 4px 4px 0px;
  z-index: 10;
`;

export const TextPlaceholder = styled.span`
  width: 100%;
  height: 100%;

  padding: 0px 32px 0px 8px;
  border-radius: 10px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: 14px;
  font-weight: 400;

  color: ${({ theme }) => theme.COLORS.GRAY_200};
  z-index: 1;
`;

export const TextOptions = styled.span`
  width: 100%;

  font-size: 14px;
  font-weight: 400;

  color: ${({ theme }) => theme.COLORS.GRAY_300};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.COLORS.ACCENT_200};
  }
`;
