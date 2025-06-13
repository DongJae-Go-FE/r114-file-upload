"use client";

import { useId, useMemo, useRef, useState, useEffect } from "react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { z } from "zod";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { Empty } from "@/components/Empty";
import Spinner from "../Spinner";
import DraggableRow from "./DraggableRow";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableHeader } from "./DataTableHeader";
import { TableDownload, BtnAreaType } from "./type";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  schema: z.ZodSchema<TData>;
  download?: TableDownload;
  btnArea?: BtnAreaType;
  isDragAndDrop?: boolean;
  isTableHeader?: boolean;
  isExcelDown?: boolean;
  isLoading?: boolean;
  onRowSelectionChange?: (
    selectedIds: UniqueIdentifier[] | (string | number)[]
  ) => void;
}

export function DataTable<TData extends { id: UniqueIdentifier }, TValue>({
  columns,
  data: initialData,
  schema,
  download,
  btnArea,
  isDragAndDrop = false,
  isTableHeader = true,
  isExcelDown = false,
  isLoading = false,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const ref = useRef<HTMLDivElement>(null);
  const sortableId = useId();

  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);

  const [data, setData] = useState(() =>
    initialData.map((item) => schema.parse(item))
  );

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection, pagination, sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    if (onRowSelectionChange) {
      const selectedIds = table
        .getSelectedRowModel()
        .rows.map((row) => row.original.id);

      onRowSelectionChange(selectedIds);
    }
  }, [rowSelection, onRowSelectionChange, table]);

  const dataIds = useMemo(() => data.map(({ id }) => id), [data]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);
      setData((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const renderTableHeader = () => (
    <TableHeader className="sticky top-0 z-10 bg-white border-t border-b-0 border-gray-200">
      {table.getHeaderGroups().map((group) => (
        <TableRow key={group.id}>
          {group.headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              style={{ width: header.getSize() }}
              className="body02m text-gray-900 h-12 border-b-[2px] border-gray-200"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );

  const renderEmptyOrLoading = () => (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-[500px]">
        {isLoading ? (
          <Spinner />
        ) : (
          <Empty size="lg" description="데이터가 없습니다" isIcon />
        )}
      </TableCell>
    </TableRow>
  );

  const renderBody = () => {
    const rows = table.getRowModel().rows;

    if (isLoading || rows.length === 0) return renderEmptyOrLoading();

    return isDragAndDrop ? (
      <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
        {rows.map((row) => (
          <DraggableRow<z.infer<typeof schema>> key={row.id} row={row} />
        ))}
      </SortableContext>
    ) : (
      rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))
    );
  };

  return (
    <div className="flex flex-col gap-y-2 w-full" ref={ref}>
      {isTableHeader && (
        <DataTableHeader
          data={data}
          table={table}
          ref={ref}
          download={download}
          isExcelDown={isExcelDown}
          btnArea={btnArea}
        />
      )}

      <div className="overflow-hidden relative">
        {isDragAndDrop ? (
          <DndContext
            id={sortableId}
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
          >
            <Table className="table-fixed">
              {renderTableHeader()}
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {renderBody()}
              </TableBody>
            </Table>
          </DndContext>
        ) : (
          <Table className="table-fixed">
            {renderTableHeader()}
            <TableBody>{renderBody()}</TableBody>
          </Table>
        )}
      </div>

      {data.length > 10 && !isLoading && <DataTablePagination table={table} />}
    </div>
  );
}
