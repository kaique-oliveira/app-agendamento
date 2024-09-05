import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

type Props = {
  $height: number;
  $position: number;
  $state: 'PREVIOUS' | 'NEXT' | 'CURRENT';
};

export const WrapperCard = styled(motion.div)<Props>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  cursor: pointer;

  ${({ theme, $state }) =>
    $state === 'CURRENT' &&
    css`
      background-color: ${theme.COLORS.BACKGOUND};
      border: 1px solid ${({ theme }) => theme.COLORS.ACCENT_200};
      box-shadow: rgba(88, 44, 233, 0.2) -1px 1px 4px 0px;
    `}

  ${({ theme, $state }) =>
    $state === 'PREVIOUS' &&
    css`
      background-color: ${theme.COLORS.HIGHLIGHT};
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 4px 0px;

      p {
        opacity: 0.4;
      }
    `}

  ${({ theme, $state }) =>
    $state === 'NEXT' &&
    css`
      background-color: ${theme.COLORS.BACKGOUND};
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 4px 0px;
    `}

  border-radius: 10px;

  position: absolute;
  left: 0;
  top: calc(50% + ${({ $position }) => $position}px);

  z-index: 25;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: all 0.2s;
`;

export const TitleCard = styled.p`
  font-size: 12px;
  font-weight: 600;
`;
export const HourCard = styled.p`
  font-size: 12px;
  font-weight: 400;
`;

export const WrapperHours = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
