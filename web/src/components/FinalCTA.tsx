import React from 'react'
import { ArrowRight, Clock, Users, Zap } from 'lucide-react'

const FinalCTA = () => {
  const benefits = [
    {
      icon: Clock,
      title: '15-Minute Quick Start',
      description: 'No complex configuration, start experiencing immediately'
    },
    {
      icon: Users,
      title: 'Dedicated Account Manager',
      description: 'One-on-one guidance ensuring successful implementation'
    },
    {
      icon: Zap,
      title: 'Immediate Results',
      description: 'See efficiency improvements from day one'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Your Next Best Employee
            <span className="block bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Is Not Human
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            While other companies are still hiring and training, you already have an AI employee
            that never gets tired, continuously learns, and works 24/7
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 shadow-2xl">
              Book Demo
            </button>
            
            <button className="flex items-center justify-center text-blue-400 hover:text-blue-300 px-10 py-5 rounded-xl border-2 border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 group">
              Free 15-Day Trial
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
            </button>
          </div>

          <p className="text-gray-400 text-sm">
            No credit card required • 15-day free trial • Cancel anytime
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            
            return (
              <div
                key={index}
                className="text-center p-8 bg-gray-800/30 rounded-2xl border border-gray-700 hover:border-blue-500/30 transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-300">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10M+</div>
              <div className="text-gray-300">Automated Tasks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">75%</div>
              <div className="text-gray-300">Average Time Saved</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">3 months</div>
              <div className="text-gray-300">Average ROI Payback</div>
            </div>
          </div>
        </div>

        {/* Final Push */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Don't Let Competitors Get Ahead
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Every day of waiting means more repetitive work, higher labor costs, and less time for innovation.
              Start now and let AI create value for your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg">
                Start Free Trial Now
              </button>
              
              <button className="text-blue-400 hover:text-blue-300 px-8 py-4 rounded-lg border border-blue-400/20 hover:border-blue-300/30 transition-colors">
                View Success Stories
              </button>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

export default FinalCTA
