"use client";

import {
  useMemo,
  useState,
  useId,
  InputHTMLAttributes,
  useTransition,
  CSSProperties,
  Fragment,
  useEffect,
} from "react";

import Spinner from "../Spinner";

import { useCount } from "@/hooks/useCount";

interface FileUploadProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "accept" | "multiple" | "style"
  > {
  /**
   * 파일 업로드 API
   */
  onUpload?: (file: File) => Promise<unknown>;
  onEvent?: (e: number) => void;
  fileStep: number;
  fileSize?: number;
}

import { Button } from "../Button";

const convertByteToString = (byte: number) => {
  if (byte < 1000) return `${byte}byte`;
  if (byte < 1000 ** 2) return `${(byte / 1000).toFixed(1)}KB`;
  if (byte < 1000 ** 3) return `${(byte / 1000 ** 2).toFixed(1)}MB`;
  return `${(byte / 1000 ** 3).toFixed(1)}GB`;
};

export default function Upload({
  accept,
  onUpload = test,
  fileSize = 1,
  fileStep,
  onEvent,
}: FileUploadProps) {
  const componentId = useId();
  const [fileState, setFileState] = useState<{
    isSuccess: boolean;
    isLoading: boolean;
    file: File | null;
  } | null>(null);

  const [isFinished, setIsFinished] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [componentStep, setComponentStep] = useState(1);

  const progress = useMemo(() => {
    if (!fileState) return 0;
    return fileState.isLoading ? 0 : 100;
  }, [fileState]);

  const { count, reset } = useCount(progress, {
    speed: 20,
    step: 10,
    enable: !!fileState?.isLoading,
  });

  const MAX_FILE_SIZE = fileSize * 1024 * 1024;

  const handleOnEventChange = (e: number) => {
    if (onEvent) {
      onEvent(e);
    }
  };

  const handleChange = async (files: FileList) => {
    const file = files.item(0);
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert(`파일 최대 용량을 초과하였습니다.\n용량을 줄여주세요.`);
      return;
    }

    reset();
    setIsFinished(false);

    const initialState = {
      file,
      isLoading: true,
      isSuccess: false,
    };

    setFileState(initialState);

    try {
      await onUpload(file);
      startTransition(() => {
        setFileState({
          ...initialState,
          isLoading: false,
          isSuccess: true,
        });
        setIsFail(false);
        setComponentStep(2);
        if (onEvent) {
          handleOnEventChange(2);
        }
      });
    } catch {
      setFileState({
        ...initialState,
        isLoading: false,
        isSuccess: false,
      });
      setIsFail(true);
    } finally {
      setIsFinished(true);
    }
  };

  useEffect(() => {
    if (fileStep === 4) {
      setFileState(() => null);

      if (onEvent) {
        onEvent(1);
      }
    }
  }, [fileStep, fileState, onEvent]);

  const dragAreaStyle =
    "w-full h-[calc(100%-80px)] border border-dashed border-gray-400 rounded-xl flex justify-center items-center flex-col gap-y-2 relative";
  const labelStyle =
    "relative inline-flex cursor-pointer after:content-[''] after:absolute after:inset-0";

  const progressStyle =
    "progress relative w-full h-2 bg-gray-200 rounded-full overflow-hidden after:absolute after:top-0 after:left-0 after:h-full after:bg-gray-900 after:transition-all";

  const progressAddStyle: CSSProperties & { [key: string]: string } = {
    "--progress-width": `${progress}%`,
    "--progress-bg-color": isFail ? "#ff3b30" : "#111111",
  };

  return (
    <div className="w-full flex gap-x-6 h-[calc(100vh-245px)]">
      <div className="w-1/2 flex flex-col gap-y-6">
        <input
          id={componentId}
          type="file"
          hidden
          accept={accept}
          onChange={({ target: { files } }) => {
            if (files) {
              if (files.length > 1) {
                alert("파일은 하나만 업로드 가능합니다.");
              } else {
                handleChange(files);
              }
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
              if (e.dataTransfer.files.length > 1) {
                alert("파일은 하나만 업로드 가능합니다.");
              } else {
                handleChange(e.dataTransfer.files);
              }
            }
          }}
        >
          {isPending || fileState?.isLoading ? (
            <Spinner className="w-9 h-9" />
          ) : (
            <Fragment>
              {renderUploadIcon()}
              <p className="body02m text-[20px] text-gray-500">
                파일을 드래그 하거나 아래 버튼을 눌러주세요.
              </p>
              <label htmlFor={componentId} className={labelStyle}>
                <Button color="white" disabled={isPending}>
                  파일 선택하기
                </Button>
              </label>
            </Fragment>
          )}
        </div>
      </div>
      <div className="flex flex-col w-1/2">
        {fileState ? (
          <ul className="flex flex-col gap-y-6 h-[calc(100%-80px)]">
            <li className="flex flex-col w-full border-b pb-4">
              <h4 className="heading04b">1. 파일 업로드</h4>
              <div className="flex items-center gap-x-2 mb-2">
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
                <span
                  className={`body02r ${
                    isFinished ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {count}%
                </span>
              </div>
              <div className="flex">
                <div className="w-13 h-13 rounded-[6px] flex shrink-0 items-center justify-center bg-white border mr-2 relative">
                  {fileState.isLoading ? (
                    <Spinner className="w-6 h-6" />
                  ) : fileState.isSuccess ? (
                    renderFileIcon()
                  ) : (
                    renderErrorIcon()
                  )}
                </div>
                <div className="flex flex-col w-[calc(100%-64px)]">
                  <span
                    className={`truncate body01m ${
                      !fileState.isLoading && !fileState.isSuccess
                        ? "text-red-500"
                        : "text-gray-900"
                    }`}
                  >
                    {fileState.file?.name}
                  </span>
                  <span className="truncate body02r text-gray-500">
                    {convertByteToString(fileState.file?.size || 0)}
                  </span>
                </div>
              </div>
            </li>
            {componentStep === 2 && (
              <li className="flex flex-col w-full border-b pb-4">
                <h4 className="heading04b">2. 테이블 생성</h4>
                <div className="flex items-center gap-x-2 mb-2">
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
                  <span
                    className={`body02r ${
                      isFinished ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {count}%
                  </span>
                </div>
                <div className="flex">
                  <div className="w-13 h-13 rounded-[6px] flex shrink-0 items-center justify-center bg-white border mr-2 relative">
                    {fileState.isLoading ? (
                      <Spinner className="w-6 h-6" />
                    ) : fileState.isSuccess ? (
                      renderFileIcon()
                    ) : (
                      renderErrorIcon()
                    )}
                  </div>
                  <div className="flex flex-col w-[calc(100%-64px)]">
                    <span
                      className={`truncate body01m ${
                        !fileState.isLoading && !fileState.isSuccess
                          ? "text-red-500"
                          : "text-gray-900"
                      }`}
                    >
                      {fileState.file?.name}
                    </span>
                    <span className="truncate body02r text-gray-500">
                      {convertByteToString(fileState.file?.size || 0)}
                    </span>
                  </div>
                </div>
              </li>
            )}
          </ul>
        ) : (
          <div className="w-full h-[calc(100%-80px)] flex justify-center items-center flex-col gap-y-2">
            {renderQuestionIcon()}
            <p>파일 업로드를 하면 업로드 상태가 표시됩니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const renderUploadIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="w-10 h-10"
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

const renderErrorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="14"
      viewBox="0 0 16 14"
      fill="none"
      className="w-6 h-6"
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

const renderQuestionIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      className="w-8 h-8"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.44365 6.44365C10.4227 2.46462 15.9254 0 22 0C28.0746 0 33.5773 2.46462 37.5564 6.44365C41.5354 10.4227 44 15.9254 44 22C44 28.0746 41.5354 33.5773 37.5564 37.5564C33.5773 41.5354 28.0746 44 22 44C15.9254 44 10.4227 41.5354 6.44365 37.5564C2.46462 33.5773 0 28.0746 0 22C0 15.9254 2.46462 10.4227 6.44365 6.44365ZM22 4C17.0289 4 12.5316 6.01253 9.27208 9.27208C6.01253 12.5316 4 17.0289 4 22C4 26.9711 6.01253 31.4684 9.27208 34.7279C12.5316 37.9875 17.0289 40 22 40C26.9711 40 31.4684 37.9875 34.7279 34.7279C37.9875 31.4684 40 26.9711 40 22C40 17.0289 37.9875 12.5316 34.7279 9.27208C31.4684 6.01253 26.9711 4 22 4Z"
        fill="#222"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 16.625C14 12.2067 17.5817 8.625 22 8.625C26.4183 8.625 30 12.2067 30 16.625C30 20.3527 27.4505 23.4849 24 24.373V26.625C24 27.7296 23.1046 28.625 22 28.625C20.8954 28.625 20 27.7296 20 26.625V22.625C20 21.5204 20.8954 20.625 22 20.625C24.2091 20.625 26 18.8341 26 16.625C26 14.4159 24.2091 12.625 22 12.625C19.7909 12.625 18 14.4159 18 16.625C18 17.7296 17.1046 18.625 16 18.625C14.8954 18.625 14 17.7296 14 16.625Z"
        fill="#222"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 35.625C23.3807 35.625 24.5 34.5057 24.5 33.125C24.5 31.7443 23.3807 30.625 22 30.625C20.6193 30.625 19.5 31.7443 19.5 33.125C19.5 34.5057 20.6193 35.625 22 35.625Z"
        fill="#222"
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
