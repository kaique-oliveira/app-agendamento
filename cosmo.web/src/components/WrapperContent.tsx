import { HStack } from '@chakra-ui/react';

type TypeWrapperContentProps = React.HTMLAttributes<HTMLDivElement>;

export default function WrapperContent({ ...rest }: TypeWrapperContentProps) {
  return (
    <HStack
      w="100%"
      h="100%"
      overflowY="auto"
      justifyContent="flex-start"
      alignItems="flex-start"
      {...rest}
    />
  );
}
