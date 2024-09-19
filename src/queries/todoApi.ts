import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Task {
  id?: number;
  task_name: string;
  due_date: string;
}

export const useGetTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await axios.get('mockTodos.json');
      return response.data;
    },
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTask: Task) => {
      const response = await axios.post('/api/todos', newTask);
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
