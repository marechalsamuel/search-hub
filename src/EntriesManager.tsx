import {
  Button,
  HStack,
  Icon,
  IconButton,
  Link,
  StackProps,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Entry, EntryLink } from "./Entry";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Dispatch, SetStateAction } from "react";
import { MdDragIndicator } from "react-icons/md";

export type SortableItemProps = {
  id: string;
  entry: Entry;
  isSelected: boolean;
  onClick: () => void;
};
export const SortableItem = ({
  id,
  entry,
  isSelected,
  onClick,
}: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const colorScheme = isSelected ? "blue" : "gray";

  return (
    <Button
      p="0"
      {...attributes}
      ref={setNodeRef}
      style={style}
      key={entry.id}
      display="flex"
      alignItems="center"
      onClick={onClick}
      colorScheme={colorScheme}
    >
      <IconButton
        as={Link}
        aria-label="Reorder"
        ref={setActivatorNodeRef}
        {...listeners}
        onClick={onClick}
        cursor="grab"
        _active={{
          cursor: "grabbing",
        }}
        minW="20px"
        icon={<Icon as={MdDragIndicator} />}
        colorScheme={colorScheme}
      />
      <EntryLink
        entry={entry}
        disabled
        onClick={onClick}
        colorScheme={colorScheme}
      />
    </Button>
  );
};

export type DraggableEntriesProps = {
  entries: Entry[];
  setEntries: Dispatch<SetStateAction<Entry[] | undefined>>;
  selectedEntry?: Entry;
  onClick: (entry?: Entry) => void;
};
export const DraggableEntries = ({
  entries,
  setEntries,
  selectedEntry,
  onClick,
}: DraggableEntriesProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = entries.findIndex((e) => e.id === active.id);
      const newIndex = entries.findIndex((e) => e.id === over?.id);
      const newEntries = arrayMove(entries, oldIndex, newIndex);
      setEntries(newEntries);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={entries.map((e) => e.id)}
        strategy={horizontalListSortingStrategy}
      >
        {entries.map((entry) => (
          <SortableItem
            onClick={() => onClick(entry)}
            key={entry.id}
            id={entry.id}
            entry={entry}
            isSelected={entry.id === selectedEntry?.id}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export type EntriesManagerProps = Omit<StackProps, "onClick"> & {
  entries: Entry[];
  setEntries: Dispatch<SetStateAction<Entry[] | undefined>>;
  onClick: (entry?: Entry) => void;
  selectedEntry?: Entry;
};

export const EntriesManager = ({
  entries,
  setEntries,
  onClick,
  selectedEntry,
  ...props
}: EntriesManagerProps) => {
  return (
    <HStack {...props} w="100%" justify="flex-end" align="flex-end">
      <DraggableEntries
        entries={entries}
        onClick={onClick}
        setEntries={setEntries}
        selectedEntry={selectedEntry}
      />
      <Button
        onClick={() => onClick(undefined)}
        aria-label="New entry"
        title="New entry"
        leftIcon={<AddIcon />}
        colorScheme={!selectedEntry ? "blue" : "gray"}
      >
        New entry
      </Button>
    </HStack>
  );
};
