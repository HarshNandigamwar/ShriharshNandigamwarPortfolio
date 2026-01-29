"use client";
import HomePage from "./home/page";
import AboutPage from "./about/page";
import ExperiencePage from "./experience/page";
import SkillsPage from "./skills/page";
import ProjectsPage from "./projects/page";
import GitHubStatsPage from "./github/page";
import ContactPage from "./contact/page";
import CertificationsPage from "./certificates/page";
import { printConsoleSignature } from "@/Utils/printConsoleSignature";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    printConsoleSignature();
  }, []);
  return (
    <main className="max-w-7xl mx-auto px-3 md:px-6 py-20 overflow-x-hidden ">
      <HomePage />
      <AboutPage />
      <ExperiencePage />
      <CertificationsPage />
      <SkillsPage />
      <ProjectsPage />
      <GitHubStatsPage />
      <ContactPage />
    </main>
  );
}
