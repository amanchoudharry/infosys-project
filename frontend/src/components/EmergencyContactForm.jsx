import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmergencyContactForm = () => {
    const userId = sessionStorage.getItem('userId');  // Get userId from sessionStorage
    const username = sessionStorage.getItem('username');  // Get username from sessionStorage

    const [formVisible, setFormVisible] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        relationship: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Fetch contacts from the backend
    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/contacts/${userId}`);  // Fetch contacts for specific user
            setContacts(response.data);
        } catch (error) {
            toast.error("Error fetching contacts");
            console.error("Error fetching contacts:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Update contact
                await axios.put(`http://localhost:8080/api/contacts/${editId}`, formData, {
                    headers: { "Content-Type": "application/json" },
                });
                toast.success("Contact updated successfully");
            } else {
                // Add new contact with userId
                await axios.post("http://localhost:8080/api/contacts", { ...formData, userId }, {
                    headers: { "Content-Type": "application/json" },
                });
                toast.success("Contact added successfully");
            }
            fetchContacts(); // Refresh contacts list
            setFormVisible(false);
            setFormData({ name: "", phone: "", relationship: "" });
            setIsEditing(false);
            setEditId(null);
        } catch (error) {
            toast.error(`Error ${isEditing ? "updating" : "adding"} contact`);
            console.error(`Error ${isEditing ? "updating" : "adding"} contact:`, error);
        }
    };

    const handleEdit = (id) => {
        const contactToEdit = contacts.find((contact) => contact.id === id);
        setFormData(contactToEdit);
        setFormVisible(true);
        setIsEditing(true);
        setEditId(id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/contacts/${id}`);
            toast.success("Contact deleted successfully");
            fetchContacts(); // Refresh contacts list
        } catch (error) {
            toast.error("Error deleting contact");
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div className="flex flex-col mx-24 items-center">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="m-10 flex flex-col items-start gap-10 mx-24 w-full shadow-xl shadow-[#4CAB72] bg-[#71d699] p-10 rounded-xl">
                <div className="flex justify-between items-center gap-10">
                    <div className="text-red-500 flex items-center gap-3">
                        <i className="fa-solid fa-phone text-3xl"></i>
                        <h1 className="text-3xl font-bold text-center">Emergency Contacts</h1>
                    </div>
                    <button
                        onClick={() => {
                            setFormVisible(true);
                            setFormData({ name: "", phone: "", relationship: "" });
                            setIsEditing(false);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-transform transform hover:scale-105"
                    >
                        Add Emergency Contact
                    </button>
                </div>
                <div className="mt-6 w-full">
                    {contacts.length === 0 ? (
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-address-book"></i>
                            <p className="text-black font-semibold">
                                No contact is added, Please add your emergency contact {username}!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {contacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    className="flex justify-between items-center bg-white p-4 rounded-md shadow-md"
                                >
                                    <div>
                                        <p className="text-lg font-semibold">{contact.name}</p>
                                        <p className="text-sm text-gray-600">Phone: {contact.phone}</p>
                                        <p className="text-sm text-gray-600">
                                            Relationship: {contact.relationship}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="text-3xl mx-5 text-green-800">
                                            <i className="fa-solid fa-phone"></i>
                                        </button>
                                        <button
                                            onClick={() => handleEdit(contact.id)}
                                            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(contact.id)}
                                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-transform transform hover:scale-105"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Form Container */}
            {formVisible && (
                <div className="fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-white shadow-lg rounded-lg p-6 w-96 transition-all duration-300 ease-in-out 
                scale-95 animate-fadeIn"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div
                            className="flex items-end justify-end cursor-pointer"
                            onClick={() => setFormVisible(false)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Relationship</label>
                            <input
                                type="text"
                                name="relationship"
                                value={formData.relationship}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105"
                        >
                            {isEditing ? "Update Contact" : "Save Contact"}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EmergencyContactForm;
