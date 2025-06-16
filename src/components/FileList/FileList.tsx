"use client";

import Spinner from "../Spinner";
import { Empty } from "../Empty";

type FileType = {
  id: string;
  name: string;
  isSuccess: boolean;
};

type FileListType = {
  isLoading?: boolean;
  items?: FileType[];
  onDelete?: (id: string) => void;
};

export default function FileList({ isLoading, items, onDelete }: FileListType) {
  const ulStyle =
    "w-full h-100 border px-4 rounded-sm border-gray-200 overflow-y-auto relative";

  if (isLoading) {
    return (
      <ul className={ulStyle}>
        <li className="w-full h-full">
          <Spinner />
        </li>
      </ul>
    );
  }

  if (!items || items.length === 0) {
    return (
      <ul className={ulStyle}>
        <li className="w-full h-full flex justify-center items-center">
          <Empty
            isIcon
            description={`업로드된 파일이 없습니다\n 파일을 업로드 해주세요`}
            size="lg"
          />
        </li>
      </ul>
    );
  }

  return (
    <ul className={ulStyle}>
      {items.map((item) => (
        <li
          key={item.id}
          className="flex gap-x-2 py-4 border-b border-b-gray-200"
        >
          <div className="w-12 h-12 border border-gray-200 rounded-sm flex justify-center items-center">
            {renderFileIcon()}
          </div>
          <div className="w-[calc(100%-56px)]">
            <h3 className="w-full flex justify-between items-center body01b pr-1">
              <p className="w-3/4 truncate" title={item.name}>
                {item.name}
              </p>
              <button
                type="button"
                className="body02m underline underline-offset-2"
                onClick={() => onDelete?.(item.id)}
              >
                삭제
              </button>
            </h3>
            <p className="body02r text-gray-500">
              업로드 성공여부:{" "}
              <span
                className={`body02b ${
                  item.isSuccess ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.isSuccess ? "성공" : "실패"}
              </span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

const renderFileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
      className="w-6 h-6"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 2.00008C0 1.2637 0.596954 0.666748 1.33333 0.666748H8C8.36819 0.666748 8.66667 0.965225 8.66667 1.33341V4.00008H11.3333C11.7015 4.00008 12 4.29856 12 4.66675V14.0001C12 14.7365 11.403 15.3334 10.6667 15.3334H1.33333C0.596954 15.3334 0 14.7365 0 14.0001V2.00008ZM7.33333 2.00008L1.33333 2.00008V14.0001H10.6667V5.33341H8C7.63181 5.33341 7.33333 5.03494 7.33333 4.66675V2.00008Z"
        fill="#111111"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.52729 0.86201C7.78764 0.601661 8.20975 0.601661 8.4701 0.86201L11.8034 4.19534C12.0638 4.45569 12.0638 4.8778 11.8034 5.13815C11.5431 5.3985 11.121 5.3985 10.8606 5.13815L7.52729 1.80482C7.26694 1.54447 7.26694 1.12236 7.52729 0.86201Z"
        fill="#111111"
      />
    </svg>
  );
};
