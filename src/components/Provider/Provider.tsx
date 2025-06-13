"use client";

import { ReactNode, createContext } from "react";

export const Context = createContext("");

//TODO. zustand 쓸지 아니면 간단하게 상태관리용 Context 쓸지 

export default function ContextProvider({
  children,
  value = "",
}: {
  children: ReactNode;
  value?: string;
}) {
  return <Context value={value}>{children}</Context>;
}
