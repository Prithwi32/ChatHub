import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import FAQ from "../pages/Faq";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#2b7372] dark:bg-gray-800 text-white py-10 px-6 w-full static bottom-0">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <h5 className="text-[2.5rem] font-bold">ChatHub.</h5>

        <div className="flex-1 grid grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:cursor-default">
              <span className="hover:text-[#F07B5E] dark:hover:text-gray-300 hover:cursor-pointer">About Us</span>
            </a>
            <a href="#" className="hover:cursor-default">
              <span className="hover:text-[#F07B5E] dark:hover:text-gray-300 hover:cursor-pointer">What We Do</span>
            </a>
            <a onClick={() => navigate("/faq")} className="hover:text-[#F07B5E] dark:hover:text-gray-300 cursor-pointer">
              FAQ
              </a>
            <a href="#" className="hover:cursor-default">
              <span className="hover:text-[#F07B5E] dark:hover:text-gray-300 hover:cursor-pointer">FAQ</span>   

            </a>
          </div>
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:cursor-default">
              <span className="hover:text-[#F07B5E] dark:hover:text-gray-300 hover:cursor-pointer">Career</span>  
            </a>
            <a href="#" className="hover:cursor-default">
              <span className="hover:text-[#F07B5E] dark:hover:text-gray-300 hover:cursor-pointer">Blog</span> 
            </a>
            <a href="/contact" className="hover:cursor-default">
              <span className="hover:text-[#F07B5E] dark:hover:text-gray-300 hover:cursor-pointer">Contact Us</span>
            </a>
          </div>
        </div>

        <div className="flex gap-6">
          <a
            href="#"
            className="p-2 bg-[#4ABEBD] hover:bg-[#F07B5E] dark:bg-gray-600 dark:hover:bg-gray-500 rounded-full m-auto"
          >
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="p-2 bg-[#4ABEBD] hover:bg-[#F07B5E] dark:bg-gray-600 dark:hover:bg-gray-500 rounded-full m-auto"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="p-2 bg-[#4ABEBD] hover:bg-[#F07B5E] dark:bg-gray-600 dark:hover:bg-gray-500 rounded-full m-auto"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="text-center mt-10 text-[#4ABEBD] dark:text-gray-300">
        &copy; {new Date().getFullYear()} ChatHub. All rights reserved.
      </div>
    </footer>
  );
}
