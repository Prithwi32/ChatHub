import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2b7372] text-white py-10 px-6 w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <h5 className="text-[2.5rem] font-bold">ChatHub.</h5>

        <div className="flex-1 grid grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-[#F07B5E]">About Us</a>
            <a href="#" className="hover:text-[#F07B5E]">What We Do</a>
            <a href="#" className="hover:text-[#F07B5E]">FAQ</a>
          </div>
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-[#F07B5E]">Career</a>
            <a href="#" className="hover:text-[#F07B5E]">Blog</a>
            <a href="#" className="hover:text-[#F07B5E]">Contact Us</a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6">
          <a href="#" className="p-2 bg-[#4ABEBD] hover:bg-[#F07B5E] rounded-full m-auto">
            <FaFacebookF className=" w-5 h-5" />
          </a>
          <a href="#" className="p-2 bg-[#4ABEBD] hover:bg-[#F07B5E] rounded-full m-auto">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 bg-[#4ABEBD] hover:bg-[#F07B5E] rounded-full m-auto">
            <FaInstagram className="w-5 h-5" />
          </a>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="text-center mt-10 text-[#4ABEBD]">
        &copy; {new Date().getFullYear()} ChatHub. All rights reserved.
      </div>
    </footer>
  );
}
