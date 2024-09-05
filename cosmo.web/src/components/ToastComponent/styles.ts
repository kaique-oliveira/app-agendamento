import { motion } from 'framer-motion';
import styled from 'styled-components';

export const WrapperToast = styled(motion.div)`
  width: 300px;

  border-radius: 10px;
  padding: 8px 16px;
  gap: 8px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};

  position: fixed;
  right: 8px;
  bottom: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 200;
`;

export const LabelToast = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;
