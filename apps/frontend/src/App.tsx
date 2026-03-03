import { Routes, Route } from 'react-router'

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Tamado</h1>
        <p className="mt-2 text-gray-600">
          YouTube・Twitchの配信を1画面で複数同時視聴
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default App
