"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ReactNode, useContext, useState, createContext } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";

import { ChevronRight, ChevronLeft } from "lucide-react";

type SideBarContextType = {
  isOpen: boolean;
  setIsOpen: () => void;
};

export const SideBarContext = createContext<SideBarContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export function SideBarContextProvider({ children }: { children: ReactNode }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const handleToggle = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  return (
    <SideBarContext
      value={{
        isOpen: isSideBarOpen,
        setIsOpen: handleToggle,
      }}
    >
      {children}
    </SideBarContext>
  );
}

function SideBarContent({ children }: { children: ReactNode }) {
  const { isOpen } = useContext(SideBarContext);

  const sideBarStyle = `${
    isOpen ? "w-[calc(100%-248px)] ml-[248px]" : "w-full ml-0"
  } transition-[width, margin-left] duration-300 relative h-full overflow-hidden`;

  return <div className={sideBarStyle}>{children}</div>;
}

type MenuItem = { key: string; title: string; children: MenuItem[] };

const MenuAccordion = (props: { items: MenuItem[]; link?: string }) => {
  const pathname = usePathname();

  return (
    <Accordion type="single" collapsible>
      {props.items.map(({ key, title, children }) => {
        const link = `${props.link || ""}/${key}`;

        return children.length ? (
          <AccordionItem key={key} value={key} className="group">
            <AccordionTrigger
              className={`${
                pathname.startsWith(link)
                  ? "text-gray-900 body01b"
                  : "text-gray-600 body01m"
              } flex px-5 py-3`}
            >
              {title}
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <MenuAccordion items={children} link={link} />
            </AccordionContent>
          </AccordionItem>
        ) : (
          <Link
            key={key}
            className={`${
              pathname.startsWith(link)
                ? "text-gray-900 body01b group-has-[a]:body02b pointer-events-none"
                : "text-gray-600 body01m group-has-[a]:body02m"
            } block px-5 py-3 border-b last:border-b-0 group-has-[a]:pl-8`}
            href={link}
          >
            {title}
          </Link>
        );
      })}
    </Accordion>
  );
};

function SideBar() {
  const { isOpen, setIsOpen } = useContext(SideBarContext);

  const menu: MenuItem[] = [
    {
      key: "data",
      title: "데이터 전송",
      children: [
        {
          key: "send",
          title: "데이터 전송 관리",
          children: [],
        },
      ],
    },
  ];

  const sideBarStyle = `w-[248px] h-full bg-white absolute top-0 flex flex-col border-r border-gray-200 ${
    isOpen ? "left-0" : "-left-[248px]"
  } transition-[left] duration-300`;
  const infoLiStyle = "flex gap-x-1";
  const infoParagraphStyle = "truncate max-w-[120px]";

  return (
    <div aria-expanded={isOpen ? true : false} className={sideBarStyle}>
      <div className="flex items-center justify-center h-[117px] border-b">
        <h4 className="heading04b">REPS 5.0 Admin</h4>
      </div>
      <div className="w-full h-30 border-b border-gray-200">
        <div className="w-full h-full p-4 body03b">
          <h3>
            <p className="truncate">유저이름유저이름유저이름유저이름유저이름</p>
          </h3>
          <ul className="mt-2">
            <li className={infoLiStyle}>
              메일주소: <p className={infoParagraphStyle}>admin@naver.com</p>
            </li>
            <li className={infoLiStyle}>
              최근 접속시간: <p className={infoParagraphStyle}>2025.01.01</p>
            </li>
            <li className={infoLiStyle}>
              최근 접속시간: <p className={infoParagraphStyle}>2025.01.01</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-[calc(100%-364px)] overflow-auto">
        <MenuAccordion items={menu} />
      </div>
      <button
        type="button"
        className="absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-12 flex justify-center items-center bg-white z-30 rounded-r-sm border border-gray-200 shadow-xs"
        onClick={setIsOpen}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>
    </div>
  );
}

export { SideBarContent, SideBar };
