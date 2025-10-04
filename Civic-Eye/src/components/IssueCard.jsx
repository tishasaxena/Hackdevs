import React from "react";

const IssueCard = ({ title, description, status, location, severity, upvotes }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 w-full max-w-sm border border-gray-200">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                <div>
                    <span className="font-semibold">Status:</span> {status}
                </div>
                <div>
                    <span className="font-semibold">Location:</span> {location}
                </div>
                <div>
                    <span className="font-semibold">Severity:</span> {severity}
                </div>
                <div>
                    <span className="font-semibold">Upvotes:</span> {upvotes}
                </div>
            </div>

            {/* Action Button */}
            <button className="w-full bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition-colors">
                Upvote
            </button>
        </div>
    );
};

export default IssueCard;
