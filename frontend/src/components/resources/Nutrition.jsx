import React from 'react'
import Img1 from '../../assets/nutrition-resource-1.png';
import Img2 from '../../assets/nutrition-resource-2.png';
import Img3 from '../../assets/nutrition-resource-3.png';
import Img4 from '../../assets/nutrition-resource-4.png';

const Nutrition = () => {
    const depressionResource = [
        {
          img: Img1,
          title: "Diet and Mental Health",
          desc: "Diet is a critical component of emotional and mental health.",
          link:"https://www.healthline.com/nutrition/diet-and-mental-health-can-what-you-eat-affect-how-you-feel"
        },
        {
          img: Img2,
          title: "The 7 Best Supplements for Stress",
          desc: "Stress may be caused by many factors, such as work, money, health",
          link:"https://www.healthline.com/nutrition/vitamins-for-stress"
        },
        {
          img: Img3,
          title: "7 Foods That Could Boost Your Serotonin",
          desc: "Serotonin is a chemical messenger that’s believed to elevate your mood",
          link: "https://www.healthline.com/health/healthy-sleep/foods-that-could-boost-your-serotonin"
        },
        {
          img: Img4,
          title: "Can Food Act as Medicine?",
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

export default Nutrition
