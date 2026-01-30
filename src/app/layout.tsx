import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
  themeColor: "#22c55e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Shriharsh Nandigamwar",
  description:
    "A Full Stack Developer passionate about crafting seamless digital experiences.",
  manifest: "/manifest.json",
  verification: {
    google: "0Cx3P3D6qFUwm-QkSzQGxSJgG2husM1-RzeRqW0j3dI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SmoothScroll>
            <Navbar />
            {children}
            <Toaster position="top-right" richColors theme="dark" />
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
