// src/components/Header.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Sun, Moon, CheckCircle2, Users, LogOut } from 'lucide-react'

export default function Header() {
  const { isAuth, user, logout } = useAuth()
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const navigate = useNavigate()

  useEffect(() => {
    const root = document.documentElement
    const isDark = theme === 'dark'
    root.classList.toggle('dark', isDark)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-zinc-900/60 border-b border-white/20 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-zinc-800 dark:text-white">
          <span className="inline-flex p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-soft">✓</span>
          <span>ToDo<span className="text-indigo-600 dark:text-indigo-400">+</span></span>
        </Link>

        <nav className="ml-auto flex items-center gap-2 sm:gap-4">
          {isAuth && (
            <>
              <NavLink to="/" end className={({isActive}) => `px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-black/5 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/10'} text-zinc-800 dark:text-zinc-100 flex items-center gap-2`}>
                <CheckCircle2 size={18}/> Dashboard
              </NavLink>
              <NavLink to="/grupos" className={({isActive}) => `px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-black/5 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/10'} text-zinc-800 dark:text-zinc-100 flex items-center gap-2`}>
                <Users size={18}/> Grupos
              </NavLink>
            </>
          )}

          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="ml-1 inline-flex items-center justify-center w-10 h-10 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
            title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
          >
            {theme === 'dark' ? <Sun size={18} className="text-yellow-300"/> : <Moon size={18} className="text-indigo-500"/>}
          </button>

          {isAuth ? (
            <button
              onClick={() => { logout(); navigate('/login') }}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90"
            >
              <LogOut size={16}/> Sair
            </button>
          ) : (
            <Link to="/login" className="px-3 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90">Entrar</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
