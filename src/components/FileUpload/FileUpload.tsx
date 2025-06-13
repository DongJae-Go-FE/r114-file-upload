"use client";

import {
  Fragment,
  useMemo,
  useState,
  useId,
  InputHTMLAttributes,
  CSSProperties,
} from "react";

import { Button } from "../Button";
import Spinner from "../Spinner";

import { useCount } from "@/hooks/useCount";

interface FileUploadProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "accept" | "multiple" | "style"
  > {
  /**
   * @default "medium"
   */
  size?: "small" | "medium";

  /**
   * @default "Upload"
   */
  buttonText?: string;

  /**
   * @default "Click or drag file to this area to upload"
   */
  dragAreaPlaceholder?: string;

  /**
   * 파일 업로드 API
   */
  upload?: (file: File) => Promise<unknown>;

  onDeleteClick?: (file: File) => void;

  initialFiles?: File[];

  limit?: number;

  onLimitOver?: () => void;
}
const convertByteToString = (byte: number) => {
  if (byte < 1000) return `${byte}byte`;
  if (byte < 1000 ** 2) return `${(byte / 1000).toFixed(1)}KB`;
  if (byte < 1000 ** 3) return `${(byte / 1000 ** 2).toFixed(1)}MB`;
  return `${(byte / 1000 ** 3).toFixed(1)}GB`;
};

