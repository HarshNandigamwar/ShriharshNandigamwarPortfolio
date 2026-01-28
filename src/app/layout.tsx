import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
