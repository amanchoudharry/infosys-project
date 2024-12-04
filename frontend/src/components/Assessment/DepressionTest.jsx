import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fadeInVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const DepressionTest = () => {
    const username = sessionStorage.getItem("username");
    const questions = [
        "How would you rate your overall happiness in the past two weeks?",
        "How confident do you feel about yourself and your abilities?",
        "How optimistic are you about the future?",
        "How well do you handle emotional challenges or stress?",
        "How would you rate your energy levels throughout the day?",
        "How well have you been sleeping recently?",
        "How would you rate your appetite and eating habits?",
        "How well do you feel you’ve been managing negative thoughts?",
        "How often do you reach out to friends or family for emotional support?",
        "How effective are you at managing stress?",
    ];

    const [responses, setResponses] = useState(
        Array(questions.length).fill(0) // Default slider value is 0
    );

    const handleSliderChange = (index, value) => {
        const updatedResponses = [...responses];
        updatedResponses[index] = parseInt(value, 10);
        setResponses(updatedResponses);
    };

    const handleSubmit = async () => {
        if (!username) {
            toast.error("Username not found. Please log in.");
            return;
        }

        const totalScore = responses.reduce((sum, value) => sum + value, 0);
        const averageScore = totalScore / responses.length;
        const status =
            averageScore >= 7
                ? "You are good with your mental health"
                : averageScore >= 4
                ? "Moderate and needs to improve"
                : "Low and need treatment";

        const payload = {
            username,
            averageScore,
            status,
        };

        try {
            const response = await fetch("http://localhost:8080/api/depression-test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Submission failed");
            }

            const data = await response.json();
            toast.success(
                `Assessment submitted! Average Score: ${data.averageScore.toFixed(
                    2
                )}, Status: ${data.status}`
            );
        } catch (error) {
            console.error("Error submitting assessment:", error);
            toast.error(error.message || "An error occurred. Please try again.");
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
            style={{
                fontFamily: "Arial, sans-serif",
                backgroundColor: "#B6FCD2",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <div className="bg-[#71d699] mx-24 mt-5 shadow-xl shadow-[#4CAB72] rounded-2xl p-5">
                <h1 className="text-3xl font-bold text-center mb-5">Depression Test</h1>
                <p className="font-semibold text-center mb-5">
                    Please answer the following questions by sliding the bar to indicate your response.
                </p>
                <div className="font-semibold" style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
                    {questions.map((question, index) => (
                        <div key={index} style={{ marginBottom: "30px" }}>
                            <p>
                                <strong>Q{index + 1}: </strong>
                                {question}
                            </p>
                            <input
                                type="range"
                                min="1"
                                max="10"
                                value={responses[index]}
                                onChange={(e) => handleSliderChange(index, e.target.value)}
                                style={{
                                    width: "100%",
                                    height: "10px",
                                    background: "linear-gradient(to right, red, yellow, orange, green)",
                                    borderRadius: "5px",
                                    outline: "none",
                                    appearance: "none",
                                    marginTop: "10px",
                                }}
                            />
                            <p>Response: {responses[index]}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-5">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                        style={{
                            padding: "10px 20px",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "16px",
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default DepressionTest;
