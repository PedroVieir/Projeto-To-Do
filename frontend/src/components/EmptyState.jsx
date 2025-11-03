import { motion } from 'framer-motion'
export default function EmptyState({ title, subtitle, action }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card p-8 text-center">
      <div className="text-5xl mb-3">✨</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="opacity-70">{subtitle}</p>
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  )
}
