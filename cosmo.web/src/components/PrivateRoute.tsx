import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { ReactElement, useState } from 'react';
import WrapperContent from './WrapperContent';
import { HStack } from '@chakra-ui/react';
import { NavBar } from './NavBar';
import { Container } from './Container';

interface IPrivateRoute {
  element: ReactElement;
}

export const PrivateRoute = ({ element }: IPrivateRoute) => {
  const { isAuthenticated } = useAuth();
  const [menuResize, setMenuResize] = useState(false);

  function handleResize() {
    setMenuResize(!menuResize);
  }

  return isAuthenticated ? (
    <Container>
      <HStack w="100%" height="100%" gap="32px">
        <NavBar isResize={menuResize} onResize={handleResize} />
        <WrapperContent>{element}</WrapperContent>
      </HStack>
    </Container>
  ) : (
    <Navigate to="/" replace />
  );
};
