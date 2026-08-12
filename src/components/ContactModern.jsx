/** @format */

import React, { useEffect, useRef } from "react";
import { animateInOnScroll } from "../utils/gsapAnimations";

const Contact = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      animateInOnScroll(titleRef.current);
    }
    if (formRef.current) {
      animateInOnScroll(formRef.current, 0.1);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-10 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 animate-pulse" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-block">
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              Get In Touch
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mt-6 leading-tight">
            Let's Work
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and create something
            amazing together.
          </p>
        </div>

        {/* Contact Form */}
        <div
          ref={formRef}
          className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-slate-950/80 backdrop-blur-xl p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500/60 focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500/60 focus:outline-none transition-colors duration-300"
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Project inquiry"
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500/60 focus:outline-none transition-colors duration-300"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Message
              </label>
              <textarea
                placeholder="Tell me about your project..."
                rows="6"
                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-purple-500/20 text-white placeholder-gray-500 focus:border-purple-500/60 focus:outline-none transition-colors duration-300 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-8">Or reach out on social media</p>
          <div className="flex justify-center gap-6">
            {[
              {
                name: "GitHub",
                icon: "🐙",
                url: "https://github.com/kavindu-98",
              },
              {
                name: "LinkedIn",
                icon: "💼",
                url: "https://linkedin.com/in/kavindu-abeykoon",
              },
              {
                name: "Email",
                icon: "✉️",
                url: "mailto:kavinduumayanga058@gmail.com",
              },
              { name: "Phone", icon: "📱", url: "tel:0768510781" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-12 h-12 rounded-full border border-purple-500/30 bg-slate-900/50 flex items-center justify-center text-2xl hover:border-purple-500/60 hover:bg-purple-500/10 transition-all duration-300 hover:scale-110"
              >
                {social.icon}
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-xs bg-purple-600 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
