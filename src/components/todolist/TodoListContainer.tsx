import { Box, Checkbox, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Task } from '../../types/TaskType';
import { filterTodos } from '../../utils/filterTodos';
import { AddTodoContainer } from './AddTodoContainer';
import { TodoItem } from '../ui/organisms/TodoItem';

interface TodoListContainerProps {
  filter: string;
}

// Fonction pour récupérer les todos (mock)
const fetchTodos = async () => {
  const response = await axios.get('/mockTodos.json'); // Utilisation du mock JSON
  return response.data;
};

export const TodoListContainer = ({ filter }: TodoListContainerProps) => {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery<Task[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="gray.800"
      >
        <Spinner size={'xl'} color={'gray.100'} />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="gray.800"
      >
        <Text color="gray.100">Error loading todos.</Text>
      </Flex>
    );
  }

  const filteredTodos = todos && filterTodos({ todos, filter });

  return (
    <Flex width={'100%'} flexDirection={'column'} alignItems={'center'}>
      <AddTodoContainer />
      <Stack
        minHeight={'100vh'}
        width="100%"
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        bg={'gray.800'}
        spacing={4}
      >
        {filteredTodos && filteredTodos.length === 0 ? (
          <Text color="gray.100">No todos found for the selected filter.</Text>
        ) : (
          filteredTodos &&
          filteredTodos?.map((todo) => <TodoItem todo={todo} />)
        )}
      </Stack>
    </Flex>
  );
};
