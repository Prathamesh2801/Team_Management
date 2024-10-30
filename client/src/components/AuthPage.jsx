import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";
// const navigate = useNavigate();

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? `${API_URL}/login` : `${API_URL}/register`;
      const response = await axios.post(endpoint, formData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      // if (localStorage.getItem("token")) {
      //   navigate("/dashboard");
      // }
      toast.success("Authentication successful");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <NavLink to="/">
        <p className="absolute left-4 top-4 font-medium text-gray-700 dark:text-gray-200">
          « Back to Home
        </p>
      </NavLink>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-950 dark:to-neutral-900">
        <div className="w-[90%] max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg dark:bg-neutral-900 md:w-full">
          <div className="text-center">
            <h2 className="bg-gradient-to-r from-stone-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent dark:from-stone-400 dark:to-stone-600">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={toggleAuthMode}
                className="font-medium text-blue-500 hover:text-blue-400"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 px-3 py-2 outline-none transition-all duration-150 focus:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border-2 border-gray-300 px-3 py-2 outline-none transition-all duration-150 focus:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-lg border-2 border-gray-300 px-3 py-2 outline-none transition-all duration-150 focus:shadow-lg dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full transform rounded-lg border-2 border-indigo-600 bg-white px-4 py-3 font-medium text-gray-700 transition duration-150 hover:bg-neutral-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
            <Toaster
              toastOptions={{
                className:
                  "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-200",
                success: {
                  icon: <CheckCircle className="h-6 w-6 text-green-500" />,
                },
                error: {
                  icon: <XCircle className="h-6 w-6 text-red-500" />,
                },
              }}
            />
          </form>

          {isLogin && (
            <div className="text-center">
              <button className="text-sm text-blue-500 hover:text-blue-400">
                Forgot your password?
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
