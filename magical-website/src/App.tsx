import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import AIAgentLibrary from './components/AIAgentLibrary'
import TravelAssistant from './components/TravelAssistant'
import FinancialAnalysis from './components/FinancialAnalysis'

function App() {
  return (
    <Router>
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-agents" element={<AIAgentLibrary />} />
          <Route path="/ai-agents/travel-assistant" element={<TravelAssistant />} />
          <Route path="/ai-agents/financial-analysis" element={<FinancialAnalysis />} />
        </Routes>
      <Footer />
    </div>
    </Router>
  )
}

export default App
