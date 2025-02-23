import AboutUsImage from '../assets/images/aboutus.png';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div
        data-aos='fade-right'
        className='bg-white dark:bg-gray-900 flex flex-col justify-center items-center align-middle '
      >
        <h3
          data-aos='fade-up'
          className='text-center m-[1rem] underline text-[#EA6A49] dark:text-[#fc9f88] text-4xl font-bold'
        >
          About Us
        </h3>
        <div
          data-aos='fade-down'
          className='flex m-[3rem] flex-col md:flex-row md:w-[80%] xl:w-[50%] items-center'
        >
          <img
            data-aos='fade-right'
            className='md:w-[50%] h-[400px] m-auto'
            src={AboutUsImage}
            alt='About'
          />
          <p
            data-aos='fade-left'
            className='lg:m-[2rem] text-gray-600 dark:text-gray-300 text-2xl lg:w-[50%] w-full text-center p-[1rem]  md:text-left align-middle '
          >
            Our chat application provides a seamless communication experience
            with top-tier security and real-time messaging. Stay connected with
            your friends, family, and colleagues effortlessly.
          </p>
        </div>
      </div>
    </>
  );
}
