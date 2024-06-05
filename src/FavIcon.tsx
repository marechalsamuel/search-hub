import { Image } from "@chakra-ui/react";
import { Entry } from "./Entry";

const DEFAULT_SIZE = 24;

const getFavicon = (url: string, size = DEFAULT_SIZE) => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
  } catch (e) {
    return;
  }
};

export type FavIconProps = Entry & {
  url: string;
  name?: string;
  size?: number;
  search?: string;
};

export const FavIcon = ({ url, name, size = DEFAULT_SIZE, search = "" }: FavIconProps) => {
  const favicon = getFavicon(url);
  const href = url.replace("{{search}}", search);
  if (!favicon) return null;
  return (
    <>
      <Image
        src={favicon}
        title={name || href}
        alt={name || href}
        width={`${size}px`}
        height={`${size}px`}
      />
    </>
  );
};
