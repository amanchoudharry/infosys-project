import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ArticlesDisplay = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/articles/allArticles");
                if (!response.ok) throw new Error("Failed to fetch articles.");

                const data = await response.json();
                setArticles(data);
            } catch (error) {
                toast.error("Failed to load articles.");
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="p-8">
            <div className="grid grid-cols-3 gap-6">
                {articles.map((article) => (
                    <motion.div
                        key={article.id}
                        className="bg-[#74c996] rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                        <p className="text-gray-800 mb-4">{article.description}</p>
                        <p className="text-gray-800 mb-4">{article.content}</p>
                        <div className="flex items-center justify-between">
                            {article.referenceLink && (
                                <a
                                    href={article.referenceLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-800 hover:underline italic"
                                >
                                    Read More
                                </a>
                            )}
                            <i class="fa-regular fa-bookmark"></i>
                        </div>
                        <p className="mt-4 text-sm text-black font-bold">
                            <span className="font-semibold">By: Professional </span> Dr. {article.username}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ArticlesDisplay;
