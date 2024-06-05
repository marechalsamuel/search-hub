import { useEffect } from "react";
import "./content.css";
import useExtensionStorage from "./extenstion-storage.hook.ts";
import theme from "./theme.ts";
import {
  ColorMode,
  ColorModeScript,
  ChakraProvider as OriginalChakraProvider,
  ChakraProviderProps as OriginalChakraProviderProps,
  useColorMode,
} from "@chakra-ui/react";

export type ChakraProviderProps = OriginalChakraProviderProps;

const SyncColorMode = () => {
  const { storedData: storedColorMode } =
    useExtensionStorage<ColorMode>("colorMode");

  const { colorMode, setColorMode } = useColorMode();

  console.log({ storedColorMode, colorMode })

  useEffect(() => {
    if (storedColorMode && storedColorMode !== colorMode) {
      setColorMode(storedColorMode);
    }
  }, [storedColorMode, colorMode, setColorMode]);

  return null;
};

export const ChakraProvider = ({ children, ...props }: ChakraProviderProps) => {
  return (
    <OriginalChakraProvider
      {...props}
      cssVarsRoot="#crx-root"
      resetCSS={false}
      disableGlobalStyle={true}
      theme={theme}
    >
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <SyncColorMode />
      {children}
    </OriginalChakraProvider>
  );
};
