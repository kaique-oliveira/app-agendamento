import { motion } from 'framer-motion';
import styled from 'styled-components';

export const WrapperModal = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;

  background-color: ${({ theme }) => theme.COLORS.HIGHLIGHT};
  border-radius: 12px;
  padding: 16px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

export const WrapperHeaderModal = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const TitleModal = styled.p`
  font-size: 18px;
  font-weight: 500;

  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const WrapperContentModal = styled.div`
  min-width: 300px;
  min-height: 100px;

  max-width: 70vw;
  max-height: 80vh;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
`;

export const WrapperFooterModal = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;
