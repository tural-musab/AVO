export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2" />
        <circle cx="50" cy="50" r="30" stroke="var(--sync-blue)" strokeWidth="1.5" strokeOpacity="0.3" />
        <path
          d="M20 75 L50 15 L80 75"
          stroke="var(--primary)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_8px_rgba(20,184,166,0.4)]"
        />
        <circle cx="35" cy="45" r="4.5" fill="var(--primary)" />
        <circle cx="65" cy="45" r="4.5" fill="var(--primary)" />
        <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
      </svg>
    </div>
  );
}
