import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; // Add axios for making HTTP requests
import { toast } from 'react-toastify';

const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const NewsLetter = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/newsletter', { email });
            toast.success('Subscribed successfully');
            setEmail("")
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div>
            <motion.section
                className="flex flex-col gap-7 justify-center items-center bg-[#0B5730] p-10 m-14 rounded-2xl"
                variants={fadeInVariant}
                initial="hidden"
                animate="visible"
            >
                <h1 className="text-3xl text-white font-semibold">Subscribe Our Newsletter to receive Mental-Wellbeing Tips</h1>
                <p className="text-white text-center">
                    Join us and be an important part of our community.
                </p>
                <div className="flex items-center gap-10 w-full justify-center">
                    <div className="bg-black bg-opacity-30 w-[40%] rounded-3xl">
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent text-white w-full outline-none p-4 px-5"
                            placeholder="Your email address"
                        />
                    </div>
                    <button onClick={handleSubscribe} className="bg-white p-2 px-3 font-semibold rounded-2xl">
                        Subscribe Now
                    </button>
                </div>
            </motion.section>
        </div>
    );
};

export default NewsLetter;
