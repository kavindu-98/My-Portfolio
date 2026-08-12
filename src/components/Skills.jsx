/** @format */

import React from "react";
import { motion } from "framer-motion";
import SkillsBannerAdvanced from "./SkillsBannerAdvanced";
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaLinux,
  FaGoogle,
  FaLock,
  FaCubes,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiRedux,
  SiExpress,
  SiJira,
  SiJsonwebtokens,
} from "react-icons/si";

const skillsCategories = [
  {
    category: "Front-End Development",
    gradient: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", icon: FaReact, color: "text-blue-500" },
      {
        name: "Next.js",
        icon: SiNextdotjs,
        color: "text-black dark:text-white",
      },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-500" },
      { name: "HTML5", icon: FaHtml5, color: "text-orange-600" },
      { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
      { name: "JavaScript", icon: FaJs, color: "text-yellow-500" },
    ],
  },
  {
    category: "State Management",
    gradient: "from-purple-500 to-pink-500",
    skills: [
      { name: "Redux", icon: SiRedux, color: "text-purple-600" },
      { name: "Zustand", icon: FaCubes, color: "text-orange-500" },
    ],
  },
  {
    category: "Back-End Development",
    gradient: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "text-green-500" },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "text-gray-700 dark:text-gray-300",
      },
    ],
  },
  {
    category: "Database Management",
    gradient: "from-orange-500 to-red-500",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "text-blue-600" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
    ],
  },
  {
    category: "Cloud & DevOps",
    gradient: "from-indigo-500 to-purple-500",
    skills: [
      { name: "AWS", icon: FaAws, color: "text-orange-500" },
      { name: "Google Cloud", icon: FaGoogle, color: "text-blue-500" },
      { name: "Docker", icon: FaDocker, color: "text-blue-500" },
    ],
  },
  {
    category: "Others",
    gradient: "from-gray-600 to-gray-800",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
      { name: "Jira", icon: SiJira, color: "text-blue-600" },
      { name: "OAuth", icon: FaLock, color: "text-red-500" },
      { name: "JWT", icon: SiJsonwebtokens, color: "text-purple-600" },
      { name: "Linux", icon: FaLinux, color: "text-gray-700 dark:text-white" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const Skills = () => {
  return (
    <section
      id="skills"
      data-section="about"
      className="w-full py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-300"
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
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            whileInView={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Technical Skills
          </motion.h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise across different
            domains
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {skillsCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={categoryVariants}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Category Card */}
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50">
                {/* Gradient Border Animation */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}
                />

                {/* Category Header */}
                <motion.div className="mb-6" whileHover={{ scale: 1.02 }}>
                  <h3
                    className={`text-2xl font-bold mb-2 bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}
                  >
                    {category.category}
                  </h3>
                  <div
                    className={`h-1 w-20 bg-gradient-to-r ${category.gradient} rounded-full`}
                  />
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      variants={skillVariants}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="relative group/skill"
                    >
                      <div className="flex flex-col items-center p-4 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                        {/* Icon with glow effect */}
                        <div className="relative mb-3">
                          <div
                            className={`absolute inset-0 ${skill.color} opacity-20 blur-lg group-hover/skill:opacity-40 transition-opacity duration-300`}
                          />
                          <skill.icon
                            className={`relative text-3xl ${skill.color} group-hover/skill:scale-110 transition-transform duration-300`}
                          />
                        </div>

                        {/* Skill Name */}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center group-hover/skill:text-gray-900 dark:group-hover/skill:text-white transition-colors duration-300">
                          {skill.name}
                        </span>

                        {/* Hover Tooltip */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded-md opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10"
                        >
                          {skill.name}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-100" />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r ${category.gradient} rounded-full opacity-60`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: categoryIndex * 0.3,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-lg opacity-30"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
            <p className="relative bg-white dark:bg-gray-800 px-8 py-4 rounded-lg shadow-lg text-lg text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              Continuously learning and adapting to emerging technologies in the
              ever-evolving tech landscape
            </p>
          </div>
        </motion.div>

        {/* Animated Skills Banner */}
        <SkillsBannerAdvanced
          skills={[
            "Web Design",
            "Digital Marketing",
            "Branding",
            "Website Marketing",
            "Apps Design",
            "SEO",
            "Development",
            "UI/UX Design",
            "Full Stack",
            "Cloud Solutions",
            "Database Design",
            "Backend Development",
          ]}
        />
      </div>
    </section>
  );
};

export default Skills;
