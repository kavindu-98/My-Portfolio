/** @format */

import React, { useEffect, useRef } from "react";
import { animateInOnScroll, staggerAnimateIn } from "../utils/gsapAnimations";

const Experience = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  const experiences = [
    {
      role: "Software Engineer",
      company: "Talentfort (Pvt) Ltd.",
      period: "October 2025 - Present",
      description:
        "Leading MERN stack architecture and refactoring enterprise systems. Mentoring junior developers and driving quality standards through code reviews.",
      highlights: [
        "Led MERN stack architecture optimization across Property Management & ERP systems",
        "Implemented OAuth/JWT security and third-party API integrations (Payment, Geolocation)",
        "Mentored junior developers on Next.js, TypeScript, and React patterns",
        "Improved operational efficiency by 50% through system optimization",
      ],
    },
    {
      role: "Associate Software Engineer",
      company: "Talentfort (Pvt) Ltd.",
      period: "July 2024 - October 2025",
      description:
        "Developed full-stack MERN applications for enterprise clients across various domains including ERP, HRIS, POS, and management systems.",
      highlights: [
        "Built scalable front-end architectures with React.js optimizing component reusability",
        "Reduced page load times through performance optimization and lazy loading",
        "Integrated OAuth, JWT, Payment Gateways, and Geolocation APIs",
        "Conducted peer code reviews and mentored junior developers on modern frameworks",
      ],
    },
    {
      role: "Associate Technical Consultant",
      company: "SRIQ Corporation (Pvt) Limited",
      period: "March 2023 - January 2024",
      description:
        "Customized ERP solutions using Microsoft Dynamics 365 Business Central with AL and PowerPlatform tools.",
      highlights: [
        "Developed customized ERP solutions using AL for Microsoft Dynamics 365 Business Central",
        "Built low-code solutions using PowerApps and PowerAutomate",
        "Collaborated with clients to gather requirements and implement enhancements",
        "Leveraged Azure DevOps for source control, CI/CD, and backlog management",
      ],
    },
    {
      role: "Technical Consultant Intern",
      company: "SRIQ Corporation (Pvt) Limited",
      period: "September 2022 - March 2023",
      description:
        "Gained hands-on experience customizing Microsoft Dynamics 365 Business Central and exploring low-code solutions.",
      highlights: [
        "Customized Microsoft Dynamics 365 Business Central using AL",
        "Explored PowerPlatform tools for low-code business solutions",
        "Applied ERP knowledge to implement customizations and developer testing",
        "Worked with Azure DevOps for version control and task management",
      ],
    },
  ];

  useEffect(() => {
    if (titleRef.current) {
      animateInOnScroll(titleRef.current);
    }
    staggerAnimateIn(".experience-item", 0.1);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-10 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-10 animate-pulse" />
        <div className="absolute -bottom-40 left-10 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              My Journey
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mt-6 leading-tight">
            Professional
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent" />

          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="experience-item ml-8 p-6 rounded-lg border border-purple-500/30 bg-gradient-to-r from-slate-800/40 to-slate-900/40 hover:border-purple-500/60 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/20"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-8 w-4 h-4 -ml-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 border-4 border-slate-950" />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-indigo-400 font-semibold">{exp.company}</p>
                </div>
                <span className="text-sm font-semibold text-gray-400 mt-2 md:mt-0">
                  {exp.period}
                </span>
              </div>

              <p className="text-gray-400 mb-4">{exp.description}</p>

              <ul className="space-y-2">
                {exp.highlights.map((highlight, hidx) => (
                  <li
                    key={hidx}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="inline-block w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex-shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
