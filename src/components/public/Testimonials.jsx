import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ravi Kumar",
    role: "Truck Driver",
    review:
      "The instructors were extremely supportive and helped me secure my license quickly.",
  },
  {
    name: "Manikandan",
    role: "Transport Operator",
    review:
      "Professional training vehicles and excellent practical sessions.",
  },
  {
    name: "Suresh",
    role: "Bus Driver",
    review:
      "Best heavy vehicle training institute in the region.",
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24"
    >
      <div className="page-container">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold">
            Student Success Stories
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{
                y: -8,
              }}
              className="glass-card p-8"
            >
              <p className="text-gray-300 italic">
                "{item.review}"
              </p>

              <div className="mt-6">
                <h4 className="font-semibold">
                  {item.name}
                </h4>

                <p className="text-sm text-gray-400">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}