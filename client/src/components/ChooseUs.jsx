import PrivacyImage from '../assets/images/Privacy.png';
import FastPerformanceImage from '../assets/images/Fast-Performance.png';
import SimpleImage from '../assets/images/simple.png';
import FreeImage from '../assets/images/free.png';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ChooseUs() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div
        data-aos='fade-down'
        className='flex flex-col justify-center align-middle items-center bg-gradient-to-br from-[#C9E1CD] to-[#4ABEBD] dark:from-gray-800 dark:to-gray-700 dark:text-white min-h-[600px] p-[3rem]'
      >
        <h3
          data-aos='fade-down'
          className='text-center m-[3rem] underline text-[#EA6A49] dark:text-[#FC9F88] text-4xl font-bold'
        >
          User Benefits - Why Choose Us?
        </h3>

        <motion.div>
          <motion.div className='md:flex justify-around my-3 md:my-10'>
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              data-aos='fade-down'
              className='bg-white dark:bg-gray-900 dark:text-gray-200 rounded-[2rem] p-[2rem] mx-5 text-center md:w-[300px] lg:w-[375px] xl:w-[475px] my-3 md:my-0'
            >
              <img
                className='m-auto w-[200px]'
                src={PrivacyImage}
                alt='Privacy'
              />
              <h6 className='text-lg font-bold m-[1rem]'>
                100% Privacy & Security:
              </h6>
              <p>
                Your messages are encrypted, ensuring complete data protection.
              </p>
            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              data-aos='fade-up'
              className='bg-white dark:bg-gray-900 dark:text-gray-200 rounded-[2rem] p-[2rem] mx-5 text-center md:w-[300px] lg:w-[375px] xl:w-[475px] my-3 md:my-0'
            >
              <img
                className='m-auto w-[200px]'
                src={FastPerformanceImage}
                alt='Fast Performance'
              />
              <h6 className='text-lg font-bold m-[1rem]'>
                Lightning-Fast Performance:
              </h6>
              <p>No delays, no lag—just smooth and instant messaging.</p>
            </motion.div>
          </motion.div>
          <motion.div className='md:flex justify-around my-3 md:my-10'>
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              data-aos='fade-down'
              className='bg-white dark:bg-gray-900 dark:text-gray-200 rounded-[2rem] p-[2rem] mx-5 text-center md:w-[300px] lg:w-[375px] xl:w-[475px] my-3 md:my-0'
            >
              <img
                className='m-auto w-[200px]'
                src={SimpleImage}
                alt='Simple'
              />
              <h6 className='text-lg font-bold m-[1rem]'>
                Simple & Intuitive Design:
              </h6>
              <p>An easy-to-use interface for all age groups.</p>
            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              data-aos='fade-up'
              className='bg-white dark:bg-gray-900 dark:text-gray-200 rounded-[2rem] p-[2rem] mx-5 text-center md:w-[300px] lg:w-[375px] xl:w-[475px] my-3 md:my-0'
            >
              <img className='m-auto w-[200px]' src={FreeImage} alt='Free' />
              <h6 className='text-lg font-bold m-[1rem]'>Free to Use:</h6>
              <p>Enjoy unlimited chatting without hidden costs.</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 m-[1.2rem]'>
          <div
            data-aos='fade-down'
            className='bg-white dark:bg-gray-900 dark:text-gray-200 rounded-[2rem] p-[2rem] text-center'
          >

          </div>
          <div
            data-aos='fade-up'
            className='bg-white dark:bg-gray-900 dark:text-gray-200 rounded-[2rem] p-[2rem] text-center'
          >

          </div>
          <div
            data-aos='fade-down'
            className='bg-white dark:bg-gray-900 dark:text-gray-200 rounded-[2rem] p-[2rem] text-center'
          >

          </div>
          <div
            data-aos='fade-up'
            className='bg-white dark:bg-gray-900 dark:text-gray-200 rounded-[2rem] p-[2rem] text-center'
          >

          </div>
        </div> */}
      </div>
    </>
  );
}
