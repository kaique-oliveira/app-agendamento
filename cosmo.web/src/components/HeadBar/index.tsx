import { Avatar, Button, HStack, IconButton, Text } from '@chakra-ui/react';
import { HambergerMenu, LogoutCurve } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { resolveImage } from '../../helpers/resolveImage';

type HeadBarType = {
  onResize(): void;
};

export function HeadBar({ onResize }: HeadBarType) {
  const { user } = useAuth();
  const [urlImage, setUrlImage] = useState('');

  useEffect(() => {
    if (user && user.img && user.img.length > 0) {
      setUrlImage(
        URL.createObjectURL(resolveImage.handleBuffer(user.img[0].data))
      );
    }
  }, [user]);

  return (
    <HStack
      w="60px"
      h="52px"
      position="fixed"
      top={0}
      left={0}
      justifyContent="space-between"
      p="2px 8px"
    >
      {/* 
        <HStack>
          <Avatar w="38px" h="38px" name={user?.name} src={urlImage} />
        </HStack>
      </HStack> */}

      {/* <Button
        colorScheme="orange"
        variant="ghost"
        color="#555555"
        rightIcon={<LogoutCurve style={{ rotate: '180deg' }} size="16" />}
      >
        <Text fontSize="14px" fontWeight={400}>
          Sair
        </Text>
      </Button> */}
    </HStack>
  );
}
