import React from "react";
import ReactDOM from "react-dom/client";
import { Entries } from "./Entries";
import "./content.css";
import theme from './theme.ts'
import { ChakraProvider } from '@chakra-ui/react'

const root = document.createElement("div");
root.id = "crx-root";
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ChakraProvider cssVarsRoot='#crx-root' resetCSS={false} disableGlobalStyle={true} theme={theme}>
        <Entries />
    </ChakraProvider>
  </React.StrictMode>
);