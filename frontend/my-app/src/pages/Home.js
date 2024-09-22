import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import heroImage1 from '../assets/images/heroImage1.png';
import heroImage2 from '../assets/images/heroImage2.png';
import heroImage3 from '../assets/images/heroImage3.png';
import heroImage4 from '../assets/images/heorImage4.png';
import DataAnalytics from '../assets/images/DataAnalytics.png';
import DataEngineering from '../assets/images/DataEngineering.png';
import DataScience from '../assets/images/DataScience.png';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Footer from '../Components/Footer';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [heroImage1, heroImage2, heroImage3, heroImage4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path); // This is how you navigate to a different page
    if (path === '/data-analytics' || path === '/data-engineering' || path === '/data-science') {
      toast.success('Happy learning!'); // Show success toast
    }
  };

  const animationVariants = {
    hiddenLeft: { opacity: 0, x: '-100vw' },
    hiddenRight: { opacity: 0, x: '100vw' },
    hiddenTop: { opacity: 0, y: '-100vh' },
    hiddenBottom: { opacity: 0, y: '100vh' },
    visible: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
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
    <div className="text-start flex flex-col w-full justify-center items-center mx-auto px-4 md:px-10">
      <div className='flex flex-col md:flex-row justify-between w-full max-w-7xl items-center mt-28 md:mt-0 h-screen'>
        <div className='mb-10 md:mb-0 md:w-1/2'>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Welcome to A.G.I.L.E. Portal</h1>
          <p className="text-lg md:text-xl text-gray-300">
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

        <div className='p-10 w-full max-w-sm flex items-center justify-center overflow-hidden'>
          <motion.div
            key={currentImageIndex}
            initial={getVariant()}
            animate="visible"
            exit="exit"
            variants={animationVariants}
            transition={{ duration: 1.5, ease: "easeInOut" }} // Faster duration with easing
            className='px-5 py-2 rounded '
          >
            <img
              src={images[currentImageIndex]}
              alt={`Slide ${currentImageIndex}`}
              className="w-full h-full object-cover scale-150"
            />
          </motion.div>
        </div>
      </div>

      <div className=' w-screen h-[60px] bg-[#BB1CCC] flex justify-center items-center'>
        <p className='font-bold text-lg md:text-2xl lg:text-3xl'>Take the Next Step to AI-Driven Success</p>
      </div>

      <div className='bg-black w-screen flex flex-col z-20 text-center items-center'>
        <p className='mt-20 text-2xl md:text-3xl font-bold text-white '>Our Training Program</p>

        <div className='flex flex-wrap justify-between w-full max-w-7xl mt-10 space-y-10 md:space-y-0 mb-10 px-28'>
          <div className='w-full md:w-[30%] h-[290px] rounded-3xl overflow-hidden flex flex-col items-center bg-[#181818] hover:scale-105 hover:cursor-pointer transition-transform duration-300' onClick={() => handleNavigate('/data-analytics')}>
            <img src={DataAnalytics} alt="Program 1" className="w-full object-cover mb-4" />
            <h2 className='text-xl md:text-2xl font-bold text-white'>Data Analytics</h2>
            <p className='text-white text-center text-xs p-2'>
              Learn to analyze complex data sets and drive business decisions with confidence.
            </p>
          </div>

          <div className='w-full md:w-[30%] h-[290px] rounded-3xl flex flex-col items-center bg-[#181818] overflow-hidden hover:scale-105 hover:cursor-pointer transition-transform duration-300' onClick={() => handleNavigate('/data-engineering')}>
            <img src={DataEngineering} alt="Program 2" className="w-full object-cover mb-4" />
            <h2 className='text-xl md:text-2xl font-bold text-white'>Data Engineering</h2>
            <p className='text-white text-center text-xs p-2'>
              Build and maintain robust data infrastructures for scalable solutions.
            </p>
          </div>

          <div className='w-full md:w-[30%] h-[290px] rounded-3xl overflow-hidden flex flex-col items-center bg-[#181818] hover:scale-105 hover:cursor-pointer transition-transform duration-300' onClick={() => handleNavigate('/data-science')}>
            <img src={DataScience} alt="Program 3" className="w-full object-cover mb-4" />
            <h2 className='text-xl md:text-2xl font-bold text-white'>Data Science</h2>
            <p className='text-white text-center text-xs p-2'>
              Master machine learning and AI techniques to solve real-world problems.
            </p>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
