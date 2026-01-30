"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const mouseOver = () => setCursorVariant("hover");
    const mouseOut = () => setCursorVariant("default");

    const attachListeners = () => {
      const elements = document.querySelectorAll(
        "a, button, .cursor-pointer, input, textarea"
      );
      elements.forEach((el) => {
        el.addEventListener("mouseenter", mouseOver);
        el.addEventListener("mouseleave", mouseOut);
      });
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("resize", checkMobile);
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", checkMobile);
      observer.disconnect();
    };
  }, []);

  if (isMobile) return null;

  const variants = {
    default: {
      height: 20,
      width: 20,
      border: "1px solid #22c55e",
      backgroundColor: "transparent",
    },
    hover: {
      height: 40,
      width: 40,
      backgroundColor: "rgba(34, 197, 94, 0.15)",
      border: "1px solid #22c55e",
    },
  };

  return (
    <>
      {/* Inner Dot*/}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand rounded-full pointer-events-none z-[9999]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          position: "fixed",
        }}
      />

      {/* Outer Ring*/}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        variants={variants}
        animate={cursorVariant}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          position: "fixed",
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.5,
        }}
        css-transform="translate(-50%, -50%)"
      />
    </>
  );
}
