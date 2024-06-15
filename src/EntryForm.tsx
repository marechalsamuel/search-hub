import { CheckIcon, DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
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
  Spacer,
} from "@chakra-ui/react";
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
    <Box {...props}>
      <form onSubmit={handleSubmit(handleEntryFormSubmit)}>
        <VStack>
          <FormControl isInvalid={!!dirtyFields.url && !!errors.url}>
            <HStack>
              <FormLabel title="The URL has to be valid and contain `{{search}}`.">
                <HStack>
                  <InfoIcon />
                  <Text>Url</Text>
                </HStack>
              </FormLabel>
              <Input
                {...register("url")}
                placeholder={"https://www.example.com/search={{search}}"}
              />
            </HStack>
            <FormErrorMessage>{errors.url?.message}</FormErrorMessage>
          </FormControl>
          <Card w="100%">
            <CardBody>
              <VStack>
                <FormControl isDisabled={!selectedEntry}>
                  <HStack>
                    <FormLabel>
                      <HStack title="Set any image url you want.">
                        <InfoIcon />
                        <Text>Icon</Text>
                      </HStack>
                    </FormLabel>
                    <Input
                      {...register("icon")}
                      placeholder={
                        getFavicon(values.url) ||
                        "https://www.example.com/favicon.ico"
                      }
                      title={
                        selectedEntry
                          ? undefined
                          : "First enter url and create the entry to set custom icon."
                      }
                    />
                  </HStack>
                </FormControl>
                <FormControl isDisabled={!selectedEntry}>
                  <HStack>
                    <FormLabel>
                      <HStack title="Leave name empty to display only website favicon.">
                        <InfoIcon />
                        <Text>Name</Text>
                        <Text>Icon</Text>
                      </HStack>
                    </FormLabel>
                    <Input
                      {...register("name")}
                      placeholder="Ex."
                      title={
                        selectedEntry
                          ? undefined
                          : "First enter url and create the entry to set custom name."
                      }
                    />
                  </HStack>
                </FormControl>
              </VStack>
            </CardBody>
          </Card>
          <HStack w="100%" justify="flex-end">
            {values.url && !errors.url && (
              <>
                <HStack>
                  <FormLabel>Preview</FormLabel>
                  <EntryLink entry={values} disabled isActive={false} />
                </HStack>
                <Spacer />
              </>
            )}
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
