"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import RevealSplitText from "./ui/RevealSplitText";
import Reveal from "./ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: 1,
    title: "Understand the Requirements",
    description:
      "Break down the task goals, stakeholders' needs, and final output expectations clearly.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5"
      >
        <path
          fillRule="evenodd"
          d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Plan and Strategize",
    description:
      "Outline the approach, break it into sub-tasks, and define timelines with clarity.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 448 512"
      >
        <path
          fill="#ffffff"
          d="M32 192L32 48c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16l0 40c0 4.4 3.6 8 8 8l32 0c4.4 0 8-3.6 8-8l0-40c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16l0 40c0 4.4 3.6 8 8 8l32 0c4.4 0 8-3.6 8-8l0-40c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16l0 144c0 10.1-4.7 19.6-12.8 25.6L352 256l16 144L80 400 96 256 44.8 217.6C36.7 211.6 32 202.1 32 192zm176 96l32 0c8.8 0 16-7.2 16-16l0-48c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 48c0 8.8 7.2 16 16 16zM22.6 473.4L64 432l320 0 41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6L38.6 512C26.1 512 16 501.9 16 489.4c0-6 2.4-11.8 6.6-16z"
        />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Design & Prototype",
    description:
      "Sketch UI/UX or system architecture to visualize and iterate before development.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 512 512"
      >
        <path
          fill="#ffffff"
          d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
        />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Develop with Precision",
    description:
      "Write clean, modular code and maintain version control with meaningful commits.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 font-bold"
        viewBox="0 0 640 512"
      >
        <path
          fill="#ffffff"
          d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
        />
      </svg>
    ),
  },
  {
    step: 5,
    title: "Test & Validate",
    description:
      "Ensure everything works as expected through functional and edge-case testing.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 512 512"
      >
        <path
          fill="#ffffff"
          d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
        />
      </svg>
    ),
  },
  {
    step: 6,
    title: "Deploy & Deliver",
    description:
      "Push the final build live, handover, and document what's needed for future changes.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 512 512"
      >
        <path
          fill="#ffffff"
          d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64zm28.8-64l123.1 0c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64l-123.1 0c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32l-116.7 0c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0l-176.6 0c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0L18.6 160C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192l123.1 0c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64L8.1 320C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6l176.6 0c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352l116.7 0zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6l116.7 0z"
        />
      </svg>
    ),
  },
];

