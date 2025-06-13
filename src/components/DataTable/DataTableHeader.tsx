import * as xlsx from "xlsx";

import { RefObject } from "react";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/Button";
// import { Label } from "@/components/Label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/Select";

import { TableDownload, BtnAreaType } from "./type";

interface DataTableHeaderProps<TData> {
  table: Table<TData>;
  ref: RefObject<HTMLDivElement | null>;
  download?: TableDownload;
  isExcelDown?: boolean;
  btnArea?: BtnAreaType;
  data: TData[];
}

export function DataTableHeader<TData>({
  // table,
  ref,
  download,
  isExcelDown,
  btnArea,
  data,
}: DataTableHeaderProps<TData>) {
  const handleExcelDownload = (download?: TableDownload) => {
    if (ref.current) {
      let workbook: xlsx.WorkBook;

      if (download?.data) {
        workbook = xlsx.utils.book_new();

        const sheet = xlsx.utils.json_to_sheet(download.data);

        xlsx.utils.book_append_sheet(workbook, sheet);
      } else {
        workbook = xlsx.utils.table_to_book(ref.current.querySelector("table"));
      }
      xlsx.writeFile(
        workbook,
        `${download?.fileName || `${new Date().toLocaleString()} 파일`}.xlsb`
      );
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-x-2 items-center">
        <span className="body02r">총 {data.length} 개</span>
        {/* {data.length > 10 && (
          <div className="flex items-center gap-2">
            <Label htmlFor="rows-per-page" className="sr-only">
              갯수 보기
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="w-30" id="rows-per-page" size="sm">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}개씩
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )} */}
      </div>
      <div className="flex items-center gap-x-1">
        {btnArea && (
          <ul className="flex gap-x-1">
            {btnArea.primary && <li>{btnArea.primary}</li>}
            {btnArea.secondary && <li>{btnArea.secondary}</li>}
          </ul>
        )}
        {isExcelDown && (
          <Button
            className="ml-auto"
            size="sm"
            color="white"
            onClick={() => {
              if (download?.customOnClick) {
                download?.customOnClick();
              } else {
                handleExcelDownload({
                  data: data,
                });
              }
            }}
          >
            {download?.buttonLabel || "엑셀 다운로드"}
          </Button>
        )}
      </div>
    </div>
  );
}
