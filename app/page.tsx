import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectSection";
import SkillsSection from "@/components/SkillsSection";
import TaskProcedure from "@/components/TaskProcedureSection";
import DockBar from "@/components/ui/DockBar";

export default function Home() {
  return (
    <main className="font-clash antialiased">
      <DockBar />
      <div className="flex flex-col justify-center items-center bg-background text-foreground transition-all duration-300 w-full ">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <section
          id="skills"
          className="w-full flex justify-center py-20 bg-[#0D0D0D] text-white"
        >
          {/* Directly render SkillsSection. It already contains the logic for the two columns and the bordered container. */}
          <SkillsSection />
        </section>
        <TaskProcedure />
        <ContactSection />
      </div>
    </main>
  );
}
