import { Routes, Route } from 'react-router-dom'
import VibeCascadeLandingPage from '../pages/VibeCascadeLandingPage'
import ImplementationPage from '../pages/ImplementationPage'

function VibeCascadeApp() {
  return (
    <div className="vibecascade-app-container">
      <Routes>
        <Route path="/" element={<VibeCascadeLandingPage />} />
        <Route path="/implementation" element={<ImplementationPage />} />
      </Routes>
    </div>
  )
}

export default VibeCascadeApp