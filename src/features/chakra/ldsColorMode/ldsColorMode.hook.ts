import { useColorModePreference } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/system";
import useExtensionStorage from "../../storage/extenstionStorage.hook";

export type LdsColorMode = "light" | "dark" | "system";

export const useLdsColorMode = () => {
  const { storedData, sendToStorage } = useExtensionStorage<LdsColorMode>("colorMode", "system");
  const { setColorMode: setChakraColorMode } = useColorMode();
  const systemColorMode = useColorModePreference();

  const handleLdsColorModeChange = (value: LdsColorMode) => {
    if (value === "system") {
      setChakraColorMode(systemColorMode);
    } else {
      setChakraColorMode(value);
    }
    sendToStorage(value);
  };

  return { ldsColorMode: storedData, setLdsColorMode: handleLdsColorModeChange };
};
