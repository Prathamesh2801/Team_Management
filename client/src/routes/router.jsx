import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "../app/LandingPage";
import { Dashboard } from "../app/Dashboard";
import { AuthPage } from "../components/AuthPage";
import { ErrorPage } from "../app/ErrorPage";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Teams } from "../app/Teams";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/teams",
    element: <Teams />,
  },
]);
