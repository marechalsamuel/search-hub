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
      icon: "https://fr.wikipedia.org/static/favicon/wikipedia.ico",
    },
  ];

  return (
    <Popover>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Presets</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <Wrap>
                  {presets.map((entry) => (
                    <EntryLink
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
