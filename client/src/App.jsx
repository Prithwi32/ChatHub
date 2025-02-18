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

export default function App() {
  return (
    // <Router>
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route path="/features" element={<Features />} />
        <Route path="/chooseus" element={<ChooseUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/cta" element={<CTA />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </>

    // </Router>
  );
}
