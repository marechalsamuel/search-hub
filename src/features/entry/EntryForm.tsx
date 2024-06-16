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
  BoxProps,
  HStack,
  Card,
  CardBody,
  Spacer,
} from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";
import { getFavicon } from "../favicon/favicon.helper";
import { Entry } from "./entry.entity";
import { EntryLink } from "./EntryLink";

export type EntryFormProps = Omit<BoxProps, 'onSubmit'> & {
  selectedEntry?: Entry;
  form: UseFormReturn<Entry>;
  onSubmit: (entry: Entry) => void;
  onDelete: (entry: Entry) => void;
};
export const EntryForm = ({
  form: {
    handleSubmit,
    formState: { isValid, errors, dirtyFields },
    register,
    watch,
  },
  selectedEntry,
  onSubmit,
  onDelete,
  ...props
}: EntryFormProps) => {

  const values = watch();

  return (
    <Box {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  First enter a url and click "Create" to create the entry to set icon and name.
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
                onClick={() => onDelete(selectedEntry)}
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
