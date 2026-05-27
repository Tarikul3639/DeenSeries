"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function AddEpisodePage() {
  const { seriesId } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    embed: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("NEW EPISODE:", {
      seriesId,
      ...form,
    });

    alert("Episode added (demo)");

    router.push(`/admin/series/${seriesId}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <Link
          href={`/admin/series/${seriesId}`}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Save className="h-4 w-4" />
          Save Episode
        </button>
      </div>

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-semibold">
          Add New Episode
        </h1>
        <p className="text-sm text-zinc-500">
          Create and publish a new episode
        </p>
      </div>

      {/* FORM */}
      <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">

        {/* TITLE */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Episode Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Episode 1 - The Beginning"
            className="w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Write episode summary..."
            className="w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* EMBED */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Video Embed Code
          </label>
          <textarea
            name="embed"
            value={form.embed}
            onChange={handleChange}
            rows={4}
            placeholder="<iframe src='...'></iframe>"
            className="w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm font-mono outline-none focus:border-primary"
          />
        </div>

      </div>

    </div>
  );
}