import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Events from "../pages/Events";
import Webinars from "../pages/Webinars";
import Contact from "../pages/Contact";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<About />} />
      <Route path="/events" element={<Events />} />
      <Route path="/webinars" element={<Webinars />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
