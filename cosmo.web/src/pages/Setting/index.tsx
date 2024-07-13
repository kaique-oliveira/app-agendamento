import {
  Avatar,
  HStack,
  Heading,
  Text,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from '@chakra-ui/react';
import { format } from '../../helpers/format';
import { useEffect, useState } from 'react';
import { IStoreFull } from '../../Interfaces';
import { useAuth } from '../../context/auth';
import { storeServices } from '../../services/storeServices';
import { resolveImage } from '../../helpers/resolveImage';

export function Setting() {
  const { user } = useAuth();
  const [store, setStore] = useState<IStoreFull | null>(null);
  const [urlImage, setUrlImage] = useState('');

  async function detchStore() {
    try {
      if (user?.email) {
        const response = await storeServices.getStoreByEmail(user.email);

        setStore(response!);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    detchStore();
  }, []);

  useEffect(() => {
    if (store) {
      setUrlImage(
        URL.createObjectURL(resolveImage.handleBuffer(store.img[0].data))
      );
    }
  }, [store]);

  return (
    <HStack
      p="8px"
      gap="32px"
      minW="100%"
      minH="100%"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <VStack
        w="300px"
        mb="16px"
        p="16px"
        bg="#fff"
        borderRadius="8px"
        alignItems="center"
        boxShadow="rgba(100, 100, 111, 0.08) 0px 0px 2px 0px"
      >
        <Avatar size="xl" src={urlImage} name="Summer" />

        <VStack gap="2px" alignItems="center">
          <Heading fontSize="16px" fontWeight={700} color="#555555">
            {store?.name}
          </Heading>

          <Text fontSize="16px" fontWeight={400} color="#555555">
            {store?.email}
          </Text>

          <Text mt="16px" fontSize="16px" fontWeight={400} color="#555555">
            {store && format.cpnj(store.cnpj)}
          </Text>
        </VStack>
      </VStack>

      <Tabs
        position="relative"
        variant="unstyled"
        w="380px"
        // bg="#fff"
        // boxShadow="rgba(100, 100, 111, 0.08) 0px 0px 2px 0px"
        // borderRadius="8px"
      >
        <TabList
          // w="min-content"
          pl="8px"
          pr="8px"
          // bg="#fff"
          // boxShadow="rgba(100, 100, 111, 0.08) 0px 0px 2px 0px"
          // borderRadius="8px"
        >
          <Tab color="#555555" fontWeight={600}>
            Endereço
          </Tab>
          <Tab color="#555555" fontWeight={600}>
            Expediente
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="orange.400"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <VStack w="100%" gap="16px">
              <HStack w="100%" justifyContent="space-between">
                <VStack w="100%" gap="1px">
                  <Text w="100%" fontSize="12px" color="#555555">
                    Rua
                  </Text>
                  <Text
                    w="100%"
                    fontSize="16px"
                    color="#555555"
                    fontWeight={400}
                  >
                    {store?.address.street}
                  </Text>
                </VStack>
                <VStack gap="2px">
                  <Text w="100%" fontSize="12px" color="#555555">
                    Número
                  </Text>
                  <Text
                    w="100%"
                    fontSize="16px"
                    color="#555555"
                    fontWeight={400}
                  >
                    {store?.address.number}
                  </Text>
                </VStack>
              </HStack>

              <VStack w="100%" gap="1px">
                <Text w="100%" fontSize="12px" color="#555555">
                  Bairro
                </Text>
                <Text w="100%" fontSize="16px" color="#555555" fontWeight={400}>
                  {store?.address.neighborhood}
                </Text>
              </VStack>

              <VStack w="100%" gap="2px">
                <Text w="100%" fontSize="12px" color="#555555">
                  Cidade
                </Text>
                <Text w="100%" fontSize="16px" color="#555555" fontWeight={400}>
                  {store?.address.city} - {store?.address.uf}
                </Text>
              </VStack>

              <VStack w="100%" gap="2px">
                <Text w="100%" fontSize="12px" color="#555555">
                  CEP
                </Text>
                <Text w="100%" fontSize="16px" color="#555555" fontWeight={400}>
                  {store?.address.zipCode}
                </Text>
              </VStack>
              <HStack />
            </VStack>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* </HStack> */}
    </HStack>
  );
}
