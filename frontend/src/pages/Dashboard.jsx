// src/pages/Dashboard.jsx
import { useEffect, useMemo, useState } from 'react'
import { api } from '@/api/api'
import TaskCard from '@/components/TaskCard'
import TaskModal from '@/components/TaskModal'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [pop, setPop] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => { loadTasks() }, [])

  const loadTasks = async () => {
    try {
      const res = await api.get('/tarefas/minhas')
      setTasks(res.data.data || [])
    } catch (err) {
      console.error('Erro ao carregar tarefas:', err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = useMemo(() => {
    if (filter === 'completed') return tasks.filter(t => t.completed)
    if (filter === 'pending') return tasks.filter(t => !t.completed)
    return tasks
  }, [tasks, filter])

  const toggleTask = async (taskId) => {
    try {
      const res = await api.patch(`/tarefas/toggle/${taskId}`)
      const updated = res.data.data
      setTasks(prev => prev.map(t => (t._id === updated._id ? updated : t)))
      if (updated.completed) celebrate()
    } catch (err) {
      console.error('Erro ao alternar tarefa:', err)
    }
  }

  const addTask = async (payload) => {
    try {
      const res = await api.post('/tarefas/nova', payload)
      setTasks(prev => [res.data.data, ...prev])
      setShowModal(false)
    } catch (err) {
      console.error('Erro ao criar tarefa:', err)
    }
  }

  const celebrate = () => {
    const duration = 1600
    const end = Date.now() + duration
    const colors = ['#22c55e','#60a5fa','#f472b6','#f59e0b']
    ;(function frame(){
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors })
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }

  const filterOptions = [
    { key: 'all', label: '🌍 Todas', color: 'from-blue-400 to-indigo-500' },
    { key: 'pending', label: '⏳ Pendentes', color: 'from-yellow-400 to-orange-500' },
    { key: 'completed', label: '✅ Concluídas', color: 'from-green-400 to-emerald-500' },
  ]

  if (loading) return <div className="text-center mt-16 text-lg text-zinc-500 dark:text-zinc-400 animate-pulse">Carregando tarefas...</div>

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-hero-radial">
      <main className="max-w-6xl mx-auto py-10 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white drop-shadow">📝 Suas Tarefas</h1>
          <motion.button onClick={()=>{ setPop(true); setTimeout(()=>setPop(false), 260); setShowModal(true) }}
            animate={pop ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 0.3, type: 'spring' }}
            className="px-5 py-3 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-2xl shadow-soft hover:opacity-90">
            ➕ Nova Tarefa
          </motion.button>
        </div>

        <div className="flex justify-center gap-2 sm:gap-4 mb-8">
          {filterOptions.map(opt => (
            <button key={opt.key} onClick={()=>setFilter(opt.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter===opt.key ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-black/5 dark:bg-white/10 text-zinc-800 dark:text-zinc-100'}`}>
              {opt.label} <span className="opacity-60">
                ({opt.key==='all'?tasks.length:opt.key==='pending'?tasks.filter(t=>!t.completed).length:tasks.filter(t=>t.completed).length})
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-zinc-600 dark:text-zinc-300">Nenhuma tarefa aqui. ✨</p>
        ) : (
          <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(t => <TaskCard key={t._id} task={t} onToggle={()=>toggleTask(t._id)} />)}
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {showModal && <TaskModal onClose={()=>setShowModal(false)} onSubmit={addTask} />}
      </AnimatePresence>
    </div>
  )
}
