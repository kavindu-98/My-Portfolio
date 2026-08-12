/** @format */

import React from "react";
import { motion } from "framer-motion";

/**
 * Full-Width X-Crossing Skills Banner
 * Two diagonal lines crossing in the middle with opposite directions
 */
const SkillsBannerAdvanced = ({ skills = [] }) => {
  const defaultSkills = [
    "Web Design",
    "Digital Marketing",
    "Branding",
    "Website Marketing",
    "Apps Design",
    "SEO",
    "Development",
    "UI/UX Design",
  ];

  const skillsList = skills.length > 0 ? skills : defaultSkills;
  // Create continuous text line instead of repeated array
  const skillsText = [...skillsList, ...skillsList, ...skillsList].join(
    "          ★          ",
  );

  return (
    <div className="w-screen -mx-[calc((100vw-100%)/2)] relative h-[600px] overflow-hidden">
      {/* LINE 1: PRIMARY COLOR - Bottom Left to Top Right (/) - Moving Left */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%) rotateZ(10deg)",
          transformOrigin: "center",
          width: "100%",
          whiteSpace: "nowrap",
        }}
        animate={{ x: [0, -1200] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="inline-flex px-16 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xl rounded-full shadow-2xl whitespace-nowrap">
          {skillsText}

          <span>✦</span>
        </div>
      </motion.div>

      {/* LINE 2: PRIMARY COLOR - Top Left to Bottom Right (\) - Moving Right */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%) rotateZ(-10deg)",
          transformOrigin: "center",
          width: "100%",
          whiteSpace: "nowrap",
        }}
        animate={{ x: [-1200, 0] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="inline-flex px-16 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-xl rounded-full shadow-2xl whitespace-nowrap">
          {skillsText}
          <span>✦</span>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsBannerAdvanced;
