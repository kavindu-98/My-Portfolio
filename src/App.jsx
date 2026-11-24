/** @format */

import React, { useEffect } from "react";
import Hero3D from "./components/Hero3D";
import About from "./components/About";
import SkillsModern from "./components/SkillsModern";
import ProjectsModernNew from "./components/ProjectsModernNew";
import Experience from "./components/Experience";
import ContactModern from "./components/ContactModern";
import Footer from "./components/Footer";

import { refreshScrollTriggersOnce } from "./utils/gsapAnimations";

function App() {
  useEffect(() => {
    refreshScrollTriggersOnce();
  }, []);

  return (
    <>
      <Hero3D />
      <About />
      <SkillsModern />
      <ProjectsModernNew />
      <Experience />
      <ContactModern />
      <Footer />
    </>
  );
}

export default App;
