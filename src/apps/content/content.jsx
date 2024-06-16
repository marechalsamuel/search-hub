import React from "react";
import ReactDOM from "react-dom/client";
import { Entries } from "../../features/entry/Entries";
import "./content.css";
import { ChakraProvider } from "../../features/chakra/ChakraProvider";

const root = document.createElement("div");
const rootId = "crx-root";
root.id = rootId;
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ChakraProvider
      cssVarsRoot={`#${rootId}`}
      disableGlobalStyle={true}
      resetCSS={false}
    >
      <Entries />
    </ChakraProvider>
  </React.StrictMode>
);
