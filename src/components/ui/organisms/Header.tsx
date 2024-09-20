import { Box, Button, Stack } from '@chakra-ui/react';
import { FilterPicker } from './FilterPicker';
import { useAuth } from '../../../context/AuthContext';

interface HeaderProps {
  filter: string;
  setFilter: (arg: string) => void;
}

export const Header = ({ filter, setFilter }: HeaderProps) => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <Stack
      flexGrow={1}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-evenly'}
      width={'100%'}
      bg={'gray.800'}
      borderBottom="1px solid"
      borderColor="black"
    >
      <FilterPicker filter={filter} setFilter={setFilter} />
      <Box position={'absolute'} right={2}>
        <Button
          variant={'outline'}
          bg={'transparent'}
          color={'gray.100'}
          onClick={handleLogout}
          _hover={{ color: 'gray.800', bg: 'gray.100' }}
        >
          Logout
        </Button>
      </Box>
    </Stack>
  );
};
