import { useColorModePreference } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/system";
import useExtensionStorage from "../../storage/extenstionStorage.hook";

export type LdsColorMode = "light" | "dark" | "system";

export const useLdsColorMode = () => {
  const { storedData, sendToStorage } = useExtensionStorage<LdsColorMode>("colorMode", "system");
  const { setColorMode } = useColorMode();
  const systemColorMode = useColorModePreference();

  const handleLdsColorModeChange = (value: LdsColorMode) => {
    if (value === "system") {
      setColorMode(systemColorMode);
    } else {
      setColorMode(value);
    }
    sendToStorage(value);
  };

  return { ldsColorMode: storedData, setLdsColorMode: handleLdsColorModeChange };
};
