/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Matter, {
  Engine,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  Runner,
  Events,
  Render,
} from "matter-js";
import Reveal from "./ui/Reveal";
import RevealSplitText from "./ui/RevealSplitText";
import { motion } from "framer-motion";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Git",
  "Tailwind",
  "Node.js",
  "TypeScript",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "REST APIs",
  "Docker",
  "Vue.js",
  "SQL",
  "Redux",
  "Vite",
  "GitHub",
];

interface BallRenderData {
  id: string;
  label: string;
  x: number;
  y: number;
  rotation: number;
  radius: number;
}

const getTextWidth = (text: string, font: string): number => {
  if (typeof document === "undefined") return text.length * 10;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    context.font = font;
    return context.measureText(text).width;
  }
  return text.length * 10;
};

export default function SkillsSection() {
  const gravity = 1.5;
  const wireframes = false; // Set to true for debugging Matter.js physics outlines
  const mouseConstraintStiffness = 0.02;

  const ballBorderColor = "#ffffff";
  const textColor = "#ffffff";

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const renderRef = useRef<Render | null>(null);

  const [ballRenderData, setBallRenderData] = useState<BallRenderData[]>([]);
  const matterBodiesRef = useRef<Matter.Body[]>([]);
  const currentSkillsIndex = useRef(0);
  const spawnIntervalIdRef = useRef<NodeJS.Timeout | null>(null);

  // State to manage hover color for each skill item
  const [hoverColors, setHoverColors] = useState<{ [key: string]: string }>({});

  // State to track if we are on a mobile breakpoint
  const [isMobileBreakpoint, setIsMobileBreakpoint] = useState(false);

  // Define responsive radius values
  const mobileMinBallRadius = 30; // Smaller radius for mobile
  const mobileMaxBallRadius = 50; // Smaller radius for mobile

  const desktopMinBallRadius = 60; // Original larger radius for desktop
  const desktopMaxBallRadius = 90; // Original larger radius for desktop

  // Define responsive font sizes
  const mobileFontSize = "0.75rem"; // Smaller font for mobile
  const desktopFontSize = "1rem"; // Original font for desktop

  // Dynamically determine current radius and font size based on breakpoint
  const currentMinBallRadius = isMobileBreakpoint
    ? mobileMinBallRadius
    : desktopMinBallRadius;
  const currentMaxBallRadius = isMobileBreakpoint
    ? mobileMaxBallRadius
    : desktopMaxBallRadius;
  const currentFontSize = isMobileBreakpoint ? mobileFontSize : desktopFontSize;

  type CustomMatterBody = Matter.Body & {
    originalProps?: { label?: string; radius?: number };
  };

  const updateRenderData = useCallback(() => {
    if (matterBodiesRef.current.length > 0) {
      const newRenderData = matterBodiesRef.current.map((body) => {
        const originalProps = (body as CustomMatterBody).originalProps || {};
        return {
          id: body.id.toString(),
          label: originalProps.label || "Skill",
          x: body.position.x,
          y: body.position.y,
          rotation: body.angle,
          radius: originalProps.radius || currentMaxBallRadius, // Fallback to currentMaxBallRadius if originalProps.radius is missing
        };
      });
      setBallRenderData(newRenderData);
    } else {
      setBallRenderData([]);
    }
  }, [currentMaxBallRadius]); // Dependency for currentMaxBallRadius

  // Effect to detect screen size and set breakpoint state
  useEffect(() => {
    const checkBreakpoint = () => {
      // Assuming 'md' breakpoint is 768px in Tailwind (common default)
      setIsMobileBreakpoint(window.innerWidth < 768);
    };
    checkBreakpoint(); // Initial check on mount
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []); // Empty dependency array ensures this runs once and cleans up on unmount

  // Main Matter.js initialization and simulation useEffect
  useEffect(() => {
    // Only proceed if both container and canvas refs are available
    if (!containerRef.current || !canvasRef.current) {
      // console.log("Matter.js setup skipped: Refs not ready.");
      return;
    }

    // --- CLEANUP OF PREVIOUS INSTANCE (if any) ---
    // This runs on component unmount or when dependencies change, ensuring a clean reset.
    const cleanupMatter = () => {
      // console.log("Cleaning up Matter.js...");
      if (spawnIntervalIdRef.current) {
        clearInterval(spawnIntervalIdRef.current);
        spawnIntervalIdRef.current = null;
      }
      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
        runnerRef.current = null;
      }
      if (renderRef.current) {
        Render.stop(renderRef.current);
        renderRef.current = null;
      }
      if (engineRef.current) {
        Events.off(engineRef.current, "afterUpdate", updateRenderData);
        World.clear(engineRef.current.world, true);
        Engine.clear(engineRef.current);
        engineRef.current = null;
      }
      matterBodiesRef.current = [];
      setBallRenderData([]); // Clear displayed balls
      currentSkillsIndex.current = 0; // Reset skill index for new spawn
      // console.log("Matter.js cleanup complete.");
    };

    // Perform cleanup before setting up a new instance
    cleanupMatter(); // Call cleanup directly here before setting up

    // --- MATTER.JS SETUP ---
    // console.log("Setting up Matter.js...");
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;

    const engine = Engine.create();
    engineRef.current = engine;
    engine.world.gravity.y = gravity;

    const render = Render.create({
      engine,
      canvas: canvasRef.current,
      options: {
        width,
        height,
        background: "transparent",
        wireframes,
        showVelocity: wireframes,
        showAngleIndicator: wireframes,
        showCollisions: wireframes,
        showBounds: wireframes,
      },
    });
    renderRef.current = render;
    Render.run(render);

    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    const mouse = Mouse.create(canvasRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    });
    World.add(engine.world, mouseConstraint);

    const boundaryThickness = 100; // Thickness of the invisible boundary walls
    const boundaryOptions = {
      isStatic: true,
      restitution: 0.8,
      friction: 0.01,
      render: {
        fillStyle: wireframes ? "#FF0000" : "transparent",
        strokeStyle: wireframes ? "#FF0000" : "transparent",
        lineWidth: wireframes ? 2 : 0,
        visible: wireframes,
      },
    };

    // Define boundaries based on container size
    const boundaries = [
      // Bottom Boundary (slightly below the visible container to catch balls)
      Bodies.rectangle(
        width / 2,
        height + boundaryThickness / 2, // Center of boundary is just below container bottom
        width,
        boundaryThickness,
        boundaryOptions
      ),
      // Left Boundary
      Bodies.rectangle(
        -(boundaryThickness / 2), // Center of boundary is just left of container left
        height / 2,
        boundaryThickness,
        height,
        boundaryOptions
      ),
      // Right Boundary
      Bodies.rectangle(
        width + boundaryThickness / 2, // Center of boundary is just right of container right
        height / 2,
        boundaryThickness,
        height,
        boundaryOptions
      ),
      // Top Boundary (slightly above the visible container)
      Bodies.rectangle(
        width / 2,
        -(boundaryThickness / 2), // Center of boundary is just above container top
        width,
        boundaryThickness,
        boundaryOptions
      ),
    ];
    World.add(engine.world, boundaries);

    const spawnHeightAboveContainer = 50;

    const addBall = () => {
      if (currentSkillsIndex.current >= skills.length) return;

      const skill = skills[currentSkillsIndex.current];
      const estimatedTextWidth = getTextWidth(
        skill,
        `${currentFontSize} sans-serif`
      );

      // Use the dynamically calculated min/max radii
      const radius = Math.max(
        currentMinBallRadius,
        Math.min(currentMaxBallRadius, estimatedTextWidth / 2 + 20)
      );
      const x = Math.random() * (width - radius * 2) + radius; // Spawn within visible width
      const y = -spawnHeightAboveContainer;

      const ball = Bodies.circle(x, y, radius, {
        restitution: 0.8,
        frictionAir: 0.02,
        label: skill,
        render: { visible: wireframes },
      }) as CustomMatterBody;
      ball.originalProps = { label: skill, radius }; // Store the actual physics radius
      Matter.Body.setVelocity(ball, {
        x: (Math.random() - 0.5) * 3,
        y: Math.random() * 2,
      });
      matterBodiesRef.current.push(ball);
      World.add(engine.world, ball);
      currentSkillsIndex.current++;
    };

    // Start spawning balls after a short delay for initial setup
    spawnIntervalIdRef.current = setInterval(() => {
      if (currentSkillsIndex.current >= skills.length) {
        if (spawnIntervalIdRef.current)
          clearInterval(spawnIntervalIdRef.current);
        return;
      }
      addBall();
    }, 200);

    // Attach event listener for updating render data
    Events.on(engine, "afterUpdate", updateRenderData);
    // console.log("Matter.js setup complete.");

    // Cleanup function: This is essential for component unmount
    return () => {
      cleanupMatter();
    };
  }, [
    // Dependencies that cause the Matter.js simulation to re-setup
    containerRef.current?.offsetWidth, // Re-run if container width changes
    containerRef.current?.offsetHeight, // Re-run if container height changes
    updateRenderData, // If updateRenderData's dependencies change, this effect will re-run
    currentMinBallRadius, // If responsive radius changes, re-setup
    currentMaxBallRadius, // If responsive radius changes, re-setup
    currentFontSize, // If responsive font size changes, re-setup
  ]);

  const getRandomHslColor = useCallback(() => {
    const h = Math.floor(Math.random() * 360);
    const s = Math.floor(Math.random() * 30) + 70;
    const l = Math.floor(Math.random() * 20) + 60;
    return `hsl(${h}, ${s}%, ${l}%)`;
  }, []);

  const handleHoverStart = (skill: string) => {
    setHoverColors((prevColors) => ({
      ...prevColors,
      [skill]: getRandomHslColor(),
    }));
  };

  const handleHoverEnd = (skill: string) => {
    setHoverColors((prevColors) => {
      const newColors = { ...prevColors };
      delete newColors[skill];
      return newColors;
    });
  };

  return (
    <section
      id="skills"
      className="flex flex-col md:flex-row w-full max-w-[1400px] mx-auto px-6 py-20 gap-10 items-start justify-between"
    >
      {/* LEFT: Skills Text + Cards */}
      <div className="w-full md:w-[35%] flex flex-col gap-3">
        <Reveal delay={0}>
          <div
            className="flex items-center gap-2 text-sm text-white/40 uppercase tracking-widest"
            style={{ color: "#9EFFFF" }}
          >
            <span className="text-yellow-400" style={{ color: "#9EFFFF" }}>
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
              </svg>
            </span>
            What I’ve Learned
          </div>
        </Reveal>

        <RevealSplitText
          text="My Skills"
          className="text-4xl md:text-5xl font-extrabold text-white"
        />

        <Reveal delay={0.2}>
          <p className="text-white/70 text-base">
            Here&apos;s a visual and listed representation of technologies
            I&apos;m experienced in:
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <motion.div
                key={skill}
                className="px-4 py-2 rounded-lg border text-sm text-center font-medium shadow-sm cursor-pointer"
                onHoverStart={() => handleHoverStart(skill)}
                onHoverEnd={() => handleHoverEnd(skill)}
                initial={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "#ffffff",
                }}
                animate={{
                  backgroundColor:
                    hoverColors[skill] || "rgba(255,255,255,0.05)",
                  borderColor: hoverColors[skill] || "rgba(255,255,255,0.1)",
                  color: hoverColors[skill] ? "#000000" : "#ffffff",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* RIGHT: Bouncing Ball Container WITH BORDER */}
      <div className="w-full">
        <div
          ref={containerRef}
          className="relative w-full h-[500px] overflow-hidden rounded-2xl border border-white/20 bg-[#0D0D0D]"
        >
          {/* Background SKILLS word */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <h2
              className="text-[120px] md:text-[180px] font-extrabold text-white/5 leading-none"
              style={{ letterSpacing: "10px" }}
            >
              SKILLS
            </h2>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          />

          {/* Ball Labels */}
          {ballRenderData.map(({ id, label, x, y, radius }) => (
            <div
              key={id}
              className="absolute rounded-full flex items-center justify-center font-bold text-center select-none shadow-md transform-gpu"
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                color: textColor,
                fontSize: currentFontSize,
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                pointerEvents: "none",
                zIndex: 2,
                border: `2px solid ${ballBorderColor}`,
                boxShadow: `0px 4px 8px rgba(0,0,0,0.2), 0 0 5px ${ballBorderColor}80`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "normal",
                overflow: "hidden",
                padding: "4px 10px",
                background: "transparent",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
