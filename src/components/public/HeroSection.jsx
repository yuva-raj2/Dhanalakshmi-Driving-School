import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Users, Truck, Award } from "lucide-react";
import { Link } from "react-router-dom";
import LoadingScreen from "../feedback/LoadingScreen";

const FloatingTruck = lazy(() =>
  import("../three/FloatingTruck")
);

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4F46E520,transparent_40%),radial-gradient(circle_at_bottom_left,#7C3AED20,transparent_40%)]" />

      {/* Blur Effects */}
      <div className="absolute top-32 left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-[120px]" />

      <div className="page-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6"
            >
              <Award size={16} />
              <span className="text-sm">
                Tamil Nadu's Trusted Heavy Vehicle Training Institute
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight">
              Become a
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Professional
              </span>
              Heavy Vehicle Driver
            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-2xl leading-relaxed">
              Learn from certified instructors using modern
              training vehicles. Track attendance, payments,
              schedules, and driving progress through our
              intelligent management platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary hover:scale-105 transition-all duration-300"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <button
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 glass-card hover:border-primary/40 transition-all"
              >
                <PlayCircle size={18} />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="glass-card p-4 text-center">
                <Users
                  className="mx-auto mb-2"
                  size={24}
                />

                <h3 className="text-2xl font-bold">
                  5000+
                </h3>

                <p className="text-xs text-gray-400">
                  Students
                </p>
              </div>

              <div className="glass-card p-4 text-center">
                <Truck
                  className="mx-auto mb-2"
                  size={24}
                />

                <h3 className="text-2xl font-bold">
                  25+
                </h3>

                <p className="text-xs text-gray-400">
                  Vehicles
                </p>
              </div>

              <div className="glass-card p-4 text-center">
                <Award
                  className="mx-auto mb-2"
                  size={24}
                />

                <h3 className="text-2xl font-bold">
                  15+
                </h3>

                <p className="text-xs text-gray-400">
                  Years
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE 3D HERO */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="relative h-[600px]"
          >
            <div className="absolute inset-0 glass-card">
              <Suspense
                fallback={<LoadingScreen />}
              >
                <FloatingTruck />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}