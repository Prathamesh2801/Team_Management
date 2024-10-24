import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../app/LandingPage";
import { AuthPage } from "../components/AuthPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);
