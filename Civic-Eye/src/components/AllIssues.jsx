import React from 'react';
import IssueCard from './IssueCard';
import { useState, useEffect } from 'react';
import { appwriteService } from '../appwrite/configure';
import { useNavigate } from 'react-router';
export default function AllIssues() {
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    useEffect(() => {
        const fetchIsssues = async () => {
            try {
                const response = await appwriteService.ListIssues();

                if (response.documents.length > 0) {
                    setIssues(response.documents);
                }

            } catch (error) {
                console.error("Error fetching issues:", error);
            }
        }
        fetchIsssues();
    }, [])
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
                    Reported Issues
                </h1>

                {issues.length === 0 ? (
                    <p className="text-center text-gray-600">No issues reported yet.</p>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                        {issues.map((issue) => (
                            <IssueCard
                                key={issue.$id}
                                id={issue.$id}
                                title={issue.title}
                                description={issue.description}
                                status={issue.status}
                                location={issue.location}
                                severity={issue.severity}
                                upVotes={issue.upVotes}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}