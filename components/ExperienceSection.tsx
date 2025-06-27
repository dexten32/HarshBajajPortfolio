"use client";

import Image from "next/image";
import { useState } from "react";
import RevealSplitText from "./ui/RevealSplitText";
import Reveal from "./ui/Reveal";

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState(false);
  const accentCyan = "#9EFFFF";

  return (
    <section
      id="projects"
      className="w-full px-4 py-16 bg-[#0D0D0D] text-white flex justify-center"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr] md:gap-[9rem] gap-10">
        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center space-y-4 pr-2 md:pr-4">
          <Reveal delay={0}>
            <div className="flex items-center text-base text-gray-400 gap-2">
              <span style={{ color: accentCyan }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke={accentCyan}
                  className="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                  />
                </svg>
              </span>
              <span className="tracking-widest" style={{ color: accentCyan }}>
                Work Experience
              </span>
            </div>
          </Reveal>

          <RevealSplitText
            text="Where I’ve Built Things That Matter"
            className="text-3xl md:text-4xl font-bold"
          />

          <Reveal delay={0.2}>
            <p className="text-gray-300 text-sm md:text-base text-justify">
              I’ve had the opportunity to work on impactful projects,
              collaborate with talented teams, and contribute to products that
              make a difference. Here&apos;s a quick look at where I&apos;ve
              been.
            </p>
          </Reveal>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">
          <Reveal delay={0.4}>
            <div className="border-b border-gray-700">
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-full text-left focus:outline-none"
              >
                <div className="flex justify-between items-start pb-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/files/cynox logo.svg"
                      alt="Cynox Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    <div className="flex flex-col">
                      <a href="https://cynoxsecurity.com/" target="_blank">
                        <h3 className="font-semibold text-lg">
                          Cynox Security LLP
                        </h3>
                      </a>
                      <p className="text-sm text-gray-400">Web Developer</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 whitespace-nowrap">
                    Apr 2025 – Present
                  </p>
                </div>
              </button>

              {/* Expandable Content */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden mb-4 ${
                  expanded ? "max-h-60 mt-4" : "max-h-0"
                }`}
              >
                <div className="backdrop-blur-sm p-4 rounded-md text-sm text-gray-300 space-y-2">
                  <p>
                    • Rebuilt Cynox Security’s website with a modern, responsive
                    UI to improve engagement.
                  </p>
                  <p>
                    • Developed a custom Task Management System tailored to
                    internal workflows.
                  </p>
                  <p>
                    • Added role-based access, real-time tracking, and secure
                    admin approvals.
                  </p>
                  <p>
                    • Led deployment with Git and CI/CD for fast, reliable
                    delivery.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
