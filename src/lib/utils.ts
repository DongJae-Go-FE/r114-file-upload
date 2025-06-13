import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { SortingFn } from "@tanstack/react-table";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isKorean = (text: string) => /^[가-힣]/.test(text);

export const autoDetectSort = <T>(): SortingFn<T> => {
  return (rowA, rowB, columnId) => {
    const a = rowA.getValue(columnId) as string;
    const b = rowB.getValue(columnId) as string;

    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b, undefined, { sensitivity: "base" });
    }

    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }

    if (!a && !b) return 0;
    if (!a) return -1;
    if (!b) return 1;

    const locale = isKorean(a) && isKorean(b) ? "ko" : "en";

    return a.localeCompare(b, locale, { sensitivity: "base" });
  };
};
