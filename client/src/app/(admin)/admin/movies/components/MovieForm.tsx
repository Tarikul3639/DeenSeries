"use client";

import { useState } from "react";

export default function MovieForm({
  initialData,
  onSubmit,
}: any) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      description: "",
      poster: "",
      year: "",
      duration: "",
      embed: "",
    }
  );

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 rounded-2xl border bg-white p-6">

      {/* TITLE */}
      <div>
        <label className="text-sm font-medium">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border px-4 py-2 text-sm"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full rounded-xl border px-4 py-2 text-sm"
        />
      </div>

      {/* POSTER */}
      <div>
        <label className="text-sm font-medium">Poster URL</label>
        <input
          name="poster"
          value={form.poster}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border px-4 py-2 text-sm"
        />
      </div>

      {/* YEAR */}
      <div>
        <label className="text-sm font-medium">Year</label>
        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border px-4 py-2 text-sm"
        />
      </div>

      {/* DURATION */}
      <div>
        <label className="text-sm font-medium">Duration</label>
        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="2h 30m"
          className="mt-1 w-full rounded-xl border px-4 py-2 text-sm"
        />
      </div>

      {/* EMBED */}
      <div>
        <label className="text-sm font-medium">Embed Code</label>
        <textarea
          name="embed"
          value={form.embed}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full rounded-xl border px-4 py-2 text-sm font-mono"
        />
      </div>

      <button
        onClick={() => onSubmit(form)}
        className="w-full rounded-xl bg-primary py-2 text-sm text-white"
      >
        Save Movie
      </button>

    </div>
  );
}