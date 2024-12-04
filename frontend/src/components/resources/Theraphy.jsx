import React from 'react'
import Img1 from '../../assets/theraphy-resource-1.png';
import Img2 from '../../assets/theraphy-resource-2.png';
import Img3 from '../../assets/theraphy-resource-3.png';
import Img4 from '../../assets/theraphy-resource-4.png';

const Theraphy = () => {
    const anxietyResource = [
        {
          img: Img1,
          title: "How to Find a Therapist: 8 Tips from Experts on Searching for the Right Fit",
          desc: "Whether you’re coping with trauma, loss, or a relationship issue or want treatment for a mental health condition,",
          link:"https://www.healthline.com/health/how-to-find-a-therapist"
        },
        {
          img: Img2,
          title: "Not Sure What to Talk About in Therapy? 12 Things to Consider",
          desc: "When you're seeing a therapist, it can be hard to find something to talk about.",
          link:"https://www.healthline.com/health/what-to-talk-about-in-therapy"
        },
        {
          img: Img3,
          title: "Best Affordable Online Therapy for 2025: Our Experience, Insurance, Sliding Scales, and More",
          desc: "Here’s a list of affordable mental healthcare options.",
          link: "https://www.healthline.com/health/therapy-for-every-budget"
        },
        {
          img: Img4,
          title: "What’s the Difference Between a Psychologist and Therapist? How to Choose",
          desc: "What’s the difference when it comes to a psychologist vs. therapist? Learn the key differences so you know who to choose for…",
          link: "https://www.healthline.com/health/psychologist-vs-therapist"
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

export default Theraphy
