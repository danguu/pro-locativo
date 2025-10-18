import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/proyectos" element={<Projects />} />
    <Route path="/proyectos/:slug" element={<ProjectDetail />} />
    <Route path="/nosotros" element={<About />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/testimonios" element={<Testimonials />} />
    <Route path="/contacto" element={<Contact />} />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
