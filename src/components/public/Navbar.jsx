import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Courses",
    href: "#courses",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? "hidden"
      : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl bg-black/30 border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="page-container">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Truck size={20} />
              </div>

              <div>
                <h2 className="font-bold text-lg">
                  Dhanalakshmi
                </h2>

                <p className="text-xs text-gray-400">
                  Heavy Driving School
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <NavLink
                to="/login"
                className="px-5 py-2 rounded-xl border border-white/10 hover:border-white/20 transition-all"
              >
                Login
              </NavLink>

              <button
                className="px-5 py-2 rounded-xl bg-primary hover:opacity-90 transition-all"
              >
                Register
              </button>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
              className="lg:hidden"
            >
              {mobileOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.3,
              }}
              className="absolute right-0 top-0 h-full w-80 bg-[#0B0F19] border-l border-white/10"
            >
              <div className="p-6 pt-24">
                <div className="flex flex-col gap-5">
                  {navigation.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="text-lg text-gray-300 hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-3">
                  <NavLink
                    to="/login"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className="w-full text-center py-3 rounded-xl border border-white/10"
                  >
                    Login
                  </NavLink>

                  <button
                    className="w-full py-3 rounded-xl bg-primary"
                  >
                    Register
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}