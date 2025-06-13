import { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { Button } from "@/components/Button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;
  const selectedRows = table.getFilteredSelectedRowModel().rows.length;

  const iconStyle = "w-3.5 h-3.5";
  const iconColor = "#111";

  return (
    <div className="flex items-center justify-between px-4">
      <div className="body03m text-gray-900">
        {totalRows}개 중 {selectedRows} 선택
      </div>

      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="text-sm font-medium">
          페이지 {pageCount} 중 {pageIndex + 1} 페이지
        </div>

        <div className="ml-auto flex items-center gap-2">
          <PaginationButton
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            icon={<ChevronsLeftIcon className={iconStyle} color={iconColor} />}
            label="첫번째 페이지로"
          />
          <PaginationButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon={<ChevronLeftIcon className={iconStyle} color={iconColor} />}
            label="이전 페이지로"
          />
          <PaginationButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            icon={<ChevronRightIcon className={iconStyle} color={iconColor} />}
            label="다음 페이지로"
          />
          <PaginationButton
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
            icon={<ChevronsRightIcon className={iconStyle} color={iconColor} />}
            label="마지막 페이지로"
          />
        </div>
      </div>
    </div>
  );
}

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  label: string;
}

function PaginationButton({
  onClick,
  disabled,
  icon,
  label,
}: PaginationButtonProps) {
  return (
    <Button
      className="h-8 w-8 p-0 flex rounded-sm"
      size="icon"
      color="white"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="sr-only">{label}</span>
      {icon}
    </Button>
  );
}
