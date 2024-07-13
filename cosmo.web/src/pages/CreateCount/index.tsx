import {
  Avatar,
  Button,
  Input,
  InputGroup,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Container } from '../../components/Container';
import { useEffect, useRef, useState } from 'react';
import { storeServices } from '../../services/storeServices';
import { BtnUpdload } from './styles';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { CustomError } from '../../helpers/customError';
import { useNavigate } from 'react-router-dom';

export function CreateCount() {
  const toast = useToast();
  const navigate = useNavigate();

  const refLabel = useRef<HTMLLabelElement>(null);

  const [name, setName] = useState<string | null>(null);
  const [cnpj, setCnpj] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [imgSelected, setImgSelected] = useState<File | null>(null);
  const [pathImg, setPathImg] = useState('');

  function handleShowImgSelected() {
    if (imgSelected) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPathImg(e.target!.result as string);
      };

      reader.readAsDataURL(imgSelected);
    }
  }

  async function createStore() {
    try {
      await storeServices.postStore({
        name: name!,
        cnpj: cnpj!,
        email: email!,
        password: password!,
        img: imgSelected!,
      });

      toast({
        status: 'success',
        description: 'Loja cadastrada com sucesso.',
        duration: 2000,
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      const err = error as CustomError;
      toast({
        status: 'error',
        description: err.message,
        duration: 3000,
      });
    }
  }

  useEffect(() => {
    if (imgSelected) {
      handleShowImgSelected();
    }
  }, [imgSelected]);

  return (
    <Container>
      <VStack w="400px">
        <VStack w="100%" mb="16px">
          <Avatar size="xl" src={pathImg} mb="16px" />

          <InputGroup
            cursor="pointer"
            alignItems="center"
            justifyContent="space-between"
            border="1px solid #E2E8F0"
            borderRadius="6px"
            p="4px 4px 4px 16px"
            gap="4px"
          >
            <Input
              id="upload-img"
              display="none"
              type="file"
              accept=".jpg, .jpeg, .png"
              placeholder="logo da empresa"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImgSelected(e.target.files[0]);
                }
              }}
            />
            <Text
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              onClick={() => {
                if (refLabel.current) refLabel.current.click();
              }}
            >
              {imgSelected ? imgSelected.name : 'Selecione uma imagem'}
            </Text>
            <BtnUpdload ref={refLabel} htmlFor="upload-img">
              <IoDocumentAttachOutline color="#fff" />
            </BtnUpdload>
          </InputGroup>
        </VStack>

        <Input
          placeholder="Nome da empresa"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="CNPJ da empresa"
          onChange={(e) => setCnpj(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button mt="16px" w="100%" onClick={createStore} colorScheme="orange">
          Salvar
        </Button>
      </VStack>
    </Container>
  );
}
