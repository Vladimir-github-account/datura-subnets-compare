import { Sidebar } from "../Sidebar/Sidebar";

export const HomePageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen overflow-x-hidden" suppressHydrationWarning>
      <Sidebar />
      {children}
    </div>
  );
}