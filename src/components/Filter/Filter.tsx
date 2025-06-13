"use client";

import { FormEvent, Fragment, ReactNode } from "react";

import { Label } from "../Label";

import { Button } from "../Button";

export type FilterItemType = {
  title: string;
  inputs: {
    node: ReactNode;
  }[];
  ratio: number;
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
        <ul className="grid grid-rows-1 grid-cols-5 w-full h-full gap-2">
          {items?.map((item, index) => {
            return (
              <li
                key={index}
                className="flex flex-col gap-y-2"
                style={{ gridColumn: `span ${item.ratio}` }}
              >
                <Label className="text-gray-500 body03r">{item.title}</Label>
                <div className="flex w-full gap-x-2">
                  {item.inputs.map(({ node }, index) => (
                    <Fragment key={index}>{node}</Fragment>
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
