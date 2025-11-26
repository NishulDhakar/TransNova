"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionWrapper from "../ui/SectionWrapper";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<SVGTextElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const subTextRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current || !svgRef.current || !bgRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=10%", // Balanced duration
                scrub: 1,
                pin: true,
            },
        });

        // Parallax effect for subtext
        if (subTextRef.current) {
            gsap.to(subTextRef.current, {
                y: -100,
                opacity: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=10%",
                    scrub: 1,
                }
            });
        }

        // The "Dolly Zoom" Effect
        // 1. Text zooms in (Mask opens)
        tl.to(textRef.current, {
            scale: 50, // Massive scale to ensure full clearance
            transformOrigin: "center center",
            ease: "power3.in", // Start slow, accelerate into the "tunnel"
            duration: 1,
        })
            // 2. Background scales down (Counter-movement)
            .fromTo(bgRef.current,
                { scale: 1.2 },
                { scale: 1, duration: 1, ease: "power3.in" },
                "<" // Run simultaneously
            )
            // 3. Fade out overlay at the very end to prevent hard cuts
            .to(svgRef.current, {
                autoAlpha: 0,
                duration: 0.1,
                ease: "none",
            }, "-=0.1");

    }, []);

    return (
        <SectionWrapper id="hero" className="h-screen">
            {/* Background Image (The Reveal) */}
            <div ref={bgRef} className="absolute inset-0 z-0 scale-125"> {/* Start scaled up for the effect */}
                <Image
                    src="/assets/hero-bg.png"
                    alt="TransNova Logistics"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            </div>

            {/* The Curtain (SVG Overlay) */}
            <div ref={containerRef} className="absolute inset-0 z-10 w-full h-full">
                <svg
                    ref={svgRef}
                    className="w-full h-full"
                    viewBox="0 0 1920 1080"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <mask id="hero-mask">
                            <rect width="100%" height="100%" fill="white" />
                            <text
                                ref={textRef}
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="120" // Reduced base size for mobile safety
                                fontWeight="900"
                                fill="black"
                                className="font-serif tracking-tighter"
                                style={{ letterSpacing: "-0.05em" }}
                            >
                                TRANSNOVA
                            </text>
                        </mask>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        fill="#F5F7F8"
                        mask="url(#hero-mask)"
                    />
                </svg>

                {/* Initial Overlay Content */}
                <div ref={subTextRef} className="absolute top-2/3 left-0 w-full text-center z-20 pointer-events-none mix-blend-difference text-foreground">
                    <p className="text-sm md:text-base font-mono uppercase tracking-[0.3em] mb-2">Global Logistics Solutions</p>
                    <p className="text-xs text-foreground/60">Est. 2025</p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/70 mix-blend-difference animate-pulse">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                    <div className="w-[1px] h-12 bg-white/50"></div>
                </div>
            </div>
        </SectionWrapper>
    );
}
