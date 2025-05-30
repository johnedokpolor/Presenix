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
    <div className="h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md ">
        {/* Header */}
        <h2>Hello</h2>

        {/* Form Card */}

        {/* Footer */}
      </div>
    </div>
  );
}
