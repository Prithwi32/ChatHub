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
        <>
            <div
                data-aos="fade-up"
                className="bg-white p-[3rem] border-4 shadow-lg rounded-[1rem] w-[50%] flex flex-col justify-center items-center m-auto "
            >
                <h3 className="text-center m-[3rem] underline text-[#EA6A49] text-4xl font-bold">
                    Call-to-Action (CTA)
                </h3>
                <div
                    className="bg-gradient-to-br from-[#C9E1CD] to-[#4ABEBD] rounded-[2rem] p-[2rem] text-center"
                    data-aos="fade-up"
                >
                    <h6>
                        Join thousands of users already enjoying secure and instant
                        messaging.
                    </h6>
                    <button
                        className="mt-6 px-6 py-3 bg-gradient-to-br from-[#fc9f88] to-[#EA6A49] hover:from-[#EA6A49] hover:to-[#fc9f88] text-white rounded-lg"
                        onClick={() => navigate("/sign-up")}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </>
    );
}
