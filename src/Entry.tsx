import * as z from "zod";
import { FavIcon } from "./FavIcon";
import { entitySchema } from "./entity.schema";
import { Button, ButtonProps, IconButton, Link, Text } from "@chakra-ui/react";

export type Entry = z.infer<typeof entitySchema>;

export type EntryLinkProps = ButtonProps & {
  entry: Entry;
  search?: string;
};
export const EntryLink = ({ entry, search = "", ...props }: EntryLinkProps) => {
  const href = entry.url.replace("{{search}}", search);

  if (entry.name) {
    return (
      <Button
        {...props}
        as={Link}
        href={href}
        leftIcon={<FavIcon {...entry} search={search} />}
        title={href}
        aria-label={href}
      >
        <Text>{entry.name}</Text>
      </Button>
    );
  }
  return (
    <IconButton
      {...props}
      as={Link}
      href={href}
      icon={<FavIcon {...entry} search={search} />}
      title={href}
      aria-label={href}
    />
  );
};
