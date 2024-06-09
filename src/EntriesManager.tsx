import {
  Button,
  HStack,
  Icon,
  IconButton,
  Link,
  StackProps,
} from "@chakra-ui/react";
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { EntryLink } from "./EntryLink";
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
import { Entry } from "./entry.entity";

export type ClickSortableItemProps = {
  entry: Entry;
  isSelected: boolean;
  onClick: () => void;
  onClickLeft?: () => void;
  onClickRight?: () => void;
};
export const ClickSortableItem = ({
  entry,
  isSelected,
  onClick,
  onClickLeft,
  onClickRight,
}: ClickSortableItemProps) => {
  const handleMoveLeftClick = () => {
    onClickLeft?.();
    onClick();
  };

  const handleMoveRightClick = () => {
    onClickRight?.();
    onClick();
  };

  return (
    <HStack
      p="0"
      gap="1px"
      key={entry.id}
      display="flex"
      alignItems="center"
      onClick={onClick}
    >
      {onClickLeft && (
        <IconButton
          as={Link}
          aria-label="Move left"
          onClick={handleMoveLeftClick}
          minW="20px"
          icon={<ChevronLeftIcon />}
        />
      )}
      <EntryLink
        entry={entry}
        disabled
        onClick={onClick}
        isActive={isSelected}
      />
      {onClickRight && (
        <IconButton
          as={Link}
          aria-label="Move right"
          onClick={handleMoveRightClick}
          minW="20px"
          icon={<ChevronRightIcon />}
        />
      )}
    </HStack>
  );
};

export type DragSortableItemProps = {
  id: string;
  entry: Entry;
  isSelected: boolean;
  onClick: () => void;
};
export const DragSortableItem = ({
  id,
  entry,
  isSelected,
  onClick,
}: DragSortableItemProps) => {
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

  return (
    <HStack
      p="0"
      gap="1px"
      {...attributes}
      ref={setNodeRef}
      style={style}
      key={entry.id}
      display="flex"
      alignItems="center"
      onClick={onClick}
    >
      <IconButton
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
      />
      <EntryLink
        entry={entry}
        disabled
        onClick={onClick}
        isActive={isSelected}
      />
    </HStack>
  );
};

export type ClickEntriesProps = {
  entries: Entry[];
  setEntries: Dispatch<SetStateAction<Entry[] | undefined>>;
  selectedEntry?: Entry;
  onClick: (entry?: Entry) => void;
};
export const ClickEntries = ({
  entries,
  setEntries,
  selectedEntry,
  onClick,
}: DraggableEntriesProps) => {
  const moveLeft = (index: number) => {
    if (index === 0) return entries;

    const newIndex = Math.max(0, Math.min(entries.length - 1, index - 1));
    setEntries(
      entries.map((e, i) => {
        if (i === index) return entries[newIndex];
        if (i === newIndex) return entries[index];
        return e;
      })
    );
  };
  const moveRight = (index: number) => {
    if (index === entries.length - 1) return entries;

    const newIndex = Math.max(0, Math.min(entries.length - 1, index + 1));
    setEntries(
      entries.map((e, i) => {
        if (i === index) return entries[newIndex];
        if (i === newIndex) return entries[index];
        return e;
      })
    );
  };
  const getMoveLeftHandler = (index: number) =>
    index === 0 ? undefined : () => moveLeft(index);
  const getMoveRightHandler = (index: number) =>
    index === entries.length - 1 ? undefined : () => moveRight(index);
  return (
    <>
      {entries.map((entry, index) => (
        <ClickSortableItem
          onClickLeft={getMoveLeftHandler(index)}
          onClickRight={getMoveRightHandler(index)}
          onClick={() => onClick(entry)}
          key={entry.id}
          entry={entry}
          isSelected={entry.id === selectedEntry?.id}
        />
      ))}
    </>
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
          <DragSortableItem
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
  forceDrag?: boolean;
};

export const EntriesManager = ({
  entries,
  setEntries,
  onClick,
  selectedEntry,
  forceDrag,
  ...props
}: EntriesManagerProps) => {
  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
  const mode = isFirefox && !forceDrag ? "click" : "drag";

  return (
    <HStack {...props} w="100%" justify="flex-end" align="flex-end">
      {mode === "click" && (
        <ClickEntries
          entries={entries}
          onClick={onClick}
          setEntries={setEntries}
          selectedEntry={selectedEntry}
        />
      )}
      {mode === "drag" && (
        <DraggableEntries
          entries={entries}
          onClick={onClick}
          setEntries={setEntries}
          selectedEntry={selectedEntry}
        />
      )}
      <Button
        onClick={() => onClick(undefined)}
        aria-label="New entry"
        title="New entry"
        leftIcon={<AddIcon />}
        isActive={!selectedEntry}
      >
        New entry
      </Button>
    </HStack>
  );
};
