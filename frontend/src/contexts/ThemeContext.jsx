import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeCtx = createContext(null)
export const useTheme = () => useContext(ThemeCtx)

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    const saved = localStorage.getItem('tp_theme') || 'system'
    setTheme(saved)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const active = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme
    root.classList.toggle('dark', active === 'dark')
    localStorage.setItem('tp_theme', theme)
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme }), [theme])
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}
