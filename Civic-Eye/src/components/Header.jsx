import React from "react";
import { Menu } from "lucide-react";
import Logout from "./Logoutbtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { login } from "../store/AuthSlice";
import Login from "./Login";
function Header() {
  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
  return (
    <header
      className="text-white shadow-md border-b"
      style={{
        background: "linear-gradient(to right, #3D52A0, #7091E6)",
        borderColor: "#ADBBDA",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div
            className="bg-white text-center font-bold rounded-full h-10 w-10 flex items-center justify-center shadow-md"
            style={{ color: "#3D52A0" }}
          >
            CE
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight hover:opacity-90 transition duration-200">
            CivicEye Portal
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-medium">
          <Link to="/home" className="transition-colors duration-200" style={{ color: "#EDE8F5" }}>
            Home
          </Link>
          <Link
            to="#features"
            className="transition-colors duration-200"
            style={{ color: "#EDE8F5" }}
          >
            Features
          </Link>
          <Link
            to="#about"
            className="transition-colors duration-200"
            style={{ color: "#EDE8F5" }}
          >
            About
          </Link>
          <Link
            to="#contact"
            className="transition-colors duration-200"
            style={{ color: "#EDE8F5" }}
          >
            Contact
          </Link>

        </nav>
        {/* Mobile Menu Icon */}
        <button
          className="md:hidden p-2 rounded-lg transition duration-200"
          style={{ backgroundColor: "#3D52A0" }}
        >
          <Menu size={24} />
        </button>
        {!isLoggedIn && <Link to="/auth/user/login" className="transition-colors duration-200" style={{ color: "#EDE8F5" }}>Login</Link>}
        {isLoggedIn && <Logout />}
      </div>
    </header>
  );
}

export default Header;
