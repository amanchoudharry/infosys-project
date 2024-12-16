import axios from "axios";
import React, { useEffect, useState } from "react";
import CalmMind from '../../assets/calmMind.png';
import relaxation from '../../assets/relaxation-exercises.png';
import selfcare from '../../assets/Self-CareforAnxiety.png';
import StressManagement from '../../assets/stressmgmt.png';
import deepbreathing from '../../assets/deep-breathing.jpg';
import balanced from '../../assets/balanced-lifestyle.jpg';
import cognitive from '../../assets/cognitive-therapy.png';
import onlinesupport from '../../assets/online-support.jpg';
import guidedMeditation from '../../assets/guided-meditation.jpeg';

const anxietyResources = [
    {
        category: "Low Anxiety",
        resources: [
            {
                image: CalmMind,
                title: "Calm Mind Techniques",
                description: "If you are feeling anxious, scared or panicked there are many things you can do to help yourself cope. A common – and natural – response to anxiety is to avoid what triggers your fear, so taking any action might make you feel more anxious at first. It can be difficult, but facing up to how anxiety makes you feel can be the first step in breaking the cycle of fear and insecurity.",
                link: "https://www.mind.org.uk/need-urgent-help/what-can-i-do-to-help-myself-cope/relaxing-and-calming-exercises/",
            },
            {
                image: "relaxation",
                title: "Relaxation Exercises",
                description: "The physical reaction our bodies have to the stress and anxiety experienced by our brains can be debilitating for many students but it doesn’t have to be.There are proven breathing exercises that can truly help alleviate the physical reactions our bodies experience when stressed and in turn, when relaxed, our bodies can help slow down our minds. This week’s #MentalHealthMonday video shares 4 of these techniques.",
                link: "https://thefriendshipbench.org/4-breathing-exercises-to-help-battle-student-stress-and-anxiety/",
            },
            {
                image: "self-care-anxiety.jpg",
                title: "Self-Care for Anxiety",
                description: "Anxiety disorders are the most common type of mental illness in the United States, affecting 40 million adults each year. Yet only 36.9 percent of people living with anxiety disorders receive treatment.The good news? In addition to seeking professional treatment, there are self-care tools you can use daily to manage symptoms of anxiety..",
                link: "https://www.mentalhealthfirstaid.org/2018/07/how-to-deal-with-anxiety/",
            },
        ],
    },
    {
        category: "Moderate Anxiety",
        resources: [
            {
                image: StressManagement,
                title: "Stress Management Strategies",
                description: "Many people deal with stress every day. Work, family issues, health concerns, and financial obligations are parts of everyday life that commonly contribute to heightened stress levels.",
                link: "https://www.healthline.com/nutrition/16-ways-relieve-stress-anxiety",
            },
            {
                image: deepbreathing,
                title: "Deep Breathing Exercises",
                description: "Stress and anxiety are common nowadays. Many people seek ways to manage feelings of stress or anxiety.",
                link: "https://www.shamashalidina.com/blog/breathing-exercises",
            },
            {
                image: balanced,
                title: "Achieving a Balanced Lifestyle",
                description: "In our daily lives, ease plays a crucial role as it allows us to navigate challenges with a clearer mind, make better decisions, and enjoy a better quality of life. When we embrace ease, we experience a sense of peace and balance that positively impacts our mental, emotional, and physical well-being.",
                link: "https://www.truworthwellness.com/blog/6-healthy-ways-to-embrace-ease/",
            },
        ],
    },
    {
        category: "High Anxiety - Seek Help",
        resources: [
            {
                image: cognitive,
                title: "Cognitive Behavioral Therapy",
                description: "CBT treats anxiety by helping people make changes to the way they think and behave when they feel anxious. CBT aims to help people interrupt and change the worried thoughts that feed into anxiety, while also helping to reduce avoidant behaviors. Together, these changes help reduce anxiety without the use of medication, and lessen the impact of anxiety day-to-day.",
                link: "https://www.choosingtherapy.com/cbt-for-anxiety/",
            },
            {
                image: onlinesupport,
                title: "Online Support Groups",
                description: "A 16-year-old teenager suffering from anxiety, a 70-year-old grandmother battling depression and a 26-year-old counselling psychologist looking to make a difference: What do they have in common? They all attend a support group for individuals suffering from common mental disorders (CMDs).",
                link: "https://www.happiesthealth.com/articles/mental-health/support-groups-anxiety-depression",
            },
            {
                image: guidedMeditation,
                title: "Guided Meditation for Anxiety",
                description: "Meditation is a well-researched self-care method that can promote positive effects in the brain, mood, and emotional management.1,2 Because of the simple nature of meditation, it can be practiced virtually anywhere inexpensively at one’s own pace. Meditation has shown to be an effective way to manage symptoms of anxiety, and there are a variety of meditation techniques that can help.",
                link: "https://www.choosingtherapy.com/meditation-for-anxiety/",
            },
        ],
    },
];

const TreatmentAxiety = () => {
        const [anxietyCategory, setAnxietyCategory] = useState(null);
        const [resources, setResources] = useState([]);
        const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAnxietyData = async () => {
            const userId = sessionStorage.getItem("userId"); // Assume userId is stored in session

            try {
                const response = await axios.get(`http://localhost:8080/api/anxiety-test/category/${userId}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // Use withCredentials for cookies/credentials
                });

                const category = response.data.anxietyCategory; // Get the category
                setAnxietyCategory(category);
                // Find the matching resources based on the category
                const matchedResources = anxietyResources.find(
                    (item) => item.category === category
                );

                setResources(matchedResources ? matchedResources.resources : []);
            } catch (error) {
                console.error("Error fetching anxiety data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAnxietyData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!anxietyCategory) {
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
  )
}

export default TreatmentAxiety;
