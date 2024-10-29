import React from "react";
import ThemeToggle from "../hooks/ThemeToggle";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/">
            <div className="flex-shrink-0">
              <span className="bg-gradient-to-r from-neutral-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent dark:from-neutral-400 dark:to-indigo-400">
                Task Manager
              </span>
            </div>
          </NavLink>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <NavLink to="/auth">
              <div className="flex items-center space-x-3">
                <button className="rounded-lg bg-indigo-800 px-4 py-2 text-sm font-medium text-white transition-all hover:scale-95 dark:bg-indigo-900">
                  Join Us
                </button>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
