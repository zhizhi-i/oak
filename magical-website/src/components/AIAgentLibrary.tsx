import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Brain, Zap, Users, Code, Rocket, ArrowRight, Bot, Sparkles, Target, Globe, TrendingUp } from 'lucide-react'
import AuthService from '../services/authService'
import LoginModal from './LoginModal'

const AIAgentLibrary = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null)
  const navigate = useNavigate()
  const authService = AuthService.getInstance()

  const handleTryDemo = (agentTitle: string) => {
    if (!authService.isAuthenticated()) {
      // 用户未登录，保存要跳转的路径并显示登录弹窗
      const path = agentTitle === 'Travel Assistant' ? '/ai-agents/travel-assistant' : '/ai-agents/financial-analysis'
      setPendingRedirect(path)
      setIsLoginModalOpen(true)
      return
    }

    // 用户已登录，直接跳转
    if (agentTitle === 'Travel Assistant') {
      navigate('/ai-agents/travel-assistant')
    } else if (agentTitle === 'Financial Analysis Agent') {
      navigate('/ai-agents/financial-analysis')
    }
  }

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false)
    // 如果有待处理的重定向，执行跳转
    if (pendingRedirect) {
      navigate(pendingRedirect)
      setPendingRedirect(null)
    }
  }

  const agentTypes = [
    {
      icon: Globe,
      title: 'Travel Assistant',
      description: 'Intelligent travel planning and booking assistant that learns your preferences',
      features: ['Personalized recommendations', 'Real-time booking', 'Budget optimization', 'Multi-language support'],
      color: 'blue',
      demo: true
    },
    {
      icon: TrendingUp,
      title: 'Financial Analysis Agent',
      description: 'Intelligent financial data analysis and investment insights with real-time market intelligence',
      features: ['Market trend analysis', 'Risk assessment', 'Portfolio optimization', 'Real-time data processing'],
      color: 'green',
      demo: true
    },
    {
      icon: Target,
      title: 'Sales Assistant',
      description: 'AI-powered sales automation that nurtures leads intelligently',
      features: ['Lead scoring', 'Personalized outreach', 'Pipeline management', 'Performance analytics'],
      color: 'purple'
    },
    {
      icon: Code,
      title: 'Code Assistant',
      description: 'Development automation agent for code review and optimization',
      features: ['Code review', 'Bug detection', 'Performance optimization', 'Documentation generation'],
      color: 'orange'
    }
  ]

  const capabilities = [
    {
      icon: Brain,
      title: 'Machine Learning Core',
      description: 'Advanced neural networks that continuously learn and adapt to user behavior patterns'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Lightning-fast response times with edge computing and optimized algorithms'
    },
    {
      icon: Bot,
      title: 'Natural Language Understanding',
      description: 'Sophisticated NLP that understands context, intent, and emotional nuances'
    },
    {
      icon: Sparkles,
      title: 'Autonomous Decision Making',
      description: 'Smart agents that can make complex decisions without human intervention'
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'from-blue-500/20 to-blue-600/20',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          icon: 'bg-blue-500',
          gradient: 'from-blue-500 to-blue-600'
        }
      case 'green':
        return {
          bg: 'from-green-500/20 to-green-600/20',
          border: 'border-green-500/30',
          text: 'text-green-400',
          icon: 'bg-green-500',
          gradient: 'from-green-500 to-green-600'
        }
      case 'purple':
        return {
          bg: 'from-purple-500/20 to-purple-600/20',
          border: 'border-purple-500/30',
          text: 'text-purple-400',
          icon: 'bg-purple-500',
          gradient: 'from-purple-500 to-purple-600'
        }
      case 'orange':
        return {
          bg: 'from-orange-500/20 to-orange-600/20',
          border: 'border-orange-500/30',
          text: 'text-orange-400',
          icon: 'bg-orange-500',
          gradient: 'from-orange-500 to-orange-600'
        }
      default:
        return {
          bg: 'from-gray-500/20 to-gray-600/20',
          border: 'border-gray-500/30',
          text: 'text-gray-400',
          icon: 'bg-gray-500',
          gradient: 'from-gray-500 to-gray-600'
        }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6">
            <Bot className="w-4 h-4 mr-2" />
            Next-Generation AI Agents
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              AI Agent Library
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            A comprehensive collection of intelligent AI agents designed to revolutionize your business operations. 
            Each agent is powered by advanced machine learning and ready to deploy in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg">
              Explore Agents
            </button>
            <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Powered by Advanced AI Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI agents leverage cutting-edge technology to deliver intelligent, autonomous solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon
              return (
                <div key={index} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{capability.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{capability.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Agent Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Choose Your Intelligent Agent
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specialized AI agents tailored for specific business functions and industries
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {agentTypes.map((agent, index) => {
              const colors = getColorClasses(agent.color)
              const Icon = agent.icon
              
              return (
                <div
                  key={index}
                  className={`relative bg-gradient-to-r ${colors.bg} rounded-2xl p-8 border ${colors.border} hover:scale-[1.02] transition-all duration-300 group`}
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-white">{agent.title}</h3>
                        {agent.demo && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Live Demo
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {agent.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {agent.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 ${colors.icon} rounded-full`}></div>
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <button className={`flex-1 bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200`}>
                      Deploy Agent
                    </button>
                    {agent.demo && (
                      <button 
                        onClick={() => handleTryDemo(agent.title)}
                        className={`${colors.text} hover:text-white border border-current px-6 py-3 rounded-lg font-semibold transition-colors flex items-center`}
                      >
                        Try Demo
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-3xl p-8 md:p-12 border border-blue-500/20">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Deploy Your First AI Agent?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Get started with our intelligent agents in just a few clicks. 
                Full integration support and 24/7 monitoring included.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Free Trial
                </button>
                <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false)
          setPendingRedirect(null)
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  )
}

export default AIAgentLibrary 