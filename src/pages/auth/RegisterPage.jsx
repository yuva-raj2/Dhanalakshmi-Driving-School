import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import authService from "../../services/authService";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerMutation =
    useMutation({
      mutationFn:
        authService.register,

      onSuccess: () => {
        toast.success(
          "Registration Successful"
        );
      },
    });

  const onSubmit = (
    values
  ) => {
    registerMutation.mutate(
      values
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-5"
        >
          <input
            placeholder="Full Name"
            {...register(
              "name",
              {
                required:
                  "Name required",
              }
            )}
            className="w-full p-3 rounded-xl bg-black/20 border border-white/10"
          />

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

          <input
            type="password"
            placeholder="Password"
            {...register(
              "password",
              {
                required:
                  "Password required",
                  minLength: 8,
                }
            )}
            className="w-full p-3 rounded-xl bg-black/20 border border-white/10"
          />

          <button className="w-full p-3 rounded-xl bg-primary">
            Register
          </button>
        </form>

        <div className="mt-4">
          <Link to="/login">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}