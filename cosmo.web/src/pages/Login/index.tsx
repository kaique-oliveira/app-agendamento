import { WrapperForm, WrapperLogin } from './styles';
import { useState } from 'react';
import { useAuth } from '../../context/auth';
import { CustomError } from '../../helpers/customError';
import { WrapperMain } from '../../components/WrapperMain';
import { InputComponent } from '../../components/InputComponent';
import { ButtonComponent } from '../../components/ButtonComponent';
import { useToast } from '../../hooks/useToast';
import { Spacing } from '../../components/Spacing';
import { HeaderTitle } from '../../components/HeaderTitle';
import { LoadingComponent } from '../../components/LoadingComponent';

export function Login() {
  const { onShowToast } = useToast();
  const { login, isLoading, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      if (email && password) {
        await login({ email, password });
      }
    } catch (error) {
      const err = error as CustomError;
      onShowToast({
        text: err.message,
        status: 'ERROR',
      });
    }
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (!isLoading && !isAuthenticated)
    return (
      <WrapperMain>
        <WrapperLogin>
          <HeaderTitle>Login</HeaderTitle>

          <WrapperForm>
            <InputComponent
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputComponent
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Spacing spacing={0} />

            <ButtonComponent
              style={{ width: '90%' }}
              text="Entrar"
              onClick={handleLogin}
            />
          </WrapperForm>
        </WrapperLogin>
      </WrapperMain>
    );
}
