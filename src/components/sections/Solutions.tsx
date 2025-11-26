"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

const solutions = [
    {
        id: 1,
        title: "Freight Management",
        description: "End-to-end logistics optimization.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Last-Mile Delivery",
        description: "Precision urban distribution.",
        image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=2000&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "International Shipping",
        description: "Cross-border compliance and speed.",
        image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2000&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Warehouse Automation",
        description: "Robotics and AI-driven storage.",
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000&auto=format&fit=crop",
    },
];

export default function Solutions() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <SectionWrapper id="solutions" className="py-32 px-6 md:px-12 bg-background min-h-screen flex flex-col justify-center">
            <div className="mb-16 border-b border-line pb-8">
                <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/50 mb-4">05. Solutions</h2>
                <h3 className="text-4xl md:text-6xl font-serif font-bold">The Accordion Engine</h3>
            </div>

            <div className="flex flex-col">
                {solutions.map((solution) => (
                    <motion.div
                        key={solution.id}
                        onMouseEnter={() => setHoveredId(solution.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className="relative border-b border-line py-12 cursor-pointer group overflow-hidden"
                    >
                        {/* Background Image Reveal */}
                        <AnimatePresence>
                            {hoveredId === solution.id && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 0.2, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 z-0 pointer-events-none opacity-20"
                                    style={{
                                        backgroundImage: `url(${solution.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-baseline gap-8 transition-transform duration-300 group-hover:translate-x-4">
                                <span className="text-sm font-mono text-foreground/50">0{solution.id}</span>
                                <h4 className="text-3xl md:text-5xl font-serif font-medium group-hover:text-accent-orange transition-colors">
                                    {solution.title}
                                </h4>
                            </div>

                            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-sm font-mono hidden md:block">{solution.description}</span>
                                <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
}
