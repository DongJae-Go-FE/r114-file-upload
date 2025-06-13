import { useSortable } from "@dnd-kit/sortable";

import { Button } from "@/components/Button";

import { GripVerticalIcon } from "lucide-react";

export default function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button {...attributes} {...listeners} variant="icon" size="sm">
      <GripVerticalIcon color="black" className="w-5 h-5" />
      <span className="sr-only">테이블 드래그</span>
    </Button>
  );
}
