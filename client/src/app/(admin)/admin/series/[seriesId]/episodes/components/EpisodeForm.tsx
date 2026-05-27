"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import ImageUploader from "@/components/ui/ImageUploader";

export type EpisodeFormValues = {
  title: string;
  description: string;
  episodeNumber: number;
  embed: string;
  thumbnail: string;
  duration: string;
  quality: string;
  rating: number | undefined;
  releaseDate: string;
  isPublished: boolean;
};

interface Props {
  initialData?: Partial<EpisodeFormValues>;
  onSubmit: (data: EpisodeFormValues) => void;
  loading?: boolean;
}

export default function EpisodeForm({ initialData, onSubmit, loading }: Props) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    episodeNumber: initialData?.episodeNumber || 1,
    embed: initialData?.embed || "",
    thumbnail: initialData?.thumbnail || "",
    duration: initialData?.duration || "",
    quality: initialData?.quality || "HD",
    rating: initialData?.rating ?? "",
    releaseDate: initialData?.releaseDate || "",
    isPublished: initialData?.isPublished ?? true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      episodeNumber: Number(form.episodeNumber),
      rating: form.rating === "" ? undefined : Number(form.rating),
    });
  };

  return (
    <div className="space-y-5 rounded-2xl border bg-white p-6">
      <Input
        label="Title"
        name="title"
        placeholder="Episode 1 - The Beginning"
        value={form.title}
        onChange={handleChange}
      />
      <Textarea
        label="Description"
        name="description"
        placeholder="Write episode summary..."
        value={form.description}
        onChange={handleChange}
      />
      <Input
        label="Episode Number"
        name="episodeNumber"
        type="number"
        min={1}
        placeholder="e.g. 1"
        value={form.episodeNumber}
        onChange={handleChange}
      />

      {/* 🔥 THUMBNAIL */}
      <ImageUploader
        label="Thumbnail"
        hint="Recommended: 1280 × 720 px (16:9 ratio)"
        value={form.thumbnail}
        onChange={(url) => setForm((prev) => ({ ...prev, thumbnail: url }))}
      />

      <Textarea
        label="Embed Code"
        name="embed"
        placeholder="<iframe src='...'></iframe>"
        value={form.embed}
        onChange={handleChange}
        className="font-mono"
      />
      <Input
        label="Duration"
        name="duration"
        placeholder="e.g. 42m"
        value={form.duration}
        onChange={handleChange}
      />
      <Input
        label="Quality"
        name="quality"
        placeholder="e.g. HD, FullHD, 4K"
        value={form.quality}
        onChange={handleChange}
      />
      <Input
        label="Rating (0 - 10)"
        name="rating"
        type="number"
        min={0}
        max={10}
        step={0.1}
        placeholder="e.g. 8.5"
        value={form.rating}
        onChange={handleChange}
      />
      <Input
        label="Release Date"
        name="releaseDate"
        type="date"
        value={form.releaseDate}
        onChange={handleChange}
      />

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

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="flex justify-center items-center gap-2 w-full rounded-sm bg-primary py-2 text-sm text-white hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Save className="size-4" />
        )}
        {loading ? "Saving..." : "Save Episode"}
      </button>
    </div>
  );
}

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

function Textarea({ label, className = "", ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        {...props}
        rows={4}
        className={`mt-1 w-full rounded-sm border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 ${className}`}
      />
    </div>
  );
}