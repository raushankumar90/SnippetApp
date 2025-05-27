import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupWithGoogle } from "../../utils/auth/authUtils";
import { useDispatch ,useSelector} from "react-redux";
import { signupEP,setError } from "../../redux/AuthSlice";
import Loader from "../../components/Loader";
import { Navigate } from "react-router";
const Signup = () => {
  const dispatch = useDispatch()
  const {isAuthenticated,loading,error} = useSelector(state=>state.auth)
  const schema = z
    .object({
      email: z.string().email({ message: "Invalid email address" }),
          password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
            .regex(/[a-z]/, {
              message: "Password must contain at least one lowercase letter",
            })
            .regex(/[A-Z]/, {
              message: "Password must contain at least one uppercase letter",
            })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[^a-zA-Z0-9]/, {
              message: "Password must contain at least one special character",
            }),
      confirmPassword: z
        .string()
        .min(6, "Confirm Password must be at least 6 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleEmailLogin = (data) => {
    console.log(data);
    dispatch(signupEP(data))
  };

  const handleGoogleLogin = () => {
    console.log("Google Sign-In clicked");
    SignupWithGoogle()
  };
  useEffect(()=>{
    dispatch(setError(null))
  },[])
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  if(loading) return <Loader></Loader>
  if(isAuthenticated) return <Navigate to={'/dashboard'}></Navigate>
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="text-2xl font-bold text-white text-center mb-6">
          Signup to Continue
        </div>

        <form onSubmit={handleSubmit(handleEmailLogin)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email")}
              className="w-full px-4 py-2 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
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
                {...register("password")}
                className="w-full px-4 py-2 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-gray-200 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confrim Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                {...register("confirmPassword")}
                className="w-full px-4 py-2 mt-1 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-gray-200 focus:outline-none"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
          >
            Signup
          </button>
        </form>

        <p style={{ textAlign: "center", color: "white", paddingTop: 15 }}>
          OR
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 border border-gray-600 text-white font-medium py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-700 transition"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.72 1.36 9.19 3.59l6.85-6.85C35.63 2.68 30.13 0 24 0 14.64 0 6.68 5.74 3.34 13.91l7.94 6.17C13.3 13.03 18.3 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.27 24.5c0-1.64-.15-3.23-.43-4.76H24v9.05h12.65c-.55 2.96-2.2 5.47-4.65 7.18l7.33 5.7c4.28-3.95 6.94-9.78 6.94-16.17z"
            />
            <path
              fill="#4A90E2"
              d="M10.28 28.08c-.55-1.64-.87-3.38-.87-5.08s.32-3.44.87-5.08L2.34 13.91C.85 16.91 0 20.36 0 24s.85 7.09 2.34 10.09l7.94-6.01z"
            />
            <path
              fill="#FBBC05"
              d="M24 48c6.13 0 11.63-2.05 15.5-5.55l-7.33-5.7c-2.05 1.38-4.64 2.2-8.17 2.2-5.7 0-10.7-3.53-12.72-8.58l-7.94 6.01C6.68 42.26 14.64 48 24 48z"
            />
          </svg>
          <span>Signup with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
