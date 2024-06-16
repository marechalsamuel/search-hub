import theme from "./theme.ts";
import {
  ColorModeScript,
  ChakraProvider as OriginalChakraProvider,
  ChakraProviderProps,
} from "@chakra-ui/react";
import { LdsColorModeScript } from "./ldsColorMode/LdsColorModeScript.tsx";

export const ChakraProvider = ({ children, ...props }: ChakraProviderProps) => {
  return (
    <OriginalChakraProvider {...props} cssVarsRoot="#crx-root" theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <LdsColorModeScript />
      {children}
    </OriginalChakraProvider>
  );
};
