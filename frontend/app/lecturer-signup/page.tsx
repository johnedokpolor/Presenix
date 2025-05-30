"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useStore from "@/store/store";
import PasswordStrengthMeter from "@/components/PasswordStrengthMeter";

export default function SignupPage() {
  const router = useRouter();
  const submitButton = useRef<HTMLButtonElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // matricNumber: "",
    password: "",
    lecturerToken: true, // Set lecturer to true by default
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passStrength, setPassStrength] = useState(false);

  // Access the store to get user data and setUser function
  const { student, lecturer } = useStore();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Convert email and matricNumber to lowercase
    setFormData((prev) => ({
      ...prev,
      email: prev.email.toLowerCase(),
      // matricNumber: prev.matricNumber.toLowerCase(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    } else if (!/[A-Z]/.test(formData.password)) {
      return toast.error("Password must contain an uppercase letter");
    } else if (!/[a-z]/.test(formData.password)) {
      return toast.error("Password must contain a lowercase letter");
    } else if (!/\d/.test(formData.password)) {
      return toast.error("Password must contain a number");
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      return toast.error("Password must contain a special character");
    }
    setIsLoading(true);
    setError(null);

    // Simulate API call
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      toast.success("Account created successfully!");
      router.push("/signin");
      console.log(response.data);
    } catch (error: any) {
      console.error("Error creating account:", error);
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };
  console.log(formData);

  console.log("Student:", student);
  console.log("Lecturer:", lecturer);
  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md ">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Fill in your details to get started</p>
        </div>

        {/* Form Card */}
        <div className="bg-white border  border-gray-200 rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6 ">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full text-black pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900

 focus:border-transparent placeholder:text-gray-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Matric Number */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matric Number
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="matricNumber"
                  value={formData.matricNumber}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900

 focus:border-transparent"
                  placeholder="Enter your matric number"
                  required
                />
              </div>
            </div> */}
            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-black pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900

 focus:border-transparent placeholder:text-gray-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Password */}
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
                  onKeyDown={() => setPassStrength(true)}
                  className="w-full text-black pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900

 focus:border-transparent placeholder:text-gray-500"
                  placeholder="Create a password"
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {/* Password strength meter */}
            {passStrength && (
              <PasswordStrengthMeter password={formData.password} />
            )}

            {/* Submit Button */}
            <button
              ref={submitButton}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-purple-900 cursor-pointer text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900

 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
