import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import authService from "../../services/authService";
import useAuthStore from "../../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();

  const setAccessToken =
    useAuthStore(
      (state) =>
        state.setAccessToken
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation =
    useMutation({
      mutationFn:
        authService.login,

      onSuccess: (data) => {
        setAccessToken(
          data.accessToken
        );

        toast.success(
          "Login Successful"
        );

        navigate(
          "/dashboard"
        );
      },

      onError: () => {
        toast.error(
          "Invalid credentials"
        );
      },
    });

  const onSubmit = (
    values
  ) => {
    loginMutation.mutate(
      values
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-5"
        >
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register(
                "email",
                {
                  required:
                    "Email required",
                }
              )}
              className="w-full p-3 rounded-xl bg-black/20 border border-white/10"
            />

            <p className="text-red-400 text-sm mt-1">
              {
                errors.email
                  ?.message
              }
            </p>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register(
                "password",
                {
                  required:
                    "Password required",
                }
              )}
              className="w-full p-3 rounded-xl bg-black/20 border border-white/10"
            />

            <p className="text-red-400 text-sm mt-1">
              {
                errors
                  .password
                  ?.message
              }
            </p>
          </div>

          <button
            disabled={
              loginMutation.isPending
            }
            className="w-full p-3 rounded-xl bg-primary"
          >
            {loginMutation.isPending
              ? "Loading..."
              : "Login"}
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm">
          <Link
            to="/register"
          >
            Register
          </Link>

          <Link
            to="/forgot-password"
          >
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
}