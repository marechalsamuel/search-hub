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
                  {getPresets().map((entry) => (
                    <EntryLink
                      disabled
                      key={entry.id}
                      entry={entry}
                      onClick={() => {
                        onClick({
                          ...entry,
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
