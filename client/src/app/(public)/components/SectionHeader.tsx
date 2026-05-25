"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  seeAllHref: string; 
}

export function SectionHeader({ title, seeAllHref }: SectionHeaderProps) {
  return (
    <header className="flex items-start justify-between">
      <h2 className="text-lg sm:text-xl text-black font-semibold leading-tight md:text-2xl border-l-4 border-primary pl-3 capitalize">
        {title}
      </h2>

      <Link
        href={seeAllHref}
        className="group flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-white hover:text-gray-100 transition uppercase bg-primary px-2 sm:px-2.5 py-1 sm:py-1.5 rounded"
      >
        <span>see all</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </header>
  );
}