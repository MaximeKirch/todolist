import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface ConfirmationToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const ConfirmationToast = ({
  message,
  isVisible,
  onClose,
}: ConfirmationToastProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Timer pour démarrer l'animation de disparition
      const timer = setTimeout(() => {
        setIsFadingOut(true); // Commence le fondu de sortie
      }, 1500);
      const closeTimer = setTimeout(() => {
        setIsFadingOut(false);
        onClose();
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }
  }, [isVisible, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible && !isFadingOut ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        position="fixed"
        top={4}
        left="50%"
        transform="translateX(-50%)"
        bg="teal.500"
        p={3}
        borderRadius="md"
        color="white"
        shadow="md"
      >
        <Text>{message}</Text>
      </Box>
    </motion.div>
  );
};
