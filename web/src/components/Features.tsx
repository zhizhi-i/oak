import React from 'react'
import { Lightbulb, Rocket, Settings, ArrowRight } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Lightbulb,
      title: 'Discover Hidden Inefficiencies',
      description: 'Our AI analyzes your workflows to identify time-consuming but low-value repetitive tasks, providing automation recommendations.',
      details: [
        'Intelligent workflow analysis',
        'Bottleneck identification and optimization',
        'Automation potential assessment',
        'ROI prediction'
      ],
      color: 'blue'
    },
    {
      icon: Rocket,
      title: 'Launch Automation Quickly',
      description: 'No complex configuration needed. Our AI assistant guides you through simple steps to create your first automated workflow.',
      details: [
        'Visual workflow designer',
        'Pre-built template library',
        'One-click deployment',
        'Real-time monitoring dashboard'
      ],
      color: 'green'
    },
    {
      icon: Settings,
      title: 'Enter Autonomous Operation Mode',
      description: 'Once configured, AI continuously learns and optimizes, autonomously handling exceptions to ensure processes run efficiently.',
      details: [
        'Autonomous decision engine',
        'Exception handling mechanisms',
        'Continuous learning optimization',
        'Auto-scaling capabilities'
      ],
      color: 'purple'
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'from-blue-500/20 to-blue-600/20',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          icon: 'bg-blue-500'
        }
      case 'green':
        return {
          bg: 'from-green-500/20 to-green-600/20',
          border: 'border-green-500/30',
          text: 'text-green-400',
          icon: 'bg-green-500'
        }
      case 'purple':
        return {
          bg: 'from-purple-500/20 to-purple-600/20',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          icon: 'bg-purple-500'
        }
      default:
        return {
          bg: 'from-gray-500/20 to-gray-600/20',
          border: 'border-gray-500/30',
          text: 'text-gray-400',
          icon: 'bg-gray-500'
        }
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            The Fast Track to Intelligent Automation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Three simple steps to bring your business into the age of intelligent automation
          </p>
        </div>

        <div className="space-y-12">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color)
            const Icon = feature.icon
            
            return (
              <div
                key={index}
                className={`relative bg-gradient-to-r ${colors.bg} rounded-2xl p-8 border ${colors.border} hover:scale-[1.02] transition-all duration-300`}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-8">
                  <div className={`w-8 h-8 ${colors.icon} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                    {index + 1}
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Content */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {feature.title}
                      </h3>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {feature.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 ${colors.icon} rounded-full`}></div>
                          <span className="text-gray-400">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <button className={`flex items-center ${colors.text} hover:text-white transition-colors group`}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  {/* Visual */}
                  <div className="relative">
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <div className={`text-xs ${colors.text} font-medium`}>
                            Step {index + 1}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="h-2 bg-gray-700 rounded-full">
                            <div className={`h-2 ${colors.icon} rounded-full transition-all duration-1000`} 
                                 style={{ width: `${(index + 1) * 33}%` }}>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-8 rounded ${i <= index * 2 + 1 ? colors.icon : 'bg-gray-700'} transition-colors duration-500`}
                                style={{ animationDelay: `${i * 100}ms` }}
                              >
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection Line */}
                {index < features.length - 1 && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-0.5 h-12 bg-gradient-to-b from-gray-600 to-transparent"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Your Automation Journey?
            </h3>
            <p className="text-gray-300 mb-6">
              Experience the complete intelligent automation process in just 15 minutes
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg">
              Free 15-Day Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
