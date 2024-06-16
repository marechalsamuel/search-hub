import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "../../features/chakra/ChakraProvider.tsx";
import "./options.css";
import { Settings } from "../../features/settings/Settings.tsx";

const rootId = "root";
ReactDOM.createRoot(document.getElementById(rootId)!).render(
  <React.StrictMode>
    <ChakraProvider cssVarsRoot={`#${rootId}`}>
      <Settings fullScreen />
    </ChakraProvider>
  </React.StrictMode>
);
