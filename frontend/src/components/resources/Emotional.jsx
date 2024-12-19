import React from 'react'
import Img1 from '../../assets/emotional-resource-1.png';
import Img2 from '../../assets/emotional-resource-2.png';
import Img3 from '../../assets/emotional-resource-3.png';
import Img4 from '../../assets/emotional-resource-4.png';

const Emotional = () => {
    const depressionResource = [
        {
          img: Img1,
          title: "6 Journaling Benefits and How to Start Now",
          desc: "Journaling offers a host of benefits, from reducing stress ",
          link:"https://www.healthline.com/health/benefits-of-journaling"
        },
        {
          img: Img2,
          title: "10 Breathing Exercises Feeling Stressed",
          desc: "Stress may be caused by many factors, such as work, money, health",
          link:"https://www.healthline.com/health/breathing-exercise"
        },
        {
          img: Img3,
          title: "32 Mindfulness Activities to Find Calm",
          desc: "Serotonin is a chemical messenger that’s believed to elevate your mood",
          link: "https://www.healthline.com/health/mind-body/mindfulness-activities"
        },
        {
          img: Img4,
          title: "How to Be Happy: ",
          desc: "Happiness can feel impossible, but it’s always within reach",
          link: "https://www.healthline.com/health/how-to-be-happy"
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

export default Emotional
