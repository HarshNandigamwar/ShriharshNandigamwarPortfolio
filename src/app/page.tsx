// "use client";
import HomePage from "./home/page";
import AboutPage from "./about/page";
import ExperiencePage from "./experience/page";
import SkillsPage from "./skills/page";
import ProjectsPage from "./projects/page";
import GitHubStatsPage from "./github/page";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20 ">
      <HomePage />
      <AboutPage />
      <ExperiencePage />
      <SkillsPage/>
      <ProjectsPage/>
      <GitHubStatsPage/>
    </main>
  );
}
