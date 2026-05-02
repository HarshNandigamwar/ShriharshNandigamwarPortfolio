"use client";
import {useEffect, useState} from "react";
import {motion, useMotionValue, useSpring} from "framer-motion";

/* Cursor states */
type CursorState = "default" | "hover" | "click" | "text";

export default function CustomCursor() {
    const [state, setState] = useState<CursorState>("default");
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [label, setLabel] = useState<string | null>(null);

    /* Raw mouse coords */
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);

    /* Dot follows instantly */
    const dotX = useSpring(rawX, {stiffness: 2000, damping: 60, mass: 0.1});
    const dotY = useSpring(rawY, {stiffness: 2000, damping: 60, mass: 0.1});

    /* Ring lags behind slightly */
    const ringX = useSpring(rawX, {stiffness: 500, damping: 40, mass: 0.3});
    const ringY = useSpring(rawY, {stiffness: 500, damping: 40, mass: 0.3});

    /* Outer glow trails even more */
    const glowX = useSpring(rawX, {stiffness: 180, damping: 30, mass: 0.6});
    const glowY = useSpring(rawY, {stiffness: 180, damping: 30, mass: 0.6});

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        /* Track position */
        const onMove = (e: MouseEvent) => {
            rawX.set(e.clientX);
            rawY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        /* Click ripple */
        const onDown = () => setClicked(true);
        const onUp = () => setClicked(false);

        /* Show/hide when leaving window */
        const onLeave = () => setIsVisible(false);
        const onEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", onMove, {passive: true});
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);

        /* Attach hover state to interactive elements */
        const attachListeners = () => {
            document.querySelectorAll<HTMLElement>("a, button, .cursor-pointer").forEach((el) => {
                el.addEventListener("mouseenter", () => {
                    setState("hover");
                    /* Pick up data-cursor-label attribute if present */
                    setLabel(el.dataset.cursorLabel ?? null);
                });
                el.addEventListener("mouseleave", () => {
                    setState("default");
                    setLabel(null);
                });
            });

            document.querySelectorAll<HTMLElement>("input, textarea, [contenteditable]").forEach((el) => {
                el.addEventListener("mouseenter", () => setState("text"));
                el.addEventListener("mouseleave", () => setState("default"));
            });
        };

        attachListeners();

        const obs = new MutationObserver(attachListeners);
        obs.observe(document.body, {childList: true, subtree: true});

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnter);
            obs.disconnect();
        };
    }, [isVisible, rawX, rawY]);

    if (isMobile) return null;

    /* Derived sizes */
    const isHover = state === "hover";
    const isText = state === "text";
    const isClick = clicked;

    return (
        <>
            {/* 1. Glow trail (slowest, biggest, most transparent) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99997] rounded-full"
                style={{
                    x: glowX,
                    y: glowY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <motion.div
                    animate={{
                        width: isHover ? 80 : isClick ? 20 : 60,
                        height: isHover ? 80 : isClick ? 20 : 60,
                        opacity: isHover ? 0.18 : isClick ? 0.08 : 0.1,
                    }}
                    transition={{type: "spring", stiffness: 200, damping: 28}}
                    className="rounded-full bg-brand blur-[18px]"
                />
            </motion.div>

            {/* 2. Outer ring (medium lag) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <motion.div
                    animate={{
                        width: isText ? 4 : isHover ? 44 : isClick ? 16 : 28,
                        height: isText ? 28 : isHover ? 44 : isClick ? 16 : 28,
                        borderRadius: isText ? "3px" : "50%",
                        borderColor: isHover ? "rgba(34,197,94,0.9)" : "rgba(34,197,94,0.45)",
                        borderWidth: isHover ? "1.5px" : "1px",
                        backgroundColor: isHover ? "rgba(34,197,94,0.12)" : "transparent",
                        scale: isClick ? 0.7 : 1,
                    }}
                    transition={{type: "spring", stiffness: 350, damping: 32}}
                    style={{border: "1px solid rgba(34,197,94,0.45)"}}
                />
            </motion.div>

            {/* 3. Inner dot (near-instant) */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: "-50%",
                    translateY: "-50%",
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <motion.div
                    animate={{
                        width: isHover ? 6 : isText ? 2 : isClick ? 3 : 5,
                        height: isHover ? 6 : isText ? 18 : isClick ? 3 : 5,
                        borderRadius: isText ? "2px" : "50%",
                        backgroundColor: isClick ? "#fff" : "#22c55e",
                        scale: isClick ? 0.6 : 1,
                        boxShadow: isHover ? "0 0 10px 3px rgba(34,197,94,0.7)" : "0 0 4px 1px rgba(34,197,94,0.4)",
                    }}
                    transition={{type: "spring", stiffness: 800, damping: 35}}
                />
            </motion.div>

            {/* 4. Label tooltip (follows ring, appears on hover) */}
            {label && (
                <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-[99999]"
                    style={{
                        x: ringX,
                        y: ringY,
                        translateX: "16px",
                        translateY: "-50%",
                    }}
                    initial={{opacity: 0, scale: 0.8, x: 8}}
                    animate={{opacity: 1, scale: 1, x: 16}}
                    exit={{opacity: 0, scale: 0.8}}
                    transition={{duration: 0.2}}
                >
                    <div
                        className="px-2.5 py-1 rounded-lg bg-black/80 border border-brand/30
                          backdrop-blur-sm font-mono text-[10px] text-brand whitespace-nowrap"
                    >
                        {label}
                    </div>
                </motion.div>
            )}

            {/* 5. Click ripple burst */}
            {clicked && (
                <motion.div
                    className="fixed top-0 left-0 pointer-events-none z-[99996] rounded-full
                     border border-brand/60"
                    style={{
                        x: dotX,
                        y: dotY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    initial={{width: 0, height: 0, opacity: 0.8}}
                    animate={{width: 48, height: 48, opacity: 0}}
                    transition={{duration: 0.45, ease: "easeOut"}}
                />
            )}

            {/* Hide native cursor */}
            <style>{`
        * { cursor: none !important; }
        ::selection { background: rgba(34,197,94,0.25); }
      `}</style>
        </>
    );
}
