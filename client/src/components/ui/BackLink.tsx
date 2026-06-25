"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackLinkProps {
    href: string;
    label?: string;
    hoverLabel?: string;
    className?: string;
    weight?: number;
}

export const BackLink = ({
    href,
    label = "Back",
    hoverLabel = "Go Back",
    className = "",
    weight = 150,
}: BackLinkProps) => {
    const router = useRouter();

    const handleBack = () => {
        /*
          If browser history exists:
          -> go back naturally
    
          Otherwise:
          -> fallback route
        */

        if (window.history.length > 1) {
            router.back();
        } else if (href) {
            router.replace(href);
        }
    };
    return (
        <button
            onClick={handleBack}
            className={`group inline-flex items-center gap-2.5 text-base font-medium text-muted-foreground hover:text-foreground transition ${className}`}
        >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-all duration-300" />

            <span
                className="relative flex overflow-hidden w-auto sm:w-(--w)"
                style={{ ["--w" as any]: `${weight}px` }}
            >
                <span
                    className="transition-all duration-300 group-hover:translate-x-(--shift)"
                    style={{ ["--shift" as any]: `${weight}px` }}
                >
                    {label}
                </span>

                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 font-semibold transition-all duration-300">
                    {hoverLabel}
                </span>
            </span>
        </button>
    );
}

/* USAGE EXAMPLE */
/*
    <BackLink 
    label="Back" 
    hoverLabel="To Admin Movies" 
    />
*/
