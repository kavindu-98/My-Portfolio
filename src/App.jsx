/** @format */

import React from "react";
import Hero3D from "./components/Hero3D";
import About from "./components/About";
import SkillsModern from "./components/SkillsModern";
import ProjectsModernNew from "./components/ProjectsModernNew";
import Experience from "./components/Experience";
import ContactModern from "./components/ContactModern";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="w-full overflow-x-hidden bg-gradient-dark">
      {/* Hero Section with 3D */}
      <Hero3D />

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <SkillsModern />

      {/* Projects Section */}
      <ProjectsModernNew />

      {/* Experience Section */}
      <Experience />

      {/* Contact Section */}
      <ContactModern />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}

export default App;
