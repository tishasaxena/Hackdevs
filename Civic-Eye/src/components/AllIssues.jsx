import React from 'react';
import IssueCard from './IssueCard';
import { useState, useEffect } from 'react';
import { appwriteService } from '../appwrite/configure';

export default function AllIssues() {
    const [issues, setIssues] = useState([
        {
            $id: '1',
            title: 'Sample Issue 1',
            description: 'Description for sample issue 1',
            status: 'open',
            location: 'Location 1',
            severity: 'high',
            upvotes: 5
        },
        {
            $id: '2',
            title: 'Sample Issue 2',
            description: 'Description for sample issue 2',
            status: 'closed',
            location: 'Location 2',
            severity: 'medium',
            upvotes: 3
        },
        {
            $id: '3',
            title: 'Sample Issue 3',
            description: 'Description for sample issue 3',
            status: 'in-progress',
            location: 'Location 3',
            severity: 'low',
            upvotes: 8
        },
        {
            $id: '4',
            title: 'Sample Issue 4',
            description: 'Description for sample issue 4',
            status: 'open',
            location: 'Location 4',
            severity: 'medium',
            upvotes: 2
        },
        {
            $id: '5',
            title: 'Sample Issue 5',
            description: 'Description for sample issue 5',
            status: 'closed',
            location: 'Location 5',
            severity: 'high',
            upvotes: 10
        },
        {
            $id: '6',
            title: 'Sample Issue 6',
            description: 'Description for sample issue 6',
            status: 'in-progress',
            location: 'Location 6',
            severity: 'low',
            upvotes: 15
        }
    ]);
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
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
                Reported Issues
            </h1>

            {issues.length === 0 ? (
                <p className="text-center text-gray-600">No issues reported yet.</p>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                    {issues.map((issue) => (
                        <IssueCard
                            key={issue.$id}
                            title={issue.title}
                            description={issue.description}
                            status={issue.status}
                            location={issue.location}
                            severity={issue.severity}
                            upvotes={issue.upvotes}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}