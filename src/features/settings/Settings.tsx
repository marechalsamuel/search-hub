import { useEffect, useState, useMemo } from "react";
import {
  VStack,
  Box,
  IconButton,
  Img,
  Heading,
  HStack,
  Code,
  useDisclosure,
  Button,
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
import { PresetSelect } from "../presets/PresetSelect";
import { ConfirmationModal } from "../../ui/ConfirmationModal";
import { CopyIcon } from "@chakra-ui/icons";
import { getPresets } from "../presets/presets";

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
  const presets = useMemo(() => getPresets(), []);
  const { storedData: entries = [], sendToStorage: setEntries } =
    useExtensionStorage<Entry[]>("entries", presets);
  const [selectedEntry, setSelectedEntry] = useState<Entry | undefined>();

  const defaultValues = useMemo(() => {
    const { id = uuid(), name = "", icon = "", url = "" } = selectedEntry || {};
    return { id, name, icon, url };
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

  const [confirmationCallback, setConfirmationCallback] =
    useState<() => void>();
  const handleEntryDelete = (entry: Entry) => {
    if (!entry.id) return;
    onOpen();
    setConfirmationCallback(() => () => {
      setSelectedEntry(undefined);
      const index = entries.findIndex((e) => e.id === entry.id);
      if (index === -1) return;
      entries.splice(index, 1);
      setEntries(entries);
      setConfirmationCallback(undefined);
    });
  };

  const { isOpen, onClose, onOpen } = useDisclosure();

  const onConfirm = () => {
    confirmationCallback?.();
    onClose();
  };

  const handleDuplicateButtonClick = () => {
    if (!selectedEntry) return;
    const newEntry = { ...selectedEntry, id: uuid() };
    setEntries([...entries, newEntry]);
    setSelectedEntry(newEntry);
  };

  const [countLogoClick, setCountLogoClick] = useState(0);

  const handleLogoClick = () => setCountLogoClick((prevCount) => prevCount + 1);

  useEffect(() => {
    if (countLogoClick > 12) {
      alert("With the kind participation of chien barbu and chien moustachu");
    }
  }, [countLogoClick]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountLogoClick((prevCount) => Math.max(0, prevCount - 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box pos="absolute" top="10px" right="10px" bottom="10px" left="10px">
      <VStack h="100%" w="100%" justify="space-between">
        <HStack justify="space-between" w="100%" align="flex-start">
          <LdsColorModeSwitch />
          <HStack alignItems="flex-end">
            <Img src="search-hub-32.png" onClick={handleLogoClick} />
            <Heading>Search Hub</Heading>
            <Code>{import.meta.env.PACKAGE_VERSION}</Code>
          </HStack>
          {!!selectedEntry && (
            <Button
              leftIcon={<CopyIcon />}
              onClick={handleDuplicateButtonClick}
            >
              Duplicate
            </Button>
          )}
          {!selectedEntry && <PresetSelect onClick={handleEntryFormSubmit} />}
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
      <ConfirmationModal
        onConfirm={onConfirm}
        isOpen={isOpen}
        onClose={onClose}
        title="Delete entry"
      >
        Are you sure you want to delete this entry ?
      </ConfirmationModal>
    </Box>
  );
};
