"use client";

import { useState } from "react";
import MagneticButton from "./ui/MagneticButton";
import { Menu } from "lucide-react";
import Navigation from "./Navigation";

export default function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isTrackOpen, setIsTrackOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-start z-50 pointer-events-none">
                {/* Logo */}
                <div className="pointer-events-auto">
                    <span className="font-serif font-bold text-xl tracking-tighter mix-blend-difference text-white">TN.</span>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pointer-events-auto">
                    <MagneticButton className="cursor-pointer group" onClick={() => setIsTrackOpen(true)}>
                        <div className="px-6 py-3 rounded-full border border-foreground/10 bg-background/80 backdrop-blur-md text-sm font-mono uppercase hover:bg-foreground hover:text-background transition-colors">
                            Track Shipment
                        </div>
                    </MagneticButton>

                    <MagneticButton className="cursor-pointer group" onClick={() => setIsNavOpen(true)}>
                        <div className="w-12 h-12 rounded-full border border-foreground/10 bg-background/80 backdrop-blur-md flex items-center justify-center hover:bg-foreground hover:text-background transition-colors">
                            <Menu size={20} />
                        </div>
                    </MagneticButton>
                </div>
            </header>

            <Navigation isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

            {/* Track Shipment Modal */}
            {isTrackOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsTrackOpen(false)} />
                    <div className="relative bg-background p-8 w-full max-w-md border border-line shadow-2xl">
                        <h3 className="text-2xl font-serif font-bold mb-4">Track Shipment</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const btn = e.currentTarget.querySelector('button');
                            if (btn) {
                                btn.innerText = "Searching...";
                                setTimeout(() => {
                                    btn.innerText = "Shipment Not Found (Demo)";
                                    btn.classList.add("bg-red-500", "text-white");
                                }, 1500);
                            }
                        }}>
                            <input
                                type="text"
                                placeholder="Enter Tracking ID"
                                className="w-full bg-transparent border-b border-foreground/20 py-2 mb-6 font-mono focus:outline-none focus:border-accent-yellow transition-colors"
                            />
                            <button
                                type="submit"
                                className="w-full bg-foreground text-background py-3 font-mono uppercase text-sm hover:bg-accent-yellow hover:text-foreground transition-colors"
                            >
                                Track
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
