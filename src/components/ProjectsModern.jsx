/** @format */

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Card3D, ScrollReveal } from "./AnimationComponents";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform with advanced features including real-time inventory, payment processing, and admin dashboard.",
    image: "/src/assets/img/project-img1.png",
    tags: ["React", "Node.js", "Tailwind CSS"],
    github: "#",
    live: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates, team collaboration, and project tracking.",
    image: "/src/assets/img/project-img2.png",
    tags: ["Next.js", "TypeScript", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A responsive portfolio website showcasing modern design principles and smooth animations.",
    image: "/src/assets/img/project-img3.png",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    github: "#",
    live: "#",
  },
];

const ProjectsModern = () => {
  return (
    <section
      id="projects"
      className="w-full py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A showcase of my recent work featuring modern web applications
              with scroll animations and glassmorphism effects
            </p>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card3D
              key={project.id}
              className="overflow-hidden group rounded-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg text-white hover:glass-effect-strong transition-all"
                    >
                      <FaGithub size={18} />
                      GitHub
                    </motion.a>
                    <motion.a
                      href={project.live}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 gradient-bg-1 rounded-lg text-white hover:glow-effect transition-all"
                    >
                      <FaExternalLinkAlt size={18} />
                      Live
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </Card3D>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal>
          <div className="text-center mt-20">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 gradient-bg-1 text-white font-semibold rounded-full hover:glow-effect transition-all"
            >
              View More Projects
              <span>→</span>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProjectsModern;
