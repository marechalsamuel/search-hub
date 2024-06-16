import { FavIcon } from "../favicon/FavIcon";
import { HStack, Link, LinkProps, Text } from "@chakra-ui/react";
import { Entry } from "./entry.entity";

export type EntryLinkProps = LinkProps & {
  disabled?: boolean;
  entry: Entry;
  search?: string;
  isActive?: boolean;
};
export const EntryLink = ({
  entry,
  search = "",
  disabled,
  isActive,
  ...props
}: EntryLinkProps) => {
  const href = entry.url.replace("{{search}}", search);

  const enabledProps = {
    href,
    title: href,
    "aria-label": href,
  };

  const linkProps = {
    ...props,
    colorScheme: isActive ? "blue" : undefined,
    ...(!disabled && enabledProps),
  };

  return (
    <Link {...linkProps} variant="buttonSolid" userSelect={"none"}>
      <HStack>
        <FavIcon {...entry} search={search} />
        {entry.name && <Text>{entry.name}</Text>}
      </HStack>
    </Link>
  );
};
