import Link from "next/link";

import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { GET_DATA_SEND_SCHEMA } from "@/schema/data/schema";

const DataSendColumns: ColumnDef<z.infer<typeof GET_DATA_SEND_SCHEMA>>[] = [
  {
    accessorKey: "dataName",
    header: () => <div className="w-full text-center">업데이트 사유</div>,
    cell: ({ row }) => (
      <Link
        className="underline underline-offset-2 text-center block"
        href={`/data/send/${row.original.id}`}
      >
        {row.original.dataName}
      </Link>
    ),
  },

  {
    accessorKey: "addCycle",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        등록 주기
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.addCycle}</div>
    ),
  },
  {
    accessorKey: "service",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        사업자 구분
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.service}</div>
    ),
  },
  {
    accessorKey: "addId",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        등록한 계정
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.addId}({row.original.addDate}/{row.original.addName})
      </div>
    ),
  },
  {
    accessorKey: "addState",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        등록 상태
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.addState}</div>
    ),
  },
  {
    accessorKey: "sendDate",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        최근 등록 일시
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.sendDate}</div>
    ),
  },
];

export default DataSendColumns;
