"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
                >
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-4xl font-serif font-bold tracking-tighter"
                        >
                            TRANSNOVA
                        </motion.div>
                        <div className="w-32 h-[1px] bg-foreground/20 overflow-hidden">
                            <motion.div
                                className="w-full h-full bg-foreground"
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xs font-mono uppercase tracking-widest text-foreground/50"
                        >
                            System Initializing...
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
