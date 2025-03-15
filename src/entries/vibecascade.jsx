import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import VibeCascadeApp from '../apps/VibeCascadeApp.jsx'
import '../styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <VibeCascadeApp />
    </BrowserRouter>
  </React.StrictMode>,
)