import { Flex } from '@chakra-ui/react';
import React from 'react';

type WrapperGlassType = React.HTMLAttributes<HTMLDivElement>;

export default function WrapperGlass({ ...rest }: WrapperGlassType) {
  return (
    <Flex
      {...rest}
      w="100vw"
      h={'100vh'}
      position="fixed"
      top={0}
      left={0}
      alignItems="center"
      justifyContent="center"
      zIndex={200}
      style={{
        backgroundColor: 'rgb(0,0,0, .06)',
        backdropFilter: 'blur(3px)',
      }}
    >
      {/* <Spinner
        shadow="0px 0px 8px rgb(0,0,0, .1)"
        colorScheme="purple"
        mt="56px"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple"
        size="xl"
      /> */}
    </Flex>
  );
}
