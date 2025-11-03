// src/routes/AppRoutes.jsx
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/shell/AppLayout'
import Dashboard from '@/pages/Dashboard'
import Groups from '@/pages/Groups'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

function RequireAuth() {
  const token = localStorage.getItem('token')
  return token ? <Outlet/> : <Navigate to="/login" replace />
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { element: <RequireAuth />, children: [
        { index: true, element: <Dashboard/> },
        { path: 'grupos', element: <Groups/> },
      ]},
      { path: 'login', element: <Login/> },
      { path: 'register', element: <Register/> },
      { path: '*', element: <Navigate to="/" replace />}
    ]
  }
])

export default function AppRoutes() {
  return <RouterProvider router={router} />
}