export default function TaskProcedure() {
  const horizontalSectionRef = useRef<HTMLElement | null>(null);
  const scrollContainerWrapperRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const sectionHeaderRef = useRef<HTMLDivElement | null>(null);
  const taskFlowSpanRef = useRef<HTMLSpanElement | null>(null);
  const howICompleteTasksH2Ref = useRef<HTMLHeadingElement | null>(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const prevScrollX = useRef(0);

  const dimensions = useRef({
    totalContentWidth: 0,
    viewportWidth: 0,
    maxScrollX: 0,
  });

  // Effect for header animation (remains the same)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionHeaderRef.current) {
        return;
      }

      gsap.fromTo(
        [taskFlowSpanRef.current, howICompleteTasksH2Ref.current],
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionHeaderRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, horizontalSectionRef);

    return () => ctx.revert();
  }, []);

  // Effect for mouse and touch drag functionality
  useEffect(() => {
    const slider = scrollContainerRef.current;
    const wrapper = scrollContainerWrapperRef.current;

    if (!slider || !wrapper) return;

    const updateDimensions = () => {
      dimensions.current.totalContentWidth = slider.scrollWidth;
      dimensions.current.viewportWidth = wrapper.offsetWidth;
      dimensions.current.maxScrollX = Math.max(
        0,
        dimensions.current.totalContentWidth - dimensions.current.viewportWidth
      );

      const currentX = gsap.getProperty(slider, "x") as number;
      const clampedX = Math.max(
        -dimensions.current.maxScrollX,
        Math.min(0, currentX)
      );
      if (currentX !== clampedX) {
        gsap.to(slider, { x: clampedX, duration: 0.3, ease: "power1.out" });
      }
    };

    updateDimensions();
    const handleResize = () => updateDimensions();
    window.addEventListener("resize", handleResize);

    // --- Unified Drag Logic ---
    const startDrag = (pageX: number) => {
      setIsDown(true);
      wrapper.classList.add("active-grab");
      setStartX(pageX);
      prevScrollX.current = gsap.getProperty(slider, "x") as number;
    };

    const endDrag = () => {
      setIsDown(false);
      wrapper.classList.remove("active-grab");
    };

    const duringDrag = (pageX: number) => {
      if (!isDown) return;

      const dragDistance = pageX - startX;
      const sensitivity = 1.5;
      const walk = dragDistance * sensitivity;

      let newX = prevScrollX.current + walk;
      newX = Math.max(-dimensions.current.maxScrollX, Math.min(0, newX));

      gsap.to(slider, { x: newX, duration: 0.1, ease: "power1.out" });
    };

    // --- Mouse Event Handlers ---
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault(); // Prevent text selection on desktop
      startDrag(e.pageX);
    };

    const handleMouseLeave = () => {
      if (isDown) endDrag();
    };

    const handleMouseUp = () => {
      endDrag();
    };

    const handleMouseMove = (e: MouseEvent) => {
      duringDrag(e.pageX);
    };

    // --- Touch Event Handlers ---
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault(); // <--- Crucial: Prevent default vertical scrolling
        startDrag(e.touches[0].pageX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        e.preventDefault(); // <--- Crucial: Prevent default vertical scrolling during drag
        duringDrag(e.touches[0].pageX);
      }
    };

    const handleTouchEnd = () => {
      endDrag();
    };

    // --- Attach Event Listeners ---
    wrapper.addEventListener("mousedown", handleMouseDown);
    wrapper.addEventListener("mouseleave", handleMouseLeave);
    wrapper.addEventListener("mouseup", handleMouseUp);
    wrapper.addEventListener("mousemove", handleMouseMove);

    // Removed { passive: true } from touchstart and touchmove
    wrapper.addEventListener("touchstart", handleTouchStart);
    wrapper.addEventListener("touchmove", handleTouchMove);
    wrapper.addEventListener("touchend", handleTouchEnd);
    wrapper.addEventListener("touchcancel", handleTouchEnd);

    // --- Cleanup Listeners ---
    return () => {
      wrapper.removeEventListener("mousedown", handleMouseDown);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      wrapper.removeEventListener("mouseup", handleMouseUp);
      wrapper.removeEventListener("mousemove", handleMouseMove);

      wrapper.removeEventListener("touchstart", handleTouchStart);
      wrapper.removeEventListener("touchmove", handleTouchMove);
      wrapper.removeEventListener("touchend", handleTouchEnd);
      wrapper.removeEventListener("touchcancel", handleTouchEnd);

      window.removeEventListener("resize", handleResize);
    };
  }, [isDown, startX]);

  return (
    <section
      ref={horizontalSectionRef}
      className="w-full px-6 py-10 bg-[#0d0d0d] text-white relative"
      style={{ minHeight: "500px" }}
    >
      {/* Updated: Container size for mobile */}
      <div className="max-w-xl mx-auto md:max-w-6xl">
        {/* Section Header */}
        <div className="mb-10" ref={sectionHeaderRef}>
          <Reveal delay={0}>
            <span
              className="text-xs text-white/40 uppercase tracking-widest flex items-center gap-2"
              style={{ color: "#9EFFFF" }}
              ref={taskFlowSpanRef}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#9EFFFF"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                />
              </svg>{" "}
              Task Flow
            </span>
          </Reveal>
          <RevealSplitText
            text="How I Complete Tasks"
            className="text-2xl md:text-5xl font-extrabold mt-2"
          />
        </div>

        {/* Horizontal Scrollable Cards Container */}
        <div
          ref={scrollContainerWrapperRef}
          // Added touch-action: pan-y to allow vertical scroll while enabling horizontal drag
          className="overflow-hidden cursor-grab unselectable relative"
          style={{ width: "100%", touchAction: "pan-y" }}
        >
          <div
            ref={scrollContainerRef}
            className="flex gap-6 pb-2 shrink-0 w-fit"
            style={{ willChange: "transform" }}
          >
            {steps.map((step) => (
              <div
                key={step.step}
                className="w-[85vw] max-w-sm sm:min-w-[260px] sm:max-w-xs bg-white/5 border border-white/10 rounded-2xl p-6 shrink-0 hover:bg-white/10 transition"
              >
                {/* Icon inside circle */}
                <div className="w-12 h-12 rounded-full bg-[#9EFFFF]/80 flex items-center justify-center mb-4">
                  {step.icon}
                </div>

                {/* Step title with number */}
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {step.step < 10 ? `0${step.step}.` : `${step.step}.`}{" "}
                  {step.title}
                </h3>

                <p className="text-sm text-white/70 leading-snug text-justify">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Custom CSS for cursor and text selection */}
      <style jsx>{`
        .cursor-grab {
          cursor: grab;
        }
        .active-grab {
          cursor: grabbing;
        }
        .unselectable {
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -khtml-user-select: none; /* Konqueror HTML */
          -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
        }
      `}</style>
    </section>
  );
}
