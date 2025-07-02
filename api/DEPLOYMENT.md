# 服务器部署文档

## 📋 前置要求

- Ubuntu/CentOS Linux 服务器
- Python 3.8+
- MySQL 8.0+ 数据库
- 具有 sudo 权限的用户

## 🚀 服务器部署

### 1. 准备服务器环境

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y  # Ubuntu
# sudo yum update -y                     # CentOS

# 安装Python3和pip
sudo apt install python3 python3-pip python3-venv git -y  # Ubuntu
# sudo yum install python3 python3-pip git -y              # CentOS

# 安装MySQL客户端（用于连接测试）
sudo apt install mysql-client -y        # Ubuntu
# sudo yum install mysql -y              # CentOS
```

### 2. 创建部署用户和目录

```bash
# 创建应用用户（可选，更安全）
sudo useradd -m -s /bin/bash magical
sudo usermod -aG sudo magical

# 切换到应用用户
sudo su - magical

# 创建应用目录
mkdir -p ~/apps/magical-backend
cd ~/apps/magical-backend
```

### 3. 上传和配置应用

```bash
# 方式一：通过git克隆（推荐）
git clone <your-repo-url> .

# 方式二：手动上传文件
# 将项目文件上传到 ~/apps/magical-backend/

# 创建Python虚拟环境
python3 -m venv venv
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 4. 配置环境变量

```bash
# 复制配置文件模板
cp config.env.example config.env

# 编辑配置文件
nano config.env
```

配置内容：
```env
# 应用配置
HOST=0.0.0.0
PORT=81
DEBUG=false
SECRET_KEY=your-super-secret-key-change-in-production
JWT_SECRET_KEY=your-jwt-secret-key-change-in-production
JWT_EXPIRES_HOURS=24

# 数据库配置
DB_TYPE=mysql
DB_HOST=your-database-host
DB_PORT=3306
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=magical_website
```

### 5. 验证数据库连接

```bash
# 测试数据库连接
mysql -h your-database-host -u your-username -p -e "SHOW DATABASES;"

# 确保数据库表已创建（如需要）
mysql -h your-database-host -u your-username -p magical_website < schema.sql
```

### 6. 测试运行

```bash
# 激活虚拟环境
source venv/bin/activate

# 测试运行（前台）
python app.py

# 测试API（另开终端）
curl http://localhost:81/api/user/info
```

## 🔧 后台托管部署

### 方式一：systemd 服务（推荐生产环境）

#### 创建 systemd 服务文件

```bash
sudo nano /etc/systemd/system/magical-backend.service
```

内容：
```ini
[Unit]
Description=Magical Website Backend
After=network.target mysql.service
Wants=network.target

[Service]
Type=simple
User=magical
Group=magical
WorkingDirectory=/home/magical/apps/magical-backend
Environment=PATH=/home/magical/apps/magical-backend/venv/bin
ExecStart=/home/magical/apps/magical-backend/venv/bin/python app.py
ExecReload=/bin/kill -HUP $MAINPID
Restart=always
RestartSec=3
StandardOutput=journal
StandardError=journal
SyslogIdentifier=magical-backend
KillMode=mixed
TimeoutStopSec=5

# 环境变量
EnvironmentFile=/home/magical/apps/magical-backend/config.env

[Install]
WantedBy=multi-user.target
```

#### 启动和管理服务

```bash
# 重新加载systemd配置
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start magical-backend

# 设置开机自启
sudo systemctl enable magical-backend

# 查看服务状态
sudo systemctl status magical-backend

# 查看服务日志
sudo journalctl -u magical-backend -f

# 重启服务
sudo systemctl restart magical-backend

# 停止服务
sudo systemctl stop magical-backend
```

### 方式二：Gunicorn + Systemd（推荐高负载）

#### 安装和配置 Gunicorn

```bash
# 激活虚拟环境
source venv/bin/activate

# 安装gunicorn
pip install gunicorn

# 创建gunicorn配置文件
nano gunicorn.conf.py
```

