import React from 'react';
import { Main } from './components/Main';
import { Header } from './components/Header';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box>
      <Header />
      <Box p={4}>
        <Main />
      </Box>
    </Box>
  );
}

export default App;
