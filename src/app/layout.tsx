import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:
    "Shriharsh Nandigamwar | A Full Stack Developer passionate about crafting seamless digital experiences. Always excited to tackle new challenges where I can create value and grow as a coder. Let's connect if you've got a project that could use my skills",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SmoothScroll>
            <Navbar />
            {children}
            <Toaster position="top-right" richColors />
            <Footer/>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
} 
