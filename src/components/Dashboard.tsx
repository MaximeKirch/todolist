// components/Dashboard.tsx
import React, { useState } from 'react';
import { Main } from './Main';
import { Box } from '@chakra-ui/react';
import { Header } from './ui/organisms/Header';

export const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState<string>('Today');

  return (
    <Box>
      <Header filter={filter} setFilter={setFilter} />
      <Main filter={filter} />
    </Box>
  );
};
