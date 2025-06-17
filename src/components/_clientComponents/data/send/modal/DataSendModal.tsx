"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";

import { Button } from "@/components/Button";

import { Input } from "@/components/Input";

import { Empty } from "@/components/Empty";
import Spinner from "@/components/Spinner";

import RadioBtn from "./RadioBtn";

import { INPUT_MAX_LENGTH, INPUT_MIN_LENGTH } from "@/const/const";

const data = Array.from({ length: 53 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `테스트${i + 1}`,
}));

export default function DataSendModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleSearch = () => {
    setSearchTerm(search);
  };

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const filteredData = searchTerm
    ? data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const handleReset = () => {
    setSearch("");
    setSearchTerm("");
  };

  const handleSave = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          handleReset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button type="button" color="white">
          데이터명 검색
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>데이터명 검색</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-6">
          <div className="border flex justify-center items-center body01b border-gray-200 rounded-sm bg-gray-100 p-3 gap-x-1">
            <Input
              type="text"
              placeholder="데이터 명을 입력해주세요"
              value={search}
              maxLength={INPUT_MIN_LENGTH}
              minLength={INPUT_MAX_LENGTH}
              disabled={isLoading}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchEnter}
            />
            <Button
              type="button"
              onClick={handleReset}
              color="white"
              disabled={isLoading}
            >
              초기화
            </Button>
            <Button type="button" onClick={handleSearch} disabled={isLoading}>
              검색
            </Button>
          </div>
          <div className="flex flex-col">
            <h4 className="sub-title">
              데이터명 목록(총 {!isLoading ? filteredData.length : "0"}개)
            </h4>
            <ul className="flex flex-wrap w-full h-[166px] overflow-y-auto content-baseline">
              {isLoading ? (
                <li className="w-full h-[165px] relative">
                  <Spinner />
                </li>
              ) : filteredData.length === 0 || !filteredData ? (
                <li className="w-full flex justify-center items-center h-[165px]">
                  <Empty
                    isIcon
                    size="lg"
                    description={`검색 조건에 해당하는 결과가 없습니다. \n조건을 재설정해주세요`}
                  />
                </li>
              ) : (
                filteredData.map((item) => (
                  <li
                    key={item.id}
                    className="w-1/2 border-gray-200 border-b border-r nth-[1]:border-t nth-[2]:border-t odd:border-l has-checked:border-gray-900 transition-colors duration-200 h-fit"
                  >
                    <RadioBtn id={item.id} name="data-list">
                      {item.name}
                    </RadioBtn>
                  </li>
                ))
              )}
            </ul>
            <div className="btn-area mt-2">
              <Button
                type="button"
                color="red"
                onClick={() => {
                  setIsOpen(false);
                  setSearch("");
                  setSearchTerm("");
                }}
              >
                닫기
              </Button>
              <Button type="button" disabled={isLoading} onClick={handleSave}>
                적용
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
