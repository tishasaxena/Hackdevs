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

const IssueCard = ({ title, description, status, location, severity, upvotes }) => {
    return (
        <div className="relative group w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

            {/* Status Badge */}
            <div
                className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[status] || "bg-gray-100 text-gray-700 border-gray-300"}`}
            >
                {status.toUpperCase()}
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title */}
                <h2 className="mb-2 text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                    {title}
                </h2>

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
                <button
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:from-blue-700 hover:to-blue-600 hover:shadow-md"
                >
                    Upvote
                </button>
            </div>
        </div>
    );
};

export default IssueCard;
