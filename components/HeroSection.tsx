"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import RotatingSplitText from "./ui/RotatingSplitText"; // ← import it here

export default function HeroSection() {
  const primaryBg = "#0D0D0D";
  const accentCyan = "#9EFFFF";

  const rotatingSplitTexts = [
    "creative developer",
    "frontend engineer",
    "problem solver",
    "digital storyteller",
  ];

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden min-h-screen flex flex-col"
      style={{ backgroundColor: primaryBg }}
    >
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-between px-4 py-8 max-w-7xl mx-auto">
        <div className="text-white text-3xl md:text-4xl font-bold mb-4 md:mb-0 md:mr-16">
          Harsh B.
        </div>

        <div
          className="relative inline-flex items-center justify-center px-6 py-3 font-medium tracking-wide text-white transition duration-500 border border-white rounded-full group cursor-pointer overflow-hidden"
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <a href="mailto:harshbajaj544@gmail.com">
            <span className="absolute inset-0 w-full h-full bg-white scale-x-0 group-hover:scale-x-100 group-hover:rounded-[10rem] transition-transform duration-500 ease-out origin-left"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              Available for Projects
            </span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto flex-grow flex flex-col md:flex-row items-center justify-between px-4 py-10 md:py-0">
        {/* Left */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center mb-16 md:mb-0">
          <div className="relative">
            <div className="w-80 h-96 md:w-96 md:h-[480px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/files/profile.jpg"
                alt="Harsh Bajaj"
                width={384}
                height={480}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Rotating Let’s Talk Badge */}
            <div
              className="absolute -bottom-8 -right-8 w-32 h-32 md:w-40 md:h-40 bg-black rounded-full border-1 border-gray-700 flex items-center justify-center shadow-xl z-10 hover:bg-white group transition-colors duration-300 cursor-pointer hover:rotate-0"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <svg
                  className="absolute inset-0 w-full h-full animate-spin"
                  viewBox="0 0 100 100"
                  style={{ animationDuration: "10s" }}
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0"
                    fill="none"
                  />
                  <text className="fill-white tracking-wider text-[5px] md:text-[8px] uppercase">
                    <textPath
                      href="#circlePath"
                      startOffset="0%"
                      className="fill-white group-hover:fill-black transition-colors duration-300"
                    >
                      LET’S TALK • LET’S TALK • LET’S TALK • LET’S TALK •
                    </textPath>
                  </text>
                </svg>

                <div className="border-1 border-white group-hover:border-black rounded-full w-10 h-10 md:w-17 md:h-17 flex items-center justify-center bg-black group-hover:bg-white transition-colors duration-300">
                  <ArrowUpRight className="w-3 h-3 md:w-5 md:h-5 text-white group-hover:text-black transition-all duration-300 transform rotate-0 group-hover:rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Heading with RotatingText */}
        <div className="w-full md:w-1/2 text-center md:text-left md:pl-12">
          <h1 className="text-5xl text-white md:text-6xl font-bold leading-tight mb-3">
            <span style={{ color: accentCyan }}>
              <RotatingSplitText
                texts={rotatingSplitTexts}
                staggerDuration={0.1}
                rotationInterval={3000}
                className="inline-block capitalize"
              />
            </span>{" "}
            <br />
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0 text-white">
            I collaborate with brands globally to design impactful, mission-
            focused websites that drive results and achieve business goals.
          </p>
          <div
            className="relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-wide text-white transition duration-300 border border-white rounded-full group cursor-pointer overflow-hidden"
            onClick={() => {
              window.open("/files/webdevresume.pdf", "_blank");
            }}
          >
            <span className="absolute inset-0 w-full h-full bg-white scale-x-0 group-hover:scale-x-100 group-hover:rounded-[10rem] transition-transform duration-500 ease-out origin-left"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              My Resume
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
