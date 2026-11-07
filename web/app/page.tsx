import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { AgentSandbox } from "@/components/agent-sandbox";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Credentials } from "@/components/credentials";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { RobotAssistant } from "@/components/robot-assistant";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <AgentSandbox />
        <Projects />
        <Experience />
        <Credentials />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <RobotAssistant />
    </div>
  );
}
