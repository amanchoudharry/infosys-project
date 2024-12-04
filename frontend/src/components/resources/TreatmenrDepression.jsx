import React from 'react'
import Img1 from '../../assets/depression-resource-1.png';
import Img2 from '../../assets/depression-resource-2.png';
import Img3 from '../../assets/depression-resource-3.png';
import Img4 from '../../assets/depression-resource-4.png';

const TreatmentDepression = () => {
    const depressionResource = [
        {
          img: Img1,
          title: "What are the Therapy for Depression?",
          desc: "Depression can be treated a variety of therapeutic techniques.",
          link:"https://www.healthline.com/health/depression/types-of-depression-therapy"
        },
        {
          img: Img2,
          title: "How Does Therapy for Depression Work?",
          desc: "Cognitive behavioral therapy for depression is a type of psychotherapy",
          link:"https://www.healthline.com/health/depression/cognitive-behavioral-therapy"
        },
        {
          img: Img3,
          title: "How Can I Get Help for Depression?",
          desc: "Depression can be debilitating for those who experience it.",
          link: "https://www.healthline.com/health/depression/help-for-depression"
        },
        {
          img: Img4,
          title: "Selective Serotonin Reuptake Inhibitors (SSRIs)",
          desc: "SSRIs are a type of antidepressant.",
          link: "https://www.healthline.com/health/depression/selective-serotonin-reuptake-inhibitors-ssris"
        }
      ]
  return (
    <div className='mt-5 grid grid-cols-2 grid-rows-2 gap-10 justify-center'>
      {
        depressionResource.map((resource, index) => (
          <div key={index} className="resource-card flex justify-center ml-[55%] items-center">
            <div className="resource-img w-full">
              <img src={resource.img} className='h-full' alt="resource" />
            </div>
            <div className="resource-content w-full mr-[-185%] flex flex-col gap-2">
              <h3 className='text-lg font-semibold'>{resource.title}</h3>
              <p className='font-medium text-sm'>{resource.desc}</p>
              <a href={resource.link} className='italic hover:underline font-bold' target="_blank" rel="noreferrer">Read More</a>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default TreatmentDepression
