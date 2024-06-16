import { extendTheme } from '@chakra-ui/react'
import { linkTheme } from "./Link.theme";

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: false,
  },
  components: {
    Link: linkTheme,
  }
})

export default theme