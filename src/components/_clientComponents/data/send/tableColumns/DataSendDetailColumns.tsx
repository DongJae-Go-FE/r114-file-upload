import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import { GET_DATA_ADD_RECORD_SCHEMA } from "@/schema/data/schema";

const DataSendDetailColumns: ColumnDef<
  z.infer<typeof GET_DATA_ADD_RECORD_SCHEMA>
>[] = [
  {
    accessorKey: "addDate",
    header: () => <div className="text-center w-full">최근 등록일시</div>,
    cell: ({ row }) => (
      <div className="text-center w-full">{row.original.addDate}</div>
    ),
  },
  {
    accessorKey: "addState",
    header: () => <div className="text-center">데이터 상태 상태</div>,
    cell: ({ row }) => (
      <div className="text-center w-full">{row.original.addState}</div>
    ),
  },
  {
    accessorKey: "addReason",
    header: () => <div className="text-center">광고 제목</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.addReason}</div>
    ),
    size: 300,
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">등록한 계정</div>,
    cell: ({ row }) => (
      <div className="text-center w-full">{row.original.id}</div>
    ),
  },
];

export default DataSendDetailColumns;
