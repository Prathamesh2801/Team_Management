import React from "react";
import { ArrowRight, CheckCircle, Users, Calendar, Zap } from "lucide-react";
import { Navbar } from "../components/Navbar";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl dark:from-blue-400 dark:to-indigo-400">
            Streamline Your Team's Workflow
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            The modern solution for team collaboration and task management.
            Built for teams that want to achieve more together.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 dark:from-blue-500 dark:to-indigo-500">
              Get Started <ArrowRight className="h-4 w-4" />
            </button>
            <button className="rounded-lg border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 dark:from-blue-900 dark:to-indigo-900 dark:text-blue-400">
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

        {/* Social Proof */}
        {/* <div className="mt-20 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              <span className="text-gray-600 dark:text-gray-300">10k+ Teams</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              <span className="text-gray-600 dark:text-gray-300">99.9% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
              <span className="text-gray-600 dark:text-gray-300">24/7 Support</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};
