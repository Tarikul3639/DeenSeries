"use client";

import { useState } from "react";
import { GenresInput } from "@/components/ui/GenresInput";
import { Series } from "@/store/features/series/series.api";
import { Loader2, Save } from "lucide-react";

interface Props {
  initialData?: Partial<Series>;
  onSubmit: (data: Omit<Series, "_id" | "createdAt" | "updatedAt" | "slug">) => void;
  loading?: boolean;
}

export default function SeriesForm({ initialData, onSubmit, loading }: Props) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    tagline: initialData?.tagline || "",
    description: initialData?.description || "",
    coverPoster: initialData?.coverPoster || "",
    thumbnailPoster: initialData?.thumbnailPoster || "",
    genres: initialData?.genres || [],
    releaseDate: initialData?.releaseDate || "",
    totalEpisodes: initialData?.totalEpisodes || 0,
    rating: initialData?.rating ?? 0,
    isPublished: initialData?.isPublished ?? true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      totalEpisodes: Number(form.totalEpisodes),
      rating: form.rating === 0 ? undefined : Number(form.rating),
    });
  };

  return (
    <div className="space-y-5 rounded-2xl border bg-white p-6">
      {/* TITLE */}
      <Input
        label="Title"
        name="title"
        placeholder="Name of the series"
        value={form.title}
        onChange={handleChange}
      />

      {/* TAGLINE */}
      <Input
        label="Tagline"
        name="tagline"
        placeholder="Short catchy phrase about the series"
        value={form.tagline}
        onChange={handleChange}
      />

      {/* DESCRIPTION */}
      <Textarea
        label="Description"
        name="description"
        placeholder="Brief summary of the series"
        value={form.description}
        onChange={handleChange}
      />

      {/* COVER */}
      <Input
        label="Cover Poster"
        name="coverPoster"
        placeholder="URL to the main poster image"
        value={form.coverPoster}
        onChange={handleChange}
      />

      {/* THUMBNAIL */}
      <Input
        label="Thumbnail Poster"
        name="thumbnailPoster"
        placeholder="Optional - used for smaller displays"
        value={form.thumbnailPoster}
        onChange={handleChange}
      />

      {/* GENRES */}
      <GenresInput
        label="Genres"
        value={form.genres}
        onChange={(genres) =>
          setForm((prev) => ({
            ...prev,
            genres,
          }))
        }
      />

      {/* RELEASE DATE */}
      <Input
        label="Release Date"
        name="releaseDate"
        placeholder="YYYY-MM-DD"
        value={form.releaseDate}
        onChange={handleChange}
      />

      {/* TOTAL EPISODES */}
      <Input
        label="Total Episodes"
        name="totalEpisodes"
        type="number"
        placeholder="e.g. 24"
        value={form.totalEpisodes}
        onChange={handleChange}
      />

      {/* RATING */}
      <Input
        label="Rating (0 - 10)"
        name="rating"
        type="number"
        placeholder="e.g. 8.5"
        min={0}
        max={10}
        step={0.1}
        value={form.rating}
        onChange={handleChange}
      />

      {/* STATUS */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          name="isPublished"
          checked={form.isPublished}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <label className="text-sm font-medium">Published</label>
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="flex justify-center items-center gap-2 w-full rounded-sm bg-primary py-2 text-sm text-white hover:opacity-90 transition"
      >
        {loading ? (
          <Loader2 className="size-4 sm:size-4.5 animate-spin" />
        ) : (
          <Save className="size-4 sm:size-4.5" />
        )}
        {loading ? "Saving..." : "Save Series"}
      </button>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="mt-1 w-full rounded-sm border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

/* TEXTAREA COMPONENT */
function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="mt-1 w-full rounded-sm border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
