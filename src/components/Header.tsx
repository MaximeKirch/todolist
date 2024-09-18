import { Stack } from '@chakra-ui/react';
import { FilterPicker } from './ui/organisms/FilterPicker';

interface HeaderProps {
  filter: string;
  setFilter: (arg: string) => void;
}

export const Header = ({ filter, setFilter }: HeaderProps) => {
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
    </Stack>
  );
};
