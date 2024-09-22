import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import heroImage1 from '../assets/images/heroImage1.png';
import heroImage2 from '../assets/images/heroImage2.png';
import heroImage3 from '../assets/images/heroImage3.png';
import heroImage4 from '../assets/images/heorImage4.png';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [heroImage1, heroImage2, heroImage3, heroImage4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const animationVariants = {
    hiddenLeft: { opacity: 0, x: '-100vw' },
    hiddenRight: { opacity: 0, x: '100vw' },
    hiddenTop: { opacity: 0, y: '-100vh' },
    hiddenBottom: { opacity: 0, y: '100vh' },
    visible: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: '0', y: '0' },
  };

  const getVariant = () => {
    switch (currentImageIndex) {
      case 0:
        return animationVariants.hiddenLeft;
      case 1:
        return animationVariants.hiddenTop;
      case 2:
        return animationVariants.hiddenRight;
      case 3:
        return animationVariants.hiddenBottom;
      default:
        return animationVariants.hiddenLeft;
    }
  };

  return (
    <div className="text-start flex flex-col w-screen justify-center items-center mx-auto">


      <div className='flex justify-between w-4/5 items-center mt-20 mb-[100px]'>
            <div>
                    <h1 className="text-4xl font-bold text-white mb-4">Welcome to Aays Smart Hire</h1>
                    <p className="text-lg text-gray-300">
                      <ReactTyped
                        strings={[
                          'Smart Solutions for Smarter Hiring',
                          'Connecting Talent with Opportunities',
                          'Elevating Your Workforce, Simplifying Your Process'
                        ]}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                      />
                    </p>
            </div>


            <div className='p-10 w-[450px] flex items-center overflow-hidden scale-150'>
                    <motion.div
                      key={currentImageIndex}
                      initial={getVariant()}
                      animate="visible"
                      exit="exit"
                      variants={animationVariants}
                      transition={{ duration: 2.5 }}
                      className='px-5 py-2 rounded scale-150'
                    >
                      <img
                        src={images[currentImageIndex]}
                        alt={`Slide ${currentImageIndex}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
            </div>
      </div>


      <div className='w-screen h-[60px] bg-[#BB1CCC] flex justify-center items-center'>
            <p className='font-bold text-3xl'>Take the Next Step to AI-Driven Success</p>
      </div>



      <div className='bg-black w-screen h-[700px] flex flex-col z-20 text-center flex items-center'>

                <p className='mt-10 text-3xl font-bold text-white'>Our Training Program</p>

                <div className='flex flex-wrap justify-between border  w-4/5 space-x-2 h-[500px]'>

                      <div className='w-[30%] h-[300px] border mt-20 flex flex-col items-center'>
                        <img src={heroImage1} alt="Program 1" className="w-full object-cover mb-4" />
                        <h2 className='text-2xl font-bold text-white'>Data Analytics</h2>
                        <p className='text-white text-center'>
                          Learn to analyze complex data sets and drive business decisions with confidence.
                        </p>
                      </div>

                      <div className='w-[30%] h-[300px] border mt-20 flex flex-col items-center'>
                        <img src={heroImage2} alt="Program 2" className="w-full object-cover mb-4" />
                        <h2 className='text-2xl font-bold text-white'>Data Engineering</h2>
                        <p className='text-white text-center'>
                          Build and maintain robust data infrastructures for scalable solutions.
                        </p>
                      </div>

                      <div className='w-[30%] h-[300px] border mt-20 flex flex-col items-center'>
                        <img src={heroImage3} alt="Program 3" className="w-full object-cover mb-4" />
                        <h2 className='text-2xl font-bold text-white'>Data Science</h2>
                        <p className='text-white text-center'>
                          Master machine learning and AI techniques to solve real-world problems.
                        </p>
                      </div>
                </div>
      </div>





    </div>
  );
};

export default Home;
