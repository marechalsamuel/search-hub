import { FavIcon } from "../favicon/FavIcon";
import { HStack, Link, LinkProps, Text } from "@chakra-ui/react";
import { Entry } from "./entry.entity";
import "./shake.css";

export type EntryLinkProps = LinkProps & {
  disabled?: boolean;
  entry: Entry;
  search?: string;
  isActive?: boolean;
};
export const EntryLink = ({
  entry,
  search = "{{search}}",
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

  const className = isActive ? "shake" : "";

  return (
    <Link
      {...linkProps}
      className={className}
      variant="buttonSolid"
      userSelect={"none"}
    >
      <HStack>
        <FavIcon {...entry} search={search} />
        {entry.name && <Text>{entry.name}</Text>}
      </HStack>
    </Link>
  );
};
