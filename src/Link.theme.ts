import { defineStyle, defineStyleConfig } from "@chakra-ui/system";
import { transparentize } from "@chakra-ui/theme-tools";

const variantButton = defineStyle((props) => {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    padding: "0 1rem",
    lineHeight: "1.2",
    borderRadius: "md",
    fontWeight: "semibold",
    transitionProperty: "common",
    transitionDuration: "normal",
    _focusVisible: {
      boxShadow: "outline",
    },
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed",
      boxShadow: "none",
    },
    _hover: {
      _disabled: {
        bg: "initial",
      },
    },
  };

  const { colorScheme: c, theme } = props;


  if (!c || c === "gray") {
    return {
      ...baseStyle,
      color: `gray.800`,
      _hover: {
        ...baseStyle._hover,
        textDecoration: "none",
        bg: `gray.100`,
      },
      _active: {
        color: `gray.800`,
        bg: `gray.200`,
      },
      _visited: {
        color: "gray.800",
      },
      _dark: {
        color: `whiteAlpha.900`,
        _hover: {
          textDecoration: "none",
          bg: `whiteAlpha.200`,
        },
        _active: {
          color: `whiteAlpha.900`,
          bg: `whiteAlpha.300`,
        },
        _visited: {
          color: "whiteAlpha.900",
        },
      },
    };
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme);
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme);

  return {
    ...baseStyle,
    color: `${c}.600`,
    bg: "transparent",
    _hover: {
      ...baseStyle._hover,
      textDecoration: "none",
      bg: `${c}.50`,
    },
    _active: {
      color: `${c}.600`,
      bg: `${c}.100`,
    },
    _visited: {
      color: `${c}.600`,
    },
    _dark: {
      color: `${c}.200`,
      _hover: {
        textDecoration: "none",
        bg: darkHoverBg,
      },
      _active: {
        color: `${c}.200`,
        bg: darkActiveBg,
      },
      _visited: {
        color: `${c}.200`,
      },
    },
  };
});

export const linkTheme = defineStyleConfig({
  variants: { button: variantButton },
});
