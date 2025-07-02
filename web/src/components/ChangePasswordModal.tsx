import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import AuthService from '../services/authService';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const authService = AuthService.getInstance();

  // 阻止背景滚动
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

  if (!isOpen) return null;

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess(false);
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsLoading(true);

    try {
      // 验证
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match');
        setIsLoading(false);
        return;
      }
      if (newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        setIsLoading(false);
        return;
      }
      if (newPassword === currentPassword) {
        setError('New password must be different from current password');
        setIsLoading(false);
        return;
      }

      const response = await authService.changePassword(currentPassword, newPassword);

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setError(response.message || 'Failed to change password');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[99999] bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
              <h2 className="text-2xl font-bold text-white">
                Change Password
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center space-x-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 text-sm">Password changed successfully!</span>
                </div>
              )}

              {/* Current Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    placeholder="Enter your current password"
                    required
                    disabled={success}
                  />
                </div>
              </div>

              {/* New Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    placeholder="Enter your new password"
                    required
                    disabled={success}
                  />
                </div>
              </div>

              {/* Confirm New Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    placeholder="Confirm your new password"
                    required
                    disabled={success}
                  />
                </div>
              </div>

              {/* Submit Button */}
              {!success && (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                      Changing Password...
                    </span>
                  ) : (
                    'Change Password'
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ChangePasswordModal; 