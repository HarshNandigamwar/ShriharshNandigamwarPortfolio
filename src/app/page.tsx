// "use client";
import HomePage from "./home/page";
import AboutPage from "./about/page";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20 ">
      <HomePage />
      <AboutPage />
    </main>
  );
}
