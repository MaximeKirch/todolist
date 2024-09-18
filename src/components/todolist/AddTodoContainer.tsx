import { Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface NewTask {
  task_name: string;
  due_date: string;
}

export const AddTodoContainer = () => {
  const [taskValue, setTaskValue] = useState<string>('');
  const [taskDate, setTaskDate] = useState<string>('');

  const queryClient = useQueryClient();

  const addTask = async (newTask: NewTask) => {
    const response = await axios.post('/api/todos', newTask); // Remplace par ton endpoint API
    return response.data;
  };

  const addTaskMutation = useMutation({
    mutationFn: (newTask: NewTask) => addTask(newTask),
    onSuccess: (newTask) => {
      queryClient.setQueryData<NewTask[]>(['todos'], (oldTodos = []) => [
        ...oldTodos,
        newTask,
      ]);
      setTaskValue('');
      setTaskDate('');
    },
  });

  const handleAddTask = () => {
    if (!taskValue) return;

    const dueDate = taskDate || new Date().toISOString().split('T')[0];

    // Lancer la mutation pour ajouter la nouvelle tâche
    addTaskMutation.mutate({
      task_name: taskValue,
      due_date: dueDate,
    });
  };

  return (
    <Stack
      borderWidth={1}
      borderColor={'black'}
      spacing={3}
      w={'40%'}
      m={4}
      p={4}
      bg={'gray.900'}
      borderRadius={8}
    >
      <InputGroup>
        <Input
          bg={'gray.800'}
          color={'gray.100'}
          placeholder={'Add a task...'}
          _placeholder={{ color: 'gray.100' }}
          value={taskValue}
          onChange={(e) => {
            setTaskValue(e.target.value);
          }}
        />
        {taskValue.length > 0 && (
          <InputRightElement>
            <CheckIcon color={'gray.100'} onClick={handleAddTask} />
          </InputRightElement>
        )}
      </InputGroup>
      <Input
        bg={'gray.800'}
        color={'gray.100'}
        _placeholder={{ color: 'gray.800' }}
        placeholder="Select Date"
        size="md"
        type="date"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
      />
    </Stack>
  );
};
