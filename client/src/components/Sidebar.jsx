import { User2Icon } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="flex min-h-screen w-64 flex-col justify-between bg-neutral-900">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center p-4">
          <User2Icon className="h-6 w-6 text-red-600" />
          <p className="text-xl font-bold text-white">User</p>
        </div>
        <hr className="my-3 h-1 w-full border-0 bg-amber-700" />
        <div className="flex w-full flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-bold text-white">Team Management</p>
          </div>
          <hr className="my-3 h-1 w-full border-0 bg-amber-700" />
          <div className="flex flex-col items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-bold text-white">Dashboard</p>
            </div>
            <hr className="my-3 h-1 w-full border-0 bg-amber-700" />
            <div className="text-center">
              <p className="text-lg font-bold text-white">Teams</p>
            </div>
            <hr className="my-3 h-1 w-full border-0 bg-amber-700" />
            <a href="/auth/logout" className="text-center">
              <p className="text-lg font-bold text-white">Logout</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
