// src/theme.ts
import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#e4f0ff',
    100: '#b3d4ff',
    200: '#80b8ff',
    300: '#4d9bff',
    400: '#1b7eff',
    500: '#005be6', // Couleur principale
    600: '#0045b4',
    700: '#003182',
    800: '#001d50',
    900: '#000821',
  },
};

// Étendre le thème Chakra par défaut
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
        height: '100%', // S'assure que le contenu utilise 100% de la hauteur de la fenêtre
      },
      '::-webkit-scrollbar': {
        display: 'none', // Masque la barre de défilement pour Chrome, Safari et Opera
      },
      html: {
        scrollbarWidth: 'none', // Masque la barre de défilement pour Firefox
      },
      body: {
        msOverflowStyle: 'none', // Désactive la barre de défilement pour IE et Edge
      },
    },
  },
});

export default theme;
