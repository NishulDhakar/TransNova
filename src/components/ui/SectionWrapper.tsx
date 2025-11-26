import clsx from "clsx";
import { ReactNode } from "react";

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function SectionWrapper({ children, className, id }: SectionWrapperProps) {
    return (
        <section id={id} className={clsx("relative w-full min-h-screen overflow-hidden", className)}>
            {children}
        </section>
    );
}
