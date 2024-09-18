import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import theme from './theme'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            {/* Script pour respecter la préférence de l'utilisateur */}
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
        </ChakraProvider>
    </React.StrictMode>,
);
