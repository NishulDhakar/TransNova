"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { title: "Home", href: "#hero" },
    { title: "Mission", href: "#mission" },
    { title: "Fleet", href: "#fleet" },
    { title: "Services", href: "#services" },
    { title: "Solutions", href: "#solutions" },
    { title: "Journal", href: "#journal" },
];

interface NavigationProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Navigation({ isOpen, onClose }: NavigationProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[60] bg-foreground text-background flex flex-col items-center justify-center"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-4 rounded-full border border-white/20 hover:bg-white hover:text-foreground transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Links */}
                    <nav className="flex flex-col gap-6 text-center">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.title}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={onClose}
                                    className="text-5xl md:text-7xl font-serif font-bold hover:text-accent-yellow transition-colors block"
                                >
                                    {link.title}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Footer Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute bottom-12 text-white/50 text-sm font-mono uppercase tracking-widest"
                    >
                        TransNova Logistics System
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
