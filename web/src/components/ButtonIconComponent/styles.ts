import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export type VariantStyleProps = 'SOLID' | 'OUTLINE' | 'GHOST' | 'CANCEL';

type WrapperButtonStyleProps = {
  $variant: VariantStyleProps;
};

export const WrapperButton = styled(motion.button)<WrapperButtonStyleProps>`
  all: unset;
  min-width: 32px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.2s;

  ${({ theme, $variant }) =>
    $variant === 'SOLID' &&
    css`
      background-color: ${theme.COLORS.ACCENT_300};
      border: 1px solid ${theme.COLORS.ACCENT_300};
      border-radius: 10px;

      &:hover {
        cursor: pointer;
        filter: brightness(1.1);
      }
    `}

  ${({ theme, $variant }) =>
    $variant === 'OUTLINE' &&
    css`
      border: 1px solid ${theme.COLORS.ACCENT_300};
      background-color: transparent;
      border-radius: 10px;

      svg path {
        stroke: ${theme.COLORS.ACCENT_300};
      }

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    `}

${({ theme, $variant }) =>
    $variant === 'GHOST' &&
    css`
      padding: 0px;
      width: max-content;
      height: max-content;
      border: none;
      background-color: transparent;

      svg path {
        stroke: ${theme.COLORS.ACCENT_300};
      }

      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    `}

    ${({ theme, $variant }) =>
    $variant === 'CANCEL' &&
    css`
      cursor: pointer;

      svg path {
        stroke: ${theme.COLORS.GRAY_300};
        opacity: 0.6;
      }

      &:hover {
        svg path {
          stroke: ${theme.COLORS.RED_300};
        }
      }
    `}
`;
