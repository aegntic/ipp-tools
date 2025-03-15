import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WaitlistPage from './pages/WaitlistPage'
import FrameworksDemoPage from './pages/FrameworksDemoPage'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="/frameworks" element={<FrameworksDemoPage />} />
      </Routes>
    </div>
  )
}

export default App