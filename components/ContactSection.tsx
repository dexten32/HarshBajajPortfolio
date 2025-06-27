"use client";
import RevealSplitText from "./ui/RevealSplitText";
import Reveal from "./ui/Reveal";
import { Github, Linkedin, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full bg-[#0D0D0D] flex flex-col items-center justify-center px-6 pt-12 pb-0"
    >
      {/* CONTACT CONTAINER */}
      <div className="w-full max-w-[1440px] bg-white/5 rounded-3xl p-12 transition-all duration-500">
        <div className="flex flex-col items-center justify-center h-full w-full space-y-8">
          {/* Subtext */}
          <Reveal>
            <span className=" bg-[#9EFFFF]/70 text-sm border border-white/10 rounded-full px-4 py-1">
              Available for work
            </span>
          </Reveal>

          {/* Heading */}
          <RevealSplitText
            text="Let’s create the next big idea"
            className="text-4xl md:text-5xl font-extrabold text-white text-center max-w-3xl"
          />

          {/* CTA Button */}
          <Reveal delay={0.4}>
            <div
              className="relative inline-flex items-center justify-center px-8 py-4 font-medium tracking-wide text-white transition duration-300 border border-white rounded-full group cursor-pointer overflow-hidden"
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="absolute inset-0 w-full h-full bg-white scale-x-0 group-hover:scale-x-100 group-hover:rounded-[10rem] transition-transform duration-500 ease-out origin-left"></span>

              <a href="mailto:harshbajaj544@gmail.com">
                <span className="relative z-10 group-hover:text-black transition-colors duration-500 text-xl">
                  <span className="group-hover:hidden">Write a Message</span>
                  <span className="hidden group-hover:inline">
                    Write a Message
                  </span>
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full max-w-[1440px] py-6 px-4 flex flex-col md:flex-row items-center justify-between text-sm">
        {/* Left side text */}
        <p className="text-center md:text-left text-white/50">
          © {new Date().getFullYear()} Harsh Bajaj. All rights reserved.
        </p>

        {/* Right side social icons */}
        <div className="flex gap-4 mt-1 md:mt-0">
          <a
            href="https://github.com/dexten32"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#9EFFFF] transition-colors"
          >
            <Github size={20} stroke="currentColor" />
          </a>
          <a
            href="https://www.linkedin.com/in/harsh-bajajb/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#9EFFFF] transition-colors"
          >
            <Linkedin size={20} stroke="currentColor" />
          </a>
          <a
            href="mailto:harshbajajofficial@gmail.com"
            className="text-gray-500 hover:text-white transition-colors"
          >
            <Mail
              size={20}
              stroke="currentColor"
              className="hover:text-[#9EFFFF]"
            />
          </a>
        </div>
      </footer>
    </section>
  );
}
