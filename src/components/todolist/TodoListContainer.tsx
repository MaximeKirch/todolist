import { Box, Checkbox, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Task } from '../../types/TaskType';
import { filterTodos } from '../../utils/filterTodos';
import { AddTodoContainer } from './AddTodoContainer';

interface TodoListContainerProps {
  filter: string;
}

// Fonction pour récupérer les todos (mock)
const fetchTodos = async () => {
  const response = await axios.get('/mockTodos.json'); // Utilisation du mock JSON
  return response.data;
};

export const TodoListContainer = ({ filter }: TodoListContainerProps) => {
  // Utilisation de React Query pour récupérer les todos
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
          filteredTodos?.map((todo) => (
            <Box
              display="flex"
              flexDirection="row"
              justifyItems={'space-around'}
              key={todo.id}
              p={4}
              w="60%"
              mb={2}
            >
              <>
                <Checkbox mr={2} isChecked={todo.isComplete} />
                <Text as={todo.isComplete ? 'del' : undefined} color="gray.100">
                  {todo.task_name}
                </Text>
              </>
            </Box>
          ))
        )}
      </Stack>
    </Flex>
  );
};
