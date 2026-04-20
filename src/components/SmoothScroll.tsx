import {ReactLenis} from "lenis/react";

export default function SmoothScroll({children}: {children: React.ReactNode}) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.4,
                orientation: "vertical",
                smoothWheel: true,
            }}
        >
            {children}
        </ReactLenis>
    );
}
