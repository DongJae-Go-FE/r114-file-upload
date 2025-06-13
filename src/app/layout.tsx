import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import ContextProvider from "@/components/Provider/Provider";

const pretendard = localFont({
  src: "fonts/PretendardVariable.woff2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HDC LABS R114 Solution File Upload System",
  description: "에이치디씨랩스 부동산114 솔루션 파일 업로드 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
