import React from 'react'
import Img1 from '../../assets/sleep-resource-1.png';
import Img2 from '../../assets/sleep-resource-2.png';
import Img3 from '../../assets/sleep-resource-3.png';
import Img4 from '../../assets/sleep-resource-4.png';

const BetterSleep = () => {
    const anxietyResource = [
        {
          img: Img1,
          title: "Top 15 Proven Tips to Sleep Better at Night",
          desc: "This article lists 15 evidence-based tips to sleep better at night. Getting good sleep is very important for optimal health.",
          link:"https://www.healthline.com/nutrition/17-tips-to-sleep-better"
        },
        {
          img: Img2,
          title: "What Does Melatonin Do, and How Does It Work?",
          desc: "Learn about the effectiveness of melatonin for sleep. Discover whether supplements are safe",
          link:"https://www.healthline.com/nutrition/melatonin-and-sleep"
        },
        {
          img: Img3,
          title: "12 Healthy Sleep Hygiene Tips",
          desc: "Sleep hygiene is about having healthy sleep habits. Learn which behaviors, both during the day and around bedtime, can affect…",
          link: "https://www.healthline.com/health/sleep-hygiene"
        },
        {
          img: Img4,
          title: "Why Am I So Tired, but Can’t Sleep?",
          desc: "Still can't sleep, even when you're dead tired? Here are some expert-supported tips on how to get a restful night's sleep, no…",
          link: "https://www.healthline.com/health/healthy-sleep/tired-but-cant-sleep"
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

export default BetterSleep
