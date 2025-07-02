import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Bot, TrendingUp, BarChart3, PieChart, DollarSign, Globe, Calendar, AlertTriangle, Target } from 'lucide-react'
import TrialConfirmModal from './TrialConfirmModal'
import { authService } from '../services/authService'

const FinancialAnalysis = () => {
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
  useEffect(() => {
    if (!chatEnabled) return
    
    console.log('🚀 FinancialAnalysis组件已挂载')
    
    const initializeDifyChat = () => {
      console.log('🔄 开始初始化Financial Analysis iframe...')
      
      const difyContainer = document.getElementById('dify-chat-container')
      if (!difyContainer) {
        console.error('❌ 找不到dify-chat-container元素')
        return
      }

      // 清空容器
      difyContainer.innerHTML = ''
      
      // 创建iframe
      const iframe = document.createElement('iframe')
      iframe.src = 'https://dify.oak.voyage/chatbot/puH5D6s9E0KSUKpu'
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
      
      console.log('📦 创建iframe:', iframe.src)
      
      iframe.onload = () => {
        console.log('✅ Financial Analysis iframe加载完成')
        
        // 隐藏加载指示器
        const loading = difyContainer.querySelector('.loading-indicator') as HTMLElement
        if (loading) {
          loading.style.display = 'none'
          console.log('🙈 已隐藏加载指示器')
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
            <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">Financial Analysis Agent Unavailable</div>
            <div style="font-size: 0.9rem; color: #9ca3af; margin-bottom: 1rem;">
              Please check server connection: http://54.248.28.95
            </div>
            <button onclick="window.location.reload()" style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.5rem; cursor: pointer;">
              Reload
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
        border: 1px solid rgba(16, 185, 129, 0.3);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
        max-width: 300px;
      `
      loadingDiv.innerHTML = `
        <div style="position: relative; margin-bottom: 1.5rem;">
          <div style="font-size: 4rem; filter: drop-shadow(0 4px 12px rgba(16, 185, 129, 0.4));">📊</div>
          <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 100%; height: 100%; border-radius: 50%; background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%); animation: pulse 2s infinite;"></div>
        </div>
        <div style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.8rem; color: #f8fafc; background: linear-gradient(45deg, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Loading Financial Agent</div>
        <div style="font-size: 0.95rem; color: #94a3b8; line-height: 1.4;">Connecting to intelligent financial analysis system...</div>
        <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 4px;">
          <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; animation-delay: -0.32s;"></div>
          <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; animation-delay: -0.16s;"></div>
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
        iframe[src*="54.248.28.95"] + div,
        iframe[src*="54.248.28.95"] ~ div,
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

    // 等待DOM完全加载后初始化
    setTimeout(initializeDifyChat, 100)

    // Cleanup function
    return () => {
      console.log('🧹 清理Financial Analysis iframe组件...')
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
      icon: BarChart3,
      title: 'Real-time Market Analysis',
      description: 'Advanced algorithms process live market data, news sentiment, and economic indicators for instant market insights',
      color: 'green'
    },
    {
      icon: PieChart,
      title: 'Portfolio Risk Assessment',
      description: 'AI-powered risk modeling evaluates portfolio diversification, volatility metrics, and correlation analysis',
      color: 'blue'
    },
    {
      icon: Target,
      title: 'Investment Strategy Optimization',
      description: 'Machine learning models analyze historical performance and market conditions to optimize investment strategies',
      color: 'purple'
    },
    {
      icon: AlertTriangle,
      title: 'Automated Risk Alerts',
      description: 'Intelligent monitoring system provides real-time alerts for market volatility and portfolio rebalancing opportunities',
      color: 'orange'
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return { bg: 'from-green-500/20 to-green-600/20', border: 'border-green-500/30', icon: 'bg-green-500' }
      case 'blue':
        return { bg: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/30', icon: 'bg-blue-500' }
      case 'purple':
        return { bg: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-500/30', icon: 'bg-purple-500' }
      case 'orange':
        return { bg: 'from-orange-500/20 to-orange-600/20', border: 'border-orange-500/30', icon: 'bg-orange-500' }
      default:
        return { bg: 'from-gray-500/20 to-gray-600/20', border: 'border-gray-500/30', icon: 'bg-gray-500' }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-green-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Link 
              to="/ai-agents" 
              className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to AI Agent Library
            </Link>
            
            <div className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-300 text-sm font-medium mb-6">
              <Bot className="w-4 h-4 mr-2" />
              Intelligent Financial Analysis Agent Demo
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Professional Financial Analysis Agent
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Experience advanced AI-powered financial analysis that goes beyond traditional tools. Built with comprehensive financial knowledge base, 
              integrated real-time market data APIs, delivering sophisticated investment insights and risk management solutions.
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
              <div className="p-6 border-b border-gray-700/40 bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm flex-shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Financial Analysis Assistant</h3>
                    <p className="text-sm text-green-400">Intelligent Agent System • Integrated Financial Knowledge Base & Real-time Market Data • Advanced Analysis</p>
                  </div>
                </div>
              </div>

              {/* Dify Chat Embed Container - 调整为更合适的高度 */}
              <div className="relative bg-gray-900 h-[600px] rounded-b-2xl overflow-hidden">
                <div id="dify-chat-container" className="w-full h-full">
                  {/* Dify chat will be embedded here */}
                  <div className="flex items-center justify-center h-full text-gray-400 bg-gray-900">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-4 animate-pulse text-green-400" />
                      <p className="text-gray-300 text-xl font-medium">Loading Financial Analysis Agent...</p>
                      <p className="text-gray-500 text-base mt-3">Connecting to intelligent financial analysis system...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Financial Analysis?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join leading financial institutions who trust our AI agent for sophisticated market analysis and investment insights
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg">
              Start Analysis Now
            </button>
            <Link 
              to="/ai-agents"
              className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 inline-block"
            >
              Explore More AI Agents
            </Link>
          </div>
        </div>
      </section>
      
      {/* Trial Confirmation Modal */}
      <TrialConfirmModal
        isOpen={showTrialConfirm}
        onClose={() => setShowTrialConfirm(false)}
        onConfirm={handleTrialConfirm}
        agentType="financial"
      />
    </div>
  )
}

export default FinancialAnalysis 