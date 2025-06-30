"use client";

import { Github, ExternalLink } from "lucide-react";
import Reveal from "./ui/Reveal";
import RevealSplitText from "./ui/RevealSplitText";

export default function ProjectsSection() {
  const accentCyan = "#9EFFFF";
  return (
    <section className="w-full px-4 py-16 sm:px-8 sm:py-20 lg:px-20 lg:py-20 bg-[#0D0D0D] text-white flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 md:gap-[15rem] gap-10">
        <div className="flex flex-col justify-center space-y-4 pr-2 md:pr-3 md:order-2">
          {" "}
          {/* Added md:order-2 */}
          <Reveal delay={0}>
            {/* Centered on mobile, left-aligned on desktop */}
            <div className="flex items-center text-base text-gray-400 gap-2 justify-center md:justify-start">
              <span style={{ color: accentCyan }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke={accentCyan}
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                  />
                </svg>
              </span>
              <span className="tracking-widest" style={{ color: accentCyan }}>
                Project Showcase
              </span>
            </div>
          </Reveal>
          {/* Centered on mobile, left-aligned on desktop */}
          <RevealSplitText
            text="What I’ve Built So Far"
            className="text-2xl sm:text-3xl md:text-5xl font-semibold leading-tight text-center md:text-left"
          />
          <Reveal delay={0.2}>
            {/* Constrained width and centered on mobile, left-aligned on desktop */}
            <p className="text-gray-300 text-xs sm:text-sm md:text-base text-justify max-w-2xl mx-auto md:mx-0">
              From real-world applications to creative clones, here’s a glimpse
              into my work — each project designed to solve real problems with
              clean, responsive UIs and thoughtful UX.
            </p>
          </Reveal>
        </div>

        <div className="space-y-12 relative md:order-1">
          {" "}
          {/* Project 1 */}
          <Reveal delay={0}>
            <div className="transform md:translate-x-0">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">InstaShare</h3>
                  <div className="flex gap-2 text-gray-400 flex-shrink-0">
                    <a href="#" className="hover:text-white transition">
                      <Github size={18} />
                    </a>
                    <a
                      href="https://instashareharsh.ccbp.tech/"
                      className="hover:text-white transition"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  A social media clone built with React, Firebase, and Tailwind
                  CSS.
                </p>
              </div>
            </div>
          </Reveal>
          {/* Project 2 */}
          <Reveal delay={0.2}>
            <div className="transform md:translate-x-8">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">VidsTol</h3>
                  <div className="flex gap-2 text-gray-400 flex-shrink-0">
                    <a href="#" className="hover:text-white transition">
                      <Github size={18} />
                    </a>
                    <a
                      href="https://videoappharsh.ccbp.tech/login"
                      className="hover:text-white transition"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  YouTube clone using Next.js, MongoDB, and modern UI libraries.
                </p>
              </div>
            </div>
          </Reveal>
          {/* Project 3 */}
          <Reveal delay={0.4}>
            <div className="transform md:-translate-x-8">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">TaskBoard</h3>
                  <div className="flex gap-2 text-gray-400 flex-shrink-0">
                    <a href="#" className="hover:text-white transition">
                      <Github size={18} />
                    </a>
                    <a href="#" className="hover:text-white transition">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  A full-stack task management system with role-based UI and
                  real-time updates. (In Deployment phase)
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
