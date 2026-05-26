"use client";

import { useParams } from "next/navigation";
import { Clock, Pencil, Play, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import {
    useGetEpisodesBySeriesQuery,
    useDeleteEpisodeMutation,
} from "@/store/features/episodes/episode.api";

export default function SeriesEpisodesPage() {
    const { seriesId } = useParams();

    const { data, isLoading } = useGetEpisodesBySeriesQuery(
        seriesId as string
    );

    const [deleteEpisode] = useDeleteEpisodeMutation();

    const handleDelete = async (episodeId: string) => {
        if (!confirm("Delete this episode?")) return;

        toast.promise(
            deleteEpisode({
                episodeId,
                seriesId: seriesId as string,
            }).unwrap(),
            {
                loading: "Deleting episode...",
                success: "Episode deleted",
                error: "Delete failed",
            }
        );
    };

    const series = data?.series;
    const episodes = data?.episode || [];

    return (
        <div className="space-y-6">

            {/* HERO SAME */}
            {series && (
                <div className="relative rounded-xl overflow-hidden border">
                    <img
                        src={series.coverPoster || "/placeholder.jpg"}
                        alt={series.title}
                        className="w-full h-56 object-cover"
                    />

                    <div className="absolute inset-0 bg-black/60 flex items-end p-6">
                        <div className="text-white space-y-2">
                            <h1 className="text-2xl font-bold">{series.title}</h1>

                            <p className="text-sm opacity-90 max-w-xl">
                                {series.description || "No description available"}
                            </p>

                            <div className="text-xs opacity-80 flex gap-3 mt-2">
                                <span>{series.totalEpisodes || 0} Episodes</span>
                                <span>
                                    {series.releaseDate
                                        ? new Date(series.releaseDate).getFullYear()
                                        : "N/A"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* HEADER */}
            <div className="flex items-center justify-between px-2">
                <h2 className="text-lg font-semibold">Episodes</h2>

                <Link
                    href={`/admin/series/${seriesId}/episodes/create`}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 transition"
                >
                    <Plus className="h-4 w-4" />
                    Add Episode
                </Link>
            </div>


            {/* TABLE */}
            <div className="rounded-xl border bg-white overflow-x-auto">

                <table className="w-full text-sm">

                    {/* HEAD */}
                    <thead className="bg-muted/40 text-xs uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left">Ep</th>
                            <th className="px-5 py-3 text-left">Title</th>
                            <th className="px-5 py-3 text-left">Duration</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>

                        {/* LOADING */}
                        {isLoading && (
                            <tr>
                                <td colSpan={4} className="py-10 text-center text-muted-foreground">
                                    Loading episodes...
                                </td>
                            </tr>
                        )}

                        {/* DATA */}
                        {!isLoading &&
                            episodes.map((ep, index) => (
                                <tr
                                    key={ep._id}
                                    className="border-t hover:bg-muted/50 transition"
                                >

                                    {/* EPISODE NUMBER */}
                                    <td className="px-5 py-4 text-muted-foreground font-medium">
                                        {String(ep.episodeNumber || index + 1).padStart(2, "0")}
                                    </td>

                                    {/* TITLE (same UI) */}
                                    <td className="px-2 py-4">
                                        <div className="flex items-center gap-4">

                                            <div className="h-9 w-9 flex items-center justify-center rounded-md bg-primary/10 text-primary">
                                                <Play className="h-4 w-4" />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium">{ep.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    ID: {ep._id.slice(0, 8)}...
                                                </p>
                                            </div>

                                        </div>
                                    </td>

                                    {/* DURATION */}
                                    <td className="px-2 py-4 text-muted-foreground">
                                        <div className="flex items-center gap-2 text-xs">
                                            <Clock className="h-4 w-4" />
                                            {ep.duration || "N/A"}
                                        </div>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-2 py-4">
                                        <div className="flex justify-end gap-2">

                                            <Link
                                                href={`/admin/series/${seriesId}/episodes/edit/${ep._id}`}
                                                className="p-2 rounded-md hover:bg-primary/10 text-zinc-600 hover:text-primary"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(ep._id)}
                                                className="p-2 rounded-md hover:bg-red-50 text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            ))}

                        {/* EMPTY */}
                        {!isLoading && episodes.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-10 text-center text-muted-foreground">
                                    No episodes found
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
}