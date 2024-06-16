import theme from "./theme.ts";
import {
  ColorModeScript,
  ChakraProvider as OriginalChakraProvider,
  ChakraProviderProps as OriginalChakraProviderProps,
} from "@chakra-ui/react";

export type ChakraProviderProps = OriginalChakraProviderProps;

export const ChakraProvider = ({ children, ...props }: ChakraProviderProps) => {
  return (
    <OriginalChakraProvider
      {...props}
      cssVarsRoot="#crx-root"
      theme={theme}
    >
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </OriginalChakraProvider>
  );
};
