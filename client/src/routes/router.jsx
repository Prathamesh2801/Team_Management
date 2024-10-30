import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../app/LandingPage";
import { AuthPage } from "../components/AuthPage";
import { Dashboard } from "../app/Dashboard";
import { ErrorPage } from "../app/Errorpage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
