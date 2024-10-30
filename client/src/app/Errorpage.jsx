import { NavLink } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-neutral-900">
        <NavLink to="/">
          <p className="text-2xl font-bold text-red-600">
            Something went wrong, go to homepage.
          </p>
        </NavLink>
      </div>
    </div>
  );
};
