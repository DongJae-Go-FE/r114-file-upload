"use client";

import { FC, useEffect, useRef } from "react";
import Quill from "quill";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import "./style.css";

interface QuillEditorProps {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
}

const QuillEditor: FC<QuillEditorProps> = ({
  placeholder = "내용을 입력해주세요",
  defaultValue = "",
  value,
  onChange,
  disabled,
}) => {
  const quillEditorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ];

    if (quillEditorRef.current && !quillRef.current) {
      quillRef.current = new Quill(quillEditorRef.current, {
        theme: "snow",
        modules: { toolbar: toolbarOptions },
        readOnly: disabled,
        placeholder,
      });

      if (defaultValue) {
        quillRef.current.clipboard.dangerouslyPasteHTML(defaultValue);
        onChange?.(defaultValue);
      }

      quillRef.current.on("text-change", () => {
        const html = quillRef.current?.root.innerHTML || "";
        onChange?.(html);
      });
    }
  }, [placeholder, defaultValue, onChange, disabled]);

  return (
    <div className="h-[calc(100%-30px)]">
      <div ref={quillEditorRef} className="h-full" />
      <label htmlFor="content" className="sr-only">
        텍스트 에디터
      </label>
      <input
        type="hidden"
        id="content"
        name="content"
        value={value ?? ""}
        disabled={disabled}
        readOnly
      />
    </div>
  );
};

export default QuillEditor;
