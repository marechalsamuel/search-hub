import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  StackProps,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Entry, EntryTitle } from "./Entry";
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
import { Dispatch, SetStateAction, useState } from "react";
import { TbReorder } from "react-icons/tb";
import { MdDragIndicator } from "react-icons/md";

export type SortableItemProps = {
  id: string;
  entry: Entry;
  isSelected: boolean;
};
export const SortableItem = ({ id, entry, isSelected }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={entry.id}
      colorScheme={isSelected ? "blue" : "gray"}
      leftIcon={<Icon as={MdDragIndicator} />}
    >
      <EntryTitle {...entry} />
    </Button>
  );
};

export type DraggableEntriesProps = {
  entries: Entry[];
  setEntries: Dispatch<SetStateAction<Entry[] | undefined>>;
  selectedEntry?: Entry;
};
export const DraggableEntries = ({
  entries,
  setEntries,
  selectedEntry,
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

export type EntriesProps = {
  entries: Entry[];
  onClick: (entry?: Entry) => void;
  selectedEntry?: Entry;
};
export const Entries = ({ entries, onClick, selectedEntry }: EntriesProps) => {
  return (
    <HStack>
      {entries.map((entry) => (
        <Button
          key={entry.id}
          onClick={() => onClick(entry)}
          colorScheme={selectedEntry?.id === entry.id ? "blue" : "gray"}
        >
          <EntryTitle {...entry} />
        </Button>
      ))}
    </HStack>
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
  const [isDragMode, setIsDragMode] = useState(false);

  const dragModeTitle = isDragMode
    ? "Drag and drop to reorder"
    : "Toggle to reorder";

  return (
    <VStack w="100%" {...props} justify="flex-end">
      <HStack w="100%" justify="space-between">
        <IconButton
          onClick={() => onClick(undefined)}
          aria-label="New entry"
          title="New entry"
          icon={<AddIcon />}
          colorScheme={!selectedEntry ? "blue" : "gray"}
        />
        {entries.length > 1 && (
          <FormLabel>
            <FormControl display="flex" gap="5px">
              <HStack>
                <Icon as={TbReorder} title={dragModeTitle} />
                <Switch
                  checked={isDragMode}
                  onChange={(e) => setIsDragMode(e.target.checked)}
                  title={dragModeTitle}
                />
              </HStack>
            </FormControl>
          </FormLabel>
        )}
      </HStack>
      <HStack w="100%" justify="flex-end">
        {isDragMode && (
          <DraggableEntries
            entries={entries}
            setEntries={setEntries}
            selectedEntry={selectedEntry}
          />
        )}
        {!isDragMode && (
          <Entries
            entries={entries}
            onClick={onClick}
            selectedEntry={selectedEntry}
          />
        )}
      </HStack>
    </VStack>
  );
};
