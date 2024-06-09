import { defineStyle, defineStyleConfig } from "@chakra-ui/system";
import { transparentize } from "@chakra-ui/theme-tools";

const variantButtonGhost = defineStyle((props) => {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
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
      textDecoration: "none",
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


type AccessibleColor = {
  bg?: string
  color?: string
  hoverBg?: string
  activeBg?: string
}
/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: "yellow.400",
    color: "black",
    hoverBg: "yellow.500",
    activeBg: "yellow.600",
  },
  cyan: {
    bg: "cyan.400",
    color: "black",
    hoverBg: "cyan.500",
    activeBg: "cyan.600",
  },
};

const variantButtonSolid = defineStyle((props) => {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    height: "40px",
    padding: "0 1em",
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
      textDecoration: "none",
      _disabled: {
        bg: "initial",
      },
    },
  };

  const { colorScheme: c } = props;

  const {
    bg = `${c}.500`,
    color = "white",
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] ?? {};

  if (!c || c === "gray") {
    return {
      ...baseStyle,
      bg: `gray.100`,
      color: `gray.800`,
      _hover: {
        ...baseStyle._hover,
        bg: `gray.200`,
        _disabled: {
          bg,
        },
      },
      _active: { bg: `gray.300` },
      _dark: {
        bg: `whiteAlpha.200`,
        color: `whiteAlpha.900`,
        _hover: {
          ...baseStyle._hover,
          bg: `whiteAlpha.300`,
          _disabled: {
            bg,
          },
        },
        _active: { bg: `whiteAlpha.400` },
      },
    };
  }

  return {
    ...baseStyle,
    bg,
    color,
    _hover: {
      ...baseStyle._hover,
      bg: hoverBg,
      _disabled: {
        bg,
      },
    },
    _active: { bg: activeBg },
    _dark: {
      bg: `${c}.200`,
      color: `gray.800`,
      _hover: {
        ...baseStyle._hover,
        bg: `${c}.300`,
        _disabled: {
          bg: `${c}.200`,
        },
      },
      _active: { bg: `${c}.400` },
    },
  };
});

export const linkTheme = defineStyleConfig({
  variants: {
    buttonSolid: variantButtonSolid,
    buttonGhost: variantButtonGhost,
  },
});
