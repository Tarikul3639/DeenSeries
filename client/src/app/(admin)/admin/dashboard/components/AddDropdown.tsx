"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Tv, Film, ChevronDown } from "lucide-react";

export default function AddDropdown() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">

            {/* BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className="group inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4.5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-zinc-800 active:scale-95 shadow-sm"
            >
                <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                Add
                <ChevronDown
                    className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
                />
            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-zinc-200 bg-white shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95">

                    <Link
                        href="/admin/series/create"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition"
                        onClick={() => setOpen(false)}
                    >
                        <Tv className="h-4 w-4" />
                        Add Series
                    </Link>

                    <Link
                        href="/admin/movies/create"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition"
                        onClick={() => setOpen(false)}
                    >
                        <Film className="h-4 w-4" />
                        Add Movie
                    </Link>

                </div>
            )}
        </div>
    );
}