"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

export default function FeaturedBanner({ items }: { items: FeaturedItem[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!items.length) return;

        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [items.length]);

    const current = items[index];

    return (
        <section
            className="relative h-[45vh] w-full overflow-hidden rounded-2xl bg-black"
        >
            {/* Background Image - Absolute Positioning with Overlay */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 h-full w-full"
                >
                    <img
                        src={current.image}
                        alt={current.title}
                        className="h-full w-full object-cover object-center"
                    />
                    {/* Dark gradient for text readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content Container - Responsive Padding and Width */}
            <div className="absolute inset-0 z-10 flex items-end pb-8 pt-4 px-4 sm:px-8 lg:px-12">
                <div className="max-w-2xl text-left w-full">

                    {/* Title */}
                    <motion.h1
                        key={`title-${index}`}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-xl sm:text-2xl font-bold text-white md:text-4xl lg:text-5xl tracking-tight drop-shadow-md"
                    >
                        {current.title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        key={`desc-${index}`}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-2 sm:mt-4 text-xs sm:text-sm lg:text-base xl:text-xl text-gray-200 line-clamp-2 max-w-md sm:max-w-none"
                    >
                        {current.description || "No description available."}
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        key={`btns-${index}`}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-4 sm:mt-6 flex gap-3 sm:gap-4 text-[11px] sm:text-xs md:text-sm font-medium"
                    >
                        <Link
                            href={
                                current.type === "series"
                                    ? `/series/${current.id}`
                                    : `/movies/${current.id}`
                            }
                            className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 sm:px-6 sm:py-3 font-semibold text-primary-foreground hover:opacity-90 transition-opacity active:scale-95"
                        >
                            <Play className="size-3 sm:size-3.5 md:size-4 fill-current" />
                            Watch Now
                        </Link>

                        <Link
                            href="/series"
                            className="rounded-md border border-white/30 px-4 py-2 sm:px-6 sm:py-3 text-white hover:bg-white/10 transition-colors active:scale-95"
                        >
                            Browse
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Dots Pagination */}
            <div className="absolute bottom-4 right-4 sm:left-1/2 sm:right-auto z-20 flex sm:-translate-x-1/2 gap-1.5 sm:gap-2 bg-black/20 backdrop-blur-xs px-2 py-1 rounded-full">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${i === index ? "w-4 sm:w-6 bg-white" : "w-1.5 sm:w-2 bg-white/40"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}