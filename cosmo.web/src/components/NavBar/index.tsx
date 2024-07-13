import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar2,
  Category,
  HambergerMenu,
  Home2,
  Setting2,
} from 'iconsax-react';
import { resolveImage } from '../../helpers/resolveImage';
import { useAuth } from '../../context/auth';
import { format } from '../../helpers/format';

type NavBarType = {
  isResize: boolean;
  onResize(): void;
};

export function NavBar({ isResize, onResize }: NavBarType) {
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const { user } = useAuth();
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    if (user && user.img && user.img.length > 0) {
      setUrlImage(
        URL.createObjectURL(resolveImage.handleBuffer(user.img[0].data))
      );
    }
  }, [user]);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  return (
    <VStack
      height="100%"
      w={'max-content'}
      alignItems="flex-start"
      justifyContent="space-between"
      transition="all .1s"
      ml="8px"
      bg="#F6F6F6"
    >
      <VStack height="100%" w={'max-content'} alignItems="flex-start">
        <IconButton
          p="4px 8px"
          ml="-4px"
          size="sm"
          aria-label="menu-resize"
          variant="gosht"
          onClick={onResize}
        >
          <HambergerMenu size="22" color="#555555" />
        </IconButton>

        <HStack minW="100%">
          <Link to={'/'}>
            <Box
              p="4px 8px"
              borderRadius="8px"
              minW={!isResize ? '132px' : '100%'}
              transition="all .1s"
            >
              <HStack
                color={currentPath === '/' ? '#582ce9' : '#555555'}
                transition="all .1s"
                alignItems="center"
                maxH="33px"
                minH="24px"
              >
                <Home2 size="16" variant="Bold" />

                {!isResize && (
                  <Text fontSize="13px" fontWeight={700}>
                    Dashboard
                  </Text>
                )}
              </HStack>
            </Box>
          </Link>
        </HStack>

        <HStack minH="33px" maxH="33px" minW="100%">
          <Link to={'/items'}>
            <Box
              p="4px 8px"
              borderRadius="8px"
              minW={!isResize ? '132px' : '100%'}
              transition="all .1s"
            >
              <HStack
                color={currentPath === '/items' ? '#582ce9' : '#555555'}
                transition="all .1s"
                maxH="33px"
                minH="24px"
              >
                <Category variant="Bold" size="16" />
                {!isResize && (
                  <Text fontSize="13px" fontWeight={700}>
                    Itens
                  </Text>
                )}
              </HStack>
            </Box>
          </Link>
        </HStack>

        <HStack minH="33px" maxH="33px" minW="100%">
          <Link to={'/scheduling'}>
            <Box
              p="4px 8px"
              borderRadius="8px"
              minW={!isResize ? '132px' : '100%'}
              maxH="33px"
              transition="all .1s"
            >
              <HStack
                color={currentPath === '/scheduling' ? '#582ce9' : '#555555'}
                transition="all .1s"
                maxH="33px"
                minH="24px"
              >
                <Calendar2 variant="Bold" size="17" />
                {!isResize && (
                  <Text fontSize="13px" fontWeight={700}>
                    Agenda
                  </Text>
                )}
              </HStack>
            </Box>
          </Link>
        </HStack>

        <HStack minH="33px" maxH="33px" minW="100%">
          <Link to={'/settings'}>
            <Box
              p="4px 8px"
              borderRadius="8px"
              minW={!isResize ? '132px' : '100%'}
              transition="all .1s"
            >
              <HStack
                color={currentPath === '/settings' ? '#582ce9' : '#555555'}
                transition="all .1s"
                maxH="33px"
                minH="24px"
              >
                <Setting2 variant="Bold" size="17" />
                {!isResize && (
                  <Text fontSize="13px" fontWeight={700}>
                    Loja
                  </Text>
                )}
              </HStack>
            </Box>
          </Link>
        </HStack>
      </VStack>

      <HStack>
        <Avatar w="32px" h="32px" name={user?.name} src={urlImage} />
        {!isResize && (
          <VStack w="max-content" gap="0px" alignItems="flex-start">
            <Text fontSize="11px" fontWeight={600} color="#555555">
              {user?.name}
            </Text>
            <Text fontSize="11px" fontWeight={400} color="#555555">
              {format.cpnj(Number(user?.cnpj))}
            </Text>
          </VStack>
        )}
      </HStack>
    </VStack>
  );
}
