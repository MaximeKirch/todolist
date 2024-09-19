import { Stack } from '@chakra-ui/react';
import { TodoListContainer } from './ui/organisms/todolist/TodoListContainer';

interface MainProps {
  filter: string;
}

export const Main = ({ filter }: MainProps) => {
  return (
    <Stack flex={1} justifyItems={'center'} alignContent={'center'}>
      <TodoListContainer filter={filter} />
    </Stack>
  );
};
