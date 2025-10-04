import React from "react";
import { Link } from "react-router";

function AuthPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#EDE8F5" }} // Page background
    >
      <div className="max-w-md w-full">
        {/* Card */}
        <div
          className="bg-white shadow-xl rounded-2xl p-8" // Removed border class
        >
          {/* Logo / Title */}
          <div className="text-center">
            <div
              className="inline-flex items-center justify-center w-16 h-16 text-white font-bold text-xl rounded-full shadow-md mb-4"
              style={{ backgroundColor: "#3D52A0" }}
            >
              CE
            </div>
            <h2
              className="text-3xl font-extrabold"
              style={{ color: "#3D52A0" }}
            >
              CivicEye Portal
            </h2>
            <p className="mt-2" style={{ color: "#8697C4" }}>
              Select your role to continue
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-4">
            <Link
              to="/auth/user"
              className="block w-full py-3 px-4 text-center rounded-lg text-white font-semibold shadow-md transition-all duration-200"
              style={{ backgroundColor: "#7091E6" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#3D52A0")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#7091E6")
              }
            >
              Citizen Login
            </Link>

            <Link
              to="/auth/admin"
              className="block w-full py-3 px-4 text-center rounded-lg text-white font-semibold shadow-md transition-all duration-200"
              style={{ backgroundColor: "#3D52A0" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#7091E6")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#3D52A0")
              }
            >
              Admin Login
            </Link>
          </div>

          {/* Footer */}
          <p className="mt-6 text-xs text-center" style={{ color: "#8697C4" }}>
            © {new Date().getFullYear()} CivicEye Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
