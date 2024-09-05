import { WrapperMain } from '../../components/WrapperMain';
import { useState } from 'react';
import { storeServices } from '../../services/storeServices';
import { WrapperCreate, WrapperForm } from './styles';
import { CustomError } from '../../helpers/customError';
import { useNavigate } from 'react-router-dom';
import { ButtonComponent } from '../../components/ButtonComponent';
import { InputComponent } from '../../components/InputComponent';
import { Spacing } from '../../components/Spacing';
import { DropZone } from '../../components/DropZone';
import { useToast } from '../../hooks/useToast';

export function CreateCount() {
  const { onShowToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [cnpj, setCnpj] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [imgSelected, setImgSelected] = useState<File | null>(null);

  async function createStore() {
    if (name && cnpj && email && password && imgSelected) {
      if (password.length >= 8) {
        try {
          await storeServices.postStore({
            name: name,
            cnpj: cnpj,
            email: email,
            password: password,
            img: imgSelected!,
          });

          onShowToast({
            status: 'SUCCESS',
            text: 'Loja cadastrada com sucesso.',
          });

          setTimeout(() => {
            navigate('/login');
          }, 4000);
        } catch (error) {
          const err = error as CustomError;
          onShowToast({
            status: 'ERROR',
            text: err.message,
          });
        }
      } else {
        onShowToast({
          status: 'WARNING',
          text: 'A senha deve conter pelo menos 8 caracteres',
        });
      }
    } else {
      onShowToast({
        status: 'WARNING',
        text: 'Todos os campos são obrigatórios',
      });
    }
  }

  return (
    <WrapperMain>
      <WrapperCreate>
        <WrapperForm>
          <DropZone onGetFile={setImgSelected} />

          <InputComponent
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <InputComponent
            placeholder="CNPJ"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />

          <InputComponent
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputComponent
            type="password"
            placeholder="Senha"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Spacing spacing={0} />

          <ButtonComponent
            style={{ width: '90%' }}
            text="Salvar"
            onClick={createStore}
          />
        </WrapperForm>
      </WrapperCreate>
    </WrapperMain>
  );
}
