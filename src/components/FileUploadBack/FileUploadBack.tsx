"use client";
import { useState, useEffect, Fragment } from "react";

import { Progress } from "../Progress";

type FileUploadProps = {
  download: {
    fileName: string;
    href: string;
  };
  upload: {
    label: string;
    onUpload?: () => void;
    id: string;
    accept?: string;
  };
};

export default function FileUploadBack({ download, upload }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isUploading) {
      const timer = setTimeout(() => setProgress(100), 1000);

      if (progress === 100) {
        setTimeout(() => {
          setIsUploading(false);
          setProgress(0);
        }, 2000);
      }
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isUploading, progress]);

  const handleUpload = () => {
    setIsUploading(true);
  };

  return (
    <div className="flex w-full gap-x-2 items-center h-12">
      {isUploading ? (
        <div className="w-full">
          <Progress value={progress} className="w-[60%]" />
          {progress}%
        </div>
      ) : (
        <Fragment>
          <a
            download
            href={download.href}
            className="px-8 h-12 rounded-[8px] bg-gray-900 text-white body01m inline-flex items-center"
          >
            {download.fileName}
          </a>
          <label
            htmlFor={upload.id}
            className="flex items-center gap-x-2 px-8 h-12 rounded-[8px] bg-white border border-gray-200 body01m text-gray-900 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.2513 5.41663C11.5735 5.41663 11.8346 5.67779 11.8346 5.99996L11.8346 11.25C11.8346 11.5721 11.5735 11.8333 11.2513 11.8333L0.751302 11.8333C0.429136 11.8333 0.167969 11.5721 0.167969 11.25L0.167969 6.00238C0.167969 5.68021 0.429136 5.41905 0.751302 5.41905C1.07347 5.41905 1.33464 5.68021 1.33464 6.00238L1.33464 10.6666L10.668 10.6666V5.99996C10.668 5.67779 10.9291 5.41663 11.2513 5.41663Z"
                fill="#111111"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.58882 0.33748C5.81663 0.109674 6.18597 0.109674 6.41378 0.33748L9.03878 2.96248C9.26659 3.19029 9.26659 3.55963 9.03878 3.78744C8.81097 4.01524 8.44163 4.01524 8.21382 3.78744L6.0013 1.57492L3.78878 3.78744C3.56098 4.01524 3.19163 4.01524 2.96382 3.78744C2.73602 3.55963 2.73602 3.19029 2.96382 2.96248L5.58882 0.33748Z"
                fill="#111111"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.9974 0.166626C6.31956 0.166626 6.58073 0.427793 6.58073 0.749959L6.58073 8.33329C6.58073 8.65546 6.31956 8.91663 5.9974 8.91663C5.67523 8.91663 5.41406 8.65546 5.41406 8.33329L5.41406 0.749959C5.41406 0.427793 5.67523 0.166626 5.9974 0.166626Z"
                fill="#111111"
              />
            </svg>
            {upload.label}
            <input
              type="file"
              accept=".exe"
              name={upload.id}
              id={upload.id}
              hidden
              onChange={handleUpload}
            />
          </label>
        </Fragment>
      )}
    </div>
  );
}
