import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="page-container">
        <div className="glass-card p-12 text-center">
          <h2 className="text-5xl font-bold">
            Start Your Driving Career Today
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Join thousands of successful drivers trained by
            Dhanalakshmi Heavy Driving School.
          </p>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-primary rounded-2xl"
          >
            Enroll Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}