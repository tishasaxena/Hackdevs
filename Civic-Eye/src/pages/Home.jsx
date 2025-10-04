import React from "react";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { authService } from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { set } from "react-hook-form";

function Home() {
const authStatus=useSelector((state)=>state.Auth.isLoggedIn);
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center py-14 px-6"
        style={{
          background: "linear-gradient(to right, #3D52A0, #7091E6)",
          color: "#EDE8F5",
          borderBottomLeftRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-5">
          CivicEye – Voice of the Citizens
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mb-8 opacity-90">
          Report civic issues, vote on what matters most, and track resolutions
          with transparency.
        </p>
        <div className="space-x-4">
          <Link
            to="/report"
            className="bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-400 transition"
          >
            Report an Issue
          </Link>
          <Link
            to="/issues"
            className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
          >
            View Issues
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50" id="features">
        <h3 className="text-3xl font-bold text-center mb-12" style={{ color: "#3D52A0" }}>
          How CivicEye Works
        </h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-4">📝</div>
            <h4 className="text-xl font-semibold mb-2">Report</h4>
            <p className="text-gray-600">
              Submit civic issues with location, description, and photos.
            </p>
          </div>
          <div className="bg-white  rounded-xl p-6 text-center shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-4">👍</div>
            <h4 className="text-xl font-semibold mb-2">Vote</h4>
            <p className="text-gray-600">
              Citizens upvote issues to decide which matter most to the
              community.
            </p>
          </div>
          <div className="bg-white  rounded-xl p-6 text-center shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-4">✅</div>
            <h4 className="text-xl font-semibold mb-2">Resolve</h4>
            <p className="text-gray-600">
              Track issue status: Open, In-progress, or Resolved.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white" id="about">
        <h3 className="text-3xl font-bold text-center mb-12" style={{ color: "#3D52A0" }}>
          Key Features
        </h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="p-6 border-l-4 border-[#3D52A0] bg-gray-50 rounded-md shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">Transparency</h4>
            <p className="text-gray-600">
              Citizens can see real-time updates on every reported issue.
            </p>
          </div>
          <div className="p-6 border-l-4 border-yellow-400 bg-gray-50 rounded-md shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">Community First</h4>
            <p className="text-gray-600">
              Issues are prioritized by community votes, not bureaucracy.
            </p>
          </div>
          <div className="p-6 border-l-4 border-green-500 bg-gray-50 rounded-md shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">Collaboration</h4>
            <p className="text-gray-600">
              Brings together citizens and government for faster resolutions.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-10 text-center"
        style={{
          background: "linear-gradient(to right, #3D52A0, #7091E6)",
          color: "#EDE8F5",
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
        id="contact"
      >
        <h3 className="text-3xl md:text-4xl font-extrabold mb-6">
          Join CivicEye Today
        </h3>
        <p className="max-w-2xl mx-auto text-lg mb-8 opacity-90">
          Be part of the change. Together, let’s make our cities safer, cleaner,
          and better managed.
        </p>
        {authStatus ?  (
          <Link
            to='/report'
            className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold shadow hover:bg-yellow-500 transition"
          >
            Get Started
          </Link>) : (
          <Link
            to="/auth/user/login"
            className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-bold shadow hover:bg-yellow-500 transition"
          >
            Get Started
          </Link>
          )
        }
      </section>
    </main>
  );
}

export default Home;
