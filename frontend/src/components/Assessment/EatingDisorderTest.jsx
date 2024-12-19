import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const EatingDisorderTest = () => {
  const questions = [
    "How much you feel preoccupied with food, weight, or body shape?",
    "How much you often feel guilt or shame after eating?",
    "How much you avoid eating in public due to fear of judgment?",
    "How much you frequently weigh yourself or check your body in mirrors?",
    "How much you experience a lack of control when eating?",
    "How much you restrict food intake to influence your weight or body shape?",
    "How much you feel distressed about your eating habits?",
    "How much you engage in excessive exercise to compensate for eating?",
    "How much you experience physical symptoms like fatigue, dizziness, or hair loss?",
    "How much you often compare your body to others or feel dissatisfied with it?",
  ];
  const [responses, setResponses] = useState(
    Array(questions.length).fill(0) // Default slider value is 5
  );

  const handleSliderChange = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index] = parseInt(value, 10);
    setResponses(updatedResponses);
  };

  const handleSubmit = async () => {
    console.log("Submitting responses:", responses);

    try {
      const response = await fetch("http://localhost:8080/api/disorder-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(responses),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed");
      }

      const data = await response.json();
      toast.info(`Average Score: ${data.averageScore.toFixed(2)}, Status: ${data.status}`);
      toast.success("Test Submitted successfully!");
    } catch (error) {
      console.error("Error submitting responses:", error);
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
        <h1 className="text-3xl font-bold text-center mb-5">Eating Disorder Test</h1>
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

export default EatingDisorderTest;
