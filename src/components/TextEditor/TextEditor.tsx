"use client";

import dynamic from "next/dynamic";

import Spinner from "@/components/Spinner";

const TextEditorNoSSR = dynamic(() => import("./QuillEditor"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function TextEditor({
  value,
  onChange,
  defaultValue = "",
  disabled,
}: {
  value?: string;
  onChange?: (val: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}) {
  return (
    <div className="relative h-[250px]">
      <TextEditorNoSSR
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
