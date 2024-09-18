import { Box, Button, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion'; // Import de framer-motion

interface FilterPickerProps {
  filter: string;
  setFilter: (arg: string) => void;
}

export const FilterPicker = ({ filter, setFilter }: FilterPickerProps) => {
  const filters = ['Today', 'Week', 'Month', 'Year', 'Past'];

  const toggleFilter = (filter: string) => {
    setFilter(filter);
  };

  return (
    <Box
      justifyItems={'center'}
      alignContent={'center'}
      h={'60px'}
      bg={'gray.800'}
      position="relative"
    >
      <Stack flexDirection={'row'} spacing={4}>
        {filters.map((value) => (
          <Button
            key={value}
            borderTop={'transparent'}
            borderRight={'transparent'}
            borderLeft={'transparent'}
            borderColor={'teal'}
            borderRadius={0}
            borderWidth={0}
            color={value === filter ? 'gray.200' : 'gray.700'}
            _hover={{ bg: 'transparent', color: 'gray.200' }}
            variant={value === filter ? 'outline' : 'ghost'}
            onClick={() => toggleFilter(value)}
            position="relative"
          >
            {value}
            {/* Barre animée */}
            {value === filter && (
              <motion.div
                layoutId="underline"
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: 'teal',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};
