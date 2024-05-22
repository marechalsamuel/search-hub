import { useEffect, useMemo } from "react";
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
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { entitySchema } from "./entity.schema";

export type EntryFormProps = ContainerProps & {
  selectedEntry?: Entry;
  setSelectedEntry: (entry?: Entry) => void;
  entries: Entry[];
  setEntries: (entries?: Entry[]) => void;
};
export const EntryForm = ({
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

  const defaultValues = useMemo(() => {
    return selectedEntry
      ? selectedEntry
      : {
          id: uuid(),
          name: "",
          url: "",
        };
  }, [selectedEntry]);

  const {
    handleSubmit,
    formState: { isValid },
    reset,
    register,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<Entry>({
    resolver: zodResolver(entitySchema),
    defaultValues,
  });

  const values = watch();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Box
      p="20px"
      {...props}
    >
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