gunicorn配置：
```python
# gunicorn.conf.py
bind = "0.0.0.0:81"
workers = 4
worker_class = "sync"
worker_connections = 1000
max_requests = 1000
max_requests_jitter = 100
timeout = 30
keepalive = 2
preload_app = True
user = "magical"
group = "magical"
tmp_upload_dir = None
errorlog = "/home/magical/apps/magical-backend/logs/error.log"
accesslog = "/home/magical/apps/magical-backend/logs/access.log"
loglevel = "info"
capture_output = True
enable_stdio_inheritance = True
```

#### 创建日志目录

```bash
mkdir -p /home/magical/apps/magical-backend/logs
```

#### 创建 Gunicorn systemd 服务

```bash
sudo nano /etc/systemd/system/magical-backend-gunicorn.service
```

内容：
```ini
[Unit]
Description=Magical Backend Gunicorn Application
After=network.target mysql.service
Wants=network.target

[Service]
Type=notify
User=magical
Group=magical
RuntimeDirectory=magical-backend
WorkingDirectory=/home/magical/apps/magical-backend
ExecStart=/home/magical/apps/magical-backend/venv/bin/gunicorn -c gunicorn.conf.py app:app
ExecReload=/bin/kill -s HUP $MAINPID
Restart=always
RestartSec=3
KillMode=mixed
TimeoutStopSec=5

# 环境变量
EnvironmentFile=/home/magical/apps/magical-backend/config.env

[Install]
WantedBy=multi-user.target
```

#### 启动 Gunicorn 服务

```bash
sudo systemctl daemon-reload
sudo systemctl start magical-backend-gunicorn
sudo systemctl enable magical-backend-gunicorn
sudo systemctl status magical-backend-gunicorn
```

### 方式三：Screen/Tmux（简单，适合开发/测试）

```bash
# 使用screen
screen -S magical-backend
source venv/bin/activate
python app.py
# Ctrl+A, D 退出screen但保持程序运行

# 重新连接screen
screen -r magical-backend

# 或使用tmux
tmux new-session -s magical-backend
source venv/bin/activate
python app.py
# Ctrl+B, D 退出tmux但保持程序运行

# 重新连接tmux
tmux attach-session -t magical-backend
```

### 方式四：nohup（最简单）

```bash
# 后台运行
source venv/bin/activate
nohup python app.py > app.log 2>&1 &

# 查看进程
ps aux | grep app.py

# 停止进程
pkill -f "python app.py"

# 查看日志
tail -f app.log
```

## 🔍 监控和管理

### 查看运行状态

```bash
# 检查端口占用
sudo netstat -tlnp | grep :81

# 查看进程
ps aux | grep magical

# 查看系统资源
top
htop  # 需要安装: sudo apt install htop
```

### 日志管理

```bash
# systemd服务日志
sudo journalctl -u magical-backend -f --since "1 hour ago"

# gunicorn日志
tail -f /home/magical/apps/magical-backend/logs/error.log
tail -f /home/magical/apps/magical-backend/logs/access.log

# 应用自定义日志（如果有）
tail -f /home/magical/apps/magical-backend/app.log
```

### 服务管理命令

```bash
# systemd方式
sudo systemctl start magical-backend      # 启动
sudo systemctl stop magical-backend       # 停止
sudo systemctl restart magical-backend    # 重启
sudo systemctl reload magical-backend     # 重载配置
sudo systemctl status magical-backend     # 查看状态

# 手动kill进程
sudo pkill -f "python app.py"
sudo pkill -f "gunicorn"
```

## 🔄 更新部署

### 更新应用代码

```bash
# 进入应用目录
cd ~/apps/magical-backend

# 拉取最新代码
git pull origin main

# 激活虚拟环境
source venv/bin/activate

# 更新依赖（如果有变化）
pip install -r requirements.txt

# 重启服务
sudo systemctl restart magical-backend
# 或
sudo systemctl restart magical-backend-gunicorn
```

