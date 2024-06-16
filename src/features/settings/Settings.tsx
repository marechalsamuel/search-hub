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
import { EntriesManager } from "./EntriesManager";
import { MdFullscreen } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuid } from "uuid";
import useExtensionStorage from "../storage/extenstionStorage.hook";
import { Entry, entrySchema } from "../entry/entry.entity";
import { LdsColorModeSwitch } from "../chakra/ldsColorMode/LdsColorModeSwitch";
import { EntryForm } from "../entry/EntryForm";

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
  const { storedData: entries = [], sendToStorage: setEntries } = useExtensionStorage<Entry[]>("entries", []);
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
    
  const handleEntryFormSubmit = (entry: Entry) => {
    setSelectedEntry(entry);
    const index = entries.findIndex((e) => e.id === entry.id);
    if (index === -1) {
      setEntries([...entries, entry]);
      return;
    }
    entries[index] = entry;
    setEntries(entries);
  };

  const handleEntryDelete = (entry: Entry) => {
    if (!entry.id) return;
    setSelectedEntry(undefined);
    const index = entries.findIndex((e) => e.id === entry.id);
    if (index === -1) return;
    entries.splice(index, 1);
    setEntries(entries);
  };

  return (
    <Box pos="absolute" top="10px" right="10px" bottom="10px" left="10px">
      <VStack h="100%" w="100%" justify="space-between">
        <HStack justify="space-between" w="100%" align="flex-start">
          <LdsColorModeSwitch />
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
          onSubmit={handleEntryFormSubmit}
          onDelete={handleEntryDelete}
          selectedEntry={selectedEntry}
          w="100%"
        />
        <EntriesManager
          canDrag={fullScreen}
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
