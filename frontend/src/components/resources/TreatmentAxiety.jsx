import React from 'react'
import Img1 from '../../assets/anxiety-resource-1.png';
import Img2 from '../../assets/anxiety-resource-2.png';
import Img3 from '../../assets/anxiety-resource-3.png';
import Img4 from '../../assets/anxiety-resource-4.png';

const TreatmentAxiety = () => {
    const anxietyResource = [
        {
          img: Img1,
          title: "What Type of Psychotherapy Is Best for Anxiety?",
          desc: "Psychotherapy can help you manage your anxiety symptoms. Find the best type of therapy for you.",
          link:"https://www.healthline.com/health/anxiety/psychotherapy-for-anxiety"
        },
        {
          img: Img2,
          title: "Do You Live with Anxiety? Here Are 13 Ways to Cope",
          desc: "Identifying your triggers can take some time and self-reflection. In the meantime, here are 13 strategies you can try to help…",
          link:"https://www.healthline.com/health/mental-health/how-to-cope-with-anxiety"
        },
        {
          img: Img3,
          title: "6 Natural Products to Help Alleviate Anxiety",
          desc: "Here are our pics for natural anti-anxiety products.",
          link: "https://www.healthline.com/health/natural-anti-anxiety"
        },
        {
          img: Img4,
          title: "Alternative Treatments for Anxiety",
          desc: "Here are some alternative treatments to help with anxiety.",
          link: "https://www.healthline.com/health/anxiety-alternative-treatments"
        }
      ]
  return (
    <div className='mt-5 flex flex-col gap-10 justify-center'>
      {
        anxietyResource.map((resource, index) => (
          <div key={index} className="resource-card flex justify-center ml-[35%] items-center">
            <div className="resource-img w-full">
              <img src={resource.img} alt="resource" />
            </div>
            <div className="resource-content w-full mr-[-35%] flex flex-col gap-5">
              <h3 className='text-3xl font-semibold'>{resource.title}</h3>
              <p className='font-medium'>{resource.desc}</p>
              <a href={resource.link} className='italic hover:underline font-bold' target="_blank" rel="noreferrer">Read More</a>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default TreatmentAxiety
