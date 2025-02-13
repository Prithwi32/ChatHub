import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ChatRoom from "./components/ChatRoom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Features from "./components/Features";
import ChooseUs from "./components/ChooseUs";
import AboutUs from "./components/AboutUs";
import CTA from "./components/Cta";

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
          <Route path="/cta" element={<CTA />} />
      </Routes>
      <Footer />
    </>
    
  // </Router>
  );
}

