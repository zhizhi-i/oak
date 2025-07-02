const API_BASE_URL = 'https://api.oak.voyage/api';

interface User {
  id: number;
  email: string;
  trial_count: number;
  is_admin: boolean;
  created_at: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  access_token?: string;
  user?: User;
}

interface TrialResponse {
  success: boolean;
  message: string;
  remaining_trials?: number | string;
  has_trials?: boolean;
  is_admin?: boolean;
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private user: User | null = null;

  private constructor() {
    // 从localStorage恢复token和用户信息
    this.token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // 注册
  async register(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.access_token) {
        this.setAuthData(data.access_token, data.user);
      }

      return data;
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  // 登录
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.access_token) {
        this.setAuthData(data.access_token, data.user);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  // 退出登录
  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
  }

  // 检查是否已登录
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // 获取当前用户
  getCurrentUser(): User | null {
    return this.user;
  }

  // 获取用户信息
  async getUserInfo(): Promise<AuthResponse> {
    if (!this.token) {
      return {
        success: false,
        message: 'Not authenticated',
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/info`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success && data.user) {
        this.user = data.user;
        localStorage.setItem('user_data', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('Get user info error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  // 使用试用次数
  async useTrial(demoType: string = 'unknown'): Promise<TrialResponse> {
    if (!this.token) {
      return {
        success: false,
        message: 'Not authenticated',
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/use-trial`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ demo_type: demoType }),
      });

      const data = await response.json();

      // 更新本地用户数据
      if (data.success && this.user && !this.user.is_admin) {
        this.user.trial_count = data.remaining_trials as number;
        localStorage.setItem('user_data', JSON.stringify(this.user));
      }

      return data;
    } catch (error) {
      console.error('Use trial error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  // 检查试用次数
  async checkTrial(): Promise<TrialResponse> {
    if (!this.token) {
      return {
        success: false,
        message: 'Not authenticated',
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/check-trial`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Check trial error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  // 修改密码
  async changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse> {
    if (!this.token) {
      return {
        success: false,
        message: 'Not authenticated',
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          current_password: currentPassword, 
          new_password: newPassword 
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Change password error:', error);
      return {
        success: false,
        message: 'Network error. Please try again.',
      };
    }
  }

  // 设置认证数据
  private setAuthData(token: string, user: User): void {
    this.token = token;
    this.user = user;
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
  }
}

// 创建单例实例
const authService = AuthService.getInstance();

export default AuthService;
export { authService };
export type { User, AuthResponse, TrialResponse }; 