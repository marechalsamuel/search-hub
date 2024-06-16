import { extendTheme } from '@chakra-ui/react'
import { linkTheme } from "./Link.theme";
import { storage } from '../storage/storage';

const initialColorMode = await storage?.local.get("colorMode").then((result) => result["colorMode"]) || 'system';

const theme = extendTheme({
  config: {
    initialColorMode,
    useSystemColorMode: false,
  },
  components: {
    Link: linkTheme,
  }
})

export default theme