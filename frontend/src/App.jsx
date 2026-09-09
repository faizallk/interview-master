import React from 'react'
import {RouterProvider} from 'react-router-dom'
import { router } from './auth.router.jsx'
import { AuthProvider } from './features/auth/auth.context.jsx'
export default function App() {
  return (
    <>
    <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
    </>
  )
}
