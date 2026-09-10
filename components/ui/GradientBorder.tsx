export function GradientBorder({
  children,
  className = "",
  from = "from-white/[0.12]",
  to = "to-white/[0.02]",
}: {
  children: React.ReactNode;
  className?: string;
  from?: string;
  to?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-b ${from} ${to} p-[1px] ${className}`}
    >
      <div className="h-full w-full rounded-2xl bg-[#060b18]/90 backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}