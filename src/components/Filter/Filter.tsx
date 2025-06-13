"use client";

import { FormEvent, ReactNode } from "react";

import { Label } from "../Label";

import { Button } from "../Button";

export type FilterItemType = {
  title: string;
  inputs: {
    node: ReactNode;
  }[];
};

export type FilterType = {
  items: FilterItemType[];
  buttonComponent?: ReactNode;
  onSubmit: () => void;
  onReset?: () => void;
};

export default function Filter({
  items,
  onSubmit,
  buttonComponent,
  onReset,
}: FilterType) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full p-4 bg-gray-100 rounded-[6px] flex flex-col gap-y-3">
        <ul className="flex w-full h-full flex-wrap gap-2">
          {items?.map((item, index) => {
            return (
              <li key={index} className="flex-1 flex flex-col gap-y-2">
                <Label className="text-gray-500 body03r">{item.title}</Label>
                <div>
                  {item.inputs.map(({ node }, index) => (
                    <div key={index}>{node}</div>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-x-1 justify-end">
          {onReset && (
            <Button type="button" size="md" color="white" onClick={onReset}>
              초기화
            </Button>
          )}
          {buttonComponent ? (
            buttonComponent
          ) : (
            <Button type="submit" size="md">
              조회
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
