import { useEffect } from "react";
import { LdsColorMode } from "./ldsColorMode/ldsColorMode.hook.ts";
import theme from "./theme.ts";
import {
  ColorModeScript,
  ChakraProvider as OriginalChakraProvider,
  ChakraProviderProps,
  useColorMode,
} from "@chakra-ui/react";
import useExtensionStorage from "../storage/extenstionStorage.hook.ts";

const ColorMode = () => {
  const { storedData: storedColorMode } =
    useExtensionStorage<LdsColorMode>("colorMode", "system");

  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (storedColorMode && storedColorMode !== colorMode) {
      setColorMode(storedColorMode);
    }
  }, [storedColorMode, colorMode, setColorMode]);

  return <ColorModeScript initialColorMode={theme.config.initialColorMode} />
};

export const ChakraProvider = ({ children, ...props }: ChakraProviderProps) => {
  return (
    <OriginalChakraProvider {...props} cssVarsRoot="#crx-root" theme={theme}>
      <ColorMode />
      {children}
    </OriginalChakraProvider>
  );
};
