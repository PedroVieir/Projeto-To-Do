// src/pages/Groups.jsx
import { useEffect, useState } from 'react'
import { api } from '@/api/api'
import { motion } from 'framer-motion'

export default function Groups() {
  const [groups, setGroups] = useState([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const { data } = await api.get('/grupos/')
      setGroups(data.data || [])
    } catch (err) {
      setError('Falha ao carregar grupos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ load() }, [])

  const create = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) return
    try {
      const { data } = await api.post('/grupos/', { name: name.trim(), members: [] })
      setGroups(prev => [data.data, ...prev])
      setName('')
    } catch (err) {
      setError(err?.response?.data?.message || 'Erro ao criar grupo')
    }
  }

  if (loading) return <div className="text-center mt-16 text-lg text-zinc-500 dark:text-zinc-400 animate-pulse">Carregando grupos...</div>

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">👥 Seus Grupos</h1>

      <form onSubmit={create} className="mb-8 flex items-center gap-3">
        <input className="flex-1 p-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white" placeholder="Nome do grupo" value={name} onChange={(e)=>setName(e.target.value)} />
        <motion.button whileTap={{ scale: 0.98 }} className="px-4 py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">Criar</motion.button>
      </form>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

      {groups.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-300">Você ainda não tem grupos.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {groups.map(g => (
            <div key={g._id} className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 shadow-soft">
              <p className="font-semibold text-zinc-900 dark:text-white">{g.name}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{(g.members||[]).length} membro(s)</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
