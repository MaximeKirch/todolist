// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#e4f0ff',
    100: '#b3d4ff',
    200: '#80b8ff',
    300: '#4d9bff',
    400: '#1b7eff',
    500: '#005be6',
    600: '#0045b4',
    700: '#003182',
    800: '#001d50',
    900: '#000821',
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  styles: {
    global: {
      'html, body': {
        height: '100%',
        backgroundColor: 'gray.800',
      },
      '::-webkit-scrollbar': {
        display: 'none',
      },
      html: {
        scrollbarWidth: 'none',
      },
      body: {
        msOverflowStyle: 'none',
      },
    },
  },
});

export default theme;
