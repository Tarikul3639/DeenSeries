"use client";

import { useParams, useRouter } from "next/navigation";
import EpisodeForm from "../../components/EpisodeForm";
import { BackLink } from "@/components/ui/BackLink";
import { toast } from "sonner";

import {
    useGetEpisodeBySeriesQuery,
    useUpdateEpisodeMutation,
} from "@/store/features/episodes/episode.api";

export default function EditEpisodePage() {
    const { seriesId, episodeId } = useParams();
    const router = useRouter();

    const { data, isLoading } = useGetEpisodeBySeriesQuery({
        seriesId: seriesId as string,
        episodeId: episodeId as string,
    });

    const [updateEpisode, { isLoading: updating }] =
        useUpdateEpisodeMutation();

    const handleSubmit = async (formData: any) => {
        try {
            toast.promise(
                updateEpisode({
                    episodeId: episodeId as string,
                    data: formData,
                }).unwrap(),
                {
                    loading: "Updating episode...",
                    success: "Episode updated",

                    error: (err: any) => {
                        return err?.data?.message || err?.message || "Update failed";
                    },
                }
            );
        } catch (err: any) {
            console.error(err);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <BackLink href={`/admin/series/${seriesId}/episodes`} hoverLabel="Back to Episodes" />
                <h1 className="text-xl font-semibold">Edit Episode</h1>
            </div>

            <EpisodeForm
                initialData={data?.episode}
                onSubmit={handleSubmit}
                loading={updating}
            />
        </div>
    );
}