export default function FileUpload({
  accept,
  multiple,
  buttonText = "Upload",
  dragAreaPlaceholder = "Click or drag file to this area to upload",
  upload = test,
  onDeleteClick,
  initialFiles = [],
  limit,
  onLimitOver,
}: FileUploadProps) {
  const componentId = useId();

  const [fileStates, setFileStates] = useState<
    {
      key: string;
      isSuccess: boolean;
      isLoading: boolean;
      file: File;
    }[]
  >(
    initialFiles.map((file, index) => ({
      key: index.toString(),
      file: file,
      isLoading: false,
      isSuccess: true,
    }))
  );

  const [isFinished, setIsFinished] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const progress = useMemo(() => {
    return Math.round(
      (fileStates.filter(({ isLoading }) => !isLoading).length /
        fileStates.length) *
        100
    );
  }, [fileStates]);

  const { count, reset } = useCount(progress, {
    speed: 20,
    step: Math.ceil(10 / fileStates.length),
    enable: fileStates.some(({ isLoading }) => isLoading),
  });

  const handleChange = async (files: FileList) => {
    if (limit && files.length > limit) {
      onLimitOver?.();
      return;
    }

    reset();
    setIsFinished(false);
    const initialStates = Array.from({ length: files.length }).map(
      (_, index) => ({
        key: `new-${index}`,
        file: files.item(index) as File,
        isLoading: true,
        isSuccess: false,
      })
    );

    setFileStates(initialStates);

    const updatedStates = [...initialStates];

    for (const state of initialStates) {
      try {
        await upload(state.file);
        state.isSuccess = true;
        setIsFail(false);
      } catch {
        state.isSuccess = false;
        setIsFail(true);
      } finally {
        state.isLoading = false;
      }
      const index = updatedStates.findIndex((item) => item.key === state.key);
      updatedStates[index] = { ...state };
      setFileStates([...updatedStates]);
    }

    setIsFinished(true);
  };

  const handleDeleteClick = (key: string) => {
    if (fileStates.every(({ isLoading }) => !isLoading)) {
      setFileStates((prev) => {
        const target = prev.find((item) => item.key === key);
        if (target && onDeleteClick) {
          onDeleteClick(target.file);
        }

        return prev.filter((item) => item.key !== key);
      });
    }
  };

  const successFiles = fileStates.filter(
    ({ isLoading, isSuccess }) => !isLoading && isSuccess
  );
  const failFiles = fileStates.filter(
    ({ isLoading, isSuccess }) => !isLoading && !isSuccess
  );

  const hasFail = failFiles.length > 0;

  const dragAreaStyle =
    "w-full p-8 flex flex-col items-center justify-center border border-dashed rounded-[6px] border-gray-200 text-gray-500 body02m";
  const labelStyle =
    "relative inline-flex cursor-pointer after:content-[''] after:absolute after:inset-0";
  const progressStyle =
    "progress relative w-full h-2 bg-gray-200 rounded-full overflow-hidden after:absolute after:top-0 after:left-0 after:h-full after:bg-gray-900 after:transition-all";

  const progressAddStyle: CSSProperties & { [key: string]: string } = {
    "--progress-width": `${progress}%`,
    "--progress-bg-color": isFail ? "#ff3b30" : "#111111",
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        id={componentId}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={({ target: { files } }) => {
          if (files) {
            handleChange(files);
          }
        }}
      />
      <div
        className={dragAreaStyle}
        onDragStart={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files) {
            if ((!multiple && e.dataTransfer.files.length === 1) || multiple) {
              handleChange(e.dataTransfer.files);
            }
          }
        }}
      >
        {renderUploadIcon()}
        <span className="text-center block mt-1 mb-2">
          {dragAreaPlaceholder}
        </span>

        <label htmlFor={componentId} className={labelStyle}>
          <Button color="white" size="xs">
            {buttonText}
          </Button>
        </label>
      </div>
      {fileStates.length > 0 && (
        <Fragment>
          <div className="flex flex-col gap-2 m-[8px 0 16px]">
            <div className="flex justify-between items-center">
              <span className="text-gray-900 body02m">
                {successFiles.length} / {fileStates.length}개 업로드
                {isFinished && hasFail && (
                  <span className="text-red-500">{` (${failFiles.length}개 실패)`}</span>
                )}
              </span>
              <span
                className={`body04r ${
                  isFinished ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {count}%
              </span>
            </div>
            <div className={progressStyle} style={progressAddStyle}>
              <style>
                {`
            .progress::after {
              content: '';
              width: var(--progress-width);
              background-color: var(--progress-bg-color);
            }
            `}
              </style>
            </div>
          </div>
          <ul className="flex flex-col gap-y-2 m-0 p-0">
            {fileStates.map(({ key, file, isLoading, isSuccess }) => {
              let stateIcon = null;
              if (isLoading) {
                stateIcon = renderFileIcon();
              } else if (isSuccess) {
                stateIcon = renderFileIcon();
              } else {
                stateIcon = renderErrorIcon();
              }
              return (
                <li className="flex w-full" key={key}>
                  <div className="w-10 h-10 rounded-[6px] flex shrink-0 items-center justify-center bg-white border mr-2 relative">
                    {isLoading ? (
                      <Spinner className="w-4.5 h-4.5" />
                    ) : (
                      stateIcon
                    )}
                  </div>
                  <div className="flex flex-col w-[calc(100%-64px)]">
                    <span
                      className={`truncate body02m ${
                        !isLoading && !isSuccess
                          ? "text-red-500"
                          : "text-gray-900"
                      }`}
                    >
                      {file.name}
                    </span>
                    <span className="truncate body04r text-gray-500">
                      {convertByteToString(file.size)}
                    </span>
                  </div>

                  <Button
                    variant="icon"
                    size="xs"
                    color="white"
                    disabled={isLoading}
                    onClick={() => handleDeleteClick(key)}
                  >
                    {renderCloseIcon()}
                  </Button>
                </li>
              );
            })}
          </ul>
        </Fragment>
      )}
    </div>
  );
}

const renderUploadIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 9C19.5523 9 20 9.44772 20 10V19C20 19.5523 19.5523 20 19 20H1C0.447715 20 0 19.5523 0 19V10.0042C0 9.45187 0.447715 9.00415 1 9.00415C1.55228 9.00415 2 9.45187 2 10.0042V18H18V10C18 9.44772 18.4477 9 19 9Z"
        fill="#111111"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.29289 0.292893C9.68342 -0.0976311 10.3166 -0.0976311 10.7071 0.292893L15.2071 4.79289C15.5976 5.18342 15.5976 5.81658 15.2071 6.20711C14.8166 6.59763 14.1834 6.59763 13.7929 6.20711L10 2.41421L6.20711 6.20711C5.81658 6.59763 5.18342 6.59763 4.79289 6.20711C4.40237 5.81658 4.40237 5.18342 4.79289 4.79289L9.29289 0.292893Z"
        fill="#111111"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99609 0C10.5484 0 10.9961 0.447715 10.9961 1V14C10.9961 14.5523 10.5484 15 9.99609 15C9.44381 15 8.99609 14.5523 8.99609 14V1C8.99609 0.447715 9.44381 0 9.99609 0Z"
        fill="#111111"
      />
    </svg>
  );
};

const renderFileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
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

const renderErrorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.0013 0.666748L0.667969 13.3334H15.3346L8.0013 0.666748Z"
        fill="#FF3B30"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C8.23789 0 8.45776 0.126764 8.57695 0.332642L15.9103 12.9993C16.0297 13.2056 16.0299 13.4599 15.9109 13.6663C15.7918 13.8728 15.5717 14 15.3333 14H0.666667C0.428347 14 0.208153 13.8728 0.089117 13.6663C-0.0299192 13.4599 -0.029691 13.2056 0.0897158 12.9993L7.42305 0.332642C7.54224 0.126764 7.76211 0 8 0ZM1.82296 12.6667H14.177L8 1.99724L1.82296 12.6667Z"
        fill="#FF3B30"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.9987 10C8.36689 10 8.66536 10.2985 8.66536 10.6667V11C8.66536 11.3682 8.36689 11.6667 7.9987 11.6667C7.63051 11.6667 7.33203 11.3682 7.33203 11V10.6667C7.33203 10.2985 7.63051 10 7.9987 10Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.99814 4.66675C8.36633 4.66644 8.66506 4.96467 8.66536 5.33286L8.66814 8.66605C8.66845 9.03424 8.37022 9.33296 8.00203 9.33327C7.63384 9.33357 7.33512 9.03535 7.33481 8.66716L7.33203 5.33397C7.33172 4.96578 7.62995 4.66706 7.99814 4.66675Z"
        fill="white"
      />
    </svg>
  );
};

const renderCloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.19526 4.19526C4.45561 3.93491 4.87772 3.93491 5.13807 4.19526L11.8047 10.8619C12.0651 11.1223 12.0651 11.5444 11.8047 11.8047C11.5444 12.0651 11.1223 12.0651 10.8619 11.8047L4.19526 5.13807C3.93491 4.87772 3.93491 4.45561 4.19526 4.19526Z"
        fill="#111111"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8047 4.19526C12.0651 4.45561 12.0651 4.87772 11.8047 5.13807L5.13807 11.8047C4.87772 12.0651 4.45561 12.0651 4.19526 11.8047C3.93491 11.5444 3.93491 11.1223 4.19526 10.8619L10.8619 4.19526C11.1223 3.93491 11.5444 3.93491 11.8047 4.19526Z"
        fill="#111111"
      />
    </svg>
  );
};

async function test(file: File) {
  console.log(file);

  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (Math.round(Math.random() * 10) % 2 === 0) {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}
