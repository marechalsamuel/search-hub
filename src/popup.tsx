import React from 'react'
import ReactDOM from 'react-dom/client'
import { Settings } from './Settings.tsx'
import { ChakraProvider } from './ChakraProvider'
import "./popup.css";

const rootId = 'root';
ReactDOM.createRoot(document.getElementById(rootId)!).render(
  <React.StrictMode>
    <ChakraProvider cssVarsRoot={`#${rootId}`}>
        <Settings />
    </ChakraProvider>
  </React.StrictMode>,
)
