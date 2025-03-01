import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ChatRoom from "./components/ChatRoom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Features from "./components/Features";
import ChooseUs from "./components/ChooseUs";
import AboutUs from "./components/AboutUs";
import CTA from "./components/Cta";
import ContactForm from "./components/Contact";
import UserProfile from "./pages/UserProfile";
import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";
import FAQ from "./pages/Faq";
import SignUp from "./components/Signup";
import Login from "./components/Login";

export default function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollY / documentHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    // <Router>
    <>
      <LoadingBar color="#55C1BE" progress={progress} height={4} />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/features" element={<Features />} />
        <Route path="/chooseus" element={<ChooseUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cta" element={<CTA />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </>

    // </Router>
  );
}
