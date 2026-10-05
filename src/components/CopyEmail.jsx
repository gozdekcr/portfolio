import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      // clipboard unavailable — the mailto button below still works
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleCopy}
        className="text-3xl font-medium leading-none tracking-tight text-ink transition-colors hover:text-lilac sm:text-5xl md:text-6xl"
      >
        {email}
      </button>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass absolute -top-10 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-sm text-lilac"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
