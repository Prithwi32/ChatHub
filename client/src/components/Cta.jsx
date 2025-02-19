import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CTA() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="bg-white dark:bg-gray-900 dark:text-white md:p-[3rem] md:border-4 md:shadow-lg rounded-[1rem] md:w-[50%] flex flex-col justify-center items-center m-auto mb-[2rem] w-full border-0 shadow-none p-[1rem]"
    >
      <h3 className="text-center m-[3rem] mt-[5rem] text-[#EA6A49] dark:text-[#FC9F88] text-4xl font-bold underline">
        Join the Chat Community
      </h3>
      <div
        className="bg-gradient-to-br from-[#C9E1CD] to-[#4ABEBD] dark:from-gray-800 dark:to-gray-700 mb-[8rem] rounded-[2rem] p-[2rem] text-center"
        data-aos="fade-up"
      >
        <h6 className="dark:text-gray-200 mb-4">
          Secure and instant messaging at your fingertips.
        </h6>
        <button
          className="mt-6 px-6 py-3 bg-gradient-to-br from-[#fc9f88] to-[#EA6A49] hover:from-[#EA6A49] hover:to-[#fc9f88] text-white rounded-lg transition duration-300"
          onClick={() => navigate("/sign-up")}
        >
          Sign Up Now
        </button>
      </div>
    </div>
  );
}
