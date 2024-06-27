
import './App.css'
import Navbar from './components/Navbar'
import BranchPage from './pages/BranchPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Frame from './pages/StudySession'
function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<BranchPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study" element={<Frame />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
