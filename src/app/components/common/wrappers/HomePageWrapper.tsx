import { Sidebar } from "../Sidebar/Sidebar";

export const HomePageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen" suppressHydrationWarning>
      <Sidebar />
      {children}
    </div>
  );
}