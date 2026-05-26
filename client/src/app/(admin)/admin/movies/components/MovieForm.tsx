"use client";

import { useState } from "react";
import { Movie, CreateMoviePayload } from "@/store/features/movies/movie.api";
import { Loader2, Save} from "lucide-react";
import { GenresInput } from "@/components/ui/GenresInput";

/* ---------------- FORM TYPE ---------------- */
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

/* ---------------- COMPONENT ---------------- */
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

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  /* ---------------- GENRES LOGIC ---------------- */

  const removeGenre = (index: number) => {
    setForm((prev) => ({
      ...prev,
      genres: prev.genres.filter((_, i) => i !== index),
    }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <div className="space-y-6 rounded-2xl border bg-white p-6">

      <Input label="Title" name="title" value={form.title} onChange={handleChange} />
      <Input label="Tagline" name="tagline" value={form.tagline} onChange={handleChange} />
      <Textarea label="Description" name="description" value={form.description} onChange={handleChange} />
      <Input label="Poster URL" name="poster" value={form.poster} onChange={handleChange} />
      <Input label="Thumbnail URL" name="thumbnail" value={form.thumbnail} onChange={handleChange} />
      <Textarea label="Embed Code" name="embed" value={form.embed} onChange={handleChange} />
      <Input label="Duration" name="duration" value={form.duration} onChange={handleChange} />
      <Input label="Release Date" name="releaseDate" value={form.releaseDate} onChange={handleChange} />

      <GenresInput
        label="Genres"
        value={form.genres}
        onChange={(genres) =>
          setForm((prev) => ({
            ...prev,
            genres,
          }))
        }
        ClassNameInput="py-0.5 sm:py-1 px-1"
        placeholder="Type and press Enter"
      />

      <Input label="Rating" name="rating" value={form.rating} onChange={handleChange} />
      <Input label="Quality" name="quality" value={form.quality} onChange={handleChange} />

      {/* PUBLISH */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isPublished"
          checked={form.isPublished}
          onChange={handleChange}
        />
        <label>Published</label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full rounded-sm bg-primary py-2 text-sm text-white"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Save className="h-4 w-4" />}
        {loading ? "Saving..." : "Save Movie"}
      </button>
    </div>
  );
}

/* ---------------- INPUT COMPONENTS ---------------- */

function Input({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="mt-1 w-full rounded-sm border px-4 py-2 text-sm"
      />
    </div>
  );
}

function Textarea({
  label,
  ...props
}: {
  label: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        {...props}
        rows={4}
        className="mt-1 w-full rounded-sm border px-4 py-2 text-sm"
      />
    </div>
  );
}