"use client";

import { useState } from "react";

export default function SeriesForm({
  initialData,
  onSubmit,
}: any) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      description: "",
      poster: "",
      year: "",
    }
  );

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 rounded-2xl border bg-white p-6">

      {/* TITLE */}
      <div>
        <label className="text-sm font-medium">
          Series Title
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border px-4 py-2 text-sm"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm font-medium">
          Description
        </label>
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
        <label className="text-sm font-medium">
          Poster URL
        </label>
        <input
          name="poster"
          value={form.poster}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border px-4 py-2 text-sm"
        />
      </div>

      {/* YEAR */}
      <div>
        <label className="text-sm font-medium">
          Release Year
        </label>
        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border px-4 py-2 text-sm"
        />
      </div>

      <button
        onClick={() => onSubmit(form)}
        className="w-full rounded-xl bg-primary py-2 text-sm text-white"
      >
        Save Series
      </button>

    </div>
  );
}