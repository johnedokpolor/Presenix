"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, Hash, Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useStore from "@/store/store";
import axiosInstance from "@/utils/axiosInstance";

export default function SigninPage() {
  const router = useRouter();
  const submitButton = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email_matricNumber: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  // Access the store to get user data and setUser function
  const { student, lecturer, SetUser } = useStore();
  // If user is already logged in, redirect to dashboard
  const user = lecturer ? lecturer : student;
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  useEffect(() => {
    // Create a timer to check if the user has stopped typing every 1seconds
    // If the user stops typing for 1seconds, add the option to the list
    const timer = setTimeout(() => {
      console.log("User stopped typing. Final input:", formData.password);
      if (formData.password !== "") {
        submitButton?.current?.click();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.password]);

  useEffect(() => {
    // Create a timer to check if the user has stopped typing every 1seconds
    const timer = setTimeout(() => {
      console.log(
        "User stopped typing. Final input:",
        formData.email_matricNumber
      );
      setError(null);
      const validateInput = async () => {
        setIsLoading(true);
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_matricNumber)) {
          // If email_matricNumber is an email, add it as email
          try {
            const response = await axiosInstance.post(
              "/auth/check-email",

              { email: formData.email_matricNumber }
            );
            console.log(response);
            setIsValid(true);
            setIsLoading(false);
          } catch (error: any) {
            setError(error.response.data.message);
            setIsLoading(false);
          }
        } else {
          console.log("not email");
          try {
            const response = await axiosInstance.post(
              "/auth/check-matric-number",

              { matricNumber: formData.email_matricNumber }
            );
            console.log(response);
            setIsLoading(false);
            setIsValid(true);
          } catch (error: any) {
            setIsLoading(false);
            setError(error.response.data.message);
          }
        }
      };
      if (formData.email_matricNumber !== "" && !isValid) {
        validateInput();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.email_matricNumber]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Convert email and matricNumber to lowercase
    setFormData((prev) => ({
      ...prev,
      email_matricNumber: prev.email_matricNumber.toLowerCase(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    // Define the type to allow either email or matricNumber
    let submitData: any = {
      password: formData.password,
      name: formData.name,
    };

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_matricNumber)) {
      // If email_matricNumber is an email, add it as email
      submitData = {
        ...submitData,
        email: formData.email_matricNumber,
      };
    } else {
      console.log("not email");
      submitData = {
        ...submitData,
        matricNumber: formData.email_matricNumber,
      };
    }

    console.log(submitData);

    // Simulate API call
    try {
      const response = await axiosInstance.post("/auth/login", submitData);
      toast.success("Logged in successfully!");
      SetUser(response.data.user);
    } catch (error: any) {
      console.error("Error logging in account:", error);
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className=" bg-white h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md ">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Login</h1>
          <p className="text-gray-600">Fill in your details to login</p>
        </div>

        {/* Form Card */}
        <div className="bg-white border  border-gray-200 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6 ">
            {/* Matric Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email/Matric Number
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="email_matricNumber"
                  value={formData.email_matricNumber}
                  onChange={handleInputChange}
                  className="w-full text-black pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900
 focus:border-transparent placeholder:text-gray-500"
                  placeholder="Enter your email or matric no"
                  required
                />
                <div className="absolute right-3 top-4">
                  {isLoading && !isValid && (
                    <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin mr-2" />
                  )}
                </div>
              </div>
            </div>

            {/* Password */}
            {isValid && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full text-black pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-transparent placeholder:text-gray-500"
                    placeholder="Enter your password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            {isValid && (
              <button
                ref={submitButton}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-purple-900 cursor-pointer text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900

 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            )}
          </form>
        </div>

        {/* Footer */}
        {/* <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Sign in
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
}
