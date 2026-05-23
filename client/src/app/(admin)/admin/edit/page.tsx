"use client";

import { useEffect, useState } from "react";

export default function AdminEdit() {
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");

  /* 🔐 check login */
  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      window.location.href = "/admin";
    }

    const saved = localStorage.getItem("seriesData");
    if (saved) setJsonText(saved);
  }, []);

  /* 💾 save */
  const handleSave = () => {
    try {
      JSON.parse(jsonText); // validate JSON
      localStorage.setItem("seriesData", jsonText);
      setError("");
      alert("Saved successfully ✅");
    } catch (err) {
      setError("Invalid JSON ❌");
    }
  };

  /* 🧹 clear */
  const handleClear = () => {
    if (confirm("Clear all data?")) {
      setJsonText("");
      localStorage.removeItem("seriesData");
    }
  };

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Edit Series JSON</h1>

          <button
            onClick={() => {
              localStorage.removeItem("admin");
              window.location.href = "/admin";
            }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Logout
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-3 text-sm text-red-500">{error}</p>
        )}

        {/* Editor */}
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="mt-4 w-full h-[400px] rounded-2xl border border-border bg-background p-4 text-sm font-mono"
          placeholder="Paste your JSON here..."
        />

        {/* Actions */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleSave}
            className="rounded-xl bg-primary px-6 py-2 text-primary-foreground"
          >
            Save
          </button>

          <button
            onClick={handleClear}
            className="rounded-xl border border-border px-6 py-2"
          >
            Clear
          </button>
        </div>

        {/* Preview */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Preview</h2>

          <div className="rounded-xl border border-border p-4 text-sm text-muted-foreground max-h-60 overflow-auto">
            <pre>{jsonText}</pre>
          </div>
        </div>

      </div>
    </main>
  );
}