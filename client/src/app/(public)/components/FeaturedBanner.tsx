"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Play } from "lucide-react";
import { FeaturedItem } from "@/store/features/home/home.api";

const slideVariants: Variants = {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }
};

const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const SWIPE_THRESHOLD = 50;

export default function FeaturedBanner({ items }: { items: FeaturedItem[] }) {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    useEffect(() => {
        if (!items.length) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [items.length]);

    const prev = () => setIndex((p) => (p - 1 + items.length) % items.length);
    const next = () => setIndex((p) => (p + 1) % items.length);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.changedTouches[0].clientX;
        touchEndX.current = null;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current === null || touchEndX.current === null) return;

        const delta = touchStartX.current - touchEndX.current;

        if (Math.abs(delta) >= SWIPE_THRESHOLD) {
            delta > 0 ? next() : prev();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    const current = items[index];

    return (
        <section
            className="relative h-[45vh] w-full overflow-hidden rounded-sm bg-black"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Background Image */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 h-full w-full"
                >
                    <Avatar className="h-full w-full rounded-none">
                        <AvatarImage
                            src={current.image || undefined}
                            alt={current.title}
                            className="h-full w-full object-cover object-center rounded-none"
                        />
                        <AvatarFallback className="flex items-center rounded-none justify-center bg-linear-to-br from-[#193cb8] via-[#0f2a80] to-black text-white">
                            <div className="text-center space-y-1">
                                <p className="text-4xl sm:text-5xl font-bold tracking-tight">
                                    {current.title?.slice(0, 1).toUpperCase()}
                                </p>
                                <p className="text-[10px] sm:text-xs opacity-70 uppercase tracking-widest">
                                    Featured
                                </p>
                            </div>
                        </AvatarFallback>
                    </Avatar>

                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="absolute inset-0 z-10 flex items-end pb-8 pt-4 px-4 sm:px-8 lg:px-12">
                <div className="max-w-2xl text-left w-full">

                    <motion.h1
                        key={`title-${index}`}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-xl sm:text-2xl font-bold text-white md:text-4xl lg:text-5xl tracking-tight drop-shadow-md"
                    >
                        {current.title}
                    </motion.h1>

                    <motion.p
                        key={`desc-${index}`}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-2 sm:mt-4 text-xs sm:text-sm lg:text-base xl:text-xl text-muted-foreground line-clamp-2 max-w-md sm:max-w-none"
                    >
                        {current.description || "No description available."}
                    </motion.p>

                    <motion.div
                        key={`btns-${index}`}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-3 sm:mt-6 flex gap-2 sm:gap-4 text-[10px] sm:text-xs md:text-sm font-medium"
                    >
                        <Link
                            href={
                                current.type === "series"
                                    ? `/series/${current.id}`
                                    : `/movies/${current.id}`
                            }
                            className="flex items-center justify-center gap-1.5 rounded bg-primary px-3 py-1.5 sm:px-6 sm:py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity active:scale-95"
                        >
                            <Play className="size-2.5 sm:size-3.5 md:size-4 fill-current" />
                            Watch Now
                        </Link>

                        <Link
                            href="/series"
                            className="rounded border border-white/30 px-3 py-1.5 sm:px-6 sm:py-3 text-white hover:bg-background/10 transition-colors active:scale-95"
                        >
                            Browse
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 right-4 sm:left-1/2 sm:right-auto z-20 flex sm:-translate-x-1/2 gap-1.5 sm:gap-2 bg-black/20 backdrop-blur-xs px-2 py-1 rounded-full">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${i === index ? "w-4 sm:w-6 bg-background" : "w-1.5 sm:w-2 bg-background/40"}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}