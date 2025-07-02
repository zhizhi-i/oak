import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';
import AuthService from '../services/authService';

interface TrialConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  agentType: 'travel' | 'financial';
}

const TrialConfirmModal: React.FC<TrialConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  agentType 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [autoConfirmCountdown, setAutoConfirmCountdown] = useState<number | null>(null);

  const authService = AuthService.getInstance();
  const user = authService.getCurrentUser();

  // 阻止背景滚动 - 必须在条件返回之前调用
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Admin用户自动确认逻辑（额外保护层）
  React.useEffect(() => {
    if (isOpen && user?.is_admin && !isLoading) {
      console.log('👑 Admin user - auto-confirming trial session after 3 seconds');
      setAutoConfirmCountdown(3);
      
      // 倒计时逻辑
      const countdownInterval = setInterval(() => {
        setAutoConfirmCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownInterval);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
      
      // 自动确认逻辑
      const confirmTimer = setTimeout(async () => {
        try {
          // 直接调用onConfirm，跳过后端试用次数扣减
          onConfirm();
          onClose();
        } catch (err) {
          console.error('Admin auto-confirm error:', err);
        }
      }, 3000); // 3秒后自动确认
      
      return () => {
        clearTimeout(confirmTimer);
        clearInterval(countdownInterval);
        setAutoConfirmCountdown(null);
      };
    }
  }, [isOpen, user?.is_admin, isLoading, onConfirm, onClose]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    setError('');

    try {
      // 传递正确的agentType进行次数扣减
      const response = await authService.useTrial(agentType);
      
      if (response.success) {
        onConfirm();
        onClose();
      } else {
        setError(response.message || 'Failed to start trial');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  const agentNames = {
    travel: 'Travel Assistant',
    financial: 'Financial Analysis Assistant'
  };

  const agentEmojis = {
    travel: '🧳',
    financial: '📊'
  };

  const remainingTrials = user?.is_admin ? 'unlimited' : user?.trial_count || 0;

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{agentEmojis[agentType]}</div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {user?.is_admin ? 'Start Admin Session' : 'Start Trial Session'}
                </h2>
                {user?.is_admin && (
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-yellow-400 text-sm">👑</span>
                    <span className="text-yellow-400 text-xs font-medium">Admin Access - Unlimited</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            <div className="text-center space-y-4">
              <div className={`bg-gradient-to-r ${user?.is_admin ? 'from-yellow-500/10 to-orange-500/10 border-yellow-500/20' : 'from-blue-500/10 to-purple-500/10 border-blue-500/20'} border rounded-lg p-4`}>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {agentNames[agentType]}
                </h3>
                <p className="text-gray-300 text-sm">
                  {user?.is_admin 
                    ? 'As an admin user, you have unlimited access to all AI assistants. No trial limits apply to your account.'
                    : 'You are about to start a trial session with our AI assistant. This will use one of your available trials.'
                  }
                </p>
              </div>

              <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">Current Trials:</span>
                  <span className="text-blue-400 font-bold text-lg">
                    {remainingTrials === 'unlimited' ? '∞' : remainingTrials}
                  </span>
                </div>
                {!user?.is_admin && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-400 text-sm">After this session:</span>
                    <span className="text-orange-400 font-medium">
                      {Math.max(0, (remainingTrials as number) - 1)}
                    </span>
                  </div>
                )}
              </div>

              {!user?.is_admin && remainingTrials === 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-medium">No trials remaining</span>
                  </div>
                  <p className="text-red-300 text-sm mt-1">
                    You have used all your available trials.
                  </p>
                </div>
              )}

              {user?.is_admin && autoConfirmCountdown && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 text-lg">👑</span>
                    <span className="text-yellow-400 font-medium">Auto-starting session</span>
                  </div>
                  <p className="text-yellow-300 text-sm mt-1">
                    Session will begin automatically in {autoConfirmCountdown} seconds as you have admin privileges.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleClose}
                disabled={user?.is_admin && autoConfirmCountdown !== null}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-300 disabled:text-gray-500 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading || (!user?.is_admin && remainingTrials === 0) || (user?.is_admin && autoConfirmCountdown !== null)}
                className={`flex-1 py-3 ${user?.is_admin 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600' 
                  : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
                } disabled:from-gray-600 disabled:to-gray-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                    Starting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {user?.is_admin 
                      ? (autoConfirmCountdown 
                          ? `Auto-starting in ${autoConfirmCountdown}s`
                          : 'Start Session'
                        )
                      : 'Confirm & Start'
                    }
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default TrialConfirmModal; 