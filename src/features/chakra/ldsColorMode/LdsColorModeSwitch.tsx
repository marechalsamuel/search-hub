// Inspired by https://github.com/chakra-ui/chakra-ui/issues/4914#issuecomment-953084112
import { HStack, IconButton, IconButtonProps } from "@chakra-ui/react";
import { FiMonitor } from "react-icons/fi";
import { FaMoon, FaSun, FaRegMoon, FaRegSun } from "react-icons/fa";
import { LdsColorMode, useLdsColorMode } from "./ldsColorMode.hook";

export type LdsColorModeSwitchProps = Pick<IconButtonProps, "borderRadius">;
export const LdsColorModeSwitch = ({
  borderRadius,
}: LdsColorModeSwitchProps) => {
  const { ldsColorMode, setLdsColorMode } = useLdsColorMode();

  const getIconButtonIcon = (value: LdsColorMode) => {
    switch (value) {
      case "light":
        return ldsColorMode === value ? <FaSun /> : <FaRegSun />;
      case "dark":
        return ldsColorMode === value ? <FaMoon /> : <FaRegMoon />;
      case "system":
      default:
        return <FiMonitor />;
    }
  };
  
  const getIconButtonProps = (value: LdsColorMode) => ({
    "aria-label": value,
    onClick: () => setLdsColorMode(value),
    isActive: ldsColorMode === value,
    borderRadius,
    icon: getIconButtonIcon(value),
  });

  return (
    <HStack gap="0">
      <IconButton {...getIconButtonProps("dark")} borderRightRadius="0" />
      <IconButton {...getIconButtonProps("light")} borderRadius="0" />
      <IconButton {...getIconButtonProps("system")} borderLeftRadius="0" />
    </HStack>
  );
};
