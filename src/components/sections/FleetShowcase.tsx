"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, useMotionValue, useTransform } from "framer-motion";
import clsx from "clsx";

const fleetItems = [
    {
        id: 1,
        title: "Refrigerated Transport",
        year: "2024",
        specs: { payload: "24,000 kg", range: "1,200 km", temp: "-25°C to +25°C" },
        image: "https://images.unsplash.com/photo-1565891741441-64926e441838?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        title: "Air Cargo",
        year: "2023",
        specs: { payload: "110,000 kg", range: "14,000 km", type: "Boeing 747-8F" },
        image: "https://images.unsplash.com/photo-1559297434-fae8a1916a79?q=80&w=2000&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "FTL Shipping",
        year: "2024",
        specs: { payload: "28,000 kg", range: "2,000 km", type: "Euro 6 Diesel" },
        image: "https://images.unsplash.com/photo-1696992812729-2e2e9bb1d4b1?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        title: "Warehousing",
        year: "2022",
        specs: { area: "50,000 sq.m", capacity: "100k Pallets", auto: "Lvl 4 Robotics" },
        image: "https://plus.unsplash.com/premium_photo-1664300217696-758a5f0da271?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 5,
        title: "Last Mile",
        year: "2025",
        specs: { payload: "1,500 kg", range: "300 km", power: "Electric" },
        image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=2000&auto=format&fit=crop",
    },
];

function LensCard({ item }: { item: typeof fleetItems[0] }) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const x = useTransform(mouseX, (val) => -val + 128);
    const y = useTransform(mouseY, (val) => -val + 128);

    return (
        <div
            ref={ref}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onMouseMove={handleMouseMove}
            className="relative w-[85vw] md:w-[50vw] h-[60vh] md:h-[70vh] flex-shrink-0 mx-4 md:mx-8 group overflow-hidden rounded-sm cursor-none"
        >
            {/* Base Image */}
            <div className={clsx("w-full h-full transition-transform duration-1000 ease-out", hovering ? "scale-105" : "scale-100")}>
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            </div>

            {/* Technical Overlay (Grid & Specs) */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {/* Top Tech Lines */}
                <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                        <div className="w-2 h-2 bg-accent-yellow rounded-full animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-accent-yellow">Live Feed</span>
                    </div>
                    <div className="text-[10px] font-mono text-white/70">ID: {item.id.toString().padStart(3, '0')}</div>
                </div>

                {/* Center Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-700 delay-100">
                    <div className="w-1 h-4 bg-white/30 absolute top-0 left-1/2 -translate-x-1/2" />
                    <div className="w-1 h-4 bg-white/30 absolute bottom-0 left-1/2 -translate-x-1/2" />
                    <div className="w-4 h-1 bg-white/30 absolute left-0 top-1/2 -translate-y-1/2" />
                    <div className="w-4 h-1 bg-white/30 absolute right-0 top-1/2 -translate-y-1/2" />
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {Object.entries(item.specs).map(([key, value]) => (
                        <div key={key}>
                            <span className="block text-[10px] uppercase text-white/50 tracking-wider mb-1">{key}</span>
                            <span className="block text-sm font-mono text-white">{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lens Effect */}
            {hovering && (
                <motion.div
                    style={{
                        x: mouseX,
                        y: mouseY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    className="absolute top-0 left-0 w-64 h-64 rounded-full border border-white/30 shadow-2xl overflow-hidden pointer-events-none z-30 backdrop-blur-[2px]"
                >
                    <motion.div
                        className="absolute w-[85vw] md:w-[50vw] h-[60vh] md:h-[70vh]"
                        style={{
                            x,
                            y,
                            scale: 2.5,
                            transformOrigin: "0 0"
                        }}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.image})` }}
                        />
                    </motion.div>
                    {/* Lens UI */}
                    <div className="absolute inset-0 border-[2px] border-accent-yellow/30 rounded-full" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-accent-yellow/50 rounded-full" />
                    </div>
                </motion.div>
            )}

            {/* Default Content (Title) */}
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <span className="block text-xs font-mono text-accent-yellow mb-2 tracking-widest uppercase">Fleet No. 0{item.id}</span>
                <h3 className="text-4xl md:text-5xl font-serif text-white">{item.title}</h3>
            </div>
        </div>
    );
}

export default function FleetShowcase() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !triggerRef.current) return;

        // Check if mobile
        const isMobile = window.innerWidth < 768;

        if (!isMobile) {


            gsap.to(sectionRef.current, {
                x: () => -(sectionRef.current!.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=20%",
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                },
            });
        }
    }, []);

    return (
        <div ref={triggerRef} id="fleet" className="relative md:h-screen bg-background z-10">
            <div className="absolute top-12 left-12 z-10 mix-blend-difference pointer-events-none">
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-foreground/70">03. Fleet</h2>
            </div>
            <div
                ref={sectionRef}
                className="flex md:h-full items-center px-6 md:px-12 w-full md:w-max overflow-x-auto md:overflow-hidden snap-x snap-mandatory py-24 md:py-0"
            >
                {fleetItems.map((item) => (
                    <div key={item.id} className="snap-center shrink-0">
                        <LensCard item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}
