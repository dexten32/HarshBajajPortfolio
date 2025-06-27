// components/ui/DockBar.tsx
// (Previously named DockSidebar.tsx in our discussion)
"use client";

import { Home, Folder, Mail, Code } from "lucide-react";
import FramerDock, { DockItemData } from "./FramerDock"; // Adjust path if FramerDock is elsewhere

export default function DockBar() {
  // Renamed from DockSidebar to match your usage
  const navItems: DockItemData[] = [
    {
      icon: <Home size={24} color="black" />,
      label: "Home",
      onClick: () => {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: <Folder size={24} color="black" />,
      label: "Projects",
      onClick: () => {
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: <Code size={24} color="black" />,
      label: "Skills",
      onClick: () => {
        document
          .getElementById("skills")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      icon: <Mail size={24} color="black" />,
      label: "Contact",
      onClick: () => {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  return (
    // Add Tailwind CSS fixed positioning classes here
    <div className="fixed bottom-0 left-1/2 right-4/2 z-50 flex justify-center">
      <FramerDock
        items={navItems}
        panelHeight={70} // Your current value, adjust if needed
        dockHeight={270} // Your current value, adjust if needed
        baseItemSize={50}
        magnification={70}
        distance={250}
      />
    </div>
  );
}
