"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    Film,
} from "lucide-react";
import Link from "next/link";

/* DEMO DATA */
const SERIES = {
    id: "gilani",
    title: "Gilani Series",
    description:
        "Spiritual journey of Sheikh Abdul Qadir Gilani.",
    totalEpisodes: 10,
    episodes: Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 1}`,
        title: `Episode ${i + 1}`,
    })),
};

export default function SeriesDetailsPage() {
    const { seriesId } = useParams();

    const [episodes, setEpisodes] = useState(SERIES.episodes);

    const handleDelete = (id: string) => {
        setEpisodes((prev) => prev.filter((ep) => ep.id !== id));
    };

    return (
        <div className="space-y-10">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        {SERIES.title}
                    </h1>
                    <p className="text-sm text-zinc-500 mt-1">
                        {SERIES.description}
                    </p>
                </div>

                <Link href={`/admin/series/${seriesId}/add`} className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                    <Plus className="h-4 w-4" />
                    Add Episode
                </Link>
            </div>

            {/* SERIES INFO CARD */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">

                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Series Info
                    </h2>

                    <Link href={`/admin/series/edit/${SERIES.id}`} className="flex items-center gap-1 text-sm text-zinc-500 hover:text-primary">
                        <Pencil className="h-4 w-4" />
                        Edit
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 text-sm">
                    <div>
                        <p className="text-zinc-400 text-xs">ID</p>
                        <p>{SERIES.id}</p>
                    </div>

                    <div>
                        <p className="text-zinc-400 text-xs">Total Episodes</p>
                        <p>{episodes.length}</p>
                    </div>

                    <div>
                        <p className="text-zinc-400 text-xs">Status</p>
                        <p className="text-green-600">Active</p>
                    </div>
                </div>

            </div>

            {/* EPISODES LIST */}
            <div className="space-y-4">

                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Episodes
                    </h2>

                    <span className="text-sm text-zinc-500">
                        {episodes.length} total
                    </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">

                    {/* HEADER */}
                    <div className="grid grid-cols-3 gap-4 border-b px-5 py-3 text-xs font-semibold uppercase text-zinc-400">
                        <span>Episode</span>
                        <span>ID</span>
                        <span className="text-right">Actions</span>
                    </div>

                    {/* BODY */}
                    <div className="divide-y">
                        {episodes.map((ep) => (
                            <div
                                key={ep.id}
                                className="grid grid-cols-3 items-center gap-4 px-5 py-4 hover:bg-zinc-50 transition"
                            >

                                {/* TITLE */}
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Film className="h-4 w-4" />
                                    </div>

                                    <p className="text-sm font-medium">
                                        {ep.title}
                                    </p>
                                </div>

                                {/* ID */}
                                <span className="text-sm text-zinc-500">
                                    {ep.id}
                                </span>

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-2">

                                    <Link href={`/admin/series/${seriesId}/edit/${ep.id}`}
                                        className="rounded-lg border border-zinc-200 p-2 text-zinc-600 hover:bg-zinc-100">
                                        <Pencil className="h-4 w-4" />
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(ep.id)}
                                        className="rounded-lg border border-zinc-200 p-2 text-red-500 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </div>
    );
}