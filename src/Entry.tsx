import * as z from "zod";
import { FavIcon } from "./FavIcon";
import { entrySchema } from "./entry.schema";
import { Button, ButtonProps, IconButton, IconButtonProps, Link, LinkProps, Text, useColorMode } from "@chakra-ui/react";

export type Entry = z.infer<typeof entrySchema>;

export type EntryLinkProps = ButtonProps & {
  entry: Entry;
  search?: string;
};
export const EntryLink = ({ entry, search = "", disabled, ...props }: EntryLinkProps) => {
  const { colorMode } = useColorMode();
  const href = entry.url.replace("{{search}}", search);
  const linkProps: (IconButtonProps | ButtonProps) & LinkProps = {
    href,
    title: href,
    "aria-label": href,
    as: Link,
    _visited: {
      color: colorMode === "light" ? "gray.600" : "gray.300",
    }
  }
  const commonProps = {
    ...props,
    ...(!disabled && linkProps),
  };

  if (entry.name) {
    return (
      <Button
        title={entry.name}
        aria-label={entry.name}
        {...commonProps}
        leftIcon={<FavIcon {...entry} search={search} />}
      >
        <Text>{entry.name}</Text>
      </Button>
    );
  }
  return (
    <IconButton
      title={entry.name}
      aria-label={entry.name}
      {...commonProps}
      icon={<FavIcon {...entry} search={search} />}
    />
  );
};
