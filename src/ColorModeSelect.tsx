import {
  HStack,
  IconButton,
  IconButtonProps,
  useColorMode,
  useColorModePreference,
} from "@chakra-ui/react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import useExtensionStorage from "./extenstion-storage.hook";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorMode = "light" | "dark" | "system";
export type ColorModeSelectProps = Pick<IconButtonProps, "borderRadius">;
export const ColorModeSelect = ({ borderRadius }: ColorModeSelectProps) => {
  const { colorMode: chakraColorMode, setColorMode: setChakraColorMode } =
    useColorMode();
  const systemColorMode = useColorModePreference();
  const { storedData: colorMode, sendToStorage: sendColorModeToStorage } =
    useExtensionStorage<ColorMode>("colorMode", "system");

  const changeColorMode = (value: ColorMode) => {
    if (value === "system") {
      setChakraColorMode(systemColorMode);
    } else {
      setChakraColorMode(value);
    }
    sendColorModeToStorage(value);
};

  const getIcon = (value: ColorMode) => {
    switch (value) {
      case "light":
        return chakraColorMode === value ? <FaSun /> : <FiSun />;
      case "dark":
        return chakraColorMode === value ? <FaMoon /> : <FiMoon />;
      case "system":
      default:
        return <FiMonitor />;
    }
  };
  const getProps = (value: ColorMode) => ({
    "aria-label": value,
    onClick: () => changeColorMode(value),
    isActive: colorMode === value,
    borderRadius,
    icon: getIcon(value),
  });

  return (
    <HStack gap="0">
      <IconButton {...getProps("dark")} borderRightRadius="0" />
      <IconButton {...getProps("light")} borderRadius="0" />
      <IconButton {...getProps("system")} borderLeftRadius="0" />
    </HStack>
  );
};
