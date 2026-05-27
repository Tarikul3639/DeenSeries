"use client";

import { useParams, useRouter } from "next/navigation";
import EpisodeForm from "../components/EpisodeForm";
import { BackLink } from "@/components/ui/BackLink";
import { toast } from "sonner";

import { useCreateEpisodeMutation } from "@/store/features/episodes/episode.api";

export default function CreateEpisodePage() {
    const { seriesId } = useParams();
    const router = useRouter();

    const [createEpisode, { isLoading }] = useCreateEpisodeMutation();

    const handleSubmit = async (data: any) => {
        try {
            toast.promise(createEpisode({ seriesId: seriesId as string, data }).unwrap(), {
                loading: "Creating episode...",
                success: "Episode created successfully",
                error: (err: any) =>
                    err?.data?.message || err?.message || "Creation failed",
            });

            router.push(`/admin/series/${seriesId}/episodes`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <BackLink href={`/admin/series/${seriesId}/episodes`} hoverLabel="Back to Episodes" />
                <h1 className="text-xl font-semibold">Create Episode</h1>
            </div>

            <EpisodeForm onSubmit={handleSubmit} loading={isLoading} />
        </div>
    );
}