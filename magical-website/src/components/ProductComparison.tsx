import React from 'react'
import { Check, X, Zap, Brain } from 'lucide-react'

const ProductComparison = () => {
  const comparisonItems = [
    { feature: 'Setup Complexity', traditional: 'Weeks of configuration required', ai: 'Get started in minutes' },
    { feature: 'Learning Ability', traditional: 'Static rules', ai: 'Autonomous learning optimization' },
    { feature: 'Exception Handling', traditional: 'Manual intervention required', ai: 'Intelligent decision-making' },
    { feature: 'Adaptability', traditional: 'Changes require reprogramming', ai: 'Automatically adapts to new situations' },
    { feature: 'Maintenance Cost', traditional: 'High ongoing maintenance', ai: 'Self-maintenance and upgrades' }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Break Free from Traditional Automation Limitations
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Traditional RPA is like an old car, while intelligent AI is Tesla Autopilot - 
            one requires manual control of every detail, the other can think and decide autonomously
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Traditional Automation */}
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mr-4">
                <Zap className="h-6 w-6 text-gray-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Traditional Automation (RPA)</h3>
                <p className="text-gray-400">Rule-based mechanical execution</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <X className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                Requires complex pre-programming setup
              </div>
              <div className="flex items-center text-gray-300">
                <X className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                Cannot handle unexpected situations
              </div>
              <div className="flex items-center text-gray-300">
                <X className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                Requires continuous maintenance and updates
              </div>
              <div className="flex items-center text-gray-300">
                <X className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                Fixed processes, lacks flexibility
              </div>
            </div>
          </div>

          {/* AI Automation */}
          <div className="bg-gradient-to-br from-blue-900/30 to-green-900/30 rounded-2xl p-8 border border-blue-500/30">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center mr-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Intelligent AI Automation</h3>
                <p className="text-blue-300">With learning and decision-making capabilities</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Automatic configuration and rapid deployment
              </div>
              <div className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Intelligent handling of exceptions and changes
              </div>
              <div className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Self-learning and continuous optimization
              </div>
              <div className="flex items-center text-gray-300">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                Dynamic adaptation to business needs
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison */}
        <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Detailed Comparison</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-4 text-gray-300 font-semibold">Features</th>
                  <th className="text-center py-4 text-gray-300 font-semibold">Traditional RPA</th>
                  <th className="text-center py-4 text-blue-300 font-semibold">Intelligent AI</th>
                </tr>
              </thead>
              <tbody>
                {comparisonItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-700/50">
                    <td className="py-4 text-white font-medium">{item.feature}</td>
                    <td className="py-4 text-center text-gray-400">{item.traditional}</td>
                    <td className="py-4 text-center text-green-400">{item.ai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg">
            Experience the Power of Intelligent AI
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductComparison
