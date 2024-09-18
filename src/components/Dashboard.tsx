// components/Dashboard.tsx
import React, { useState } from 'react';
import { Main } from './Main';
import { Header } from './Header';
import { Box } from '@chakra-ui/react';

export const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState<string>('Today');

  return (
    <Box bg={'gray.800'}>
      <Header filter={filter} setFilter={setFilter} />
      <Box height={'100%'} p={4}>
        <Main filter={filter} />
      </Box>
    </Box>
  );
};
