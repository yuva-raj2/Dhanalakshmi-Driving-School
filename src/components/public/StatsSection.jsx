import { motion } from "framer-motion";
import { Users, Truck, Award, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "5000+",
    label: "Students Trained",
  },
  {
    icon: Truck,
    value: "25+",
    label: "Training Vehicles",
  },
  {
    icon: Award,
    value: "15+",
    label: "Years Experience",
  },
  {
    icon: Clock,
    value: "100%",
    label: "Practical Training",
  },
];

export default function StatsSection() {
  return (
    <section className="py-24">
      <div className="page-container">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                className="glass-card p-8 text-center"
              >
                <Icon
                  size={34}
                  className="mx-auto mb-4 text-primary"
                />

                <h3 className="text-4xl font-bold">
                  {item.value}
                </h3>

                <p className="text-gray-400 mt-2">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}