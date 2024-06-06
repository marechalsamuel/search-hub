import React from "react";
import ReactDOM from "react-dom/client";
import { Entries } from "./Entries";
import "./content.css";
import { ChakraProvider } from "./ChakraProvider";

const root = document.createElement("div");
const rootId = "crx-root";
root.id = rootId;
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ChakraProvider
      cssVarsRoot={`#${rootId}`}
      disableGlobalStyle={true}
      resetCSS={true}
    >
      <Entries />
    </ChakraProvider>
  </React.StrictMode>
);
