import AboutUsImage from "../assets/images/About-Us.png";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutUs() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div
        data-aos="fade-right"
        className="bg-white dark:bg-gray-900 p-[3rem] flex flex-col justify-center items-center"
      >
        <h3
          data-aos="fade-up"
          className="text-center m-[1rem] underline text-[#EA6A49] dark:text-[#fc9f88] text-4xl font-bold"
        >
          About Us
        </h3>
        <div
          data-aos="fade-down"
          className="flex m-[3rem] flex-col md:flex-row"
        >
          <img
            data-aos="fade-right"
            className="md:w-[50%] h-[400px] m-auto w-[80%]"
            src={AboutUsImage}
            alt="About"
          />
          <p
            data-aos="fade-left"
            className="lg:m-[4rem] lg:p-[5rem] text-gray-600 dark:text-gray-300 text-2xl lg:w-[50%] w-full text-center p-[1rem] ml-[2rem] mt-[3rem] md:text-left"
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
