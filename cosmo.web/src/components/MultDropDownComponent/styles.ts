import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

type Props = {
  $isOpenOptions: boolean;
  $isDisable?: boolean;
};

export const WrapperDropDown = styled.div<Props>`
  width: 500px;
  min-height: 78px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  padding: 4px 28px 4px 8px;
  gap: 6px;

  position: relative;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};

  transition: all 0.2s;
  cursor: pointer;

  ${({ $isDisable }) =>
    $isDisable &&
    css`
      opacity: 0.7;
      border-radius: 10px;
    `}

  ${({ theme, $isOpenOptions, $isDisable }) =>
    $isOpenOptions &&
    !$isDisable &&
    css`
      border-top-color: ${theme.COLORS.ACCENT_200};
      border-right-color: ${theme.COLORS.ACCENT_200};
      border-left-color: ${theme.COLORS.ACCENT_200};
      border-bottom-color: ${theme.COLORS.GRAY_100};

      border-radius: 10px 10px 0px 0px;

      div svg path {
        stroke: ${theme.COLORS.ACCENT_200};
      }
    `}

  ${({ theme, $isOpenOptions, $isDisable }) =>
    !$isOpenOptions &&
    !$isDisable &&
    css`
      border-color: ${theme.COLORS.GRAY_200};
      border-radius: 10px;

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
  width: 100%;
  min-height: 40px;
  max-height: 200px;

  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};
  border-radius: 0px 0px 10px 10px;
  box-sizing: content-box;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  padding: 8px 0px;

  position: absolute;
  top: 38px;
  left: -1px;

  z-index: 10;

  border-bottom: 1px solid ${({ theme }) => theme.COLORS.ACCENT_200};
  border-left: 1px solid ${({ theme }) => theme.COLORS.ACCENT_200};
  border-right: 1px solid ${({ theme }) => theme.COLORS.ACCENT_200};
`;

export const ListOptions = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;

  overflow-y: auto;
  padding: 8px;
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

export const TextOptions = styled.label`
  width: 100%;

  font-size: 14px;
  font-weight: 400;

  color: ${({ theme }) => theme.COLORS.GRAY_200};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.COLORS.ACCENT_200};
  }
`;

export const TagSelected = styled(motion.div)`
  height: 34px;
  padding: 4px 0px 4px 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.ACCENT_100};
  opacity: 0.5;

  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;
