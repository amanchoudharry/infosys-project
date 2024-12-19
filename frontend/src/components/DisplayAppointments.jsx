import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaRegCalendarTimes } from 'react-icons/fa'; // Import an icon for "no appointments"

const BASE_URL = 'http://localhost:8080';

const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const noAppointmentsVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const DisplayAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/appointments`);
            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch appointments.');
        }
    };

    const acceptAppointment = async (id) => {
        const professionalName = sessionStorage.getItem('username'); // Retrieve the logged-in professional's username
        try {
            const response = await axios.put(
                `${BASE_URL}/api/appointments/${id}?status=Accepted&professionalName=${professionalName}`
            );
            toast.success('Appointment accepted successfully.');
            setAppointments(
                appointments.map((appointment) =>
                    appointment.id === id
                        ? { ...appointment, status: 'Accepted', acceptedByProfessionalName: professionalName }
                        : appointment
                )
            );
        } catch (error) {
            console.error(error);
            toast.error('Failed to accept appointment.');
        }
    };

    const deleteAppointment = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/api/appointments/${id}`);
            toast.success('Appointment deleted successfully.');
            setAppointments(appointments.filter((appointment) => appointment.id !== id));
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete appointment. Please try again later.');
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div className="p-6 main min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Appointments</h1>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <div className="spinner-border border-white inline-block w-8 h-8 border-4 rounded-full" role="status">
                        <span className="visually-hidden ml-10">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {appointments.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariant}
                            initial="hidden"
                            animate="visible"
                        >
                            {appointments.map((appointment, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariant}
                                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <h2 className="text-xl font-semibold mb-2">{appointment.name}</h2>
                                    <p className="text-gray-600 mb-1"><strong>Email:</strong> {appointment.email}</p>
                                    <p className="text-gray-600 mb-1"><strong>Date:</strong> {appointment.date}</p>
                                    <p className="text-gray-600 mb-1"><strong>Time:</strong> {appointment.time}</p>
                                    <p className="text-gray-600 mb-1"><strong>Message:</strong> {appointment.message}</p>
                                    <p className="text-gray-600 mb-1"><strong>Status:</strong> {appointment.status}</p>
                                    {appointment.status !== 'Accepted' && (
                                        <div className="mt-5 flex gap-5">
                                            <button
                                                onClick={() => acceptAppointment(appointment.id)}
                                                className="bg-green-500 hover:bg-green-600 p-2 text-white"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => deleteAppointment(appointment.id)}
                                                className="bg-red-500 hover:bg-red-600 p-2 text-white"
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="flex flex-col items-center justify-center h-full text-gray-600"
                            variants={noAppointmentsVariant}
                            initial="hidden"
                            animate="visible"
                        >
                            <FaRegCalendarTimes className="text-6xl mb-4" />
                            <p className="text-xl font-medium">Currently, no appointments are added yet.</p>
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
};

export default DisplayAppointments;
