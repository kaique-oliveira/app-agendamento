import { motion } from 'framer-motion';
import styled from 'styled-components';

type SidebarProps = {
  $numberRows: number;
};

export const WrapperPanel = styled(motion.div)`
  max-width: 100%;
  max-height: 580px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 4px 0px;
  padding: 16px;
  border-radius: 12px;
  gap: 1px;

  box-sizing: border-box;
  overflow-x: hidden;
`;

export const HeaderPanel = styled.div`
  width: 100%;
  height: 36px;

  display: grid;
  grid-template-columns: 60px repeat(7, 1fr);

  gap: 1px;
  align-items: center;
`;

export const WrapperContent = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 50px 7fr;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const WrapperSidebar = styled.div<SidebarProps>`
  width: 120px;
  height: max-content;

  display: grid;
  grid-template-rows: repeat(${({ $numberRows }) => $numberRows}, 1fr);

  gap: 1px;
`;

export const ContentPanel = styled.div<SidebarProps>`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(${({ $numberRows }) => $numberRows}, 1fr);

  gap: 1px;
`;

export const WrapperTextHeader = styled.label`
  width: 120px;
  height: 36px;

  font-size: 12px;
  font-weight: 600;
  text-align: center;
  margin-left: -8px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WrapperTextSidebar = styled.label`
  width: 50px;
  height: 36px;

  font-size: 12px;
  font-weight: 400;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 8px;
`;

export const WrapperTextContent = styled.div`
  width: 120px;
  height: 36px;

  font-size: 14px;
  font-weight: 500;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;

  border-bottom: 1px dashed ${({ theme }) => theme.COLORS.ACCENT_100};
  position: absolute;
`;
