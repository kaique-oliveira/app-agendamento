import styled from 'styled-components';

export const WrapperSchedule = styled.div`
  width: 100%;
  height: 100%;
  background-color: blue;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-direction: column;
`;

export const WrapperToolBar = styled.div`
  width: max-content;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
`;

export const WrapperTool = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

export const GroupInfo = styled.div`
  width: max-content;

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
  gap: 24px;
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

export const WrapperTagsItems = styled.div`
  width: 300px;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
`;

export const WrapperTagsListItems = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const WrapperContent = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
`;

export const WrapperContentSchedule = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
`;
