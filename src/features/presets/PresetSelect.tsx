import { MouseEventHandler, useMemo } from "react";
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
import { ChevronDownIcon } from "@chakra-ui/icons";
import { getPresets } from "./presets";

export type PresetSelectProps = {
  onClick: (entry: Entry) => void;
};
export const PresetSelect = ({ onClick }: PresetSelectProps) => {
  const presets = useMemo(() => getPresets(), []);
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
                      onClick={((e) => {
                        e.preventDefault();
                        onClick(entry);
                        onClose();
                      }) as MouseEventHandler<HTMLAnchorElement>}
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
