export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/10 py-10"
    >
      <div className="page-container flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h3 className="font-bold text-xl">
            Dhanalakshmi Heavy Driving School
          </h3>

          <p className="text-gray-400 mt-2">
            Professional Heavy Vehicle Training Institute.
          </p>
        </div>

        <div className="text-gray-400">
          © 2026 Dhanalakshmi Heavy Driving School
        </div>
      </div>
    </footer>
  );
}