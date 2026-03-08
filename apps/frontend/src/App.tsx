import { Routes, Route } from 'react-router'
import { MainPage } from './pages/MainPage'
import { LoginPage } from './pages/LoginPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
