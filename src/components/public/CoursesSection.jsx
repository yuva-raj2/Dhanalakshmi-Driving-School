import { motion } from "framer-motion";

const courses = [
  {
    title: "Heavy Vehicle License",
    duration: "45 Days",
    description:
      "Comprehensive heavy vehicle training with practical road sessions.",
  },
  {
    title: "Commercial Truck Training",
    duration: "60 Days",
    description:
      "Advanced truck handling and highway driving practices.",
  },
  {
    title: "Bus Driver Training",
    duration: "50 Days",
    description:
      "Passenger transport safety and driving certification.",
  },
];

export default function CoursesSection() {
  return (
    <section
      id="courses"
      className="py-24"
    >
      <div className="page-container">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold">
            Training Programs
          </h2>

          <p className="text-gray-400 mt-4">
            Industry-focused driving programs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.title}
              whileHover={{
                y: -10,
              }}
              className="glass-card p-8"
            >
              <div className="text-primary text-sm mb-4">
                {course.duration}
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {course.title}
              </h3>

              <p className="text-gray-400">
                {course.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}