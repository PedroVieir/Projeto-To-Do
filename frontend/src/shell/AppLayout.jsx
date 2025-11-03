// src/shell/AppLayout.jsx
import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0b0f] text-zinc-900 dark:text-white">
      <Header />
      <Outlet />
    </div>
  )
}
