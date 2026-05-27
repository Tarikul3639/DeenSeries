"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import {
    LayoutDashboard,
    Tv,
    Film,
    PlusCircle,
    Settings,
    Menu,
    X,
    LogOut,
    ChevronRight,
} from "lucide-react";

type NavItem = {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
};

const navItems = [
    { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Series", href: "/admin/series", icon: Tv },
    { label: "Movies", href: "/admin/movies", icon: Film },

    // 👇 special dropdown
    {
        label: "Add New",
        href: "#",
        icon: PlusCircle,
        children: [
            { label: "Add Series", href: "/admin/series/create" },
            { label: "Add Movie", href: "/admin/movies/create" },
        ],
    },

    // 👇 disabled
    {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
        disabled: true,
    },
];

function SidebarLink({
    item,
    active,
    onClick,
}: any) {
    const Icon = item.icon;
    const [open, setOpen] = useState(false);

    // 🔒 Disabled
    if (item.disabled) {
        return (
            <div className="flex items-center gap-3 rounded-sm px-3.5 py-2 text-xs md:text-sm text-zinc-400 cursor-not-allowed opacity-60">
                <Icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
            </div>
        );
    }

    // 📂 Dropdown (Add New)
    if (item.children) {
        return (
            <div className="space-y-1">

                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center gap-3 rounded-sm px-3.5 py-2 sm:py-2.5 text-xs md:text-sm lg:text-base text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition"
                >
                    <Icon className="size-4 md:size-4.5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronRight
                        className={`size-4 md:size-4.5 transition ${open ? "rotate-90" : ""
                            }`}
                    />
                </button>

                {open && (
                    <div className="ml-6 space-y-0.5">
                        {item.children.map((child: any) => (
                            <Link
                                key={child.href}
                                href={child.href}
                                onClick={onClick}
                                className="block rounded-sm px-3 py-2 text-xs md:text-sm text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition"
                            >
                                {child.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // 🧱 Normal Link
    return (
        <Link
            href={item.href}
            onClick={onClick}
            className={[
                "group flex items-center gap-3 rounded-sm px-3.5 py-2 sm:py-2.5 text-xs md:text-sm lg:text-base font-medium",
                active
                    ? "bg-primary text-primary-foreground shadow-xs shadow-primary/10 font-semibold"
                    : "text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900",
            ].join(" ")}
        >
            <Icon className="size-4 md:size-4.5" />
            <span className="flex-1">{item.label}</span>
        </Link>
    );
}

export default function AdminShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const activePath = useMemo(() => pathname, [pathname]);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem("admin-auth");
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-zinc-50/50 text-zinc-800 antialiased">

            {/* 🔝 PURE FLOATING GLASS HEADER BAR */}
            <header className="fixed left-0 top-0 z-50 py-2 w-full border-b border-zinc-200/60 bg-white/70 backdrop-blur-md">
                <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

                    <div className="flex items-center gap-4">
                        {/* Mobile Nav Menu Button */}
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="group inline-flex p-2 items-center justify-center rounded-lg border border-transparent bg-zinc-50/30 text-zinc-600 backdrop-blur-xs transition-all duration-200 hover:border-zinc-300 hover:bg-white hover:text-zinc-900 active:scale-90 md:hidden"
                            aria-label="Open sidebar"
                        >
                            <Menu className="size-5 transition-transform duration-200 group-hover:scale-105" />
                        </button>

                        {/* Dynamic Custom Branding Logo Wrapper */}
                        <div className="flex items-center gap-2.5">
                            <div className="scale-90 origin-left">
                                <Logo />
                            </div>
                            <div className="h-4 w-px bg-zinc-200 hidden sm:block" />
                            <div className="leading-tight hidden sm:block">
                                <h1 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Control Suite
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Minimalist Log Out Trigger */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="group inline-flex items-center gap-2 rounded-sm bg-red-50/40 px-3 sm:px-3.5 py-2 text-xs font-semibold text-red-600 border border-red-100/50 backdrop-blur-xs transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-lg hover:shadow-red-500/20 active:scale-95 md:text-sm"
                    >
                        <LogOut className="size-4 opacity-90 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:scale-105 group-hover:rotate-12" />
                        <span className="hidden sm:inline tracking-wide">Logout</span>
                    </button>

                </div>
            </header>

            {/* 📱 MOBILE NAVIGATION DRAWER */}
            <div
                className={[
                    "fixed inset-0 z-50 md:hidden transition-all duration-300",
                    open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
                ].join(" ")}
            >
                <div
                    className="absolute inset-0 bg-zinc-950/20 backdrop-blur-xs transition-opacity"
                    onClick={() => setOpen(false)}
                />

                <aside
                    className={[
                        "absolute left-0 top-0 h-full w-[78vw] max-w-xs border-r border-zinc-200/80 bg-white p-5 shadow-xl transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1)",
                        open ? "translate-x-0" : "-translate-x-full",
                    ].join(" ")}
                >
                    <div className="mb-6 flex items-center justify-between border-b border-zinc-100 pb-3">
                        <Logo />

                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-zinc-400 transition-all duration-200 hover:bg-zinc-100 hover:text-zinc-900 active:bg-zinc-200"
                            aria-label="Close sidebar"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <SidebarLink
                                key={item.href}
                                item={item}
                                active={activePath === item.href}
                                onClick={() => setOpen(false)}
                            />
                        ))}
                    </nav>
                </aside>
            </div>

            {/* 💻 DESKTOP COMPACT SIDEBAR */}
            <aside className="fixed left-0 top-14 hidden h-[calc(100vh-3.5rem)] w-70 border-r border-zinc-200/60 bg-white/50 px-4 py-6 md:block">

                {/* Helper Context Dashboard Banner Box */}
                <div className="mb-5 rounded-sm border border-zinc-200/60 bg-zinc-50/50 p-3.5">
                    <p className="text-sm md:text-base font-bold tracking-tight text-zinc-900">Console Hub</p>
                    <p className="mt-0.5 text-xs sm:text-sm leading-relaxed text-zinc-400">
                        Realtime operations matrix for core media streams.
                    </p>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <SidebarLink
                            key={item.href}
                            item={item}
                            active={activePath === item.href}
                        />
                    ))}
                </nav>
            </aside>

            {/* ⚙️ CORE ADMINISTRATIVE WORKSPACE GRID */}
            <main className="pt-14 md:pl-64">
                <div className="min-h-[calc(100vh-3.5rem)] p-4 sm:p-6 lg:p-8 mx-auto">
                    {children}
                </div>
            </main>

        </div>
    );
}