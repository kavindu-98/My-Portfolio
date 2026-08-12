/** @format */

import React from "react";
import Hero3D from "./components/Hero3D";
import About from "./components/About";
import SkillsModern from "./components/SkillsModern";
import ProjectsModernNew from "./components/ProjectsModernNew";
import Experience from "./components/Experience";
import ContactModern from "./components/ContactModern";

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

      {/* Footer */}
      <footer className="relative w-full py-12 bg-slate-950 border-t border-purple-500/20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white">Kavindu Abeykoon</h3>
              <p className="text-gray-400 mt-1">Full Stack Developer</p>
              <p className="text-gray-500 text-sm mt-2">kavinduumayanga058@gmail.com</p>
            </div>

            <div className="text-center text-gray-400">
              <p>
                © {new Date().getFullYear()} All rights reserved. Made with ❤️
              </p>
            </div>

            <div className="flex gap-6">
              {[
                { name: "GitHub", icon: "🐙", url: "https://github.com/kavindu-98" },
                { name: "LinkedIn", icon: "💼", url: "https://www.linkedin.com/in/kavindu-abeykoon" },
                { name: "Website", icon: "🌐", url: "https://www.kavinduabeykoondev.com" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                  title={social.name}
                >
                  <span className="text-2xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
