// src/components/TaskModal.jsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '@/api/api'

export default function TaskModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [scope, setScope] = useState('personal')
  const [groups, setGroups] = useState([])
  const [groupId, setGroupId] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/grupos')
        setGroups(data.data || [])
      } catch {}
    })()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const payload = scope === 'group' && groupId ? { title: title.trim(), groupId } : { title: title.trim() }
    onSubmit(payload)
    setTitle('')
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-2xl w-[92%] max-w-md border border-black/10 dark:border-white/10"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-zinc-900 dark:text-white">✨ Nova Tarefa</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o nome da tarefa..."
            className="p-3 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="scope" value="personal" checked={scope === 'personal'} onChange={() => setScope('personal')} />
              Pessoal
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="radio" name="scope" value="group" checked={scope === 'group'} onChange={() => setScope('group')} />
              Grupo
            </label>
          </div>

          {scope === 'group' && (
            <select
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              className="p-3 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
              required
            >
              <option value="">Selecione um grupo...</option>
              {groups.map((g) => (
                <option key={g._id} value={g._id}>{g.name}</option>
              ))}
            </select>
          )}

          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white transition-all">
              Cancelar
            </button>

            <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 text-white font-semibold transition-all">
              Criar 🚀
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
