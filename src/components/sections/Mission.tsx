"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SectionWrapper from "../ui/SectionWrapper";
import { ArrowRight } from "lucide-react";

export default function Mission() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        const words = textRef.current.querySelectorAll(".word");

        gsap.fromTo(words,
            { opacity: 0.1, color: "#52525b" }, // zinc-600
            {
                opacity: 1,
                color: "#09090b", // foreground
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    end: "bottom 60%",
                    scrub: 1,
                }
            }
        );

    }, []);

    const statement = "We move goods with the precision your business deserves. From the factory floor to the final mile, our engineered logistics network ensures seamless continuity in an unpredictable world.";

    return (
        <SectionWrapper id="mission" className="bg-background py-32 md:py-48">
            <div ref={containerRef} className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                {/* Left Sidebar (Sticky) */}
                <div className="lg:col-span-4 flex flex-col justify-between h-full">
                    <div className="sticky top-32">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-[1px] bg-accent-orange"></div>
                            <span className="text-sm font-mono uppercase tracking-widest text-accent-orange">02. Mission</span>
                        </div>

                        <h3 className="text-2xl font-serif font-bold mb-6">Engineered for<br />Excellence</h3>

                        <div className="flex flex-col gap-4 text-sm font-mono text-foreground/60">
                            <div className="flex justify-between border-b border-line pb-2">
                                <span>Precision</span>
                                <span>99.9%</span>
                            </div>
                            <div className="flex justify-between border-b border-line pb-2">
                                <span>Global Reach</span>
                                <span>140+</span>
                            </div>
                            <div className="flex justify-between border-b border-line pb-2">
                                <span>On-Time</span>
                                <span>24/7</span>
                            </div>
                        </div>

                        <div className="mt-12">
                            <button className="group flex items-center gap-2 text-sm font-mono uppercase tracking-widest hover:text-accent-orange transition-colors">
                                <span>Read Manifesto</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Content (Main Text) */}
                <div className="lg:col-span-8">
                    <p ref={textRef} className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] flex flex-wrap gap-x-4 gap-y-2">
                        {statement.split(" ").map((word, i) => (
                            <span key={i} className="word transition-colors duration-300">
                                {word}
                            </span>
                        ))}
                    </p>
                </div>

            </div>
        </SectionWrapper>
    );
}
