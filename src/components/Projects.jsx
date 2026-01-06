/** @format */

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiNextdotjs,
} from "react-icons/si";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform with advanced features including real-time inventory, payment processing, and admin dashboard.",
    image: "/src/assets/img/project-img1.png",
    tech: [FaReact, SiTypescript, SiTailwindcss, FaNodeJs],
    github: "#",
    live: "#",
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates, team collaboration, and project tracking.",
    image: "/src/assets/img/project-img2.png",
    tech: [SiNextdotjs, SiTypescript, SiMongodb, SiTailwindcss],
    github: "#",
    live: "#",
    category: "Web App",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A responsive portfolio website showcasing modern design principles and smooth animations.",
    image: "/src/assets/img/project-img3.png",
    tech: [FaReact, SiTailwindcss, SiTypescript],
    github: "#",
    live: "#",
    category: "Frontend",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "Real-time weather application with location services, forecasts, and interactive maps.",
    image: "/src/assets/img/project-img4.png",
    tech: [FaReact, SiTypescript, SiTailwindcss],
    github: "#",
    live: "#",
    category: "Frontend",
  },
  {
    id: 5,
    title: "Social Media API",
    description:
      "RESTful API for social media platform with authentication, posts, comments, and real-time messaging.",
    image: "/src/assets/img/project-img5.png",
    tech: [FaNodeJs, SiMongodb, SiTypescript],
    github: "#",
    live: "#",
    category: "Backend",
  },
  {
    id: 6,
    title: "Chat Application",
    description:
      "Real-time chat application with multiple rooms, file sharing, and user presence indicators.",
    image: "/src/assets/img/project-img6.png",
    tech: [FaReact, FaNodeJs, SiMongodb, SiTailwindcss],
    github: "#",
    live: "#",
    category: "Full Stack",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const projectVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="w-full py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
            whileInView={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Featured Projects
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of my recent work, featuring modern web applications and
            innovative solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Overlay buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                  >
                    <FaGithub className="text-white text-xl" />
                  </motion.a>
                  <motion.a
                    href={project.live}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                  >
                    <FaExternalLinkAlt className="text-white text-xl" />
                  </motion.a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 rounded-full mb-3">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex items-center gap-3 mb-4">
                  {project.tech.map((TechIcon, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-300"
                    >
                      <TechIcon className="text-lg text-blue-300" />
                    </motion.div>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors duration-300 text-center"
                  >
                    Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300 text-center"
                  >
                    Live Demo
                  </motion.a>
                </div>
              </div>

              {/* Floating indicator */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: project.id * 0.2,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
          >
            View More Projects
            <FaExternalLinkAlt className="text-sm" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
