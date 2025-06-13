import {
  SideBar,
  SideBarContent,
  SideBarContextProvider,
} from "@/components/SideBar";

import Header from "@/components/Header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideBarContextProvider>
      <div className="w-full h-full flex">
        <SideBar />
        <SideBarContent>
          <Header />
          <main className="p-4 h-[calc(100dvh-64px)]">
            <div className="w-full h-full bg-white rounded-[8px] overflow-y-scroll p-4 max-h-[calc(100dvh-96px)]">
              {children}
            </div>
          </main>
        </SideBarContent>
      </div>
    </SideBarContextProvider>
  );
}
