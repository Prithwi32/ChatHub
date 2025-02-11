import EncryptionImage from "../assets/images/Encryption.png";
import MessagingImage from "../assets/images/Messaging.png";
import MultiDeviceImage from "../assets/images/Multi-Device.png";
import GroupChatImage from "../assets/images/Group-Chat.png";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Features() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <>
      <div data-aos="fade-up" className="bg-white min-h-[600px] p-[3rem]">
        <h3
          data-aos="fade-up"
          className="text-center m-[3rem] underline text-[#EA6A49] text-4xl font-bold"
        >
          Features
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 m-[1.2rem]">
          <div
            data-aos="fade-down"
            className="bg-gradient-to-br from-[#C9E1CD] to-[#4ABEBD] rounded-[2rem] p-[2rem] text-center"
          >
            <img
              className="m-auto w-[200px]"
              src={MessagingImage}
              alt="Messaging"
            />
            <h6 className="text-lg font-bold m-[1rem]">Real-Time Messaging</h6>
            <p>Chat instantly with friends and colleagues without delays.</p>
          </div>
          <div
            data-aos="fade-up"
            className="bg-gradient-to-br from-[#C9E1CD] to-[#4ABEBD] rounded-[2rem] p-[2rem] text-center"
          >
            <img
              className="m-auto w-[200px]"
              src={EncryptionImage}
              alt="Encryption"
            />
            <h6 className="text-lg font-bold m-[1rem]">
              End-to-End Encryption
            </h6>
            <p>
              Your conversations are private and secure, ensuring complete
              confidentiality.
            </p>
          </div>
          <div
            data-aos="fade-down"
            className="bg-gradient-to-br from-[#C9E1CD] to-[#4ABEBD] rounded-[2rem] p-[2rem] text-center"
          >
            <img
              className="m-auto w-[200px]"
              src={MultiDeviceImage}
              alt="MultiDevice"
            />
            <h6 className="text-lg font-bold m-[1rem]">Multi-Device Support</h6>
            <p>
              Access your chats from your phone, tablet, or desktop seamlessly.
            </p>
          </div>
          <div
            data-aos="fade-up"
            className="bg-gradient-to-br from-[#C9E1CD] to-[#4ABEBD] rounded-[2rem] p-[2rem] text-center"
          >
            <img
              className="m-auto w-[200px]"
              src={GroupChatImage}
              alt="GroupChat"
            />
            <h6 className="text-lg font-bold m-[1rem]">
              Group Chats & Media Sharing
            </h6>
            <p>
              Stay connected with your community by sharing images, videos, and
              documents.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
