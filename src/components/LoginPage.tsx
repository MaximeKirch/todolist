import { Flex, Heading } from '@chakra-ui/react';
import { LoginForm } from './ui/organisms/LoginForm';
import { motion } from 'framer-motion';

export const LoginPage = () => {
  return (
    <Flex
      width="100vw"
      height="100vh"
      bg="gray.800"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Heading as="h2" color={'gray.100'}>
          Welcome (back) !
        </Heading>
        <LoginForm />
      </motion.div>
    </Flex>
  );
};
