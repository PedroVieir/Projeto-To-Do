// src/components/ThemeToggle.jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle({ className = '' }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'light'
    const isDark = stored === 'dark'
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button
      onClick={toggle}
      aria-label="Alternar tema"
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 backdrop-blur text-white transition ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {dark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="text-xl"
          >
            ☀️
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="text-xl"
          >
            🌙
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
