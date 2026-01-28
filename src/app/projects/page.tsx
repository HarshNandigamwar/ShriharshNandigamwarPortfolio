import ProjectCard from "@/components/ProjectCard";

const ProjectsPage = () => {
  return (
    <section className="py-20">
        <h2 className="text-3xl font-bold mb-10">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Map your projects here */}
          <ProjectCard project={{
            Title: "Sigma AI",
            Description: "AI-powered chatbot built using NextJS, TypeScript, and Gemini API.",
            TechStack: ["NextJS", "Tailwind CSS", "Gemini API"],
            GitHub: "https://github.com/HarshNandigamwar/SigmaAi",
            Live: "https://sigma-ai-shriharsh.vercel.app/"
          }} />
        </div>
      </section>
  )
}

export default ProjectsPage
