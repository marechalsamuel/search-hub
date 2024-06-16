import { useEffect } from "react";
import { LdsColorMode } from "./ldsColorMode.hook";
import useExtensionStorage from "../../storage/extenstionStorage.hook";
import { useColorMode } from "@chakra-ui/system";


export const LdsColorModeScript = () => {
  const { storedData: storedColorMode } =
    useExtensionStorage<LdsColorMode>("colorMode", "system");

  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (storedColorMode && storedColorMode !== colorMode) {
      setColorMode(storedColorMode);
    }
  }, [storedColorMode, colorMode, setColorMode]);

  return null
};