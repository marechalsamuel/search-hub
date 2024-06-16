import { useEffect, useState, useMemo } from "react";
import {
  VStack,
  Box,
  IconButton,
  Img,
  Heading,
  HStack,
  Code,
} from "@chakra-ui/react";
import { useLocalStorage } from "react-use";
import { EntriesManager } from "./EntriesManager";
import useExtensionStorage from "./extenstion-storage.hook";
import { EntryForm } from "./EntryForm";
import { MdFullscreen } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Entry, entrySchema } from "./entry.entity";
import { v4 as uuid } from "uuid";
import { ColorModeSelect } from "./ColorModeSelect";

const openOptionsPage = () => {
  if (
    typeof chrome !== "undefined" &&
    chrome.runtime &&
    chrome.runtime.openOptionsPage
  ) {
    chrome.runtime.openOptionsPage();
    window.close();
  } else if (
    typeof browser !== "undefined" &&
    browser.runtime &&
    browser.runtime.openOptionsPage
  ) {
    browser.runtime.openOptionsPage();
    window.close();
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

  const defaultValues = useMemo(() => {
    return selectedEntry
      ? selectedEntry
      : {
          id: uuid(),
          name: "",
          icon: "",
          url: "",
        };
  }, [selectedEntry]);

  const form = useForm<Entry>({
    resolver: zodResolver(entrySchema),
    defaultValues,
    mode: "all",
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const handleEntrySelection = (entry?: Entry) => {
    setSelectedEntry(entry);
    form.setFocus("url");
  };

  return (
    <Box pos="absolute" top="10px" right="10px" bottom="10px" left="10px">
      <VStack h="100%" w="100%" justify="space-between">
        <HStack justify="space-between" w="100%" align="flex-start">
          <ColorModeSelect />
          <HStack alignItems="flex-end">
            <Img src="search-hub-32.png" />
            <Heading>Search Hub</Heading>
            <Code>{import.meta.env.PACKAGE_VERSION}</Code>
          </HStack>
          {!fullScreen && (
            <IconButton
              icon={<MdFullscreen />}
              aria-label="Fullscreen"
              onClick={openOptionsPage}
            />
          )}
        </HStack>
        <EntryForm
          form={form}
          entries={entries}
          setEntries={setEntries}
          setSelectedEntry={setSelectedEntry}
          selectedEntry={selectedEntry}
          w="100%"
        />
        <EntriesManager
          forceDrag={fullScreen}
          entries={entries}
          setEntries={setEntries}
          onClick={handleEntrySelection}
          selectedEntry={selectedEntry}
          overflowX="auto"
        />
      </VStack>
      </Box>
  );
};
