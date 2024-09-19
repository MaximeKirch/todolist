import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import { useAuth } from '../../../context/AuthContext';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // État pour les messages d'erreur
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in both email and password fields');
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('Failed to login. Please check your credentials.');
      console.error('Failed to login', error);
    }
  };

  return (
    <Box
      m={2}
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="40vh"
      w="40vw"
    >
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <VStack spacing={4}>
          <Input
            type="email"
            value={email}
            color={'gray.100'}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            width="100%"
          />
          <Input
            type="password"
            value={password}
            color={'gray.100'}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            width="100%"
          />
          <Button type="submit" mt={4} width="100%">
            Login
          </Button>
          {errorMessage && (
            <Text color="red.500" fontSize="sm">
              {errorMessage}
            </Text>
          )}
        </VStack>
      </form>
    </Box>
  );
};
