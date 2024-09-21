import { Task } from '../../../types/TaskType';
import {
  Flex,
  Checkbox,
  Text,
  Box,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { SettingsIcon, CalendarIcon } from '@chakra-ui/icons';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence

interface TodoItemProps {
  todo: Task;
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  onSaveEdit: (
    id: string,
    updatedTask: { task_name: string; due_date: string }
  ) => void;
  onComplete: (id: string, updatedTask: { is_complete: boolean }) => void;
  handleDelete: (task: Task) => void;
}

export const TodoItem = ({
  todo,
  isMenuOpen,
  onMenuToggle,
  onSaveEdit,
  handleDelete,
  onComplete,
}: TodoItemProps) => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(
    todo.is_complete
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskValue, setTaskValue] = useState<string>(todo.task_name);
  const [taskDate, setTaskDate] = useState<string>(todo.due_date);
  const [isVisible, setIsVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setToggleCheckBox(todo.is_complete);
  }, [todo.is_complete]);

  const handleCheckbox = () => {
    setToggleCheckBox(!toggleCheckBox);
    onComplete(todo._id, { is_complete: !todo.is_complete });
  };

  const handleSave = () => {
    onSaveEdit(todo._id, { task_name: taskValue, due_date: taskDate });
    setIsEditing(false);
  };

  const handleDeleteWithAnimation = () => {
    onMenuToggle();
    setIsVisible(false);
    setTimeout(() => handleDelete(todo), 600);
  };

  const openDatePicker = () => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -50, opacity: 0.3 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: [0, 20, -100],
            opacity: 0.3,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
          }}
          style={{ width: '60%' }}
        >
          <Flex
            display="flex"
            flexDirection="row"
            justifyContent={'space-between'}
            alignItems="center"
            key={todo._id}
            p={4}
            mb={2}
            bg="gray.800"
            borderRadius="md"
            position="relative"
          >
            {isEditing ? (
              <Box w={'100%'}>
                <Input
                  value={taskValue}
                  onChange={(e) => setTaskValue(e.target.value)}
                  placeholder="Edit task name"
                  color={'gray.100'}
                  mb={2}
                />
                <InputGroup>
                  <Input
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    color={'gray.100'}
                    ref={inputRef}
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
                <Button
                  onClick={handleSave}
                  mt={2}
                  colorScheme="teal"
                  size="sm"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  mt={2}
                  ml={2}
                  colorScheme="red"
                  size="sm"
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <>
                <Box
                  _hover={{ cursor: 'pointer' }}
                  onClick={handleCheckbox}
                  display={'flex'}
                  flexDirection="row"
                >
                  <Checkbox mr={2} isChecked={toggleCheckBox} />
                  <Text
                    as={toggleCheckBox ? 'del' : undefined}
                    color="gray.100"
                  >
                    {todo.task_name}
                  </Text>
                </Box>

                <Box
                  onClick={onMenuToggle}
                  _hover={{ cursor: 'pointer' }}
                  color={'#FAFAFA'}
                  position="relative"
                >
                  <SettingsIcon color={'gray.500'} />
                </Box>

                {isMenuOpen && (
                  <Box
                    position="absolute"
                    top="100%"
                    right={0}
                    bg="gray.700"
                    borderRadius="md"
                    boxShadow="md"
                    p={2}
                    zIndex={10}
                    w="150px"
                  >
                    <Text
                      color="gray.100"
                      _hover={{ bg: 'gray.600', cursor: 'pointer' }}
                      p={2}
                      onClick={() => {
                        setIsEditing(true);
                        onMenuToggle();
                      }}
                    >
                      Edit
                    </Text>
                    <Text
                      color="gray.100"
                      _hover={{ bg: 'gray.600', cursor: 'pointer' }}
                      p={2}
                      onClick={handleDeleteWithAnimation}
                    >
                      Delete
                    </Text>
                  </Box>
                )}
              </>
            )}
          </Flex>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
