import { Image } from "@chakra-ui/react";
import { Entry } from "./Entry";
import { FAVICON_DEFAULT_SIZE, getFavicon } from "./utils";

export type FavIconProps = Entry & {
  url: string;
  name?: string;
  size?: number;
  search?: string;
};

export const FavIcon = ({ url, icon, name, size = FAVICON_DEFAULT_SIZE, search = "" }: FavIconProps) => {
  const favicon = icon || getFavicon(url);
  const href = url.replace("{{search}}", search);
  if (!favicon) return null;
  return (
      <Image
        src={favicon}
        title={name || href}
        alt={name || href}
        width={`${size}px`}
        height={`${size}px`}
      />
  );
};
