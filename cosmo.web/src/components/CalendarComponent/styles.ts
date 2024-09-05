import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

type Props = {
  $states?: 'CURRENT' | 'SELECTED' | 'NORMAL';
};

export const WrapperCalendar = styled(motion.div)`
  min-height: 309px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};
  border-radius: 12px;
  padding: 16px 16px 16px 16px;
  gap: 16px;
`;

export const WrapperHeaderCalendar = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const MonthHeader = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const WrapperDaysWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 30px);
  gap: 4px;

  margin-bottom: -12px;
`;

export const DaysWeekText = styled.label`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.GRAY_300};

  text-align: center;
`;

export const DayMonth = styled.div<Props>`
  padding: 8px 0px;

  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.GRAY_300};

  text-align: center;

  display: grid;
  grid-template-columns: repeat(7, 30px);
  gap: 4px;

  margin-bottom: -6px;

  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;

  transition: all 0.2s;

  ${({ theme, $states }) =>
    $states === 'CURRENT' &&
    css`
      background-color: ${theme.COLORS.SKY_100};
    `}

  ${({ theme, $states }) =>
    $states === 'SELECTED' &&
    css`
      background-color: ${theme.COLORS.ACCENT_300};
      color: ${theme.COLORS.GRAY_100};
    `}

    ${({ theme, $states }) =>
    $states === 'NORMAL' &&
    css`
      &:hover {
        background-color: ${theme.COLORS.ACCENT_100};
      }
    `}
`;

export const WrapperDaysMonth = styled(motion.div)`
  min-height: 210px;
  display: flex;
  flex-direction: column;

  box-sizing: border-box;
`;
