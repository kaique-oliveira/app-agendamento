import { motion } from 'framer-motion';
import styled from 'styled-components';

export const WrapperDetail = styled(motion.div)`
  width: 400px;
  min-height: 300px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
  /* margin-top: 86px; */
  padding: 16px;
  border-radius: 12px;

  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};
`;

export const WrapperHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WrapperMenu = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

export const GroupInfo = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const TitleInfo = styled.label`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const TextInfo = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;
