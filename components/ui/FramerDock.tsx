"use client";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import React, {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number; // Reverted to panelHeight
  baseItemSize?: number;
  dockHeight?: number; // Reverted to dockHeight
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>; // Reverted to mouseX
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function DockItem({
  children,
  className = "",
  onClick,
  mouseX, // Reverted to mouseX
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0, // Reverted to x
      width: baseItemSize, // Reverted to width
    };
    // Calculate distance from the center of the item horizontally
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      // COLOR SCHEME (maintained from previous request)
      className={`relative inline-flex items-center justify-center rounded-full bg-white border-neutral-300 border-2 shadow-lg ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          ((child.type as React.FC & { displayName?: string }).displayName ===
            "DockLabel" ||
            (child.props &&
              (child.props as Record<string, unknown>)["data-dock-label"]))
        ) {
          return cloneElement(child, {
            "data-dock-label": true,
            isHovered,
          } as Partial<React.ComponentProps<typeof DockLabel>>);
        }
        return child;
      })}
    </motion.div>
  );
}

type DockLabelProps = {
  children: React.ReactNode;
  className?: string;
  isHovered?: MotionValue<number>;
};

function DockLabel({
  children,
  className = "",
  isHovered,
  ...props
}: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on("change", (latest: number) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }} // Reverted to y for vertical animation
          animate={{ opacity: 1, y: -10 }} // Reverted to y, slides up
          exit={{ opacity: 0, y: 0 }} // Reverted to y
          transition={{ duration: 0.2 }}
          // Positioning for a horizontal dock label: above the icon, horizontally centered.
          // COLOR SCHEME (maintained from previous request)
          className={`${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-neutral-300 bg-white px-2 py-0.5 text-xs text-black`}
          role="tooltip"
          style={{ x: "-50%" }} // Reverted to -50% for horizontal centering
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
DockLabel.displayName = "DockLabel";

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

function DockIcon({ children, className = "" }: DockIconProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64, // Reverted to panelHeight
  dockHeight = 256, // Reverted to dockHeight
  baseItemSize = 50,
}: DockProps) {
  const mouseX = useMotionValue(Infinity); // Reverted to mouseX for horizontal interaction
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    // Reverted to maxHeight
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]); // Reverted to heightRow
  const height = useSpring(heightRow, spring); // Reverted to height

  return (
    // The outer div now handles the animation of the dock's height as it expands
    <motion.div
      style={{ height, scrollbarWidth: "none" }} // Reverted to height
      className="mx-2 flex max-w-full items-center justify-center" // Centering for the overall dock container
    >
      <motion.div
        onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
          // Reverted to pageX for horizontal mouse position
          isHovered.set(1);
          mouseX.set(e.pageX); // Reverted to mouseX
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity); // Reverted to mouseX
        }}
        // Positioning for the dock panel itself:
        // Positioned absolutely at the bottom, horizontally centered
        // COLOR SCHEME (maintained from previous request)
        className={`${className} absolute bottom-5 left-1/2 transform -translate-x-1/2
                    flex items-end w-fit gap-4 rounded-2xl
                    border-neutral-300 md:bg-white/5 bg-[#0D0D0D]/90 border border-white/10 
  shadow-[0_4px_30px_rgba(0,0,0,0.1)]
  rounded-full px-6 py-3 pb-2 px-4 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300`} // Reverted padding and direction
        style={{ height: panelHeight }} // Reverted to height
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX} // Reverted to mouseX
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
