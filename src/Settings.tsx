import { useEffect, useState } from "react";
import {
  VStack,
  Box,
  IconButton,
  Img,
  Heading,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { useLocalStorage } from "react-use";
import { Entry } from "./Entry";
import { EntriesManager } from "./EntriesManager";
import useExtensionStorage from "./extenstion-storage.hook";
import { EntryForm } from "./EntryForm";
import { MdFullscreen } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";

const openOptionsPage = () => {
  if (
    typeof chrome !== "undefined" &&
    chrome.runtime &&
    chrome.runtime.openOptionsPage
  ) {
    chrome.runtime.openOptionsPage();
  } else if (
    typeof browser !== "undefined" &&
    browser.runtime &&
    browser.runtime.openOptionsPage
  ) {
    browser.runtime.openOptionsPage();
  } else {
    console.error("Unsupported browser for openOptionsPage.");
  }
};
export type SettingsProps = {
  fullScreen?: boolean;
};
export const Settings = ({ fullScreen }: SettingsProps) => {
  const { storedData, sendToStorage } = useExtensionStorage<Entry[]>("entries");
  const [entries = [], setEntries] = useLocalStorage<Entry[]>("entries");
  useEffect(() => {
    if (entries !== storedData) {
      try {
        sendToStorage(entries);
      } catch (e) {
        console.error(e);
      }
    }
  }, [entries, storedData, sendToStorage]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>();
  const handleSelectedEntryChange = (entry: Entry | undefined) => {
    setSelectedEntry(entry);
  }
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box pos="absolute" top="10px" right="10px" bottom="10px" left="10px">
      <VStack h="100%" w="100%">
        <HStack justify="space-between" w="100%" align="flex-start">
          <IconButton
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            aria-label="Fullscreen"
            onClick={toggleColorMode}
          />
          <HStack>
            <Img src="search-hub-96.png" />
            <Heading>Search Hub</Heading>
          </HStack>
          {fullScreen ? (<div></div>): (
            <IconButton
              icon={<MdFullscreen />}
              aria-label="Fullscreen"
              onClick={() => openOptionsPage()}
            />
          )}
        </HStack>
        <EntryForm
          entries={entries}
          setEntries={setEntries}
          setSelectedEntry={setSelectedEntry}
          selectedEntry={selectedEntry}
          w="100%"
        />
        <EntriesManager
          entries={entries}
          setEntries={setEntries}
          onClick={setSelectedEntry}
          selectedEntry={selectedEntry}
          flex="1"
        />
      </VStack>
    </Box>
  );
};
