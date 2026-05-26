"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    value: string[];
    onChange: (genres: string[]) => void;
    label?: string;
    placeholder?: string;
    ClassNameInput?: string;
}

export const GenresInput = ({
    value,
    onChange,
    label = "Genres",
    placeholder = "Type and press Enter",
    ClassNameInput = "",
}: Props) => {
    const [input, setInput] = useState("");

    /* ADD */
    const addGenre = (val: string) => {
        const newGenres = val
            .split(",")
            .map((g) => g.trim())
            .filter(Boolean);

        const updated = [...new Set([...value, ...newGenres])]; // no duplicate
        onChange(updated);
    };

    /* REMOVE */
    const removeGenre = (index: number) => {
        const updated = value.filter((_, i) => i !== index);
        onChange(updated);
    };

    /* KEY HANDLER */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();

            if (!input.trim()) return;

            addGenre(input);
            setInput("");
        }
    };

    return (
        <div>
            <label className="text-sm font-medium">{label}</label>

            <div className="mt-2 flex flex-wrap gap-2 border rounded-sm p-2">

                {/* TAGS */}
                {value.map((genre, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-1 bg-slate-100 text-sm px-2 py-1 rounded"
                    >
                        <span>{genre}</span>

                        <button
                            type="button"
                            onClick={() => removeGenre(index)}
                            className="text-slate-500 hover:text-red-500"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}

                {/* INPUT */}
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={cn("flex-1 min-w-30 outline-none text-sm py-0.5 sm:py-1 px-1", ClassNameInput)}
                />
            </div>
        </div>
    );
}

/*
Example:

<GenresInput
    label="Genres"
    value={form.genres}
    placeholder="Type and press Enter"
    onChange={(genres) =>
        setForm((prev) => ({
        ...prev,
        genres,
        }))
    }
    />

const [genres, setGenres] = useState<string[]>([]);
*/