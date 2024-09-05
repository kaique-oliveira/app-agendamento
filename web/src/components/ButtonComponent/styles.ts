import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export type VariantStyleProps = 'SOLID' | 'OUTLINE' | 'GHOST' | 'CANCEL';

type WrapperButtonStyleProps = {
  $variant: VariantStyleProps;
  $positionIcon: 'RIGHT' | 'LEFT';
  $isDisable: boolean;
};

export const WrapperButton = styled(motion.button)<WrapperButtonStyleProps>`
  all: unset;
  width: max-content;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ $positionIcon }) =>
    $positionIcon === 'RIGHT' ? 'row-reverse' : 'row'};
  gap: 4px;

  transition: all 0.2s;

  ${({ theme, $isDisable, $variant }) =>
    $variant === 'SOLID' &&
    $isDisable &&
    css`
      opacity: 0.6;
      padding: 0px 16px;
      background-color: ${theme.COLORS.GRAY_200};
      border: 1px solid ${theme.COLORS.GRAY_200};
      border-radius: 12px;

      color: ${theme.COLORS.BACKGOUND};
      font-size: 16px;
      font-weight: 400;
    `}

  ${({ theme, $variant, $isDisable }) =>
    $variant === 'SOLID' &&
    !$isDisable &&
    css`
      padding: 0px 16px;
      background-color: ${theme.COLORS.ACCENT_300};
      border: 1px solid ${theme.COLORS.ACCENT_300};
      border-radius: 12px;

      color: ${theme.COLORS.BACKGOUND};
      font-size: 16px;
      font-weight: 400;

      &:hover {
        cursor: pointer;
        filter: brightness(1.1);
      }

      svg path {
        stroke: ${theme.COLORS.BACKGOUND};
      }
    `}

  ${({ theme, $variant, $isDisable }) =>
    $variant === 'OUTLINE' &&
    !$isDisable &&
    css`
      padding: 0px 16px;
      border: 1px solid ${theme.COLORS.ACCENT_300};
      border-radius: 12px;

      color: ${theme.COLORS.ACCENT_300};
      font-size: 16px;
      font-weight: 400;

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    `}

${({ theme, $variant, $isDisable }) =>
    $variant === 'GHOST' &&
    !$isDisable &&
    css`
      padding: 0px;
      border: none;
      background-color: transparent;

      color: ${theme.COLORS.ACCENT_300};
      font-size: 16px;
      font-weight: 400;

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    `}

${({ theme, $variant, $isDisable }) =>
    $variant === 'CANCEL' &&
    !$isDisable &&
    css`
      padding: 0px 16px;
      border: 1px solid ${theme.COLORS.GRAY_300};
      border-radius: 12px;

      color: ${theme.COLORS.GRAY_300};
      font-size: 16px;
      font-weight: 400;
      opacity: 0.4;

      &:hover {
        color: ${theme.COLORS.RED_100};
        border: 1px solid ${theme.COLORS.RED_100};
        cursor: pointer;
        opacity: 1;
      }
    `}
`;
