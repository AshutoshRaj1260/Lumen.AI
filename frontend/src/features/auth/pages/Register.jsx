import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../auth.slice";
import LumenGlow from "../../shared/components/LumenGlow";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const backendError = useSelector((state) => state.auth.error);

  if (!loading && user) {
    navigate("/");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(setError(null));
    const result = await handleRegister(formData);

    if (result?.success) {
      setIsSuccess(true);
    }
  };

  const dismissError = () => {
    dispatch(setError(null));
  };

  // Auto-dismiss error after 6 seconds
  useEffect(() => {
    if (backendError) {
      const timer = setTimeout(() => {
        dispatch(setError(null));
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [backendError, dispatch]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      <LumenGlow />

      {/* Error Banner */}
      {backendError && (
        <div
          className="fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
          style={{ animation: "slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
        >
          <style>{`
            @keyframes slideIn {
              from { transform: translate(-50%, -20px); opacity: 0; }
              to { transform: translate(-50%, 0); opacity: 1; }
            }
            @keyframes shrinkProgress {
              from { width: 100%; }
              to { width: 0%; }
            }
          `}</style>
          
          <div className="relative overflow-hidden bg-slate-900/90 backdrop-blur-xl border border-red-500/30 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] p-4 flex items-start gap-4">
            <div className="absolute inset-0 bg-red-500/5 pointer-events-none"></div>
            
            <div className="flex-shrink-0 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20 relative">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="flex-1 mt-0.5 relative min-w-0">
              <h3 className="text-sm font-semibold text-red-400">Registration Failed</h3>
              <p className="text-sm text-gray-300 mt-1 break-words leading-relaxed">{backendError}</p>
            </div>

            <button
              onClick={dismissError}
              className="flex-shrink-0 p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative mt-0.5 active:scale-95"
              aria-label="Dismiss error"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-red-400" 
              style={{ animation: 'shrinkProgress 6s linear forwards' }} 
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-orange-500/10 hover:border-orange-500/20 transition">
          {isSuccess ? (
            <div className="text-center py-6" style={{ animation: "fadeIn 0.5s ease-out forwards" }}>
              <style>{`
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              
              <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-2xl border border-green-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">Check Your Email</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                We've sent a verification link to <span className="text-orange-400 font-medium">{formData.email}</span>. 
                Please verify your email address to complete your registration and log in.
              </p>
              
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-lg border border-slate-700 transition duration-200"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">
                  Create Account
                </h1>
                <p className="text-gray-400 text-sm">Join us and get started</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="john_doe"
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500 transition ${
                  errors.username ? "border-red-500" : "border-slate-700"
                }`}
              />
              {errors.username && (
                <p className="text-red-400 text-xs font-medium">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500 transition ${
                  errors.email ? "border-red-500" : "border-slate-700"
                }`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
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
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-500 transition pr-12 ${
                    errors.password ? "border-red-500" : "border-slate-700"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a9.981 9.981 0 015.541 2.908M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:shadow-lg hover:shadow-orange-500/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100 "
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-white font-medium py-3 rounded-lg transition duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-orange-500 hover:text-orange-400 font-semibold transition"
              >
                Sign in here
              </a>
            </p>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
