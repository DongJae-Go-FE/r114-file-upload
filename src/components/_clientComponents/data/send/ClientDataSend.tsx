"use client";

import { useRouter } from "next/navigation";

import { Fragment, useState, useEffect, useMemo } from "react";

import { addDays, format, parse } from "date-fns";

import { DateRangePicker } from "@/components/DateRangePicker";
import { Input } from "@/components/Input";

import { CustomSelect } from "@/components/Select/CustomSelect";
import { CommonAddCycleSelect } from "@/components/Select/commonSelect/CommonAddCycleSelect";

import { Button } from "@/components/Button";

import Filter from "@/components/Filter";

import { DataTable } from "@/components/DataTable";

import DataSendColumns from "./tableColumns/DataSendColumns";

import { useFilter } from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";

import { GET_DATA_SEND_SCHEMA } from "@/schema/data/schema";
import { GET_DATA_SEND_REQUEST_TYPE } from "@/lib/network/types";

import { INPUT_MAX_LENGTH } from "@/const/const";

const data = [
  {
    id: 1,
    dataName: "주간 분양 통계",
    sendDate: "2025-06-13",
    service: "공공데이터포털",
    addCycle: "매주",
    addId: "admin01",
    addName: "홍길동",
    addState: "승인",
    addDate: "2025-06-12",
  },
  {
    id: 2,
    dataName: "주간 분양 통계",
    sendDate: "2025-06-13",
    service: "공공데이터포털",
    addCycle: "매주",
    addId: "admin01",
    addName: "홍길동",
    addState: "승인",
    addDate: "2025-06-12",
  },
];

export default function ClientDataSend() {
  const { push } = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce({ value: searchInput, delay: 300 });

  const { filter, setFilter, handleSubmit, handleReset } =
    useFilter<GET_DATA_SEND_REQUEST_TYPE>({
      startDate: "",
      endDate: "",
      addCycle: "",
      addState: "",
      searchType: "",
      searchKeyword: "",
    });

  const handleFilterSubmit = () => {
    handleSubmit({
      ...filter,
      searchKeyword: searchInput,
    });
  };

  const handleFilterReset = () => {
    setSearchInput("");
    handleReset();
  };

  const filterItems = useMemo(
    () => [
      {
        title: "최근 업데이트 일자",
        inputs: [
          {
            node: (
              <DateRangePicker
                id="picker"
                initialValue={{
                  from: filter.startDate
                    ? parse(filter.startDate, "yyyy-MM-dd", new Date())
                    : new Date(),
                  to: filter.endDate
                    ? parse(filter.endDate, "yyyy-MM-dd", new Date())
                    : addDays(new Date(), 31),
                }}
                className="w-full"
                onChangDate={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    startDate: value?.from
                      ? format(value.from, "yyyy-MM-dd")
                      : "",
                    endDate: value?.to ? format(value.to, "yyyy-MM-dd") : "",
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 2,
      },
      {
        title: "등록 주기",
        inputs: [
          {
            node: (
              <CommonAddCycleSelect
                value={filter.addCycle}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    memberType: value,
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 1,
      },
      {
        title: "등록 상태",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.addState}
                options={[
                  {
                    label: "파일 업로드",
                    value: "0",
                  },
                  {
                    label: "개발서버 적용",
                    value: "1",
                  },
                  {
                    label: "운영서버 적용",
                    value: "2",
                  },
                ]}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    contractType: value,
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 1,
      },
      {
        title: "검색",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.searchType}
                options={[
                  { value: "all", label: "전체" },
                  { value: "1", label: "계약코드" },
                  { value: "2", label: "회원명" },
                ]}
                className="w-40 bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    searchType: value,
                  }));
                }}
              />
            ),
          },
          {
            node: (
              <Input
                type="search"
                value={searchInput}
                placeholder="검색어를 입력해주세요."
                maxLength={INPUT_MAX_LENGTH}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            ),
          },
        ],
        ratio: 3,
      },
    ],
    [
      filter.addCycle,
      filter.addState,
      filter.endDate,
      filter.startDate,
      filter.searchType,
      searchInput,
      setFilter,
    ]
  );

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      searchKeyword: debouncedSearch,
    }));
  }, [debouncedSearch, setFilter]);

  return (
    <Fragment>
      <div className="mb-4">
        <Filter
          items={filterItems}
          onSubmit={handleFilterSubmit}
          onReset={handleFilterReset}
        />
      </div>
      <DataTable
        data={data}
        columns={DataSendColumns}
        schema={GET_DATA_SEND_SCHEMA}
        btnArea={{
          primary: (
            <Button
              size="sm"
              color="white"
              onClick={() => push("/data/send/add")}
            >
              데이터 등록
            </Button>
          ),
        }}
        isTableHeader
        isDragAndDrop
      />
    </Fragment>
  );
}
