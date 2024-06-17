import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Wrap,
} from "@chakra-ui/react";
import { Entry } from "../entry/entry.entity";
import { EntryLink } from "../entry/EntryLink";
import { v4 as uuid } from "uuid";
import { ChevronDownIcon } from "@chakra-ui/icons";

export type PresetSelectProps = {
  onClick: (entry: Entry) => void;
};
export const PresetSelect = ({ onClick }: PresetSelectProps) => {
  const presets: Entry[] = [
    {
      id: "preset-youtube",
      url: "https://www.youtube.com/results?search_query={{search}}",
    },
    {
      id: "preset-maps",
      url: "https://www.google.fr/maps/search/{{search}}",
      icon: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.google.fr/maps&size=24",
    },
    {
      id: "preset-wikipedia",
      url: "https://www.google.com/search?q=site:https://www.wikipedia.org {{search}}",
      icon: "https://www.google.com/s2/favicons?domain=www.wikipedia.org&sz=24",
    },
    {
      id: "preset-reddit",
      url: "https://www.google.com/search?q=site:https://www.reddit.com {{search}} reddit",
      icon: "https://www.google.com/s2/favicons?domain=www.reddit.com&sz=24",
    },
    {
      id: "preset-leboncoin",
      url: "https://www.leboncoin.fr/recherche?text={{search}}",
    },
    {
      id: "preset-twitter",
      url: "https://x.com/search?q={{search}}",
    },
    {
      id: "preset-gnews",
      url: "https://news.google.com/search?q={{search}}&hl=fr&gl=FR&ceid=FR%3Afr",
    },
  ];

  return (
    <Popover>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button rightIcon={<ChevronDownIcon />}>Presets</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <Wrap>
                  {presets.map((entry) => (
                    <EntryLink
                      key={entry.id}
                      entry={entry}
                      onClick={() => {
                        onClick({
                          ...entry,
                          id: uuid(),
                        });
                        onClose();
                      }}
                    />
                  ))}
                </Wrap>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
};
