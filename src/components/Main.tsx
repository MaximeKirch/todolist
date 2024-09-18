import { TodoListContainer } from './todolist/TodoListContainer';
import { useState } from 'react';
import { Stack } from '@chakra-ui/react';

interface MainProps {
  filter: string;
}

export const Main = ({ filter }: MainProps) => {
  const [newTask, setNewTask] = useState('');

  return (
    <Stack flex={1} justifyItems={'center'} alignContent={'center'}>
      <TodoListContainer filter={filter} />
    </Stack>
  );
};
