import { useNavigate } from "react-router-dom";
import Features from "./Features";
import ChooseUs from "./ChooseUs";
import GroupImage from "../assets/images/Group.png";
import AboutUs from "./AboutUs";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        data-aos="fade-up"
        className="bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-700 min-h-[600px] flex items-center justify-center dark:text-white text-black flex-col md:flex-row"
      >
        <div
          data-aos="fade-right"
          className="md:w-[50%] p-[2rem] w-[90%] mt-[4rem] md:mt-[2rem] text-center md:text-left"
        >
          <h1 className="text-4xl font-extrabold dark:text-white">
            Seamless Chat, Anytime, Anywhere
          </h1>
          <p className="text-lg mt-4 dark:text-gray-300">
            Stay connected with your friends, family, and colleagues in
            real-time with our secure and user-friendly chat platform.
            Experience fast, reliable, and private messaging like never before.
          </p>
          <button
            data-aos="fade-left"
            className="mt-6 px-6 py-3 bg-gradient-to-br from-[#fc9f88] to-[#EA6A49] hover:from-[#EA6A49] hover:to-[#fc9f88] text-white rounded-lg"
            onClick={() => navigate("/chat")}
          >
            Join Chat Room
          </button>
        </div>
        <div data-aos="fade-left" className="width-[50%]">
          <img className="m-auto w-[600px]" src={GroupImage} alt="Group" />
        </div>
      </div>
      <Features onClick={() => navigate("/features")} />
      <ChooseUs onClick={() => navigate("/chooseus")} />
      <AboutUs onClick={() => navigate("/about")} />

      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#EA6A49] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#fc9f88] transition duration-300"
        >
          &#8679;
        </button>
      )}
    </>
  );
}
