import { RouteObject } from "react-router-dom";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import About from "@/pages/About";
import FAQ from "@/pages/FAQ";
import Testimonials from "@/pages/Testimonials";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

export const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/proyectos", element: <Projects /> },
  { path: "/proyectos/:slug", element: <ProjectDetail /> },
  { path: "/nosotros", element: <About /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/testimonios", element: <Testimonials /> },
  { path: "/contacto", element: <Contact /> },
  { path: "/not-found", element: <NotFound /> },
  { path: "*", element: <NotFound /> },
];
