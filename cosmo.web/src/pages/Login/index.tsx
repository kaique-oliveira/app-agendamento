import { Container } from '../../components/Container';
import svgLogin from '../../../public/login-svg.svg';
import { WrapperForm, WrapperLogin } from './styles';
import {
  Button,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { CustomError } from '../../helpers/customError';

export function Login() {
  const toast = useToast();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleValidationLogin() {
    try {
      if (email && password) {
        setLoading(true);
        await login({ email, password });
      }
    } catch (error) {
      const err = error as CustomError;
      toast({
        status: 'success',
        description: err.message,
        duration: 3000,
      });
    }
    setLoading(false);
  }

  return (
    <Container>
      <WrapperLogin>
        <WrapperForm>
          <Image
            mb="32px"
            src={svgLogin}
            alt="svg login"
            boxSize="100px"
            objectFit="cover"
          />

          <Input
            focusBorderColor="orange.300"
            size="lg"
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputGroup>
            <InputRightElement>
              <IconButton
                mt="6px"
                variant="gosht"
                aria-label="togle-show-password"
                onClick={handleClick}
                transition="all .2s"
                size="sm"
              >
                {show ? (
                  <IoEyeOutline size={20} color="#738197" />
                ) : (
                  <IoEyeOffOutline size={20} color="#738197" />
                )}
              </IconButton>
            </InputRightElement>
            <Input
              focusBorderColor="orange.300"
              size="lg"
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          <Button
            size="lg"
            mt="32px"
            w="100%"
            color="#fff"
            colorScheme="orange"
            onClick={handleValidationLogin}
            isLoading={loading}
          >
            Entrar
          </Button>

          <Text color="#738197">
            Não tem um conta?{' '}
            <Link as={ReactRouterLink} to="/create" color="orange.500">
              Criar
            </Link>
          </Text>
        </WrapperForm>
      </WrapperLogin>
    </Container>
  );
}
