import React, { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await register(email, password);
      navigate('/todos');
    } catch (err) {
      console.error('Failed to register', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Démarre avec opacité 0 et légèrement en dessous
      animate={{ opacity: 1, y: 0 }} // Passe à opacité 1 et position normale
      transition={{ duration: 0.8, ease: 'easeOut' }} // Animation fluide
    >
      <Box
        maxW="md"
        mx="auto"
        mt={10}
        p={6}
        borderWidth={1}
        borderRadius="md"
        bg="gray.800"
        color="gray.100"
      >
        <Heading mb={6} textAlign="center" color="teal.300">
          Create an Account
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
              color="gray.100"
              _placeholder={{ color: 'gray.400' }}
            />
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
              color="gray.100"
              _placeholder={{ color: 'gray.400' }}
            />
            <Input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              bg="gray.700"
              borderColor="gray.600"
              color="gray.100"
              _placeholder={{ color: 'gray.400' }}
            />
            <Button
              type="submit"
              colorScheme="teal"
              width="100%"
              mt={4}
              isDisabled={!email || !password || !confirmPassword}
            >
              Register
            </Button>
          </VStack>
        </form>
        <Text textAlign="center" mt={4} color="gray.400">
          Already have an account?{' '}
          <Button
            variant="link"
            color="teal.300"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </Text>
      </Box>
    </motion.div>
  );
};
