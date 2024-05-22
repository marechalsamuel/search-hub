import { HStack } from "@chakra-ui/react";
import { Entry, EntryLink } from "./Entry";
import "./entries.css";
import useExtensionStorage from "./extenstion-storage.hook";

export const Entries = () => {
  const { storedData: entries } = useExtensionStorage<Entry[]>("entries");
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
    <HStack>
      {entries?.map((entry) => (
        <EntryLink entry={entry} key={entry.id} search={search} />
      ))}
    </HStack>
  );
};
