import React from 'react'
import ReactDOM from 'react-dom/client'
import { Settings } from './Settings.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme.ts'
import "./options.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider cssVarsRoot='#root' theme={theme}>
        <Settings fullScreen/>
    </ChakraProvider>
  </React.StrictMode>,
)
