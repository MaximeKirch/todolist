import { Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
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
        initial={{ opacity: 0, y: 20 }} // Démarrage invisible et légèrement décalé vers le bas
        animate={{ opacity: 1, y: 0 }} // Transition vers une pleine visibilité
        transition={{ duration: 0.8, ease: 'easeOut' }} // Durée et type d'animation
        style={{
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <VStack spacing={6} width="100%">
          <Heading as="h2" color={'gray.100'}>
            Welcome (back)!
          </Heading>
          <LoginForm />
          <Link href={'/register'}>
            <Text color={'gray.100'}>Don't have an account? Register now!</Text>
          </Link>
        </VStack>
      </motion.div>
    </Flex>
  );
};
