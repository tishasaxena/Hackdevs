import React from "react";
import { Menu } from "lucide-react";
import Logout from "./Logoutbtn";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);

  return (
    <header
      className="shadow-md border-b"
      style={{
        background: "linear-gradient(to right, #3D52A0, #7091E6)",
        borderColor: "#ADBBDA",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-5">
          <div
            className="bg-white text-center font-bold rounded-full h-10 w-10 flex items-center justify-center shadow-md"
            style={{ color: "#3D52A0" }}
          >
            CE
          </div>
          <Link to="/home">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white hover:opacity-90 transition duration-200">
              CivicEye Portal
            </h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-15 font-medium">
          {[
            { name: "Home", path: "/home" },
            { name: "Features", path: "#features" },
            { name: "About", path: "#about" },
            { name: "Contact", path: "#contact" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative transition-colors duration-200 text-white hover:text-yellow-200 ${isActive ? "font-semibold" : ""
                }`
              }
            >
              {item.name}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-yellow-200 transition-all duration-200 hover:w-full"></span>
            </NavLink>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link
              to="/auth/user/login"
              className="px-4 py-2 rounded-md font-semibold bg-yellow-300 text-blue-800 hover:bg-yellow-400 transition"
            >
              Login
            </Link>
          ) : (
            <Logout />
          )}
        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-blue-800 transition"
        >
          <Menu size={24} color="white" />
        </button>
      </div>
    </header>
  );
}

export default Header;
