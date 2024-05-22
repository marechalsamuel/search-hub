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
};

export const FavIcon = ({ url, name, size = DEFAULT_SIZE }: FavIconProps) => {
  const favicon = getFavicon(url);
  if (!favicon) return null;
  return (
    <>
      <Image
        src={favicon}
        title={name || url}
        alt={name || url}
        width={`${size}px`}
        height={`${size}px`}
      />
    </>
  );
};
