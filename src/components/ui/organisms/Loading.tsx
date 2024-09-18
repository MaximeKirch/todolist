import { Box, Spinner } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Box p={4}>
      <Spinner size="xl" />
    </Box>
  );
};
