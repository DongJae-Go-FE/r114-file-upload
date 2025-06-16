"use client";

import { useId, InputHTMLAttributes, Fragment } from "react";

import { Button } from "../Button";
import Spinner from "../Spinner";

interface FileUploadProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "accept" | "multiple" | "style"
  > {
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
  upload?: (files: File[]) => Promise<unknown>;

  limit?: number;

  disabled?: boolean;

  onLimitOver?: () => void;

  isLoading?: boolean;
}

export default function FileUpload({
  accept,
  multiple,
  buttonText = "Upload",
  dragAreaPlaceholder = "Click or drag file to this area to upload",
  upload,
  disabled,
  limit,
  onLimitOver,
  isLoading,
}: FileUploadProps) {
  const componentId = useId();

  const MAX_FILE_SIZE = 51 * 1024 * 1024;

  const handleChange = async (files: FileList) => {
    const fileArray = Array.from(files);

    if (limit && fileArray.length > limit) {
      onLimitOver?.();
      return;
    }

    const oversizedFiles = fileArray.filter(
      (file) => file.size > MAX_FILE_SIZE
    );
    if (oversizedFiles.length > 0) {
      alert(`파일 최대 용량을 초과 하였습니다.\n 용량을 확인해주세요`);
      return;
    }

    try {
      await upload?.(fileArray);
    } catch (e) {
      alert(e);
    }
  };

  const dragAreaStyle =
    "w-full h-full p-8 flex flex-col items-center justify-center text-gray-500 body02m";
  const labelStyle = `relative inline-flex cursor-pointer after:content-[''] after:absolute after:inset-0 ${
    disabled ? "pointer-events-none" : ""
  }`;

  return (
    <div className="flex gap-1 w-full h-100">
      <div className="w-full h-full relative  border border-dashed rounded-[6px] border-gray-200">
        {isLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <input
              id={componentId}
              type="file"
              hidden
              accept={accept}
              disabled={disabled}
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
                  if (
                    (!multiple && e.dataTransfer.files.length === 1) ||
                    multiple
                  ) {
                    handleChange(e.dataTransfer.files);
                  }
                }
              }}
            >
              {renderUploadIcon(disabled)}
              <span
                className={`text-center block mt-2 mb-2 body01m ${
                  disabled ? "text-gray-200" : "text-gray-500"
                }`}
              >
                {dragAreaPlaceholder}
              </span>

              <label htmlFor={componentId} className={labelStyle}>
                <Button color="white" size="sm" disabled={disabled}>
                  {buttonText}
                </Button>
              </label>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}

const renderUploadIcon = (disabled?: boolean) => {
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
        fill={disabled ? "#D9D9D9" : "#111111"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.29289 0.292893C9.68342 -0.0976311 10.3166 -0.0976311 10.7071 0.292893L15.2071 4.79289C15.5976 5.18342 15.5976 5.81658 15.2071 6.20711C14.8166 6.59763 14.1834 6.59763 13.7929 6.20711L10 2.41421L6.20711 6.20711C5.81658 6.59763 5.18342 6.59763 4.79289 6.20711C4.40237 5.81658 4.40237 5.18342 4.79289 4.79289L9.29289 0.292893Z"
        fill={disabled ? "#D9D9D9" : "#111111"}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99609 0C10.5484 0 10.9961 0.447715 10.9961 1V14C10.9961 14.5523 10.5484 15 9.99609 15C9.44381 15 8.99609 14.5523 8.99609 14V1C8.99609 0.447715 9.44381 0 9.99609 0Z"
        fill={disabled ? "#D9D9D9" : "#111111"}
      />
    </svg>
  );
};