### 数据库迁移（如需要）

```bash
# 备份数据库
mysqldump -h your-db-host -u your-username -p magical_website > backup_$(date +%Y%m%d_%H%M%S).sql

# 执行迁移脚本（如果有）
mysql -h your-db-host -u your-username -p magical_website < migration.sql
```

## 🛡️ 安全建议

### 防火墙配置

```bash
# Ubuntu (ufw)
sudo ufw allow 81/tcp
sudo ufw enable
sudo ufw status

# CentOS (firewalld)
sudo firewall-cmd --permanent --add-port=81/tcp
sudo firewall-cmd --reload
```

### SSL/HTTPS配置（使用Nginx反向代理）

```bash
# 安装nginx
sudo apt install nginx -y

# 配置nginx
sudo nano /etc/nginx/sites-available/magical-backend
```

Nginx配置：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:81;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# 启用配置
sudo ln -s /etc/nginx/sites-available/magical-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 📊 性能优化

### 系统优化

```bash
# 增加文件描述符限制
echo "* soft nofile 65535" | sudo tee -a /etc/security/limits.conf
echo "* hard nofile 65535" | sudo tee -a /etc/security/limits.conf

# 优化内核参数
echo "net.core.somaxconn = 65535" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### 应用监控

推荐安装监控工具：
- **htop**：系统资源监控
- **netdata**：实时系统监控
- **logrotate**：日志轮转

```bash
# 安装监控工具
sudo apt install htop -y

# 配置日志轮转
sudo nano /etc/logrotate.d/magical-backend
```

## 🆘 故障排除

### 常见问题

1. **端口被占用**
```bash
sudo lsof -i :81
sudo netstat -tlnp | grep :81
```

2. **权限问题**
```bash
sudo chown -R magical:magical /home/magical/apps/magical-backend
chmod +x /home/magical/apps/magical-backend/app.py
```

3. **数据库连接失败**
```bash
mysql -h your-db-host -u your-username -p -e "SELECT 1"
```

4. **查看详细错误**
```bash
sudo journalctl -u magical-backend -n 50
```

## 📋 快速部署命令总结

### systemd 服务部署（推荐）

```bash
# 1. 环境准备
sudo apt update && sudo apt install -y python3 python3-pip python3-venv git mysql-client

# 2. 创建用户和目录
sudo useradd -m -s /bin/bash magical
sudo mkdir -p /home/magical/apps/magical-backend
sudo chown magical:magical /home/magical/apps/magical-backend

# 3. 部署应用（将文件上传到服务器后）
cd /home/magical/apps/magical-backend
sudo cp /path/to/your/files/* .
sudo chown -R magical:magical .

# 4. 设置环境
sudo -u magical python3 -m venv venv
sudo -u magical bash -c "source venv/bin/activate && pip install -r requirements.txt"
sudo -u magical cp config.env.example config.env
# 编辑配置文件
sudo nano config.env

# 5. 创建systemd服务
sudo tee /etc/systemd/system/magical-backend.service > /dev/null << 'EOF'
[Unit]
Description=Magical Website Backend
After=network.target

[Service]
Type=simple
User=magical
WorkingDirectory=/home/magical/apps/magical-backend
ExecStart=/home/magical/apps/magical-backend/venv/bin/python app.py
Restart=always
EnvironmentFile=/home/magical/apps/magical-backend/config.env

[Install]
WantedBy=multi-user.target
EOF

# 6. 启动服务
sudo systemctl daemon-reload
sudo systemctl enable magical-backend
sudo systemctl start magical-backend

# 7. 验证
sudo systemctl status magical-backend
curl http://localhost:81/api/user/info
```

### 简单后台运行方式

```bash
# 1. 准备环境
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp config.env.example config.env
# 编辑config.env

# 2. 后台运行
nohup python app.py > app.log 2>&1 &

# 3. 查看状态
ps aux | grep app.py
tail -f app.log
```

推荐使用 **systemd 服务方式**进行生产环境部署！ 