import { RouterProvider, Routes, Route } from 'react-router-dom';
import { router } from './routes/router';
import { TeamMembers } from "./components/team/TeamMembers";
import { Schedule } from "./components/schedule/Schedule";
import { MyTasks } from "./components/task/MyTasks";

export const App = () => {
  return (
    <RouterProvider router={router} />
  );
};
