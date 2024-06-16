import { extendTheme } from '@chakra-ui/react'
import { linkTheme } from "./Link.theme";
import { storage } from '../storage/storage';

const { colorMode } = await storage?.local.get("colorMode") || {};

const theme = extendTheme({
  config: {
    initialColorMode: colorMode || 'system',
    useSystemColorMode: false,
  },
  components: {
    Link: linkTheme,
  }
})

export default theme