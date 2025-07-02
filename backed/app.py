from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import hashlib
import os

# 禁用邮箱验证器（避免idna编码错误）
os.environ['EMAIL_VALIDATOR_DISABLE'] = '1'

app = Flask(__name__)

# 配置 - 支持环境变量
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=int(os.environ.get('JWT_EXPIRES_HOURS', '24')))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 数据库配置 - 支持环境变量
DB_TYPE = os.environ.get('DB_TYPE', 'mysql')
DB_HOST = os.environ.get('DB_HOST', '172.17.200.117')
DB_PORT = os.environ.get('DB_PORT', '3306')
DB_USER = os.environ.get('DB_USER', 'root')
DB_PASSWORD = os.environ.get('DB_PASSWORD', '123456')
DB_NAME = os.environ.get('DB_NAME', 'magical_website')

if DB_TYPE == 'mysql':
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
elif DB_TYPE == 'sqlite':
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}.db'
else:
    raise ValueError(f"Unsupported database type: {DB_TYPE}")

# 初始化扩展
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

# 用户模型 - 适配您的数据库表结构
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')
    demo_count = db.Column(db.Integer, nullable=False, default=5)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        is_admin = self.role == 'admin'
        return {
            'id': self.id,
            'email': self.email,
            'trial_count': 'unlimited' if is_admin else self.demo_count,
            'is_admin': is_admin,
            'role': self.role,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
    
    def is_admin(self):
        """检查用户是否为管理员"""
        return self.role == 'admin'
    
    def has_remaining_trials(self):
        """检查用户是否还有剩余试用次数"""
        return self.is_admin() or self.demo_count > 0
    
    def get_remaining_trials(self):
        """获取剩余试用次数"""
        return 'unlimited' if self.is_admin() else self.demo_count

# 使用日志模型 - 适配您的数据库表结构
class UsageLog(db.Model):
    __tablename__ = 'usage_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    demo_type = db.Column(db.String(50), nullable=False)  # 'travel' 或 'financial'
    used_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    # 关系
    user = db.relationship('User', backref=db.backref('usage_logs', lazy=True))

# 简单的密码哈希（按需求不做复杂加密）
def simple_hash(password):
    return hashlib.md5(password.encode()).hexdigest()

# 简单的邮箱格式检查（避免使用复杂的邮箱验证库）
def simple_email_check(email):
    """简单的邮箱格式检查，避免idna编码错误"""
    if not email or '@' not in email:
        return False
    parts = email.split('@')
    if len(parts) != 2:
        return False
    local, domain = parts
    if not local or not domain:
        return False
    if '.' not in domain:
        return False
    return True

# 路由
@app.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'success': False, 'message': 'Email and password are required'}), 400
        
        # 简单的邮箱格式检查
        if not simple_email_check(email):
            return jsonify({'success': False, 'message': 'Invalid email format'}), 400
            
        # 检查用户是否已存在
        if User.query.filter_by(email=email).first():
            return jsonify({'success': False, 'message': 'User already exists'}), 400
            
        # 创建新用户
        new_user = User(
            email=email,
            password_hash=simple_hash(password),
            demo_count=5,
            role='user'
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        # 创建访问令牌
        access_token = create_access_token(identity=email)
        
        return jsonify({
            'success': True,
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': new_user.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'success': False, 'message': 'Email and password are required'}), 400
        
        # 简单的邮箱格式检查
        if not simple_email_check(email):
            return jsonify({'success': False, 'message': 'Invalid email format'}), 400
            
        # 验证用户
        user = User.query.filter_by(email=email).first()
        if not user or user.password_hash != simple_hash(password):
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
            
        # 创建访问令牌
        access_token = create_access_token(identity=email)
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/user/info', methods=['GET'])
@jwt_required()
def get_user_info():
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()
        
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
            
        return jsonify({
            'success': True,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/user/use-trial', methods=['POST'])
@jwt_required()
def use_trial():
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()
        
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
            
        # 获取demo类型
        data = request.get_json() or {}
        demo_type = data.get('demo_type', 'unknown')  # 'travel' 或 'financial'
        
        # 检查是否有使用权限
        if not user.has_remaining_trials():
            return jsonify({
                'success': False, 
                'message': 'No trials remaining',
                'remaining_trials': 0
            }), 403
        
        # Admin用户不扣减次数，普通用户扣减次数
        if not user.is_admin():
            user.demo_count -= 1
            user.updated_at = datetime.utcnow()
        
        # 记录使用日志
        usage_log = UsageLog(
            user_id=user.id,
            demo_type=demo_type,
            used_at=datetime.utcnow()
        )
        db.session.add(usage_log)
        db.session.commit()
        
        message = 'Admin unlimited access' if user.is_admin() else 'Trial used successfully'
        
        return jsonify({
            'success': True,
            'message': message,
            'remaining_trials': user.get_remaining_trials(),
            'is_admin': user.is_admin()
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/user/check-trial', methods=['GET'])
@jwt_required()
def check_trial():
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()
        
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
            
        return jsonify({
            'success': True,
            'has_trials': user.has_remaining_trials(),
            'remaining_trials': user.get_remaining_trials(),
            'is_admin': user.is_admin(),
            'role': user.role,
            'user_info': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/user/permissions', methods=['GET'])
@jwt_required()
def get_user_permissions():
    """获取用户权限信息"""
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()
        
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        
        # 获取用户的使用历史
        usage_count = UsageLog.query.filter_by(user_id=user.id).count()
        recent_usage = UsageLog.query.filter_by(user_id=user.id)\
                                   .order_by(UsageLog.used_at.desc())\
                                   .limit(5).all()
        
        return jsonify({
            'success': True,
            'user': user.to_dict(),
            'permissions': {
                'can_use_trial': user.has_remaining_trials(),
                'is_admin': user.is_admin(),
                'has_unlimited_access': user.is_admin(),
                'remaining_trials': user.get_remaining_trials()
            },
            'usage_stats': {
                'total_usage': usage_count,
                'recent_usage': [
                    {
                        'demo_type': log.demo_type,
                        'used_at': log.used_at.isoformat()
                    } for log in recent_usage
                ]
            }
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/user/change-password', methods=['POST'])
@jwt_required()
def change_password():
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()
        
        if not user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
            
        data = request.get_json()
        current_password = data.get('current_password')
        new_password = data.get('new_password')
        
        if not current_password or not new_password:
            return jsonify({'success': False, 'message': 'Missing required fields'}), 400
            
        # 验证当前密码
        if user.password_hash != simple_hash(current_password):
            return jsonify({'success': False, 'message': 'Current password is incorrect'}), 400
            
        # 验证新密码长度
        if len(new_password) < 6:
            return jsonify({'success': False, 'message': 'New password must be at least 6 characters'}), 400
            
        # 验证新密码与当前密码不同
        if simple_hash(new_password) == user.password_hash:
            return jsonify({'success': False, 'message': 'New password must be different from current password'}), 400
            
        # 更新密码
        user.password_hash = simple_hash(new_password)
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Password changed successfully'
        }), 200
        
    except Exception as e:
        print(f"Change password error: {e}")
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/admin/users', methods=['GET'])
@jwt_required()
def admin_get_users():
    """管理员获取用户列表"""
    try:
        current_user_email = get_jwt_identity()
        current_user = User.query.filter_by(email=current_user_email).first()
        
        if not current_user or not current_user.is_admin():
            return jsonify({'success': False, 'message': 'Admin access required'}), 403
        
        users = User.query.all()
        users_data = []
        
        for user in users:
            usage_count = UsageLog.query.filter_by(user_id=user.id).count()
            users_data.append({
                **user.to_dict(),
                'total_usage': usage_count
            })
        
        return jsonify({
            'success': True,
            'users': users_data,
            'total_users': len(users_data)
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/admin/users/<int:user_id>/reset-trials', methods=['POST'])
@jwt_required()
def admin_reset_user_trials(user_id):
    """管理员重置用户试用次数"""
    try:
        current_user_email = get_jwt_identity()
        current_user = User.query.filter_by(email=current_user_email).first()
        
        if not current_user or not current_user.is_admin():
            return jsonify({'success': False, 'message': 'Admin access required'}), 403
        
        target_user = User.query.get(user_id)
        if not target_user:
            return jsonify({'success': False, 'message': 'User not found'}), 404
        
        # 不能重置管理员账号
        if target_user.is_admin():
            return jsonify({'success': False, 'message': 'Cannot reset admin user trials'}), 400
        
        data = request.get_json() or {}
        new_count = data.get('trial_count', 5)
        
        target_user.demo_count = new_count
        target_user.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': f'User trials reset to {new_count}',
            'user': target_user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

# 确保有管理员用户存在
def ensure_admin_user():
    try:
        with app.app_context():
            # 创建默认管理员用户（如果不存在）
            admin_user = User.query.filter_by(email='admin@example.com').first()
            if not admin_user:
                admin = User(
                    email='admin@example.com',
                    password_hash=simple_hash('admin123'),
                    role='admin',
                    demo_count=0,  # admin用户不依赖次数，使用role判断
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow()
                )
                db.session.add(admin)
                db.session.commit()
                print("✅ 默认管理员用户已创建: admin@example.com / admin123")
                print("📋 管理员用户拥有无限制访问权限，不受试用次数限制")
            else:
                # 如果管理员已存在，确保其role正确
                if admin_user.role != 'admin':
                    admin_user.role = 'admin'
                    admin_user.updated_at = datetime.utcnow()
                    db.session.commit()
                    print("✅ 已更新现有用户为管理员")
    except Exception as e:
        print(f"❌ 创建管理员用户时出错: {e}")
        # 如果出错，可能是数据库连接问题，不影响应用启动

if __name__ == '__main__':
    # 应用启动时初始化管理员用户
    ensure_admin_user()
    
    # 从环境变量获取运行配置
    HOST = os.environ.get('HOST', '0.0.0.0')
    PORT = int(os.environ.get('PORT', '81'))
    DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
    
    print(f"🚀 Starting server on {HOST}:{PORT}")
    print(f"🔧 Debug mode: {DEBUG}")
    print(f"🗄️ Database: {DB_TYPE} at {DB_HOST}:{DB_PORT}/{DB_NAME}")
    
    app.run(debug=DEBUG, host=HOST, port=PORT) 