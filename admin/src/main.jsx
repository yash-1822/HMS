import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import { AppContext } from './context/AppContext.jsx'
import SuperAdminContextProvider from './context/SuperAdminContext.jsx'
import { HospitalProvider } from './context/HospitalContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SuperAdminContextProvider>
  <AdminContextProvider>
    <DoctorContextProvider>
      <AppContext>
      <App />
      </AppContext>
    </DoctorContextProvider>
  </AdminContextProvider>
</SuperAdminContextProvider>
  </BrowserRouter>,
)
