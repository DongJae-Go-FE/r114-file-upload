"use client";
import Link from "next/link";
import Image from "next/image";
// import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";

import { Button } from "../Button";

import { LOGOUT_CONFIRM_STRING } from "@/const/const";

// import { handleLogout as handleServerLogout } from "@/severActions/serverActions";

export default function Header() {
  const handleLogout = async () => {
    if (confirm(LOGOUT_CONFIRM_STRING)) {
      // await handleServerLogout();
    }
  };

  const headerStyle =
    "w-full h-16 border-b border-gray-200 sticky top-0 z-30 flex items-center px-6 bg-white justify-between";

  return (
    <header className={headerStyle}>
      <h1 className="h-16 border-b border-gray-200">
        <Link
          className="flex justify-center items-center w-full h-full"
          href="/"
        >
          <Image src="/logo.svg" alt="로고" width={117} height={24} />
        </Link>
      </h1>
      <div className="flex gap-x-2 items-center">
        <Button size="sm" color="white" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </header>
  );
}
