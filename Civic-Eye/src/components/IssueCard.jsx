import React from "react";
import { ArrowUpCircleIcon, MapPinIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

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
import { Link } from "react-router";
const IssueCard = ({id ,title, description, status, location, severity, upvotes }) => {
    return (
        <Link to={`/issue/${id}`}>
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 w-full max-w-sm border border-gray-200">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

                {/* Description */}
                <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                    {description}
                </p>

                {/* Info */}
                <div className="mb-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <MapPinIcon className="h-5 w-5 text-blue-500" />
                        <span className="text-gray-700">{location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <ExclamationTriangleIcon className={`h-5 w-5 ${severityColors[severity] || "text-gray-600"}`} />
                        <span className="text-gray-700 capitalize">
                            Severity: <span className="font-medium">{severity}</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <ArrowUpCircleIcon className="h-5 w-5 text-purple-600" />
                        <span className="text-gray-700">Upvotes: <span className="font-medium">{upvotes}</span></span>
                    </div>
                </div>

            {/* Action Button */}

            <button className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors">
                Open
            </button>
        </div>
        </Link>
    );
};

export default IssueCard;
