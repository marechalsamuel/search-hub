import * as z from "zod";
import { FavIcon } from "./FavIcon";
import { entitySchema } from "./entity.schema";
import { Button, Flex, IconButton, Link, Text, theme } from "@chakra-ui/react";

export type Entry = z.infer<typeof entitySchema>;

export type EntryProps = Entry;
export const EntryTitle = (entry: EntryProps) => {
  if (!entry.name) {
    return <FavIcon {...entry} />;
  }
  return (
    <Flex align="center" gap="5px">
      <FavIcon {...entry} />
      {entry.name && <Text>{entry.name}</Text>}
    </Flex>
  );
};

export type EntryLinkProps = {
  entry: Entry;
  search: string;
};
export const EntryLink = ({entry, search}: EntryLinkProps) => {

  if (entry.name) {
    return (
      <Button
        key={entry.id}
        as={Link}
        href={entry.url.replace("{{search}}", search)}
      >
        <EntryTitle {...entry} />
      </Button>
    );
  }
  return (
    <IconButton
      aria-label={entry.url}
      key={entry.id}
      as={Link}
      href={entry.url.replace("{{search}}", search)}
      icon={<EntryTitle {...entry} />}
      color={theme.colors.gray[500]}
    />
  );
};
