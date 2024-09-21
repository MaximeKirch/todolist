import { Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react';
import { CheckIcon, CalendarIcon } from '@chakra-ui/icons';
import { useState, useRef } from 'react';
import { useAddTodo } from '../../../../queries/todoApi';

interface NewTask {
  task_name: string;
  due_date: string;
}

export const AddTodoContainer = ({
  setConfirmationToastVisible,
  setToastMessage,
}: {
  setConfirmationToastVisible: (arg: boolean) => void;
  setToastMessage: (message: string) => void;
}) => {
  const [taskValue, setTaskValue] = useState<string>('');
  const [taskDate, setTaskDate] = useState<string>('');

  const addTaskMutation = useAddTodo();
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleAddTask = async () => {
    if (!taskValue) return;

    const dueDate = taskDate || new Date().toISOString().split('T')[0];

    try {
      addTaskMutation.mutate({
        task_name: taskValue,
        due_date: dueDate,
      });
      setTaskDate('');
      setTaskValue('');
      setToastMessage('Task successfully added !');
      setConfirmationToastVisible(true);
    } catch (e) {
      console.log(e);
    }
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
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
      {/* Input pour ajouter une tâche */}
      <InputGroup>
        <Input
          bg={'gray.800'}
          borderColor={'black'}
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
            <CheckIcon
              _hover={{
                cursor: 'pointer',
                color: 'teal',
                transform: { scale: 1.1 },
                transition: '0.2s ease',
              }}
              color={'gray.100'}
              borderColor={'black'}
              onClick={handleAddTask}
            />
          </InputRightElement>
        )}
      </InputGroup>

      {/* Input de type date avec icône de calendrier personnalisée */}
      <InputGroup>
        <Input
          bg={'gray.800'}
          borderColor={'black'}
          color={'gray.100'}
          _placeholder={{ color: 'gray.800' }}
          placeholder="Select Date"
          size="md"
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          ref={dateInputRef}
          sx={{
            '&::-webkit-calendar-picker-indicator': {
              opacity: 0,
              position: 'absolute',
              right: '10px',
            },
          }}
        />
        <InputRightElement
          onClick={openDatePicker}
          _hover={{ cursor: 'pointer' }}
        >
          <CalendarIcon color="gray.100" />
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
};
