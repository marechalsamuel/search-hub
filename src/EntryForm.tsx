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
          {!selectedEntry && (
            <HStack w="100%" justify="flex-end">
              <Button
                type="submit"
                leftIcon={<CheckIcon />}
                disabled={!isValid}
                colorScheme="green"
              >
                Create
              </Button>
            </HStack>
          )}
          {!!selectedEntry && (
            <>
              <Card w="100%">
                <CardBody>
                  <VStack>
                    <FormControl>
                      <HStack>
                        <FormLabel>Icon</FormLabel>
                        <Input
                          {...register("icon")}
                          placeholder={getFavicon(values.url)}
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
                    <FormControl>
                      <HStack>
                        <FormLabel>Name</FormLabel>
                        <Input {...register("name")} />
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
              </HStack>
            </>
          )}
        </VStack>
      </form>
    </Box>
  );
};
