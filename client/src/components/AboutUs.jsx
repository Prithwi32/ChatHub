import AboutUsImage from '../images/About-Us.png';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutUs() {
        useEffect(() => {
          AOS.init({ duration: 1000, once: true });
        }, []);
    return (
        <>
        <div data-aos="fade-right" className="bg-white p-[3rem] flex flex-col justify-center items-center ">
        <h3 data-aos="fade-up" className="text-center m-[1rem] underline text-[#EA6A49] text-4xl font-bold">About Us</h3>
        <div data-aos="fade-down" className="flex m-[3rem]">
            <img data-aos="fade-right" className="w-[50%] h-[400px] m-auto" src={AboutUsImage} alt="" />
            <p data-aos="fade-left" className="m-[4rem] p-[5rem] text-gray-600 text-xl w-[50%]">
          Our chat application provides a seamless communication experience with top-tier security and 
          real-time messaging. Stay connected with your friends, family, and colleagues effortlessly.
        </p>
        </div>
        
      </div>
        </>
    );
}