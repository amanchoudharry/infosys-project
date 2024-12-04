import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmergencyTable = () => {
    const helplineData = [
        { name: "National Emergency Number", contact: "112" },
        { name: "Police", contact: "100" },
        { name: "Fire", contact: "101" },
        { name: "Ambulance", contact: "102" },
        { name: "Disaster Management Services", contact: "108" },
        { name: "Women Helpline", contact: "1091" },
        { name: "Women Helpline (Domestic Abuse)", contact: "181" },
        { name: "Aids Helpline", contact: "1097" },
        { name: "Anti Poison (New Delhi)", contact: "1066" },
        { name: "LPG Leak Helpline", contact: "1906" },
        { name: "Kisan Call Centre", contact: "1551" },
    ];

    const handleContactClick = (contact) => {
        if (contact) {
            // Use the tel: URI scheme to initiate a phone call
            window.location.href = `tel:${contact}`;
        } else {
            toast.error("Invalid contact number.");
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
                Emergency Helpline Numbers
            </h1>
            <div className="overflow-x-auto mx-16">
                <table className="min-w-full bg-white shadow-lg rounded-lg table-auto">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="px-14 py-4 text-left text-lg font-semibold">
                                Emergency Helpline
                            </th>
                            <th className="px-6 py-4 text-left text-lg font-semibold">
                                Contact Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {helplineData.map((item, index) => (
                            <tr
                                key={index}
                                className="transition-transform duration-300 hover:bg-green-100 hover:shadow-lg transform hover:scale-105"
                                onClick={() => handleContactClick(item.contact)}
                            >
                                <td className="px-14 py-4 border-b border-gray-200">
                                    {item.name}
                                </td>
                                <td
                                    className="px-6 py-4 border-b border-gray-200 cursor-pointer text-blue-600 underline"
                                >
                                    {item.contact}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmergencyTable;
