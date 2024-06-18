import { Wrap } from "@chakra-ui/react";
import { EntryLink } from "./EntryLink";
import useExtensionStorage from "../storage/extenstionStorage.hook";
import { Entry } from "./entry.entity";
import { getPresets } from "../presets/presets";
import { useMemo } from "react";

export const Entries = () => {
  const presets = useMemo(() => getPresets(), []);
  const { storedData: entries } = useExtensionStorage<Entry[]>("entries", presets);
  const search =
    (
      document.body.querySelector(
        "textarea[type='search']"
      ) as HTMLTextAreaElement
    )?.value ||
    (document.body.querySelector("textarea[name='q']") as HTMLTextAreaElement)
      ?.value ||
    new URLSearchParams(window.location.search).get("q") ||
    "";
  return (
    <Wrap p="1rem" maxWidth="30vw">
      {entries?.map((entry) => (
        <EntryLink entry={entry} key={entry.id} search={search} />
      ))}
    </Wrap>
  );
};
