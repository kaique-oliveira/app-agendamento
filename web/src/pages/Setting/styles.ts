import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ButtonIconComponent } from '../../components/ButtonIconComponent';
import { ButtonComponent } from '../../components/ButtonComponent';

export const WrapperContent = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
  overflow: hidden;
`;

export const WrapperAsideBase = styled.aside`
  width: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 8px;
  padding: 16px;
  position: relative;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};
`;

export const WrapperOperation = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
`;

export const WrapperHours = styled.div`
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;

  padding-left: 16px;
`;

export const WrapperMenuHours = styled.div`
  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  padding-right: 8px;
  margin-left: 16px;
`;

export const GroupInfo = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

export const GroupWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  position: relative;
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

export const Line = styled.div`
  width: 95%;
  height: 1px;

  opacity: 0.6;
  margin-top: 8px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_200};
`;

export const WrapperOperations = styled.div`
  width: 100%;
  height: 90%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  overflow-y: auto;
  gap: 16px;
`;

export const WrapperListItems = styled.div`
  width: 300px;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
`;

export const ListItems = styled.div`
  width: 300px;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  gap: 8px;
`;

export const HeaderListItems = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const SpanInfo = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
`;

export const WrapperButtonNewData = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const WrapperFormNewData = styled(motion.div)`
  width: 300px;
  height: max-content;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;

  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 16px;

  background-color: ${({ theme }) => theme.COLORS.BACKGOUND};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const TitleNewFeature = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

export const WrapperFooterFormNewFeature = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

export const WrapperListFeature = styled.div`
  width: 100%;
  max-height: 200px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;

  overflow-y: auto;
`;

export const BtnRemoveFeature = styled(ButtonIconComponent)`
  position: absolute;
  right: 0;
  top: 14px;
`;

export const BtnEditProfile = styled(ButtonIconComponent)`
  position: absolute;
  top: 150px;
  right: 8px;
`;

export const BtnEditImage = styled(ButtonIconComponent)`
  position: absolute;
  top: 80px;
  right: 100px;
  z-index: 2;

  min-width: 22px;
  width: 26px;
  height: 26px;
  padding: 0px;
  border-radius: 100px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
  border: none;
`;

export const BtnEditLogout = styled(ButtonComponent)`
  position: absolute;
  top: 8px;
  left: 16px;
  z-index: 2;

  min-width: 22px;
  width: 26px;
  height: 26px;
  padding: 0px;
  border-radius: 100px;

  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.GRAY_300};
`;
