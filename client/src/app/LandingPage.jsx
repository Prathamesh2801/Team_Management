import React from "react";
import { ArrowRight, Users, Calendar, Zap } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { NavLink } from "react-router-dom";

export const LandingPage = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Work seamlessly with your team members in real-time",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Smart Scheduling",
      description: "Organize tasks and deadlines with our intuitive calendar",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Updates",
      description: "Stay on top of changes with real-time notifications",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-950 dark:to-neutral-900">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-stone-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent dark:from-stone-400 dark:to-stone-400 sm:text-5xl">
            Streamline Your Team's Workflow
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            The modern solution for team collaboration and task management.
            Built for teams that want to achieve more together.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <NavLink to="/auth">
              {" "}
              <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-neutral-300 to-indigo-600 px-6 py-3 font-semibold text-white transition-all hover:scale-95 dark:from-indigo-900 dark:to-stone-900">
                Get Started <ArrowRight className="h-4 w-4" />
              </button>
            </NavLink>
            <button className="rounded-lg bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:scale-95 dark:bg-neutral-900 dark:text-gray-200">
              Learn More
            </button>
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-neutral-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-stone-50 to-indigo-200 text-stone-600 dark:from-stone-900 dark:to-indigo-900 dark:text-stone-400">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        {/* <div className="mt-20 text-center">

        </div> */}
      </div>
    </div>
  );
};
