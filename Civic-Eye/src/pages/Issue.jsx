import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { appwriteService } from "../appwrite/configure";

function Issue() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vote,setVote]=useState(0);
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const data = await appwriteService.GetIssue(id);
        setIssue(data);
       setVote(data.upVotes);
      } catch (err) {
        console.error("Error fetching issue:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id]);
const updateIssue=async()=>{
    setVote(vote+1);
   const data = await appwriteService.UpdateIssue(id, {
     title: issue.title,
     description: issue.description,
     status: issue.status,
     location: issue.location,
     severity: issue.severity,
     upVotes: vote + 1
   });
   setIssue(data);
}
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading issue details...
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-bold text-lg">
        Issue not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          {issue.title}
        </h1>

        <div className="flex flex-wrap gap-3 mb-6">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              issue.status === "open"
                ? "bg-yellow-200 text-yellow-800"
                : issue.status === "resolved"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {issue.status.toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-800">
            Severity: {issue.severity}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">
          {issue.description}
        </p>

        <div className="flex flex-wrap items-center gap-8 text-gray-600 mb-6">
          <p className="flex items-center gap-2 text-lg">
            📍 <span>{issue.location}</span>
          </p>
          <p className="flex items-center gap-2 font-medium text-lg">
            ⬆️ <span>{vote}</span>
          </p>
        </div>

        {/* Upvote button */}
        <button
          onClick={updateIssue} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200"
        >
          Upvote
        </button>
      </div>
    </div>
  );
}

export default Issue;
