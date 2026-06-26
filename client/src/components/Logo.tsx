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
        className="shrink-0"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect
          x="0"
          y="0"
          width="170"
          height="170"
          rx="38"
          fill="url(#logo-gradient)"
        />

        {/* Glass highlight */}
        <rect
          x="0"
          y="0"
          width="170"
          height="85"
          rx="38"
          fill="var(--primary-foreground)"
          fillOpacity="0.08"
        />

        {/* Small decoration */}
        <circle
          cx="138"
          cy="24"
          r="7"
          fill="var(--primary-foreground)"
          fillOpacity="0.22"
        />
        <circle
          cx="138"
          cy="24"
          r="3.5"
          fill="var(--primary-foreground)"
          fillOpacity="0.5"
        />

        {/* Arabic Letter */}
        <text
          x="85"
          y="75"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="100"
          fill="var(--primary-foreground)"
        >
          د
        </text>
      </svg>

      {/* TEXT */}
      <div className="text-left">
        {/* Top row */}
        <div className="flex items-center gap-2 -mt-1.5">
          <span className="text-xl font-semibold tracking-tight text-foreground">
            Deen<span className="text-primary">Series</span>
          </span>

          <span className="hidden rounded-full border border-primary/15 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-primary sm:block">
            Islamic
          </span>
        </div>

        {/* Arabic */}
        <p
          dir="rtl"
          className="-mt-1 text-sm font-medium leading-none text-muted-foreground"
        >
          دين <span className="text-primary">سيريز</span>
        </p>
      </div>
    </Link>
  );
};