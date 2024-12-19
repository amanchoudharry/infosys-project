import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8080';

const AppointmentData = () => {
    const userId = sessionStorage.getItem('userId'); // Retrieve userId from sessionStorage
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (!userId) {
            toast.error('User ID is missing. Please log in.');
            return;
        }

        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/appointments/${userId}`);
                setAppointments(response.data);
                console.log(response.data);

            } catch (error) {
                toast.error('Failed to fetch appointment data.');
            }
        };

        fetchAppointments();
    }, [userId]);

    return (
        <div>
            <h1 className="text-4xl font-bold mb-7 text-center">Your Appointments</h1>
            <p className="font-semibold text-2xl">Appointment Status</p>
            <div className="flex flex-col mt-5"></div>
            {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                    <div className='flex flex-col gap-5 py-5 border-t-2 border-black'>
                        <p><strong>Appointment:</strong> {index + 1}</p>
                        <p><strong>Appointment Date:</strong> {appointment.date}</p>
                        <p><strong>Status:</strong> {appointment.status}</p>
                        <p><strong>Appointment Time:</strong> {appointment.time}</p>
                        <p><strong>Professional Name:</strong> Professional Dr. <b>{appointment.acceptedByProfessionalName}</b></p>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No appointments found.</p>
            )}
        </div>
    );
};

export default AppointmentData;
