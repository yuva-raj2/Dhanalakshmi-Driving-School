import { useForm } from "react-hook-form";

export default function StudentForm({
  onSubmit,
}) {
  const {
    register,
    handleSubmit,
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="glass-card p-6 space-y-4"
    >
      <input
        placeholder="Student Name"
        {...register("name")}
        className="w-full p-3 rounded-xl bg-black/20 border border-white/10"
      />

      <input
        placeholder="Phone"
        {...register("phone")}
        className="w-full p-3 rounded-xl bg-black/20 border border-white/10"
      />

      <input
        placeholder="Course"
        {...register("course")}
        className="w-full p-3 rounded-xl bg-black/20 border border-white/10"
      />

      <button className="px-6 py-3 bg-primary rounded-xl">
        Save Student
      </button>
    </form>
  );
}