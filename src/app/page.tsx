import HomePage from "./home/page";
import AboutPage from "./about/page";
import ExperiencePage from "./experience/page";
import SkillsPage from "./skills/page";
import ProjectsPage from "./projects/page";
import GitHubStatsPage from "./github/page";
import ContactPage from "./contact/page";
import CertificationsPage from "./certificates/page";

export default function Home() {
    return (
        <main className="mx-auto py-20 overflow-x-hidden ">
        {/* <main className="max-w-7xl mx-auto px-3 md:px-6 py-20 overflow-x-hidden "> */}
            <HomePage />
            <AboutPage />
            <ExperiencePage />
            <CertificationsPage />
            <SkillsPage />
            {/* <ProjectsPage /> */}
            {/* <GitHubStatsPage /> */}
            {/* <ContactPage /> */}
        </main>
    );
}
