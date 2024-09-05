import { motion } from 'framer-motion';
import styled from 'styled-components';

export const WrapperDialog = styled(motion.div)`
  width: 300px;

  border-radius: 10px;
  padding: 8px 16px;
  gap: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};

  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const LabelDialog = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const WrapperButtons = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;

  button {
    color: ${({ theme }) => theme.COLORS.GRAY_200};
  }

  :nth-child(1):hover {
    color: ${({ theme }) => theme.COLORS.ACCENT_300};
  }

  :nth-child(2):hover {
    color: ${({ theme }) => theme.COLORS.RED_200};
  }
`;
