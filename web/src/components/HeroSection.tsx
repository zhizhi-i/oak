import React from 'react'
import { ArrowRight } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Hire your first
                <span className="block text-gradient bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  AI Employee
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                When budgets are tight and hiring is frozen, let intelligent AI automation handle the repetitive work.
                Our AI agents can autonomously learn, make decisions, and execute complex business processes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg">
                Book Demo
              </button>
              
              <button className="flex items-center justify-center text-blue-400 hover:text-blue-300 px-8 py-4 rounded-lg border border-blue-400/20 hover:border-blue-300/30 transition-colors group">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-700">
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-white">10M+</div>
                <div className="text-gray-400">Automated Tasks</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-gray-400">Uptime</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/images/hero-illustration.jpg"
                alt="AI Automation Workflow Demo"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Background decoration */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-2xl blur-xl"></div>
            
            {/* Floating elements */}
            <div className="absolute top-10 -left-6 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 -right-6 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
