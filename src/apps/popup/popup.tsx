import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '../../features/chakra/ChakraProvider.tsx'
import "./popup.css";
import { Settings } from '../../features/settings/Settings.tsx';

const rootId = 'root';
ReactDOM.createRoot(document.getElementById(rootId)!).render(
  <React.StrictMode>
    <ChakraProvider cssVarsRoot={`#${rootId}`}>
      <Settings />
    </ChakraProvider>
  </React.StrictMode>,
)
