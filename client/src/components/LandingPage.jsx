import { useNavigate } from "react-router-dom";
import Features from "./Features";
import ChooseUs from "./ChooseUs";
import GroupImage from "../assets/images/Group.png";
import AboutUs from "./AboutUs";
import CTA from "./Cta";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div
        data-aos="fade-up"
        className="bg-gradient-to-br from-indigo-500 to-purple-700 dark:from-indigo-900 dark:to-purple-800 min-h-[600px] flex items-center justify-center text-white flex-col md:flex-row"
      >
        <div
          data-aos="fade-right"
          className="md:w-[50%] p-[2rem] w-[90%] mt-[4rem] md:mt-[2rem] text-center md:text-left"
        >
          <h1 className="text-5xl font-extrabold leading-tight">
            Seamless Chat, Anytime, Anywhere
          </h1>
          <p className="text-lg mt-4 text-gray-200">
            Connect with your community through secure, fast, and intuitive messaging. Join us for a seamless chatting experience!
          </p>
          <button
            data-aos="fade-left"
            className="mt-6 px-8 py-3 bg-gradient-to-br from-[#fc9f88] to-[#EA6A49] hover:from-[#EA6A49] hover:to-[#fc9f88] text-white rounded-lg shadow-md transition duration-300"
            onClick={() => navigate("/chat")}
          >
            Join Chat Room
          </button>
        </div>
        <div data-aos="fade-left" className="w-[50%]">
          <img className="m-auto w-[80%] md:w-[600px]" src={GroupImage} alt="Group" />
        </div>
      </div>
      <Features onClick={() => navigate("/features")} />
      <ChooseUs onClick={() => navigate("/chooseus")} />
      <AboutUs onClick={() => navigate("/about")} />
      <CTA onClick={() => navigate("/cta")} />
    </>
  );
}
