"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { useAuth } from "@/hooks/useAuth";
import AdminShell from "@/components/AdminShell";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // const { isAuth, loading } = useAuth();
    const isAuth = true; // Placeholder until useAuth is implemented
    const loading = false; // Placeholder until useAuth is implemented
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuth) {
            router.replace("/login");
        }
    }, [isAuth, loading, router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center text-sm text-zinc-500">
                Checking access...
            </div>
        );
    }

    if (!isAuth) return null;

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 mt-4">
            <AdminShell>
                {/* MAIN CONTENT */}
                <main className="flex-1">{children}</main>
            </AdminShell>
        </div>
    );
}
