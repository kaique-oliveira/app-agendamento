import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { ReactElement, useState } from 'react';
import { NavBar } from './NavBar';
import { WrapperMain } from './WrapperMain';
import styled from 'styled-components';
import { WrapperContent } from './WrapperContent';

interface IPrivateRoute {
  element: ReactElement;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
`;

export const PrivateRoute = ({ element }: IPrivateRoute) => {
  const { isAuthenticated } = useAuth();
  const [menuResize, setMenuResize] = useState(true);

  function handleResize() {
    setMenuResize(!menuResize);
  }

  return isAuthenticated ? (
    <WrapperMain>
      <Wrapper>
        <NavBar isResize={menuResize} onResize={handleResize} />
        <WrapperContent>{element}</WrapperContent>
      </Wrapper>
    </WrapperMain>
  ) : (
    <Navigate to="/" replace />
  );
};
