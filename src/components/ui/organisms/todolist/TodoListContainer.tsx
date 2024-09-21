import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import {
  useCompleteTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateTodo,
} from '../../../../queries/todoApi';
import { filterTodos } from '../../../../utils/filterTodos';
import { AddTodoContainer } from './AddTodoContainer';
import { Task } from '../../../../types/TaskType';
import { TodoItem } from '../TodoItem';
import { useState, useEffect } from 'react';
import { ConfirmationToast } from './ConfirmationToast';

interface TodoListContainerProps {
  filter: string;
}

export const TodoListContainer = ({ filter }: TodoListContainerProps) => {
  const { data: todos, isLoading, isError } = useGetTodos();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: completeTodo } = useCompleteTodo();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [localTodos, setLocalTodos] = useState<Task[]>([]); // Gestion locale des todos
  const [isDeleteToastVisible, setDeleteToastVisible] =
    useState<boolean>(false);
  const [isConfirmationToastVisible, setConfirmationToastVisible] =
    useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Met à jour localTodos lorsque `todos` est chargé
  useEffect(() => {
    if (todos) {
      setLocalTodos(todos);
    }
  }, [todos]);

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

  const filteredTodos =
    localTodos && filter ? filterTodos({ todos: localTodos, filter }) : [];

  const handleMenuToggle = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleSaveEdit = (
    _id: string,
    updatedTask: { task_name: string; due_date: string }
  ) => {
    updateTodo({
      _id,
      task_name: updatedTask.task_name,
      due_date: updatedTask.due_date,
    });
  };

  const handleCompleteTodo = (
    _id: string,
    updatedTask: { is_complete: boolean }
  ) => {
    completeTodo({
      _id,
      is_complete: updatedTask.is_complete,
    });
  };

  const handleDelete = (todo: Task) => {
    deleteTodo(todo._id, {
      onSuccess: () => {
        setToastMessage('Task successfully deleted!');
        setDeleteToastVisible(true);

        setTimeout(() => setDeleteToastVisible(false), 2000);
      },
      onError: (error) => {
        setToastMessage('Error deleting task.');
        setDeleteToastVisible(true);

        setTimeout(() => setDeleteToastVisible(false), 2000);
      },
    });
  };

  return (
    <Flex width={'100%'} flexDirection={'column'} alignItems={'center'}>
      <AddTodoContainer
        setConfirmationToastVisible={setConfirmationToastVisible}
        setToastMessage={setToastMessage}
      />
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
          filteredTodos?.map((todo: Task) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              isMenuOpen={openMenuId === todo._id}
              onMenuToggle={() => handleMenuToggle(todo._id)}
              onSaveEdit={handleSaveEdit}
              handleDelete={handleDelete}
              onComplete={handleCompleteTodo}
            />
          ))
        )}
        {isConfirmationToastVisible && (
          <ConfirmationToast
            message={toastMessage}
            isVisible={isConfirmationToastVisible}
            onClose={() => {
              setConfirmationToastVisible(false);
            }}
          />
        )}
        {isDeleteToastVisible && (
          <ConfirmationToast
            message={toastMessage}
            isVisible={isDeleteToastVisible}
            onClose={() => {
              setDeleteToastVisible(false);
            }}
          />
        )}
      </Stack>
    </Flex>
  );
};
