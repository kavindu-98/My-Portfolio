/** @format */

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import gsap from "gsap";

const Contact = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const infoRef = useRef([]);
  const buttonRef = useRef(null);

  const formRef = useRef(null);

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "kavindu@example.com",
      link: "mailto:kavindu@example.com",
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+94 123 456 789",
      link: "tel:+94123456789",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      value: "Colombo, Sri Lanka",
      link: "#",
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
  ];

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power2.out",
      });

      infoRef.current.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          delay: i * 0.2,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      // Animate submit button
      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        delay: 1,
        duration: 1,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (simulate)");
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 p-8 flex items-center justify-center overflow-hidden"
    >
      {/* Overlay for animated background dots or subtle effects */}
      <div className="absolute inset-0 z-0">
        {/* Optional: Add animated dots or waves here */}
      </div>

      <div className="relative z-10 max-w-7xl w-full grid md:grid-cols-2 gap-8 p-4 bg-white/70 backdrop-blur-lg rounded-xl shadow-xl">
        {/* Left: Info & Social */}
        <div
          className="flex flex-col justify-center space-y-8 px-4"
          aria-hidden="true"
        >
          {/* Header */}
          <h2
            ref={headerRef}
            className="text-4xl md:text-5xl font-bold text-green-700 mb-4 text-center md:text-left"
          >
            Let's Get in Touch
          </h2>
          {/* Description */}
          <p className="text-gray-700 text-center md:text-left max-w-md mx-auto md:mx-0">
            Interested in collaborating? Reach out and let’s create something
            great together!
          </p>
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <a
                key={i}
                href={info.link}
                ref={(el) => (infoRef.current[i] = el)}
                className="flex items-center p-4 bg-green-50 border-2 border-green-300 rounded-xl shadow-md hover:scale-105 hover:bg-green-100 transition-transform transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-green-300 rounded-full text-white shadow-lg">
                  <info.icon className="text-xl" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-green-700">{info.title}</h4>
                  <p className="text-gray-600">{info.value}</p>
                </div>
              </a>
            ))}
          </div>
          {/* Social Links */}
          <div className="flex gap-4 justify-center md:justify-start mt-6">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="p-3 bg-green-50 border-2 border-green-300 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="text-xl text-green-600" />
              </a>
            ))}
          </div>
        </div>

        {/* Right: Contact Form */}
        <div
          ref={formRef}
          className="px-4 py-8 bg-green-50 rounded-xl shadow-lg backdrop-blur-lg"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
            autoComplete="off"
          >
            <h3 className="text-3xl font-semibold text-green-700 mb-4 text-center md:text-left">
              Send a Message
            </h3>
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
            {/* Subject */}
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {/* Message */}
            <textarea
              placeholder="Your Message..."
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
            />
            {/* Submit Button */}
            <motion.button
              ref={buttonRef}
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="mt-4 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:from-green-500 hover:to-green-700 transition"
            >
              Send Message hhhhhh
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
