import { CheckIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import {
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
  Card,
  CardBody,
} from "@chakra-ui/react";
import { FavIcon } from "./FavIcon";
import { UseFormReturn } from "react-hook-form";
import { getFavicon } from "./utils";
import { Entry } from "./entry.entity";
import { EntryLink } from "./EntryLink";

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
    formState: { isValid, errors, dirtyFields },
    register,
    watch,
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
            <HStack>
              <FormLabel>Url</FormLabel>
              <Input {...register("url")} />
            </HStack>
            <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
            {!errors.url && (
              <FormHelperText>
                <HStack>
                  <InfoIcon />
                  <Text>
                    The URL has to be valid and contain
                    <Code>{`{{search}}`}</Code>
                  </Text>
                </HStack>
              </FormHelperText>
            )}
          </FormControl>
          {values.url && !errors.url && (
            <Card w="100%">
              <CardBody>
                <FormControl>
                  <HStack>
                    <FormLabel>Preview</FormLabel>
                    <EntryLink entry={values} disabled isActive={false} />
                  </HStack>
                </FormControl>
              </CardBody>
            </Card>
          )}
          <Card w="100%">
            <CardBody>
              <VStack>
                <FormControl isDisabled={!selectedEntry}>
                  <HStack>
                    <FormLabel>Icon</FormLabel>
                    <Input
                      {...register("icon")}
                      placeholder={getFavicon(values.url)}
                      title={
                        selectedEntry
                          ? undefined
                          : "First enter url and create the entry to set custom icon."
                      }
                    />
                    <FavIcon {...values} />
                  </HStack>
                  <FormHelperText>
                    <HStack>
                      <InfoIcon />
                      <Text>Set any image url you want.</Text>
                    </HStack>
                  </FormHelperText>
                </FormControl>
                <FormControl isDisabled={!selectedEntry}>
                  <HStack>
                    <FormLabel>Name</FormLabel>
                    <Input
                      {...register("name")}
                      title={
                        selectedEntry
                          ? undefined
                          : "First enter url and create the entry to set custom name."
                      }
                    />
                  </HStack>
                  <FormHelperText>
                    <HStack>
                      <InfoIcon />
                      <Text>
                        Leave name empty to display only website favicon.
                      </Text>
                    </HStack>
                  </FormHelperText>
                </FormControl>
              </VStack>
            </CardBody>
          </Card>
          <HStack w="100%" justify="flex-end">
            {!selectedEntry && (
                    <HStack>
                      <InfoIcon />
                      <Text>
                        First enter url and create the entry to set custom properties.
                      </Text>
                    </HStack>
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
            {!!selectedEntry && (
              <Button
                onClick={() => handleEntryDelete(selectedEntry)}
                leftIcon={<DeleteIcon />}
                colorScheme="red"
              >
                Delete
              </Button>
            )}
            {!!selectedEntry && (
              <Button
                type="submit"
                leftIcon={<CheckIcon />}
                disabled={!isValid}
                colorScheme="blue"
              >
                Update
              </Button>
            )}
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};
