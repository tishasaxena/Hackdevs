import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { appwriteService } from "../appwrite/configure";
import { ID } from "appwrite";

function Report() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setMessage("");
    try {
      const issueData = {
        title: data.title,
        description: data.description,
        status: "Pending",
        location: data.location,
        severity: data.severity,
        upVotes: 0,
      };

      await appwriteService.CreateIssue(ID.unique(), issueData);
      setMessage("✅ Issue reported successfully!");
      reset();
    } catch (error) {
      console.error("Error reporting issue:", error);
      setMessage("❌ Failed to report issue. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#3D52A0]">
          Report an Issue
        </h2>

        {message && (
          <div
            className={`text-center mb-4 p-2 rounded-md ${
              message.includes("✅")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Enter a short title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#3D52A0]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description", { required: "Description is required" })}
              rows="4"
              placeholder="Describe the issue in detail"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#3D52A0]"
            ></textarea>
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              {...register("location", { required: "Location is required" })}
              placeholder="e.g., Near Park Street, Bhopal"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#3D52A0]"
            />
          </div>

          {/* Severity */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Severity
            </label>
            <select
              {...register("severity", { required: "Severity is required" })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#3D52A0]"
            >
              <option value="">Select severity</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => {
                reset();
                setMessage("");
              }}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-gray-800"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#3D52A0] text-white rounded-lg hover:bg-[#2f3e7b]"
            >
              {isSubmitting ? "Submitting..." : "Submit Issue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Report;
