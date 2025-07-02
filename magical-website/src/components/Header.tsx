import React, { useState, useEffect } from 'react'
import { Menu, X, User, LogOut, Settings, Key } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthService from '../services/authService'
import LoginModal from './LoginModal'
// import ChangePasswordModal from './ChangePasswordModal'
import type { User as UserType } from '../services/authService'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  
  const authService = AuthService.getInstance()

  useEffect(() => {
    // 检查用户登录状态
    if (authService.isAuthenticated()) {
      const currentUser = authService.getCurrentUser()
      setUser(currentUser)
      
      // 刷新用户信息
      authService.getUserInfo().then(response => {
        if (response.success && response.user) {
          setUser(response.user)
        }
      })
    }
  }, [])

  const handleLoginSuccess = () => {
    const currentUser = authService.getCurrentUser()
    setUser(currentUser)
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    setIsUserMenuOpen(false)
  }

  const renderAuthButton = () => {
    if (user) {
      // 已登录用户显示用户信息下拉框
      return (
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:block text-sm font-medium">{user.email.split('@')[0]}</span>
          </button>
          
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b border-gray-700">
                <div className="text-white font-medium">{user.email}</div>
                {user.is_admin ? (
                  <div className="mt-2 space-y-1">
                    <div className="text-green-400 text-sm font-medium">
                      Administrator Account
                    </div>
                    <div className="text-gray-400 text-xs">
                      Unlimited trial access
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between bg-gray-700/50 rounded-lg p-3">
                      <div>
                        <div className="text-gray-300 text-sm font-medium">AI Agent Trials</div>
                        <div className="text-gray-400 text-xs">Available sessions</div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-400 text-lg font-bold">{user.trial_count}</div>
                        <div className="text-gray-500 text-xs">remaining</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    setIsChangePasswordModalOpen(true);
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
                >
                  <Key className="w-4 h-4" />
                  <span>Change Password</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )
    } else {
      // 未登录用户显示登录按钮
      return (
        <button 
          onClick={() => setIsLoginModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Login
        </button>
      )
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img 
                src="/images/logo.jpg" 
                alt="Oak Logo" 
                className="h-10 w-auto object-contain max-w-[160px] sm:h-12 sm:max-w-[200px] logo-transparent"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* AI Agent Link */}
            <Link 
              to="/ai-agents" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              AI Agent
            </Link>

            {/* Auth Button */}
            {renderAuthButton()}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="py-4 space-y-4">
              <Link 
                to="/ai-agents" 
                className="block text-gray-300 hover:text-white font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Agent
              </Link>
              <div className="w-full">
                {renderAuthButton()}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      
      {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <React.Suspense fallback={<div>Loading...</div>}>
          {React.createElement(
            React.lazy(() => import('./ChangePasswordModal')),
            {
              isOpen: isChangePasswordModalOpen,
              onClose: () => setIsChangePasswordModalOpen(false)
            }
          )}
        </React.Suspense>
      )}
    </header>
  )
}

export default Header
