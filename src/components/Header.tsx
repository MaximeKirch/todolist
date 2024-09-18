import { Flex, Button, useColorMode } from '@chakra-ui/react';

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
      bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}
      color={colorMode === 'light' ? 'black' : 'white'}
    >
      <Button mb={2} onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </Flex>
  );
};
