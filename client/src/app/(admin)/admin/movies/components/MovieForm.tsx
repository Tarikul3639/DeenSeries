"use client";

import { useState } from "react";
import { Movie, CreateMoviePayload } from "@/store/features/movies/movie.api";
import { Loader2, Save } from "lucide-react";
import { GenresInput } from "@/components/ui/GenresInput";
import ImageUploader from "@/components/ui/ImageUploader";

type MovieFormValues = {
  title: string;
  tagline?: string;
  description?: string;
  poster?: string;
  thumbnail?: string;
  embed: string;
  duration: string;
  releaseDate?: string;
  genres: string[];
  rating?: number;
  quality: string;
  isPublished: boolean;
};

interface MovieFormProps {
  initialData?: Movie;
  onSubmit: (data: CreateMoviePayload) => void;
  loading?: boolean;
}

export default function MovieForm({
  initialData,
  onSubmit,
  loading,
}: MovieFormProps) {
  const [form, setForm] = useState<MovieFormValues>({
    title: initialData?.title || "",
    tagline: initialData?.tagline || "",
    description: initialData?.description || "",
    poster: initialData?.poster || "",
    thumbnail: initialData?.thumbnail || "",
    embed: initialData?.embed || "",
    duration: initialData?.duration || "",
    releaseDate: initialData?.releaseDate || "",
    genres: initialData?.genres || [],
    rating: initialData?.rating || 0,
    quality: initialData?.quality || "HD",
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
    onSubmit(form);
  };

  return (
    <div className="space-y-6 rounded-2xl border bg-white p-6">
      <Input
        label="Title"
        name="title"
        placeholder="Enter movie title"
        value={form.title}
        onChange={handleChange}
      />
      <Input
        label="Tagline"
        name="tagline"
        placeholder="Enter movie tagline"
        value={form.tagline}
        onChange={handleChange}
      />
      <Textarea
        label="Description"
        name="description"
        placeholder="Enter movie description"
        value={form.description}
        onChange={handleChange}
      />

      {/* POSTER */}
      <ImageUploader
        label="Poster"
        hint="Recommended: 300 × 450 px (2:3 ratio)"
        value={form.poster}
        onChange={(url) => setForm((prev) => ({ ...prev, poster: url }))}
      />

      {/* THUMBNAIL */}
      <ImageUploader
        label="Thumbnail"
        hint="Recommended: 1280 × 720 px (16:9 ratio)"
        value={form.thumbnail}
        onChange={(url) => setForm((prev) => ({ ...prev, thumbnail: url }))}
      />

      <Textarea
        label="Embed Code"
        name="embed"
        placeholder="Enter video embed code or URL"
        value={form.embed}
        onChange={handleChange}
      />
      <Input
        label="Duration"
        name="duration"
        placeholder="e.g. 2h 30m"
        value={form.duration}
        onChange={handleChange}
      />
      <Input
        label="Release Date"
        name="releaseDate"
        type="date"
        value={form.releaseDate}
        onChange={handleChange}
      />

      <GenresInput
        label="Genres"
        value={form.genres}
        onChange={(genres) => setForm((prev) => ({ ...prev, genres }))}
        ClassNameInput="py-0.5 sm:py-1 px-1"
        placeholder="Type and press Enter"
      />

      <Input
        label="Rating"
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
        label="Quality"
        name="quality"
        placeholder="e.g. HD, FullHD, 4K"
        value={form.quality}
        onChange={handleChange}
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPublished"
          checked={form.isPublished}
          onChange={handleChange}
        />
        <label className="text-sm font-medium">Published</label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full rounded-sm bg-primary py-2 text-sm text-white disabled:opacity-60"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {loading ? "Saving..." : "Save Movie"}
      </button>
    </div>
  );
}

function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input {...props} className="mt-1 w-full rounded-sm border px-4 py-2 text-sm" />
    </div>
  );
}

function Textarea({
  label,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea {...props} rows={4} className="mt-1 w-full rounded-sm border px-4 py-2 text-sm" />
    </div>
  );
}