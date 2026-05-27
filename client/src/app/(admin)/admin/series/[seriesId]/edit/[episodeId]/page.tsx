"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

/* DEMO LOAD */
const getEpisode = (id: string) => ({
  id,
  title: `Episode ${id}`,
  description: "Demo description",
  embed: "<iframe src='https://www.youtube.com/embed/dQw4w9WgXcQ'></iframe>",
});

export default function EditEpisodePage() {
  const { seriesId, episodeId } = useParams();
  const router = useRouter();

  const [form, setForm] = useState(getEpisode(episodeId as string));

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    console.log("UPDATED:", form);

    alert("Episode updated");

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
          onClick={handleUpdate}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Save className="h-4 w-4" />
          Update
        </button>
      </div>

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-semibold">
          Edit Episode
        </h1>
        <p className="text-sm text-zinc-500">
          Update episode information
        </p>
      </div>

      {/* FORM */}
      <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">

        {/* TITLE */}
        <div>
          <label className="text-sm font-medium">
            Episode Title
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-primary"
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
            className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-primary"
          />
        </div>

        {/* EMBED */}
        <div>
          <label className="text-sm font-medium">
            Embed Code
          </label>
          <textarea
            name="embed"
            value={form.embed}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm font-mono outline-none focus:border-primary"
          />
        </div>

      </div>

    </div>
  );
}