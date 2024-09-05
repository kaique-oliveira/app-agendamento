import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { ButtonIconComponent } from '../../ButtonIconComponent';

type Props = {
  $isActive: boolean;
};

export const WrapperCard = styled(motion.div)<Props>`
  width: 100%;
  height: 58px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  border-radius: 12px;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};
  padding: 8px;
  cursor: pointer;

  transition: all 0.2s;
  position: relative;

  ${({ theme, $isActive }) =>
    $isActive &&
    css`
      border-color: ${theme.COLORS.ACCENT_300};
      label {
        color: ${theme.COLORS.ACCENT_300};
      }
    `}
`;

export const LabelTitle = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  cursor: pointer;
`;

export const LabelDescription = styled.label`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  cursor: pointer;
`;

export const BtnArrow = styled(ButtonIconComponent)<Props>`
  padding: 0;
  width: max-content;
  height: max-content;

  position: absolute;
  right: 0;
  top: 20px;

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
    `};
`;
