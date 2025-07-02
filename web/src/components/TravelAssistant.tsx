import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Users, DollarSign, Bot, Sparkles, ArrowLeft, Download } from 'lucide-react'
import TrialConfirmModal from './TrialConfirmModal'
import { authService } from '../services/authService'

const TravelAssistant = () => {
  const [showTrialConfirm, setShowTrialConfirm] = useState(true)
  const [chatEnabled, setChatEnabled] = useState(false)
  
  // 检查用户是否为admin
  React.useEffect(() => {
    const user = authService.getCurrentUser()
    if (user?.is_admin) {
      // Admin用户直接进入聊天，不显示确认弹窗
      setChatEnabled(true)
      setShowTrialConfirm(false)
      console.log('👑 Admin user detected - skipping trial confirmation')
    }
  }, [])
  
  const handleTrialConfirm = () => {
    // 次数扣减由TrialConfirmModal处理，这里只处理UI逻辑
    setChatEnabled(true)
    setShowTrialConfirm(false)
  }

  // Load Dify Chatbot via iframe (direct and reliable method)
  useEffect(() => {
    if (!chatEnabled) return
    
    console.log('🚀 直接使用iframe加载Dify聊天机器人...')
    
    const difyContainer = document.getElementById('dify-chat-container')
    if (difyContainer) {
      // 清空容器内容
      difyContainer.innerHTML = ''
      
      // 创建iframe - 使用新的服务器地址和token
      const iframe = document.createElement('iframe')
      iframe.src = 'https://dify.oak.voyage/chatbot/hyurM7gqanrTHVgA'
              iframe.style.cssText = `
        width: 100%;
        height: 100%;
        min-height: 600px;
        border: none;
        margin: 0;
        padding: 0;
        display: block;
        border-radius: 0 0 1rem 1rem;
        vertical-align: top;
      `
      iframe.setAttribute('frameborder', '0')
      iframe.allow = 'microphone'
      
      iframe.onload = () => {
        console.log('✅ iframe聊天窗口加载成功')
        
        // 隐藏加载指示器
        const loadingDiv = difyContainer.querySelector('.loading-indicator') as HTMLElement
        if (loadingDiv) {
          loadingDiv.style.display = 'none'
        }
        
        // 强力隐藏POWERED BY标识的处理
        const hideElements = () => {
          // 查找所有可能包含品牌信息的元素
          const selectors = [
            '[class*="powered"]',
            '[class*="brand"]', 
            '[class*="dify"]',
            'div[style*="position: fixed"]',
            'div[style*="position: absolute"]',
            'div[style*="bottom"]',
            '*[style*="z-index"]'
          ]
          
          selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector)
            elements.forEach(element => {
              const htmlElement = element as HTMLElement
              const text = htmlElement.innerText?.toLowerCase() || ''
              const className = htmlElement.className?.toLowerCase() || ''
              
              if (text.includes('powered') || 
                  text.includes('dify') || 
                  className.includes('powered') ||
                  className.includes('brand') ||
                  className.includes('dify') ||
                  htmlElement.style.position === 'fixed' ||
                  htmlElement.style.position === 'absolute') {
                htmlElement.style.display = 'none !important'
                htmlElement.style.visibility = 'hidden !important'
                htmlElement.style.opacity = '0 !important'
                htmlElement.style.height = '0 !important'
                htmlElement.style.overflow = 'hidden !important'
                htmlElement.remove()
              }
            })
          })
        }
        
        // 立即执行一次
        setTimeout(hideElements, 500)
        setTimeout(hideElements, 1000)
        setTimeout(hideElements, 2000)
        
        // 持续监听新元素
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement
                const text = element.innerText?.toLowerCase() || ''
                const className = element.className?.toLowerCase() || ''
                
                if (text.includes('powered') || 
                    text.includes('dify') ||
                    className.includes('powered') ||
                    className.includes('brand') ||
                    className.includes('dify')) {
                  element.remove()
                }
              }
            })
          })
        })
        
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeOldValue: true
        })
        
        // 10秒后停止观察
        setTimeout(() => observer.disconnect(), 10000)
      }
      
      iframe.onerror = () => {
        console.error('❌ iframe加载失败')
        difyContainer.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #ef4444; text-align: center; padding: 2rem;">
            <div style="font-size: 2rem; margin-bottom: 1rem;">⚠️</div>
            <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">聊天机器人无法连接</div>
            <div style="font-size: 0.9rem; color: #9ca3af; margin-bottom: 1rem;">
              请检查服务器地址: http://ai-agent.polar.com
            </div>
            <button onclick="window.location.reload()" style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.5rem; cursor: pointer;">
              重新加载
            </button>
          </div>
        `
      }
      
      // 添加加载指示器
      const loadingDiv = document.createElement('div')
      loadingDiv.className = 'loading-indicator'
      loadingDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #e5e7eb;
        text-align: center;
        z-index: 15;
        padding: 3rem 2rem;
        border-radius: 1.5rem;
        backdrop-filter: blur(20px);
        background: rgba(17, 24, 39, 0.95);
        border: 1px solid rgba(59, 130, 246, 0.3);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
        max-width: 300px;
      `
      loadingDiv.innerHTML = `
        <div style="position: relative; margin-bottom: 1.5rem;">
          <div style="font-size: 4rem; filter: drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4));">🤖</div>
          <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 100%; height: 100%; border-radius: 50%; background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%); animation: pulse 2s infinite;"></div>
        </div>
        <div style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.8rem; color: #f8fafc; background: linear-gradient(45deg, #3b82f6, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Loading AI Assistant</div>
        <div style="font-size: 0.95rem; color: #94a3b8; line-height: 1.4;">Connecting to intelligent travel planning system...</div>
        <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 4px;">
          <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; animation-delay: -0.32s;"></div>
          <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; animation-delay: -0.16s;"></div>
          <div style="width: 8px; height: 8px; background: #8b5cf6; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both;"></div>
        </div>
      `
      
      // 添加动画样式
      const animationStyle = document.createElement('style')
      animationStyle.innerHTML = `
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `
      document.head.appendChild(animationStyle)
      
      difyContainer.style.position = 'relative'
      difyContainer.appendChild(loadingDiv)
      difyContainer.appendChild(iframe)
      
      console.log('✅ iframe已添加到容器中')
      
      // 添加样式来隐藏POWERED BY标识和调整背景
      const style = document.createElement('style')
      style.innerHTML = `
        /* 强制隐藏所有可能的POWERED BY标识 */
        iframe[src*="172.16.1.201"] + div,
        iframe[src*="172.16.1.201"] ~ div,
        .powered-by,
        [class*="powered"],
        [class*="brand"],
        div[style*="position: fixed"],
        div[style*="position: absolute"],
        div[style*="bottom: 0"],
        div[style*="bottom:0"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
        
        /* 隐藏iframe外部的所有兄弟元素 */
        #dify-chat-container + div,
        #dify-chat-container ~ div,
        #dify-chat-container + *,
        #dify-chat-container ~ * {
          display: none !important;
        }
        
        /* 容器背景调整为网站背景色 */
        #dify-chat-container {
          background: #111827 !important;
          border-radius: 0 0 1rem 1rem !important;
          position: relative !important;
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* iframe样式调整 - 上移来隐藏POWERED BY标识 */
        #dify-chat-container iframe {
          width: 100% !important;
          height: calc(100% + 50px) !important;
          border: none !important;
          background: transparent !important;
          border-radius: 0 0 1rem 1rem !important;
          margin: -40px 0 0 0 !important;
          padding: 0 !important;
          display: block !important;
          vertical-align: top !important;
        }
        
        /* 确保父容器也完全填充 */
        .relative.bg-gray-900.h-\\[600px\\] {
          border-radius: 0 0 1rem 1rem !important;
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* 移除所有可能的间隙 */
        #dify-chat-container,
        #dify-chat-container * {
          box-sizing: border-box !important;
        }
        
        /* iframe通过上移来隐藏顶部标识 */
        #dify-chat-container iframe {
          width: 100% !important;
          height: calc(100% + 50px) !important;
          border: none !important;
          display: block !important;
          margin-top: -40px !important;
        }
      `
      document.head.appendChild(style)
      
             // 5秒后如果还在加载，显示提示
       setTimeout(() => {
         const loading = difyContainer.querySelector('.loading-indicator') as HTMLElement
         if (loading && loading.style.display !== 'none') {
           loading.innerHTML = `
             <div style="font-size: 2rem; margin-bottom: 0.5rem;">⏳</div>
             <div>Still loading... Please wait</div>
             <div style="font-size: 0.8rem; margin-top: 0.5rem; color: #6b7280;">
               If this takes too long, try refreshing the page
             </div>
           `
         }
       }, 5000)
    }

    // Cleanup function
    return () => {
      console.log('🧹 清理iframe组件...')
      const difyContainer = document.getElementById('dify-chat-container')
      if (difyContainer) {
        difyContainer.innerHTML = ''
      }
      // 清理添加的样式
      const addedStyles = document.querySelectorAll('style')
      addedStyles.forEach(styleEl => {
        if (styleEl.innerHTML.includes('#dify-chat-container')) {
          styleEl.remove()
        }
      })
    }
  }, [chatEnabled])



  const features = [
    {
      icon: MapPin,
      title: 'Knowledge Base Driven',
      description: 'Integrated global destination database, real-time weather APIs, flight & hotel comparison tools for data-driven expert recommendations',
      color: 'blue'
    },
    {
      icon: Calendar,
      title: 'Intelligent Tool Calling',
      description: 'Automatically invokes scheduling optimization algorithms, crowd prediction APIs, local activity query tools for optimal itinerary generation',
      color: 'green'
    },
    {
      icon: DollarSign,
      title: 'Real-time Budget Analysis',
      description: 'Connected to multi-platform pricing APIs, currency conversion tools, expense prediction models for dynamic budget optimization',
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Multi-Agent Collaboration',
      description: 'Coordinates accommodation, transportation, dining specialized sub-agents to provide end-to-end travel services',
      color: 'orange'
    }
  ]

  const sampleItinerary = [
    {
      day: 'Day 1',
      location: 'Tokyo, Japan',
      activities: [
        { time: '9:00 AM', activity: 'Arrive at Narita Airport', type: 'transport' },
        { time: '11:00 AM', activity: 'Check-in at Hotel Shibuya', type: 'accommodation' },
        { time: '2:00 PM', activity: 'Explore Meiji Shrine', type: 'sightseeing' },
        { time: '6:00 PM', activity: 'Dinner at Shibuya Sky Restaurant', type: 'dining' }
      ]
    },
    {
      day: 'Day 2',
      location: 'Tokyo, Japan',
      activities: [
        { time: '8:00 AM', activity: 'Tsukiji Fish Market Tour', type: 'sightseeing' },
        { time: '12:00 PM', activity: 'Lunch at Traditional Sushi Bar', type: 'dining' },
        { time: '3:00 PM', activity: 'Tokyo National Museum', type: 'culture' },
        { time: '7:00 PM', activity: 'Evening in Ginza District', type: 'entertainment' }
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return { bg: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/30', icon: 'bg-blue-500' }
      case 'green':
        return { bg: 'from-green-500/20 to-green-600/20', border: 'border-green-500/30', icon: 'bg-green-500' }
      case 'purple':
        return { bg: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-500/30', icon: 'bg-purple-500' }
      case 'orange':
        return { bg: 'from-orange-500/20 to-orange-600/20', border: 'border-orange-500/30', icon: 'bg-orange-500' }
      default:
        return { bg: 'from-gray-500/20 to-gray-600/20', border: 'border-gray-500/30', icon: 'bg-gray-500' }
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'transport': return 'bg-blue-500'
      case 'accommodation': return 'bg-green-500'
      case 'sightseeing': return 'bg-purple-500'
      case 'dining': return 'bg-orange-500'
      case 'culture': return 'bg-indigo-500'
      case 'entertainment': return 'bg-pink-500'
      default: return 'bg-gray-500'
    }
  }

  // Download itinerary function
  const downloadItinerary = () => {
    const itineraryText = sampleItinerary.map(day => {
      const dayText = `${day.day} - ${day.location}\n` +
        day.activities.map(activity => `${activity.time} - ${activity.activity}`).join('\n')
      return dayText
    }).join('\n\n')

    const element = document.createElement('a')
    const file = new Blob([`Tokyo Adventure Itinerary\n\n${itineraryText}`], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'Tokyo_Adventure_Itinerary.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900/20 to-green-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Link 
              to="/ai-agents" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AI Agent Library
            </Link>
            
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6">
              <Bot className="w-4 h-4 mr-2" />
              Intelligent Travel Assistant Agent Demo
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
                Professional Travel Planning Agent
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Experience intelligent Agent system that goes beyond traditional chatbots. Built with professional travel knowledge base, 
              integrated real-time API tool calling, delivering end-to-end intelligent decision support from destination analysis to itinerary optimization.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => {
              const colors = getColorClasses(feature.color)
              const Icon = feature.icon
              
              return (
                <div key={index} className={`bg-gradient-to-r ${colors.bg} rounded-xl p-6 border ${colors.border} hover:scale-105 transition-all duration-300`}>
                  <div className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* 居中的AI对话框 */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl bg-gray-900 rounded-2xl border border-gray-700/40 overflow-hidden shadow-2xl flex flex-col">
              {/* 简化的头部 */}
              <div className="p-6 border-b border-gray-700/40 bg-gradient-to-r from-blue-900/20 to-green-900/20 backdrop-blur-sm flex-shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Travel Assistant</h3>
                    <p className="text-sm text-blue-400">Intelligent Agent System • Integrated Knowledge Base & Real-time Tool Calling • Beyond Traditional Chat</p>
                  </div>
                </div>
              </div>

              {/* Dify Chat Embed Container - 调整为更合适的高度 */}
              <div className="relative bg-gray-900 h-[600px] rounded-b-2xl overflow-hidden">
                <div id="dify-chat-container" className="w-full h-full">
                  {/* Dify chat will be embedded here */}
                  <div className="flex items-center justify-center h-full text-gray-400 bg-gray-900">
                    <div className="text-center">
                      <Bot className="h-12 w-12 mx-auto mb-4 animate-pulse text-blue-400" />
                      <p className="text-gray-300 text-xl font-medium">Loading AI Assistant...</p>
                      <p className="text-gray-500 text-base mt-3">Connecting to intelligent travel planning system...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/30 to-green-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Intelligent Travel Planning?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of travelers who trust our AI assistant for their perfect trips
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg">
              Start Planning Now
            </button>
            <Link 
              to="/ai-agents"
              className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-block"
            >
              Learn More About AI Agents
            </Link>
          </div>
        </div>
      </section>
      
      {/* Trial Confirmation Modal */}
      <TrialConfirmModal
        isOpen={showTrialConfirm}
        onClose={() => setShowTrialConfirm(false)}
        onConfirm={handleTrialConfirm}
        agentType="travel"
      />
    </div>
  )
}

export default TravelAssistant 