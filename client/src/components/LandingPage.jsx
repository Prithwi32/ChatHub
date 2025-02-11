import { useNavigate } from "react-router-dom";
import Features from "./Features";
import ChooseUs from "./ChooseUs";
import GroupImage from '../images/Group.png';
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
    <div data-aos="fade-up" className="bg-gradient-to-br from-[#C9E1CD] to-[#4ABEBD] min-h-[600px] flex items-center justify-center text-black">
        <div data-aos="fade-right" className="w-[50%]">
            <h1 className="text-4xl font-extrabold">Seamless Chat, Anytime, Anywhere</h1>
            <p className="text-lg mt-4">Stay connected with your friends, family, and colleagues in real-time with our secure and user-friendly chat platform. Experience fast, reliable, and private messaging like never before.</p>
            <button data-aos="fade-left" className="mt-6 px-6 py-3 bg-gradient-to-br from-[#fc9f88] to-[#EA6A49] hover:from-[#EA6A49] hover:to-[#fc9f88] text-white rounded-lg"
                onClick={() => navigate("/chat")}>
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
    <CTA onClick={() => navigate("/cta")} />
    </>
  );
}

