import { CheckIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import {
  Flex,
  Code,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
  Text,
  Button,
  Box,
  ContainerProps,
  HStack,
} from "@chakra-ui/react";
import { FavIcon } from "./FavIcon";
import { Entry } from "./Entry";
import { UseFormReturn } from "react-hook-form";

export type EntryFormProps = ContainerProps & {
  selectedEntry?: Entry;
  setSelectedEntry: (entry?: Entry) => void;
  entries: Entry[];
  setEntries: (entries?: Entry[]) => void;
  form: UseFormReturn<Entry>;
};
export const EntryForm = ({
  form: {
    handleSubmit,
    formState: { isValid },
    register,
    watch,
    formState: { errors, dirtyFields },
  },
  selectedEntry,
  setSelectedEntry,
  entries,
  setEntries,
  ...props
}: EntryFormProps) => {
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

  const values = watch();

  return (
    <Box p="20px" {...props}>
      <form onSubmit={handleSubmit(handleEntryFormSubmit)}>
        <VStack>
          <FormControl isInvalid={!!dirtyFields.url && !!errors.url}>
            <FormLabel>Url</FormLabel>
            <Flex align="center" gap="5px">
              <Input {...register("url")} />
              <FavIcon {...values} />
            </Flex>
            <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
            {!errors.url && (
              <FormHelperText>
                <Flex align="center" gap="5px">
                  <InfoIcon />
                  <Text>The URL has to be valid and contain</Text>
                  <Code>{`{{search}}`}</Code>
                </Flex>
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input {...register("name")} />
            <FormHelperText>
              <Flex align="center" gap="5px">
                <InfoIcon /> Leave name empty to display only website favicon.
              </Flex>
            </FormHelperText>
          </FormControl>
          <HStack w="100%" justify="flex-end">
            {!!selectedEntry && (
              <>
                <Button
                  onClick={() => handleEntryDelete(selectedEntry)}
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  leftIcon={<CheckIcon />}
                  disabled={!isValid}
                  colorScheme="blue"
                >
                  Update
                </Button>
              </>
            )}
            {!selectedEntry && (
              <Button
                type="submit"
                leftIcon={<CheckIcon />}
                disabled={!isValid}
                colorScheme="green"
              >
                Create
              </Button>
            )}
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};
