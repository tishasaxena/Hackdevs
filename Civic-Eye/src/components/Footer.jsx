import React from "react";

function Footer() {
  return (
    <footer
      className="text-gray-200 border-t"
      style={{
        background: "linear-gradient(to right, #3D52A0, #7091E6)",
        borderColor: "#ADBBDA",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        {/* Left side: Logo / Title */}
        <h2 className="text-xl font-bold tracking-wide text-white hover:text-[#EDE8F5] transition-colors duration-300">
          CivicEye Portal
        </h2>

        {/* Middle: Navigation Links */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <a
            href="#about"
            className="hover:text-[#EDE8F5] transition-colors duration-300 text-sm"
            style={{ color: "#ADBBDA" }}
          >
            About
          </a>
          <a
            href="#privacy"
            className="hover:text-[#EDE8F5] transition-colors duration-300 text-sm"
            style={{ color: "#ADBBDA" }}
          >
            Privacy Policy
          </a>
          <a
            href="#contact"
            className="hover:text-[#EDE8F5] transition-colors duration-300 text-sm"
            style={{ color: "#ADBBDA" }}
          >
            Contact
          </a>
        </div>

        {/* Right side: Copyright */}
        <p className="text-xs mt-4 md:mt-0" style={{ color: "#ADBBDA" }}>
          &copy; {new Date().getFullYear()} CivicEye. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
