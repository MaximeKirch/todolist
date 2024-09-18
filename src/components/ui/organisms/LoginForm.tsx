import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { useAuth } from '../../../context/AuthContext';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard'); // Redirige vers la page todo
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  return (
    <Box
      m={2}
      p={4} // Padding du conteneur parent
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="40vh"
      w="40vw"
    >
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {/* Le formulaire prend toute la largeur */}
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
            {' '}
            {/* Le bouton prend aussi toute la largeur */}
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
