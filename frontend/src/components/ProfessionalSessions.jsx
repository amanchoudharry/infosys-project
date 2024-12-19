import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCalendarTimes } from 'react-icons/fa'; // Icon for "no appointments"

const BASE_URL = 'http://localhost:8080';

const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const emptyStateVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const ProfessionalSessions = () => {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/services`);
                if (response.status === 200) {
                    setSessions(response.data);
                }
            } catch (error) {
                toast.error('Error fetching sessions. Please try again later.');
            }
        };

        fetchSessions();
    }, []);

    const handleAccept = async (id) => {
        const professionalName = sessionStorage.getItem('username'); // Fetch professional username

        try {
            const response = await axios.put(`${BASE_URL}/api/services/${id}/accept`, { professionalName });
            if (response.status === 200) {
                toast.success('Appointment accepted!');
                setSessions((prevSessions) =>
                    prevSessions.map((session) =>
                        session.id === id
                            ? { ...session, status: 'Accepted', professionalName }
                            : session
                    )
                );
            }
        } catch (error) {
            toast.error('Error accepting appointment');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/services/${id}`);
            toast.success('Session deleted successfully!');
            setSessions((prevSessions) => prevSessions.filter((session) => session.id !== id));
        } catch (error) {
            toast.error('Error deleting session');
        }
    };

    return (
        <div className="p-6 main min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-8">Your Professional Sessions</h1>
            {sessions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sessions.map((session, index) => (
                        <motion.div
                            key={session._id}
                            className="bg-white shadow-lg rounded-lg p-6"
                            variants={fadeInVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                        >
                            <h2 className="text-xl font-semibold mb-2">{session.serviceType}</h2>
                            <p className="text-gray-700 mb-2">
                                <strong>Name:</strong> {session.name}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Email:</strong> {session.email}
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Phone:</strong> {session.phone}
                            </p>
                            <p className="text-gray-500 mb-4">
                                <strong>Message:</strong> {session.message || 'No message provided.'}
                            </p>
                            {session.status !== 'Accepted' ? (
                                <div className="mt-5 flex gap-5">
                                    <button
                                        onClick={() => handleAccept(session.id)}
                                        className="bg-green-500 hover:bg-green-600 p-2 text-white"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleDelete(session.id)}
                                        className="bg-red-500 hover:bg-red-600 p-2 text-white"
                                    >
                                        Decline
                                    </button>
                                </div>
                            ) : (
                                <span className="text-green-600 font-semibold">Appointment Accepted</span>
                            )}
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    className="flex flex-col items-center justify-center mt-20"
                    variants={emptyStateVariant}
                    initial="hidden"
                    animate="visible"
                >
                    <FaCalendarTimes className="text-6xl text-gray-400 mb-4" />
                    <p className="text-gray-600 text-lg font-semibold">No appointments added yet.</p>
                </motion.div>
            )}
        </div>
    );
};

export default ProfessionalSessions;
