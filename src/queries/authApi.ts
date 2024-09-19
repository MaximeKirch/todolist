import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LogProps {
  email: string;
  password: string;
}

const API_URL = process.env.REACT_APP_API_URL;

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ email, password }: LogProps) => {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    },
    onSuccess: () => {
      navigate('/todo');
    },
  });
};
export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ email, password }: LogProps) => {
      const response = await axios.post(`${API_URL}/api/register`, {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    },
    onSuccess: () => {
      navigate('/todos');
    },
    onError: (e) => {
      console.log(e, 'ERROR');
    },
  });
};
