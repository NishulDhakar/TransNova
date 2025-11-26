"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";

import { X } from "lucide-react";

const services = [
    {
        id: "road",
        title: "Road Networks",
        subtitle: "GPS-tracked Routes",
        image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2000&auto=format&fit=crop",
        details: "Comprehensive road network coverage ensuring your cargo reaches the most remote destinations with precision tracking.",
    },
    {
        id: "sea",
        title: "Container Freight",
        subtitle: "Customs-Cleared",
        image: "https://images.unsplash.com/photo-1758777625576-09fc43631902?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        details: "Global sea freight solutions with expedited customs clearance and port-to-port handling.",
    },
    {
        id: "air",
        title: "Air Logistics",
        subtitle: "24/7 Monitoring",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop",
        details: "Rapid air cargo services for time-critical shipments, monitored 24/7 by our control tower.",
    },
    {
        id: "warehouse",
        title: "Warehousing",
        subtitle: "Automated Storage",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop",
        details: "State-of-the-art automated warehousing with real-time inventory management and climate control.",
    },
];

export default function Services() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <SectionWrapper id="services" className="py-32 px-6 md:px-12 bg-background relative z-20">
            <div className="mb-16">
                <h2 className="text-sm font-mono uppercase tracking-widest text-foreground/50 mb-4">04. Services</h2>
                <h3 className="text-4xl md:text-6xl font-serif font-bold">Transit Blueprints</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[80vh]">
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        layoutId={service.id}
                        onClick={() => setSelectedId(service.id)}
                        className="relative group cursor-pointer overflow-hidden rounded-sm bg-black"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                            style={{ backgroundImage: `url(${service.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                            <motion.h4 className="text-3xl font-serif text-white mb-2">{service.title}</motion.h4>
                            <motion.p className="text-sm font-mono text-accent-yellow opacity-0 group-hover:opacity-100 transition-opacity">
                                {service.subtitle}
                            </motion.p>
                        </div>

                        {/* Custom Cursor Hint (implemented via CSS or separate component, here just visual cue) */}
                        <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-2xl font-light">+</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
                        />

                        {/* Expanded Card */}
                        <motion.div
                            layoutId={selectedId}
                            className="relative w-full max-w-4xl h-[80vh] bg-background overflow-hidden rounded-sm pointer-events-auto flex flex-col md:flex-row shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedId(null);
                                }}
                                className="absolute top-6 right-6 z-20 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                            >
                                <X size={24} />
                            </button>

                            {/* Image Side */}
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{ backgroundImage: `url(${services.find((s) => s.id === selectedId)?.image})` }}
                                />
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute bottom-8 left-8">
                                    <h2 className="text-4xl md:text-5xl font-serif text-white">
                                        {services.find((s) => s.id === selectedId)?.title}
                                    </h2>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-background p-8 md:p-16 flex flex-col justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h4 className="text-xs font-mono uppercase tracking-widest text-accent-orange mb-4">
                                        {services.find((s) => s.id === selectedId)?.subtitle}
                                    </h4>
                                    <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                                        {services.find((s) => s.id === selectedId)?.details}
                                    </p>

                                    <div className="mt-8 pt-8 border-t border-line">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="block text-xs text-foreground/50 uppercase">Capacity</span>
                                                <span className="block text-lg font-serif">Unlimited</span>
                                            </div>
                                            <div>
                                                <span className="block text-xs text-foreground/50 uppercase">Coverage</span>
                                                <span className="block text-lg font-serif">Global</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
}
