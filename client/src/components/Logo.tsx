import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/" className="group flex items-center gap-3">

            {/* LOGO ICON */}
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/15 bg-linear-to-br from-primary/15 via-background to-background shadow-sm transition-transform group-hover:scale-[1.05]">

                {/* Arabic letter */}
                <span className="text-4xl font-black text-primary leading-none">
                    د
                </span>
            </div>

            {/* TEXT */}
            <div className="leading-tight text-left">

                {/* top row */}
                <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold tracking-tight text-foreground">
                        Deen<span className="text-primary">Series</span>
                    </span>

                    <span className="hidden sm:block rounded-full border border-primary/15 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
                        Islamic
                    </span>
                </div>

                {/* arabic */}
                <p
                    dir="rtl"
                    className="text-sm text-muted-foreground font-medium leading-none -mt-1"
                >
                    دين <span className="text-primary">سيريز</span>
                </p>
            </div>

        </Link>
    );
}