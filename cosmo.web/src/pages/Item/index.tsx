import {
  Button,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import WrapperGlass from '../../components/WrapperGlass';
import { useEffect, useState } from 'react';
import { CardItem } from '../../components/ItemsPage/CardItem';
import { itemServices } from '../../services/itemServices';
import { IItem } from '../../Interfaces';
import { Add } from 'iconsax-react';

export function Item() {
  const toast = useToast();

  const [openModalNewItem, setOpenModalNewItem] = useState(false);
  const [openModalNewFeature, setOpenModalNewFeature] = useState(false);
  const [itemSelected, setItemSelected] = useState<IItem | null>(null);
  const [items, setItems] = useState<IItem[] | []>([]);

  async function fetchItems() {
    try {
      const res = await itemServices.getItems();

      setItems(res!);
    } catch (error) {
      toast({
        status: 'error',
        title: 'Atenção',
        description: "Algo deu errado: '" + JSON.stringify(error) + "'",
      });
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <VStack
      w="100%"
      h="100%"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflowY="hidden"
    >
      <Heading w="100%" mb="16px" fontSize="20px" fontWeight={700}>
        Itens Alugáveis
      </Heading>

      <HStack w="100%" h="100%" gap="32px">
        <VStack w="300px" h="100%" justifyContent="space-between">
          <VStack
            w="100%"
            h="100%"
            p="2px 2px 8px 2px"
            gap="16px"
            overflowY="auto"
          >
            {items.map((item) => (
              <CardItem
                key={item.id}
                item={item}
                itemSelected={itemSelected}
                onSelectedItem={setItemSelected}
              />
            ))}
          </VStack>

          <Button
            w="100%"
            bg="#EFEBFE"
            color="#6236F5"
            border="1px solid #754dfa"
            borderRadius="12px"
            fontSize="14px"
            fontWeight={400}
            boxShadow="rgba(100, 100, 111, 0.08) 0px 0px 1px"
            _hover={{
              background: '#e3dcfd',
              color: '#582ce9',
            }}
            onClick={() => setOpenModalNewItem(true)}
          >
            Criar novo item
          </Button>
        </VStack>

        <VStack
          w="100%"
          h="100%"
          bg="#fff"
          borderRadius="12px"
          p="16px"
          alignItems="flex-start"
        >
          <Heading fontSize="16px" fontWeight={600}>
            {itemSelected?.name}
          </Heading>
        </VStack>
      </HStack>
      {/* <HStack w="100%">
        <VStack w="332px">
          <HStack w="100%" justifyContent="space-between" p="1px 8px">
            <Heading fontSize="md" color="#555555">
              Itens
            </Heading>

            <Button
              size="sm"
              aria-label="new-item"
              colorScheme="orange"
              rightIcon={<Add size="20" />}
              onClick={() => setOpenModalNewItem(true)}
            >
              Novo
            </Button>
          </HStack>

        
        </VStack>
      </HStack> */}

      {openModalNewItem && (
        <WrapperGlass>
          <VStack
            w="400px"
            bg="#f9f9f9"
            p="32px 16px 16px 16px"
            borderRadius="16px"
            boxShadow="rgba(100, 100, 111, 0.1) 0px 0px 14px"
          >
            <Heading w="100%" fontSize="md" color="#222" fontWeight={500}>
              Novo Alugável
            </Heading>

            <VStack w="100%" gap="16px" mt="24px">
              <Input
                placeholder="Nome"
                focusBorderColor="#a287fc"
                borderRadius="12px"
              />

              <Input
                borderRadius="12px"
                placeholder="Descrição"
                focusBorderColor="#a287fc"
              />

              <Text fontSize="12px" color="#555555" mt="8px">
                Para adicionar mais caracteristicas, clique no botão abaixo e
                informe o nome e a descrição.
              </Text>

              <Button
                mt="-8px"
                w="100%"
                variant="outline"
                bg="#EFEBFE"
                color="#6236F5"
                borderRadius="12px"
                fontSize="14px"
                fontWeight={400}
                border="none"
                transition="all .2s"
                _hover={{
                  background: '#e3dcfd',
                  color: '#582ce9',
                }}
                leftIcon={<Add size="19" color="#6236f5" />}
                onClick={() => setOpenModalNewFeature(true)}
              >
                Nova Caracteríscas
              </Button>
            </VStack>

            <HStack w="100%" gap="24px" mt="32px">
              <Button
                w="100%"
                variant="outline"
                color="#555555"
                border="1px solid #c1c1c1"
                borderRadius="12px"
                fontSize="14px"
                fontWeight={400}
                _hover={{
                  background: 'transparent',
                  borderColor: '#de5353',
                  color: '#de3a3a',
                }}
                onClick={() => setOpenModalNewItem(false)}
              >
                Cancelar
              </Button>

              <Button
                w="100%"
                variant="solid"
                color="#fff"
                bg="#6236F5"
                borderRadius="12px"
                fontSize="14px"
                fontWeight={400}
                _hover={{
                  background: '#5426ea',
                }}
              >
                Salvar
              </Button>
            </HStack>
          </VStack>

          {openModalNewItem && openModalNewFeature && (
            <WrapperGlass>
              <VStack
                w="400px"
                p="32px 16px 16px 16px"
                borderRadius="16px"
                bg="#f9f9f9f9"
                boxShadow="rgba(100, 100, 111, 0.1) 0px 0px 12px"
              >
                <Heading w="100%" fontSize="md" color="#222" fontWeight={500}>
                  Nova característica
                </Heading>

                <Input
                  mt="24px"
                  placeholder='Nome da caracteristica, ex: "Cor"'
                  borderRadius="12px"
                  focusBorderColor="#a287fc"
                />

                <Input
                  placeholder='Descrição da caracteristica, ex: "Vermelho"'
                  borderRadius="12px"
                  focusBorderColor="#a287fc"
                />

                <HStack w="100%" gap="24px" mt="32px">
                  <Button
                    w="100%"
                    variant="outline"
                    color="#555555"
                    border="1px solid #c1c1c1"
                    borderRadius="12px"
                    fontSize="14px"
                    fontWeight={400}
                    _hover={{
                      background: 'transparent',
                      borderColor: '#de5353',
                      color: '#de3a3a',
                    }}
                    onClick={() => setOpenModalNewFeature(false)}
                  >
                    Cancelar
                  </Button>

                  <Button
                    w="100%"
                    variant="solid"
                    color="#fff"
                    bg="#6236F5"
                    borderRadius="12px"
                    fontSize="14px"
                    fontWeight={400}
                    _hover={{
                      background: '#5426ea',
                    }}
                  >
                    Salvar
                  </Button>
                </HStack>
              </VStack>
            </WrapperGlass>
          )}
        </WrapperGlass>
      )}
    </VStack>
  );
}
