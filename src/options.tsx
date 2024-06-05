import React from 'react'
import ReactDOM from 'react-dom/client'
import { Settings } from './Settings.tsx'
import { ChakraProvider } from './ChakraProvider'
import "./options.css";

const rootId = 'root';
ReactDOM.createRoot(document.getElementById(rootId)!).render(
  <React.StrictMode>
    <ChakraProvider cssVarsRoot={`#${rootId}`}>
        <Settings fullScreen/>
    </ChakraProvider>
  </React.StrictMode>,
)
