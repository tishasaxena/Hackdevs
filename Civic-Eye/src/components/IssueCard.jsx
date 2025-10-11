import React, { useState } from "react";
import { Link } from "react-router";
import {
    ArrowUpCircleIcon,
    MapPinIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const statusColors = {
    open: "bg-green-100 text-green-700 border-green-300",
    "in-progress": "bg-yellow-100 text-yellow-700 border-yellow-300",
    closed: "bg-red-100 text-red-700 border-red-300",
    pending: "bg-gray-100 text-gray-700 border-gray-300",
};

const severityColors = {
    low: "text-green-600",
    medium: "text-yellow-600",
    high: "text-red-600",
};

const IssueCard = ({ id, title, description, status, location, severity, upVotes }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Link to={`/issue/${id}`} onClick={(e) => e.stopPropagation()}>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`relative bg-white/70 backdrop-blur-md rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 p-6 w-full max-w-sm ${hovered ? "scale-[1.02]" : ""
                    }`}
            >
                {/* Status badge */}
                <div
                    className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[status]}`}
                >
                    {status.replace("-", " ")}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>

                {/* Description */}
                <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                    {description}
                </p>

                {/* Info Section */}
                <div className="mb-4 space-y-3 text-sm">
                    {/* Location */}
                    <div className="flex items-center gap-2">
                        <MapPinIcon className="h-5 w-5 text-blue-500" />
                        <span className="text-gray-700">{location}</span>
                    </div>

                    {/* Severity */}
                    <div className="flex items-center gap-2">
                        <ExclamationTriangleIcon
                            className={`h-5 w-5 ${severityColors[severity] || "text-gray-600"}`}
                        />
                        <span className="text-gray-700 capitalize">
                            Severity:{" "}
                            <span className="font-semibold">{severity}</span>
                        </span>
                    </div>

                    {/* Upvotes */}
                    <div className="flex items-center gap-2 mt-2">
                        <ArrowUpCircleIcon className="h-5 w-5 text-purple-600" />
                        <span className="text-gray-700">
                            <span className="font-semibold">{upVotes ?? 0}</span> upvotes
                        </span>
                    </div>
                </div>

                {/* View Details Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg py-2 mt-4 hover:from-blue-700 hover:to-indigo-700 transition-colors">
                    View Details
                </button>
            </div>
        </Link>
    );
};

export default IssueCard;
