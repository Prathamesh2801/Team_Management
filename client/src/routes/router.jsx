import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { LandingPage } from "../app/LandingPage";
import { AuthPage } from "../components/AuthPage";
import { Dashboard } from "../app/Dashboard";
import { ErrorPage } from "../app/Errorpage";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} errorElement={<ErrorPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);
