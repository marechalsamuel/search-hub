import { useColorModePreference } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/system";
import { useState } from "react";

export type LdsColorMode = "light" | "dark" | "system";

export const useLdsColorMode = () => {
  const [state, setState] = useState<LdsColorMode>("system");
  const { setColorMode: setChakraColorMode } = useColorMode();
  const systemColorMode = useColorModePreference();

  const handleLdsColorModeChange = (value: LdsColorMode) => {
    if (value === "system") {
      setChakraColorMode(systemColorMode);
    } else {
      setChakraColorMode(value);
    }
    setState(value);
  };

  return { ldsColorMode: state, setLdsColorMode: handleLdsColorModeChange };
};
