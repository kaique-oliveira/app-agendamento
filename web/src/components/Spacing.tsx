import styled from 'styled-components';

type SpacingProps = {
  spacing: number;
};

export const WrapperSpacing = styled.div`
  width: 100%;
`;

export function Spacing({ spacing }: SpacingProps) {
  return <WrapperSpacing style={{ minHeight: `${spacing}px` }} />;
}
