"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2, Upload, Image as ImageIcon, RefreshCw } from "lucide-react";
import {
    useLazyGetSignatureQuery,
    useDeleteMediaMutation,
} from "@/store/features/media/media.api";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { toast } from "sonner";

interface Props {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    hint?: string;
}

export default function ImageUploader({
    value,
    onChange,
    label = "Upload Image",
    hint = "PNG, JPG or WEBP — max 5 MB",
}: Props) {
    const [preview, setPreview] = useState<string | null>(value || null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [getSignature] = useLazyGetSignatureQuery();
    const [deleteMedia] = useDeleteMediaMutation();

    useEffect(() => {
        setPreview(value || null);
    }, [value]);

    const extractPublicId = (url: string) => {
        const urlParts = url.split("/upload/")[1];
        const withoutVersion = urlParts.split("/").slice(1).join("/");
        return withoutVersion.replace(/\.[^/.]+$/, "");
    };

    const handleFile = async (file: File) => {
        setLoading(true);
        setFileName(file.name);
        try {
            const sig = await getSignature().unwrap();
            const result = await uploadToCloudinary(file, sig);
            onChange(result.secure_url);
            setPreview(result.secure_url);
        } catch (err) {
            console.error(err);
            setFileName(null);
            toast.error("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async () => {
        if (!preview) return;
        setDeleting(true);
        try {
            const publicId = extractPublicId(preview);
            await deleteMedia(publicId).unwrap();
            setPreview(null);
            setFileName(null);
            onChange("");
        } catch (err) {
            console.error(err);
            toast.error("Delete failed");
        } finally {
            setDeleting(false);
        }
    };

    const busy = loading || deleting;

    return (
        <div className="space-y-1.5">
            <label className="text-sm font-medium">{label}</label>

            <div
                className={[
                    "flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors",
                    "bg-background",
                    preview
                        ? "border border-border"
                        : "border border-dashed border-border hover:border-primary hover:bg-primary/10 dark:hover:bg-primary/20",
                ].join(" ")}
            >
                {/* Thumbnail */}
                <div className="h-12 w-12 shrink-0 rounded-md border border-border overflow-hidden flex items-center justify-center bg-muted text-muted-foreground">
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    ) : preview ? (
                        <img src={preview} className="h-full w-full object-cover" />
                    ) : (
                        <ImageIcon className="h-4 w-4" />
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                    <p className="text-sm truncate text-foreground">
                        {fileName ?? (preview ? "Uploaded" : "No image selected")}
                    </p>

                    {loading ? (
                        <div className="h-1 mt-1 rounded-full overflow-hidden bg-muted">
                            <div className="h-full w-1/2 bg-primary rounded-full animate-[progress_1.2s_ease-in-out_infinite]" />
                        </div>
                    ) : (
                        <p className="text-xs text-muted-foreground">{hint}</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                    <label
                        className={[
                            "cursor-pointer text-xs font-medium px-2.5 py-1 rounded",
                            "bg-primary/10 text-primary border border-primary/20",
                            "hover:bg-primary/20 transition-colors",
                            busy ? "pointer-events-none opacity-50" : "",
                        ].join(" ")}
                    >
                        {preview ? (
                            <div className="flex items-center gap-1">
                                <RefreshCw className="h-3.5 w-3.5" /> Change
                            </div>
                        ) : (
                            <div className="flex items-center gap-1">
                                <Upload className="h-3.5 w-3.5" /> Upload
                            </div>
                        )}
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            disabled={busy}
                            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                        />
                    </label>

                    {preview && (
                        <button
                            onClick={handleRemove}
                            disabled={busy}
                            className="h-7 w-7 flex items-center justify-center rounded border border-border text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/10 transition-colors disabled:opacity-50"
                        >
                            {deleting ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
