import { Layout } from "../layout/Layout";
import { NavLink } from "react-router-dom";
// import { TeamProjects } from "../components/dashboard/TeamProjects";
// import { TaskActivity } from "../components/dashboard/TaskActivity";
// import { QuickActions } from "../components/dashboard/QuickActions";

export const Dashboard = () => {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <Layout>
        {/* <div className="grid min-h-screen grid-cols-1 gap-6 p-6 md:min-h-0 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <QuickActions />
          </div>

          <div className="lg:col-span-2">
            <TeamProjects />
          </div>

          <div className="lg:col-span-1">
            <TaskActivity />
          </div>
        </div> */}
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="w-1/3 flex items-start justify-center flex-col">
            <h1 className="text-neutral-600 text-4xl font-bold">
              Nothing here yet ~_~
            </h1>
            <NavLink to="/teams" className="mt-4">
              <button className="bg-indigo-500 hover:bg-indigo-700/40 text-white font-bold py-2 px-4 rounded mt-4">
                Explore Teams
              </button>
            </NavLink>
          </div>
        </div>
      </Layout>
    </div>
  );
};
