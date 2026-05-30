import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import authService from "../../services/authService";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
  } = useForm();

  const mutation =
    useMutation({
      mutationFn:
        authService.forgotPassword,

      onSuccess: () => {
        toast.success(
          "Reset email sent"
        );
      },
    });

  const onSubmit = (
    values
  ) => {
    mutation.mutate(
      values.email
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">
          Forgot Password
        </h1>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
        >
          <input
            type="email"
            placeholder="Email"
            {...register(
              "email"
            )}
            className="w-full p-3 rounded-xl bg-black/20 border border-white/10"
          />

          <button className="w-full mt-4 p-3 rounded-xl bg-primary">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}