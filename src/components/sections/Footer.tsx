"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

function LiveClock({ city, timeZone }: { city: string; timeZone: string }) {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-GB", {
                    timeZone,
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timeZone]);

    return (
        <div className="flex flex-col">
            <span className="text-xs text-white/50 uppercase tracking-widest mb-1">{city}</span>
            <span className="text-xl font-mono text-white">{time}</span>
        </div>
    );
}

export default function Footer() {
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);

    return (
        <footer className="bg-foreground text-background min-h-screen flex flex-col justify-between relative">
            {/* CTA Section */}
            <div
                onClick={() => setIsScheduleOpen(true)}
                className="flex-1 flex items-center justify-center border-b border-white/10 relative overflow-hidden group cursor-pointer"
            >
                <div className="absolute inset-0 bg-accent-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out z-0" />

                <div className="relative z-10 flex items-center gap-8 mix-blend-difference">
                    <h2 className="text-4xl md:text-6xl lg:text-9xl font-serif font-bold text-white group-hover:text-foreground transition-colors text-center px-4">
                        Schedule a Shipment
                    </h2>
                    <ArrowUpRight size={64} className="text-white group-hover:text-foreground transition-colors hidden md:block" />
                </div>
            </div>

            {/* Info Section */}
            <div className="p-12 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="flex flex-col gap-4">
                    <h3 className="text-2xl font-serif font-bold">TRANSNOVA</h3>
                    <p className="text-sm text-white/50 max-w-xs">
                        Precision engineering for the modern supply chain. Moving the world, one shipment at a time.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="text-xs uppercase tracking-widest text-white/50">Headquarters</h4>
                    <address className="not-italic text-lg">
                        1200 Logistics Way,<br />
                        Port of Rotterdam,<br />
                        Netherlands
                    </address>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="text-xs uppercase tracking-widest text-white/50">Socials</h4>
                    <ul className="flex flex-col gap-2">
                        {["LinkedIn", "Instagram", "Twitter/X"].map((social) => (
                            <li key={social}>
                                <a href="#" className="text-lg hover:text-accent-yellow transition-colors flex items-center gap-2 group">
                                    {social}
                                    <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-8">
                    <LiveClock city="Mumbai" timeZone="Asia/Kolkata" />
                    <LiveClock city="Dubai" timeZone="Asia/Dubai" />
                    <LiveClock city="New York" timeZone="America/New_York" />
                </div>
            </div>

            <div className="px-12 py-6 border-t border-white/10 flex justify-between items-center text-xs text-white/30 uppercase tracking-widest">
                <span>© 2025 TransNova Logistics</span>
                <span>Privacy Policy</span>
            </div>

            {/* Schedule Modal */}
            {isScheduleOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsScheduleOpen(false)} />
                    <div className="relative bg-background p-8 md:p-12 w-full max-w-2xl border border-line shadow-2xl overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-3xl font-serif font-bold">Request Quote</h3>
                            <button onClick={() => setIsScheduleOpen(false)} className="text-foreground/50 hover:text-foreground">Close</button>
                        </div>

                        <form className="flex flex-col gap-6" onSubmit={(e) => {
                            e.preventDefault();
                            const btn = e.currentTarget.querySelector('button');
                            if (btn) {
                                const originalText = btn.innerText;
                                btn.innerText = "Processing...";
                                btn.disabled = true;
                                setTimeout(() => {
                                    btn.innerText = "Request Sent Successfully";
                                    btn.classList.remove("bg-foreground", "text-background");
                                    btn.classList.add("bg-green-600", "text-white");
                                    setTimeout(() => {
                                        setIsScheduleOpen(false);
                                        // Reset button after close
                                        setTimeout(() => {
                                            btn.innerText = originalText;
                                            btn.disabled = false;
                                            btn.classList.remove("bg-green-600", "text-white");
                                            btn.classList.add("bg-foreground", "text-background");
                                        }, 500);
                                    }, 1500);
                                }, 1500);
                            }
                        }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-foreground/50">Company Name</label>
                                    <input required type="text" className="bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-accent-yellow transition-colors" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-foreground/50">Email</label>
                                    <input required type="email" className="bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-accent-yellow transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-foreground/50">Origin</label>
                                    <input required type="text" className="bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-accent-yellow transition-colors" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs uppercase tracking-widest text-foreground/50">Destination</label>
                                    <input required type="text" className="bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-accent-yellow transition-colors" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-widest text-foreground/50">Cargo Details</label>
                                <textarea required className="bg-transparent border-b border-foreground/20 py-2 focus:outline-none focus:border-accent-yellow transition-colors min-h-[100px]" />
                            </div>

                            <button type="submit" className="bg-foreground text-background py-4 mt-4 font-mono uppercase tracking-widest hover:bg-accent-yellow hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                Submit Request
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </footer>
    );
}
