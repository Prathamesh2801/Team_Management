import { Sidebar } from "../components/Sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-white dark:bg-neutral-950">{children}</main>
    </div>
  );
};
