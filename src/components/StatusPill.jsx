export default function StatusPill({ children }) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-muted">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lilac opacity-50" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lilac" />
      </span>
      {children}
    </span>
  )
}
