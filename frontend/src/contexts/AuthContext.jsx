// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '@/api/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })

  const isAuth = !!localStorage.getItem('token')

  useEffect(() => {
    if (!user && isAuth) {
      // best-effort only: we keep user minimal (email/username) from login
      const raw = localStorage.getItem('user')
      setUser(raw ? JSON.parse(raw) : null)
    }
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('auth/login', { email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.data))
    setUser(data.data)
    return data
  }

  const register = async (username, email, password) => {
    const { data } = await api.post('auth/register', { username, email, password })
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, isAuth, login, register, logout }), [user, isAuth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
