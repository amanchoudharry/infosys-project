import axios from "axios";
import React, { useEffect, useState } from "react";
import CalmMind from "../../assets/calmMind.png";
import relaxation from "../../assets/relaxation-exercises.png";
import selfcare from "../../assets/Self-CareforAnxiety.png";
import StressManagement from "../../assets/stressmgmt.png";
import deepbreathing from "../../assets/deep-breathing.jpg";
import balanced from "../../assets/balanced-lifestyle.jpg";
import cognitive from "../../assets/cognitive-therapy.png";
import onlinesupport from "../../assets/online-support.jpg";
import guidedMeditation from "../../assets/guided-meditation.jpeg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Ensure toast notifications are correctly imported

const anxietyResources = [
  {
    category: "Low Anxiety",
    resources: [
      {
        image: CalmMind,
        title: "Calm Mind Techniques",
        description:
          "If you are feeling anxious, scared or panicked there are many things you can do to help yourself cope...",
        link: "https://www.mind.org.uk/need-urgent-help/what-can-i-do-to-help-myself-cope/relaxing-and-calming-exercises/",
      },
      {
        image: relaxation,
        title: "Relaxation Exercises",
        description:
          "The physical reaction our bodies have to stress and anxiety can be debilitating...",
        link: "https://thefriendshipbench.org/4-breathing-exercises-to-help-battle-student-stress-and-anxiety/",
      },
      {
        image: selfcare,
        title: "Self-Care for Anxiety",
        description:
          "Anxiety disorders are the most common type of mental illness in the United States...",
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
        description: "Many people deal with stress every day...",
        link: "https://www.healthline.com/nutrition/16-ways-relieve-stress-anxiety",
      },
      {
        image: deepbreathing,
        title: "Deep Breathing Exercises",
        description: "Stress and anxiety are common nowadays...",
        link: "https://www.shamashalidina.com/blog/breathing-exercises",
      },
      {
        image: balanced,
        title: "Achieving a Balanced Lifestyle",
        description: "In our daily lives, ease plays a crucial role...",
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
        description: "CBT treats anxiety by helping people change their thought patterns...",
        link: "https://www.choosingtherapy.com/cbt-for-anxiety/",
      },
      {
        image: onlinesupport,
        title: "Online Support Groups",
        description: "A support group for individuals suffering from common mental disorders...",
        link: "https://www.happiesthealth.com/articles/mental-health/support-groups-anxiety-depression",
      },
      {
        image: guidedMeditation,
        title: "Guided Meditation for Anxiety",
        description: "Meditation promotes positive effects in the brain and mood...",
        link: "https://www.choosingtherapy.com/meditation-for-anxiety/",
      },
    ],
  },
];

const TreatmentAnxiety = () => {
  const [anxietyCategory, setAnxietyCategory] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch anxiety data on mount
  useEffect(() => {
    const fetchUserAnxietyData = async () => {
      const userId = sessionStorage.getItem("userId");

      try {
        const response = await axios.get(
          `http://localhost:8080/api/anxiety-test/category/${userId}`
        );
        const category = response.data.anxietyCategory;

        setAnxietyCategory(category);
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

  // Bookmarking state management
  const [bookmarkedIcons, setBookmarkedIcons] = useState(() => {
    const savedBookmarks = sessionStorage.getItem("bookmarkedIcons");
    return savedBookmarks ? JSON.parse(savedBookmarks) : {};
  });

  useEffect(() => {
    sessionStorage.setItem("bookmarkedIcons", JSON.stringify(bookmarkedIcons));
  }, [bookmarkedIcons]);

  const toggleBookmark = async (id, resource) => {
    const userId = sessionStorage.getItem("userId");
    const isBookmarked = !bookmarkedIcons[id];

    setBookmarkedIcons((prev) => ({
      ...prev,
      [id]: isBookmarked,
    }));

    try {
      await axios.post("http://localhost:8080/api/bookmarks", {
        userId,
        img: resource.image,
        title: resource.title,
        desc: resource.description,
        link: resource.link,
      });

      toast.success(
        isBookmarked
          ? "Resource Bookmarked in profile"
          : "Bookmark removed successfully"
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update bookmark");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 flex flex-col gap-10 justify-center">
      {resources.length > 0 ? (
        resources.map((resource, index) => (
          <div key={index} className="resource-card w-full ml-[35%] flex justify-center items-center">
            <div className="resource-img w-full">
              <img
                src={resource.image}
                alt={resource.title}
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
            <div className="resource-content w-full flex flex-col gap-5 ml-5">
              <h3 className="text-3xl font-semibold">{resource.title}</h3>
              <p className="font-medium mb-3">{resource.description}</p>
              <div className="flex items-center justify-between">
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 italic hover:underline font-bold"
                >
                  Read More
                </a>
                <i
                  className={`fa-${bookmarkedIcons[index] ? "solid" : "regular"} fa-bookmark text-xl cursor-pointer`}
                  onClick={() => toggleBookmark(index, resource)}
                ></i>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No resources available for this category.</div>
      )}
    </div>
  );
};

export default TreatmentAnxiety;
