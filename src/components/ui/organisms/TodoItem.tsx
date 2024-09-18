import { Task } from '../../../types/TaskType';
import { Flex, Checkbox, Text, Box } from '@chakra-ui/react';
import { useState } from 'react';

interface TodoItemProps {
  todo: Task;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(
    todo.isComplete
  );

  const handleCheckbox = () => {
    setToggleCheckBox(!toggleCheckBox);
  };
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyItems={'space-around'}
      key={todo.id}
      p={4}
      w="60%"
      mb={2}
      onClick={handleCheckbox}
    >
      <Box display={'flex'} flexDirection="row">
        <Checkbox mr={2} isChecked={toggleCheckBox} />
        <Text as={toggleCheckBox ? 'del' : undefined} color="gray.100">
          {todo.task_name}
        </Text>
      </Box>
    </Box>
  );
};
