import { Layout } from "../layout/Layout";
import { TeamProjects } from "../components/dashboard/TeamProjects";
import { TaskActivity } from "../components/dashboard/TaskActivity";
import { QuickActions } from "../components/dashboard/QuickActions";

export const Dashboard = () => {
  return (
    <div className="bg-white dark:bg-neutral-950">
      <Layout>
        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <QuickActions />
          </div>

          <div className="lg:col-span-2">
            <TeamProjects />
          </div>

          <div className="lg:col-span-1">
            <TaskActivity />
          </div>
        </div>
      </Layout>
    </div>
  );
};
