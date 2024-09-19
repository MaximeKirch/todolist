import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Task {
  _id?: string;
  task_name: string;
  due_date: string;
}

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => localStorage.getItem('token');

// Configuration d'Axios pour ajouter le token aux headers
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useGetTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/todos`);
      return response.data;
    },
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask: Task) => {
      const response = await axiosInstance.post(`/api/todos`, newTask);
      return response.data;
    },
    onSuccess: (newTask: Task) => {
      queryClient.setQueryData<Task[]>(['todos'], (oldTodos = []) => [
        ...oldTodos,
        newTask,
      ]);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedTask: Task) => {
      const response = await axiosInstance.patch(
        `/api/todo/${updatedTask._id}`,
        updatedTask
      );
      return response.data;
    },
    onSuccess: (updatedTask: Task) => {
      queryClient.setQueryData<Task[]>(['todos'], (oldTodos = []) =>
        oldTodos.map((todo) =>
          todo._id === updatedTask._id ? updatedTask : todo
        )
      );
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const response = await axiosInstance.delete(`/api/todo/${taskId}`);
      return response.data;
    },
    onSuccess: (taskId: string) => {
      queryClient.setQueryData<Task[]>(['todos'], (oldTodos = []) =>
        oldTodos.filter((todo) => todo._id !== taskId)
      );
    },
  });
};
