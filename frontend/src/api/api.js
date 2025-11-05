// src/api/api.js
import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5050/api'

const api = axios.create({
  baseURL,
  timeout: 15000,
})

// inject Authorization if token is present
api.interceptors.request.use((config) => {
  const t = localStorage.getItem('token')
  if (t) config.headers.Authorization = `Bearer ${t}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error?.response?.data?.message || error.message
    console.error('API error:', message)
    return Promise.reject(error)
  }
)

export { api }
export default api
