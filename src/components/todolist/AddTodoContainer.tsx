import { Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';

export const AddTodoContainer = () => {
  const [taskValue, setTaskValue] = useState<string>('');
  return (
    <Stack spacing={3} w={'40%'} m={4}>
      <Input
        bg={'gray.800'}
        color={'gray.100'}
        placeholder={'Add a task...'}
        _placeholder={{ color: 'gray.100' }}
        onChange={(e) => {
          setTaskValue(e.target.value);
        }}
      />
      <Input
        bg={'gray.800'}
        color={'gray.100'}
        _placeholder={{ color: 'gray.800' }}
        placeholder="Select Date and Time"
        size="md"
        type="date"
      />
    </Stack>
  );
};
