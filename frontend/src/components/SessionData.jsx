import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8080';

const SessionData = () => {
    const [sessions, setSessions] = useState([]);
    const userId = sessionStorage.getItem('userId'); // Retrieve userId from sessionStorage

    useEffect(() => {
        const fetchSessionData = async () => {
            if (!userId) {
                toast.error('User ID is missing. Please log in.');
                return;
            }

            try {
                const response = await axios.get(`${BASE_URL}/api/services/${userId}`);
                setSessions(response.data);
            } catch (error) {
               console.log(error);
            }
        };

        fetchSessionData();
    }, [userId]);

    return (
        <div>
            <h1 className="text-4xl font-bold mb-7 text-center">Your Sessions</h1>
            <p className="font-semibold text-2xl mb-2">Session Status</p>
            {sessions.length > 0 ? (
                sessions.map((session, index) => (
                    <div key={index} className="">
                        <div className="flex flex-col gap-5 py-5 border-t-2 border-black">
                            <p><strong className="">Session:</strong> {index + 1}</p>
                            <p><strong className="">Status:</strong> {session.status}</p>
                            <p><strong className="">Session Message:</strong> {session.message}  </p>
                            <p><strong className="">Session Type:</strong> {session.serviceType}</p>
                            <p><strong>Professional Name:</strong> Professional Dr. <b>{session.professionalName}</b> </p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No session data available.</p>
            )}
        </div>
    );
};

export default SessionData;
