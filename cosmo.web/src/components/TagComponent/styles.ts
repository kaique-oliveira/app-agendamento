import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { ButtonIconComponent } from '../ButtonIconComponent';

type Props = {
  $isActive: boolean;
};

export const WrapperTag = styled(motion.div)<Props>`
  width: 100%;
  height: 36px;
  padding: 0px 8px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};

  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;

  transition: all 0.2s;
  position: relative;

  ${({ theme, $isActive }) =>
    $isActive &&
    css`
      border: 1px solid ${theme.COLORS.ACCENT_300};

      label {
        color: ${theme.COLORS.ACCENT_300};
      }
    `}

  ${({ theme, $isActive }) =>
    !$isActive &&
    css`
      border: 1px solid ${theme.COLORS.BACKGOUND};

      label {
        color: ${theme.COLORS.GRAY_300};
      }
    `}
`;

export const LabelTag = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  cursor: pointer;
`;

export const BtnArrow = styled(ButtonIconComponent)<Props>`
  padding: 0;
  width: max-content;
  height: max-content;

  position: absolute;
  right: 0;

  ${({ theme, $isActive }) =>
    $isActive &&
    css`
      svg path {
        stroke: ${theme.COLORS.ACCENT_300};
      }
    `}

  ${({ theme, $isActive }) =>
    !$isActive &&
    css`
      svg path {
        stroke: ${theme.COLORS.GRAY_200};
      }
    `}
`;
