"use client";

import { useState } from "react";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
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

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox" ? e.target.checked : value,
    });
  };

  const handleSubmit = () => {
    onSubmit({
      ...form,
      episodeNumber: Number(form.episodeNumber),
      rating: form.rating === "" ? undefined : Number(form.rating),
    });
  };

  return (
    <div className="space-y-5 rounded-xl border bg-white p-6">

      <Input label="Title" name="title" value={form.title} onChange={handleChange} />

      <Textarea label="Description" name="description" value={form.description} onChange={handleChange} />

      <Input label="Episode Number" name="episodeNumber" type="number" value={form.episodeNumber} onChange={handleChange} />

      <Textarea label="Embed Code" name="embed" value={form.embed} onChange={handleChange} />

      <Input label="Thumbnail" name="thumbnail" value={form.thumbnail} onChange={handleChange} />

      <Input label="Duration" name="duration" value={form.duration} onChange={handleChange} />

      <Input label="Quality" name="quality" value={form.quality} onChange={handleChange} />

      <Input label="Rating" name="rating" type="number" value={form.rating} onChange={handleChange} />

      <Input label="Release Date" name="releaseDate" value={form.releaseDate} onChange={handleChange} />

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
        className="w-full bg-primary text-white py-2 rounded-sm"
      >
        {loading ? "Saving..." : "Save Episode"}
      </button>
    </div>
  );
}

/* SMALL COMPONENTS */
function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input {...props} className="w-full border rounded-sm px-3 py-2 mt-1" />
    </div>
  );
}

function Textarea({ label, ...props }: any) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea {...props} className="w-full border rounded-sm px-3 py-2 mt-1" />
    </div>
  );
}