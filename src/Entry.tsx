import * as z from "zod";
import { FavIcon } from "./FavIcon";
import { entrySchema } from "./entry.schema";
import { HStack, Link, LinkProps, Text } from "@chakra-ui/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export type Entry = z.infer<typeof entrySchema>;

export type EntryLinkProps = LinkProps & {
  disabled?: boolean;
  entry: Entry;
  search?: string;
};
export const EntryLink = ({
  entry,
  search = "",
  disabled,
  ...props
}: EntryLinkProps) => {
  const href = entry.url.replace("{{search}}", search);

  const activeProps = {
    href,
    title: href,
    "aria-label": href,
  };

  const linkProps = {
    ...props,
    ...(!disabled && activeProps),
  };

  return (
    <Link {...linkProps} variant="button">
      <HStack>
        <FavIcon {...entry} search={search} />
        {entry.name && <Text>{entry.name}</Text>}
      </HStack>
    </Link>
  );
};
