// src/components/TaskCard.jsx
import { motion } from 'framer-motion'

export default function TaskCard({ task, onToggle }) {
  return (
    <motion.button
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onToggle}
      className={`text-left p-4 rounded-xl shadow-soft transition-all border ${task.completed ? 'bg-green-50 border-green-200 dark:bg-emerald-900/20 dark:border-emerald-700/40' : 'bg-white border-zinc-200 dark:bg-zinc-900 dark:border-white/10'}`}
      title="Clique para alternar"
    >
      <div className="flex items-start gap-3">
        <span className={`mt-1 inline-block size-3 rounded-full ${task.completed ? 'bg-green-500' : 'bg-zinc-300 dark:bg-zinc-600'}`} />
        <div>
          <p className={`font-semibold ${task.completed ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-100'}`}>
            {task.title}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {task.groupId ? 'Tarefa de grupo' : 'Tarefa pessoal'} • {new Date(task.createdAt).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    </motion.button>
  )
}
