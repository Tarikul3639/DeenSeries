import Link from "next/link";

export const Logo = ({ size = 49 }) => {
    return (
        <Link href="/" className="group flex items-center gap-3">

            {/* LOGO ICON */}
            <svg
                width={size}
                height={size}
                viewBox="0 0 170 170"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4f6ef7" />
                        <stop offset="100%" stopColor="#1a2fa8" />
                    </linearGradient>
                </defs>

                <rect x="0" y="0" width="170" height="170" rx="38" fill="#0c39d8" />
                <rect x="0" y="0" width="170" height="85" rx="38" fill="#ffffff" fillOpacity="0.095" />
                <circle cx="138" cy="24" r="7" fill="#ffffff" fillOpacity="0.25" />
                <circle cx="138" cy="24" r="3.5" fill="#ffffff" fillOpacity="0.5" />

                <text
                    fontFamily="Arial, sans-serif"
                    fontWeight="900"
                    fontSize="100"
                    textAnchor="middle"
                    dominantBaseline="central"
                    x="85"
                    y="75"
                    fill="#ffffff"
                >
                    د
                </text>
            </svg>

            {/* TEXT */}
            <div className="text-left">

                {/* top row */}
                <div className="flex items-center gap-2 -mt-1.5">
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