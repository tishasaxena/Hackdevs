import React from "react";
import { Link } from "react-router";
function Feature() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="text-white py-20 text-center shadow-md"
        style={{
          background: "linear-gradient(to right, #3D52A0, #7091E6)",
          borderBottomLeftRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Building Better Cities, Together
        </h1>
        <p className="text-lg md:text-xl mb-8 text-[#EDE8F5]/90 max-w-2xl mx-auto">
          CivicEye connects citizens and authorities to report, prioritize, and
          resolve city issues transparently.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#F8F9FB] text-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "#3D52A0" }}
          >
            How CivicEye Works
          </h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 text-center">
            {[
              {
                title: "Report",
                desc: "Submit civic issues with a short description, photo, and location pin.",
                icon: "📍",
              },
              {
                title: "Vote",
                desc: "Support issues that matter most to your community by voting.",
                icon: "🗳️",
              },
              {
                title: "Action",
                desc: "Authorities get notified and start resolving the highest-priority issues.",
                icon: "⚙️",
              },
              {
                title: "Resolve",
                desc: "Track progress and see real-time updates on issue resolution.",
                icon: "✅",
              },
            ].map((step, index) => (
              <div key={index} className="group">
                <div
                  className="text-5xl mb-4 transition-transform duration-200 group-hover:scale-110"
                  style={{ color: "#3D52A0" }}
                >
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white border-t border-[#ADBBDA]/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: "#3D52A0" }}
          >
            Platform Highlights
          </h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {[
              {
                title: "Real-time Issue Tracking",
                desc: "Follow your reports from submission to resolution with live status updates.",
              },
              {
                title: "Smart Prioritization",
                desc: "Issues with more votes rise in priority — ensuring democracy in action.",
              },
              {
                title: "Admin Transparency",
                desc: "Authorities manage and respond through an efficient, trackable dashboard.",
              },
              {
                title: "Geo-tagged Reporting",
                desc: "Accurate location tagging for efficient redressal by local departments.",
              },
              {
                title: "Community-driven Feedback",
                desc: "Citizens can comment, verify, and mark issues as resolved collectively.",
              },
              {
                title: "Secure Authentication",
                desc: "Appwrite-powered user login ensures secure and private access.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl shadow-sm border border-[#E0E5F0] bg-[#F9FAFB] hover:shadow-md transition"
              >
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#3D52A0" }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="text-white text-center py-16 shadow-inner"
        style={{
          background: "linear-gradient(to right, #3D52A0, #7091E6)",
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Take Action?</h2>
        <p className="text-lg mb-8 text-[#EDE8F5]/90">
          Report civic issues and be a part of positive change in your city.
        </p>
        <a
          href="/report"
          className="bg-white text-[#3D52A0] px-6 py-3 rounded-full font-semibold hover:bg-[#EDE8F5] transition duration-200"
        >
          Report an Issue
        </a>
      </section>
    </>
  );
}

export default Feature;
