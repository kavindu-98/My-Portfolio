/** @format */

import React, { useEffect, useRef, useState } from "react";
import { animateInOnScroll, createGlowPulse } from "../utils/gsapAnimations";
import gsap from "gsap";

const ProjectCard3D = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      animateInOnScroll(cardRef.current, index * 0.1);
      createGlowPulse(cardRef.current);
    }
  }, [index]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * 10;
    const rotateY = ((rect.width / 2 - x) / rect.width) * 10;

    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
    });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer h-96"
      style={{
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* 3D Card Container */}
      <div
        className="relative w-full h-full rounded-2xl border border-purple-500/30 bg-gradient-to-br from-slate-800/50 via-slate-900/80 to-slate-950 backdrop-blur-xl overflow-hidden transition-all duration-500"
        style={{
          transform: isHovered
            ? "translateZ(20px) scale(1.05)"
            : "translateZ(0) scale(1)",
        }}
      >
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative h-full p-8 flex flex-col justify-between">
          {/* Tag */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-gray-400 line-clamp-2">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded bg-slate-700/50 text-gray-300 border border-slate-600/50"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-xs px-2 py-1 rounded bg-slate-700/50 text-gray-300 border border-slate-600/50">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 inline-block text-center"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const projects = [
    {
      title: "Property Management & Restaurant App",
      description:
        "SaaS-based platform for restaurant table management and tenant operations with real-time order synchronization",
      category: "SaaS",
      tech: [
        "React",
        "Vite",
        "Node.js",
        "MySQL",
        "WebSocket",
        "Payment Gateway",
      ],
      github: "https://github.com/kavindu-98",
      client: "Talentfort (Pvt) Ltd",
    },
    {
      title: "Human Resource Information System (HRIS)",
      description:
        "Complete employee management platform with attendance, leave, and automated payroll generation",
      category: "Enterprise",
      tech: ["React", "Vite", "Node.js", "MySQL", "JWT", "RESTful APIs"],
      github: "https://github.com/kavindu-98",
      client: "Talentfort (Pvt) Ltd",
    },
    {
      title: "Travel Agency Portal",
      description:
        "Full-stack booking system with Google APIs integration for geolocation, maps, and dynamic data",
      category: "Web App",
      tech: ["Next.js", "TypeScript", "Tailwind", "Redux", "Express", "AWS"],
      github: "https://github.com/kavindu-98",
      client: "Talentfort (Pvt) Ltd",
    },
    {
      title: "Enterprise ERP System",
      description:
        "Scalable web-based ERP with POS, Inventory, Manufacturing, Supply Chain, Finance & HRM modules",
      category: "Enterprise",
      tech: [
        "React.js",
        "Tailwind CSS",
        "SQL",
        "Node.js",
        "Express",
        "MongoDB",
      ],
      github: "https://github.com/kavindu-98",
      client: "Talentfort (Pvt) Ltd",
    },
    {
      title: "Freelance Web Development",
      description:
        "Custom web projects including Sandakada Pahana Concert and Gate of Heaven Hiriketiya websites",
      category: "Web Design",
      tech: ["React", "Vite", "Node.js", "Tailwind CSS"],
      github: "https://github.com/kavindu-98",
      freelance: true,
    },
    {
      title: "Microsoft Dynamics ERP Solutions",
      description:
        "Customized Business Central implementations with AL, PowerApps, and PowerAutomate low-code solutions",
      category: "Enterprise",
      tech: [
        "Microsoft Dynamics 365",
        "AL",
        "PowerApps",
        "PowerAutomate",
        "Azure DevOps",
      ],
      github: "https://github.com/kavindu-98",
      client: "SRIQ Corporation (Pvt) Ltd",
    },
  ];

  useEffect(() => {
    if (titleRef.current) {
      animateInOnScroll(titleRef.current);
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              Featured Work
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mt-6 leading-tight">
            Exceptional
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard3D key={index} project={project} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/kavindu-98"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
