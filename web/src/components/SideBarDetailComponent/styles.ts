import { motion } from 'framer-motion';
import styled from 'styled-components';

export const WrapperSideBar = styled(motion.div)`
  width: 400px;
  height: 100%;

  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  border-radius: 12px 0px 0px 12px;

  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};
  box-shadow: rgba(0, 0, 0, 0.1) -3px 0px 10px;
`;

export const WrapperHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding-top: 8px;
  padding-left: 16px;

  font-size: 16;
  font-weight: 600;
`;

export const WrapperContentDetail = styled.div`
  width: 100%;
  height: 95%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  gap: 8px;
  padding: 16px;
`;
