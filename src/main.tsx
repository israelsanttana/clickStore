import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../app/globals.css'
import { AuthGoogleProvider } from './contexts/AuthGoogle.tsx'
import { Dashboard } from './pages/Dashboard.tsx'
import { Home } from './pages/Home.tsx'
import { Login } from './pages/Login.tsx'
import { PrivateRoutes } from './privateRoutes/PrivateRoutes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthGoogleProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthGoogleProvider>
    </BrowserRouter>
  </React.StrictMode>
)
