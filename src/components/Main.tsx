import { TodoListContainer } from './todolist/TodoListContainer';
import { Stack } from '@chakra-ui/react';

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
