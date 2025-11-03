// src/pages/Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Falha ao entrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-hero-radial bg-illustration relative">
      <div className="absolute inset-0 bg-white/70 dark:bg-black/60" />
      <div className="relative max-w-md mx-auto pt-24 px-4">
        <div className="rounded-2xl bg-white/80 dark:bg-zinc-900/70 border border-black/10 dark:border-white/10 backdrop-blur p-6 shadow-soft">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Bem-vindo de volta 👋</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Acesse sua conta ToDo+</p>

          {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

          <form onSubmit={submit} className="space-y-3">
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" type="email" className="w-full p-3 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Senha" type="password" className="w-full p-3 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"/>
            <button disabled={loading} className="w-full py-3 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90">{loading ? 'Entrando...' : 'Entrar'}</button>
          </form>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4">
            Novo por aqui? <Link to="/register" className="text-indigo-600 dark:text-indigo-400 hover:underline">Criar conta</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
