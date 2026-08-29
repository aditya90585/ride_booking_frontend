import React, { useEffect } from 'react'
import StartTaxi from "../assets/StartTaxi.png"
import StartBike from "../assets/StartBike.png"
import SplitText from '../components/SplitText'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { gsap } from "gsap";
import { NavLink, useNavigate } from 'react-router-dom'


const Start = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 50 }, [Autoplay({ delay: 3000 })])
const navigate = useNavigate()

  useEffect(() => {
    if (!emblaApi) return;

    const animateSlide = () => {
      const slides = emblaApi.slideNodes();
      const selectedIndex = emblaApi.selectedScrollSnap();

      slides.forEach((slide, index) => {
        const image = slide.querySelector("img");

        if (!image) return;

        if (index === selectedIndex) {
          // ENTER
          gsap.fromTo(
            image,
            {
              x: 250,
              y: 500,
              rotation: 20,
              scale: 0.85,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            }
          );
        } else {
          // EXIT
          gsap.to(image, {
            x: -50,
            y: 50,
            // rotation: -20,
            scale: 0.85,
            opacity: 0,
            duration: 0.8,
            ease: "power3.in",
          });
        }
      });
    };
    animateSlide();

    emblaApi.on("select", animateSlide);

    emblaApi.plugins().autoplay?.play();

    return () => {
      emblaApi.off("select", animateSlide);
    };
  }, [emblaApi]);

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  return (
    <div className='h-screen w-screen bg-gray-950 overflow-hidden'>
      <div className='flex justify-center items-center h-full w-full flex-col'>
        {/* <h1
          className='text-[30vw] absolute top-[10%] z-4 leading-[0.85] whitespace-nowrap font-extrabold font-mono bg-radial-[at_50%_0%] text-transparent bg-clip-text from-[#E8E8E8] to-[#26262660]  select-none transform lg:scale-y-120 md:scale-y-220 scale-y-240 origin-center'
        >
          RIDEVY
        </h1> */}

        <SplitText
          text="WAYFARE"
          className="text-[25vw]  absolute top-[10%] z-4 leading-[0.85] whitespace-nowrap font-extrabold font-mono select-none transform lg:scale-y-120 md:scale-y-220 scale-y-240 origin-center"
          delay={100}
          duration={1.8}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
          showCallback
        />
        {/* <div className='w-full flex'> */}
        {/* <div className='z-5  relative shrink-0 top-[10%] h-full lg:w-[100%] w-[108%] lg:rotate-12 rotate-18'>
            <img src={StartTaxi} className='w-full' alt="" />
          </div>
          <div className='z-5 relative shrink-0 top-[10%] h-full lg:w-[100%] w-[108%] lg:rotate-12 rotate-18'>
            <img src={StartBike} className='w-full' alt="" />
          </div> */}

        <div className="embla z-6 lg:rotate-12 rotate-18">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container flex">
              <div className="embla__slide shrink-0 lg:w-[100%] w-[104%]">
                <div className='z-5  relative top-[10%] h-full w-full '>
                  <img src={StartTaxi} className='w-full' alt="" />
                </div>
              </div>
              <div className="embla__slide shrink-0 lg:w-[100%] w-[104%]">
                <div className='z-5  relative top-[10%] w-full'>
                  <img src={StartBike} className='w-full' alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}

        <div className='relative lg:top-[6%] top-[25%] group'>
          <button onClick={()=> navigate("/signup")} className='text-amber-400  p-1  text-lg px-2 cursor-pointer'>
            Get Started ➔
            <div className='h-0.5 w-[80%] bg-amber-400 group-hover:w-full transition-all duration-150'></div>
          </button>
        </div>
        <div className='absolute lg:left-10 lg:bottom-20 left-4 bottom-[60%] group z-10'>
          <span className='text-white font-semibold text-lg'>Fast.</span><br />
          <span className='text-white font-semibold text-lg'>Safe.</span><br />
          <span className='text-amber-400 font-semibold text-lg'>Always With You </span>
          <div className='h-0.5 w-[42%] bg-amber-400 group-hover:w-full transition-all duration-150'></div>

        </div>
      </div>
    </div>
  )
}

export default Start
