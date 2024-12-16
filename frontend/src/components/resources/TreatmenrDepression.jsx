import axios from "axios";
import React, { useEffect, useState } from "react";
import generalwellness from '../../assets/generalwellness.jpg';
import mindfulness from '../../assets/mindfulness.jpg';
import selfcare from '../../assets/selfcare.png';
import ExerciseRoutines from '../../assets/ExerciseRoutines.jpeg';
import breathing from '../../assets/breathing.jpeg';
import healthyeating from '../../assets/healthyeating.png';
import ProfessionalTherapy from '../../assets/ProfessionalTherapy.jpg';
import SupportGroups from '../../assets/SupportGroups.jpeg';
import MindfulnessMeditation from '../../assets/MindfulnessMeditation.jpg';

const depressionResources = [
    {
        category: "You are good with your mental health",
        resources: [
            {
                image: generalwellness,
                title: "General Wellness Tips",
                description: "The wellness wheel is a visual tool that shows each category of wellness on a wheel. It gives people the opportunity to hone in on their wellness by identifying areas in their life they may have neglected and seek to improve.",
                link: "https://www.talkspace.com/blog/wellness-wheel/",
            },
            {
                image: mindfulness,
                title: "Mindfulness Exercises",
                description: "Guided exercises to help you stay present.",
                link: "https://www.garrisoninstitute.org/10-steps-to-mindfulness-meditation/",
            },
            {
                image: selfcare,
                title: "Self-Care Routines",
                description: "Self-care for depression is any technique that creates positive feelings and replenishes your mind and body. For example, practicing daily gratitude, laughing with a loved one, and taking daily walks can boost your mood and reduce symptoms of depression. Identifying successful self-care techniques may vary for each person, and all are invited to explore different practices to determine the best implementation for you.",
                link: "https://www.choosingtherapy.com/self-care-for-depression/",
            },
        ],
    },
    {
        category: "Moderate, needs improvement",
        resources: [
            {
                image: ExerciseRoutines,
                title: "Exercise Routines",
                description: "According to the World Health Organization, depression is one of the most prevalent disorders; it affects approximately 280 million people worldwide. It is a significant contributor to the global disease burden and one of the leading causes of disability..",
                link: "https://medvidi.com/blog/does-exercise-help-depression",
            },
            {
                image: breathing,
                title: "Breathing Techniques",
                description: "Take a deep breath—a good, deep breath—and let it out. If you’re feeling a little lighter, you’re not imagining it.",
                link: "https://www.verywellmind.com/the-benefits-of-deep-breathing-5208001",
            },
            {
                image: healthyeating,
                title: "Healthy Eating Habits",
                description: "The field of nutritional psychiatry has generated observational and efficacy data supporting a role for healthy dietary patterns in depression onset and symptom management. To guide future clinical trials and targeted dietary therapies, this review provides an overview of what is currently known regarding underlying mechanisms of action by which diet may influence mental and brain health. The mechanisms of action associating diet with health outcomes are complex, multifaceted, interacting, and not restricted to any one biological pathway.",
                link: "https://www.nature.com/articles/s41380-020-00925-x",
            },
        ],
    },
    {
        category: "Low, needs treatment",
        resources: [
            {
                image: ProfessionalTherapy,
                title: "Professional Therapy",
                description: "There are many different types of therapy to treat depression and other mood disorders. Psychotherapy can be an effective form of treatment for depression because it can help you delve into possible underlying reasons for your depressive feelings and learn new skills to cope..",
                link: "https://www.verywellmind.com/types-of-psychotherapy-for-depression-1067407",
            },
            {
                image: SupportGroups,
                title: "Support Groups",
                description: "Support groups for depression, when done correctly, can be extremely helpful for people experiencing depression. By their very nature, depression support groups provide something essential for recovery: a social connection.",
                link: "https://www.healthyplace.com/self-help/depression/are-support-groups-for-depression-really-helpful",
            },
            {
                image: MindfulnessMeditation,
                title: "Mindfulness & Meditation",
                description: "Meditation is an ancient practice that has been around for thousands of years, and has gained significant attention in recent times for its potential role in managing depression.",
                link: "https://continentalhospitals.com/blog/role-of-meditation-in-managing-depression/",
            },
        ],
    },
];

const TreatmentDepression = () => {
    const [depressionCategory, setDepressionCategory] = useState(null);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDepressionData = async () => {
            const userId = sessionStorage.getItem("userId"); // Assume userId is stored in session

            try {
                const response = await axios.get(`http://localhost:8080/api/depression-test/category/${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // Use withCredentials for cookies/credentials
                });

                const category = response.data.depressionCategory; // Get the category
                setDepressionCategory(category);

                // Find the matching resources based on the category
                const matchedResources = depressionResources.find(
                    (item) => item.category === category
                );

                setResources(matchedResources ? matchedResources.resources : []);
            } catch (error) {
                console.error("Error fetching depression data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDepressionData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!depressionCategory) {
        return <div>No data available for the user.</div>;
    }

    return (
        <div className="mt-5 flex flex-col gap-10 justify-center">
            {resources.length > 0 ? (
                resources.map((resource, index) => (
                    <div
                        key={index}
                        className="resource-card flex justify-center ml-[35%] items-center"
                    >
                        <div className="resource-img w-full">
                            <img
                                src={resource.image}
                                alt={resource.title || "Resource"}
                                className="w-full h-auto object-cover rounded-md"
                            />
                        </div>
                        <div className="resource-content w-full mr-[-35%] flex flex-col gap-5">
                            <h3 className="text-3xl font-semibold">{resource.title}</h3>
                            <p className="font-medium mb-3">{resource.description}</p>
                            <a
                                href={resource.link}
                                className="text-blue-600 italic hover:underline font-bold"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <div>No resources available for this category.</div>
            )}
        </div>
    );
};

export default TreatmentDepression;
