
"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import clsx from "clsx";

const caseStudies = [
    {
        id: 1,
        title: "Arctic Route Optimization",
        category: "Cold Chain",
        imageColor: "bg-blue-200",
        height: "h-96",
        image : "https://images.unsplash.com/photo-1706972480969-dba23614dc8c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 2,
        title: "Global Port Integration",
        category: "Maritime",
        imageColor: "bg-indigo-300",
        height: "h-[30rem]",
        image: "https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Urban Last-Mile AI",
        category: "Tech",
        imageColor: "bg-teal-200",
        height: "h-80",
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Aerospace Logistics",
        category: "Air Freight",
        imageColor: "bg-sky-200",
        height: "h-[28rem]",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2670&auto=format&fit=crop",
    },
];

export default function CaseStudies() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const yLeft = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const yRight = useTransform(scrollYProgress, [0, 1], [0, -150]); // Faster scroll

    return (
        <SectionWrapper id="journal" className="py-32 px-6 md:px-12 bg-background overflow-hidden">
            <div className="mb-24 text-center">
                <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/50 mb-4">06. Journal</h2>
                <h3 className="text-4xl md:text-6xl font-serif font-bold">The Logistics Journal</h3>
            </div>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {/* Left Column */}
                <motion.div style={{ y: yLeft }} className="flex flex-col gap-8">
                    {caseStudies.filter((_, i) => i % 2 === 0).map((study) => (
                        <div key={study.id} className="group cursor-pointer">
                            <div className={clsx("w-full mb-4 overflow-hidden rounded-sm relative", study.height, study.imageColor)}>
                                <Image
                                    src={study.image}
                                    alt={study.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] pointer-events-none"></div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            <div className="flex justify-between items-baseline border-b border-line pb-4 group-hover:border-accent-yellow transition-colors">
                                <h4 className="text-2xl font-serif">{study.title}</h4>
                                <span className="text-xs font-mono uppercase text-foreground/50">{study.category}</span>
                            </div>
                        </div>
                    ))}

                    {/* Quote */}
                    <div className="py-12 border-y border-line my-8">
                        <blockquote className="text-3xl font-serif italic text-center text-foreground/80">
                            &quot;Speed is the new currency of global trade.&quot;
                        </blockquote>
                    </div>
                </motion.div>

                {/* Right Column (Faster Parallax) */}
                <motion.div style={{ y: yRight }} className="flex flex-col gap-8 md:mt-24">
                    {caseStudies.filter((_, i) => i % 2 !== 0).map((study) => (
                        <div key={study.id} className="group cursor-pointer">
                            <div className={clsx("w-full mb-4 overflow-hidden rounded-sm relative", study.height, study.imageColor)}>
                                <Image
                                    src={study.image}
                                    alt={study.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] pointer-events-none"></div>
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            <div className="flex justify-between items-baseline border-b border-line pb-4 group-hover:border-accent-yellow transition-colors">
                                <h4 className="text-2xl font-serif">{study.title}</h4>
                                <span className="text-xs font-mono uppercase text-foreground/50">{study.category}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </SectionWrapper>
    );
}
