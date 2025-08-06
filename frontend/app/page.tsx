"use client";
import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Users,
  Clock,
  BarChart3,
  Zap,
  Shield,
  ArrowRight,
  Menu,
  X,
  Star,
  Eye,
} from "lucide-react";
import Link from "next/link";

type SectionKeys = "hero" | "features" | "testimonials";
const PresenixLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<
    Partial<Record<SectionKeys, boolean>>
  >({});
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[id]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "No-Click Setup",
      description:
        "Automatically sign in, sign up, and track attendance with zero clicks",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Real-Time Tracking",
      description:
        "Instant attendance updates with live notifications and alerts",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Smart Analytics",
      description:
        "Comprehensive insights and reports to optimize attendance patterns",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description:
        "Bank-level encryption and privacy protection for sensitive data",
    },
  ];

  const stats = [
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "10K+", label: "Active Users" },
    { number: "500+", label: "Organizations" },
    { number: "24/7", label: "Support" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director, TechCorp",
      quote:
        "Presenix revolutionized our attendance management. The accuracy is incredible!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Operations Manager, EduTech",
      quote:
        "The real-time analytics helped us improve our workforce efficiency by 40%.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "CEO, StartupHub",
      quote:
        "Implementation was seamless. Our team loves the intuitive interface.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden text-gray-900 bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 shadow-sm bg-white/80 backdrop-blur-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                <span className="text-lg font-bold text-white">P</span>
              </div>
              <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text">
                Presenix
              </span>
            </div>

            <div className="hidden space-x-8 md:flex">
              <a
                href="#features"
                className="text-gray-700 transition-colors hover:text-purple-600"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-700 transition-colors hover:text-purple-600"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 transition-colors hover:text-purple-600"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="text-gray-700 transition-colors hover:text-purple-600"
              >
                Contact
              </a>
            </div>

            <div className="items-center hidden space-x-4 md:flex">
              <Link href="/signin">
                <button className="text-gray-700 transition-colors cursor-pointer hover:text-purple-600">
                  Sign In
                </button>
              </Link>
              <Link href="/student-signup">
                <button className="px-4 py-2 font-medium text-white transition-all duration-300 transform rounded-lg shadow-lg cursor-pointer bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 hover:scale-105 hover:shadow-purple-500/25">
                  Get Started
                </button>
              </Link>
            </div>

            <button
              className="text-gray-700 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-gray-200 md:hidden bg-white/95 backdrop-blur-lg">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block text-gray-700 transition-colors hover:text-purple-600"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block text-gray-700 transition-colors hover:text-purple-600"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="block text-gray-700 transition-colors hover:text-purple-600"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="block text-gray-700 transition-colors hover:text-purple-600"
              >
                Contact
              </a>
              <Link href="/signin">
                <button className="w-full text-left text-gray-700 transition-colors cursor-pointer hover:text-purple-600">
                  Sign In
                </button>
              </Link>
              <Link href="/student-signup">
                <button className="w-full px-4 py-2 font-medium text-white transition-all duration-300 rounded-lg cursor-pointer bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-purple-100/50 blur-3xl animate-pulse"></div>
          <div className="absolute delay-1000 rounded-full bottom-20 right-10 w-96 h-96 bg-purple-100/30 blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${
                isVisible.hero
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-10"
              }`}
            >
              Smart Attendance
              <br />
              <span className="text-gray-900">Redefined</span>
            </h1>

            <p
              className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
                isVisible.hero
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-10"
              }`}
            >
              Experience the future of attendance tracking with real-time
              feedback, dynamic charts, and intuitive tables that keep you
              informed and in control.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${
                isVisible.hero
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-10"
              }`}
            >
              <button className="flex items-center px-8 py-4 space-x-2 text-lg font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl hover:scale-105 hover:shadow-purple-500/25">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 text-lg font-semibold text-purple-600 transition-all duration-300 transform border-2 border-purple-600 hover:bg-purple-50 rounded-xl hover:scale-105">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-3xl font-bold text-purple-600 md:text-4xl">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent transition-all duration-1000 ${
                isVisible.features
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-10"
              }`}
            >
              Powerful Features
            </h2>
            <p
              className={`text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
                isVisible.features
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-10"
              }`}
            >
              Everything you need to revolutionize your attendance management
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:scale-105 ${
                  isVisible.features
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div
                  className={`text-purple-600 mb-4 transition-all duration-300 ${
                    activeFeature === index
                      ? "text-purple-700 transform scale-110"
                      : ""
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent transition-all duration-1000 ${
                isVisible.testimonials
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-10"
              }`}
            >
              What Our Users Say
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:scale-105 ${
                  isVisible.testimonials
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="mb-6 italic leading-relaxed text-gray-700">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-purple-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white"></div>
        <div className="relative z-10 max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text">
            Ready to Transform Your Attendance?
          </h2>
          <p className="mb-8 text-xl text-gray-600">
            Join thousands of organizations already using Presenix to streamline
            their attendance management
          </p>
          <Link href="/lecturer-signup">
            <button className="flex items-center px-10 py-4 mx-auto space-x-2 text-xl font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl hover:scale-105 hover:shadow-purple-500/25">
              <span>Get Started Today</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center mb-4 space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                  <span className="text-lg font-bold text-white">P</span>
                </div>
                <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text">
                  Presenix
                </span>
              </div>
              <p className="text-gray-600">
                Revolutionizing attendance tracking with AI-powered solutions
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Product</h4>
              <div className="space-y-2 text-gray-600">
                <div className="transition-colors cursor-pointer hover:text-purple-600">
                  Features
                </div>
                <div className="transition-colors cursor-pointer hover:text-purple-600">
                  Pricing
                </div>
                <div className="transition-colors cursor-pointer hover:text-purple-600">
                  API
                </div>
                <div className="transition-colors cursor-pointer hover:text-purple-600">
                  Documentation
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Company</h4>
              <div className="space-y-2 text-gray-600">
                <div className="transition-colors cursor-pointer hover:text-purple-600">
                  About
                </div>
                <div className="transition-colors cursor-pointer hover:text-purple-600">
                  Blog
                </div>
                <div className="transition-colors cursor-pointer hover:text-purple-600">
                  Careers
                </div>
                <div className="transition-colors cursor-pointer hover:text-purple-600">
                  Contact
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Support</h4>
              <div className="space-y-2 text-gray-600">
                <div className="transition-colors cursor-pointer hover:text-purple-600">
                  Help Center
                </div>
                <div className="transition-colors cursor-pointer hover:text-purple-600">
                  Privacy Policy
                </div>
                <div className="transition-colors cursor-pointer hover:text-purple-600">
                  Terms of Service
                </div>
                <div className="transition-colors cursor-pointer hover:text-purple-600">
                  Status
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-8 text-center text-gray-600 border-t border-gray-200">
            <p>&copy; 2025 Presenix. All rights reserved.</p>
            <p>
              &copy; 2025 - {new Date().getFullYear()} Made with 💓 by{" "}
              <Link
                className="text-purple-600 underline"
                href="https://wa.me/2348173779198"
              >
                GLtech
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PresenixLanding;
