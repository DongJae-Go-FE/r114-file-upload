import {
  SideBar,
  SideBarContent,
  SideBarContextProvider,
} from "@/components/SideBar";

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
          <main className="p-4 h-full">
            <div className="w-full h-full bg-white rounded-[8px] overflow-y-scroll p-4 max-h-full">
              {children}
            </div>
          </main>
        </SideBarContent>
      </div>
    </SideBarContextProvider>
  );
}
