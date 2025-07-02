# Oak 项目运行指南

这是一个前后端分离的全栈Web应用项目，包含React前端和Flask后端API。

## 项目结构

```
oak/
├── web/          # React前端项目
├── api/          # Flask后端API项目
├── package.json  # 根目录依赖配置
└── README.md     # 项目文档
```

## 环境要求

### 后端环境
- Python 3.10+
- MySQL 数据库
- pip 包管理器

### 前端环境
- Node.js 16+
- pnpm 包管理器

## 快速开始

### 1. 数据库准备

确保MySQL数据库已安装并运行，创建名为 `magical_website` 的数据库。

### 2. 后端启动

#### 方式一：本地运行

```bash
# 进入后端目录
cd api

# 创建Python虚拟环境
python -m venv venv

# 激活虚拟环境
# macOS/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 复制环境配置文件
cp config.env.example .env

# 编辑.env文件，配置数据库连接信息
# 修改以下配置：
# DB_HOST=你的数据库主机
# DB_USER=你的数据库用户名
# DB_PASSWORD=你的数据库密码
# DB_NAME=magical_website

# 启动后端服务
python app.py
```

后端服务将在 `http://localhost:81` 启动

#### 方式二：Docker运行

```bash
# 进入后端目录
cd api

# 构建Docker镜像
docker build -t oak-api .

# 运行Docker容器
docker run -d \
  --name oak-api \
  -p 81:81 \
  -e DB_HOST=你的数据库主机 \
  -e DB_USER=你的数据库用户名 \
  -e DB_PASSWORD=你的数据库密码 \
  -e DB_NAME=magical_website \
  oak-api
```

### 3. 前端启动

```bash
# 安装pnpm（如果未安装）
npm install -g pnpm

# 安装根目录依赖
pnpm install

# 进入前端目录
cd web

# 安装前端依赖
pnpm install

# 启动开发服务器
pnpm dev
```

前端服务将在 `http://localhost:5173` 启动

## 环境配置

### 后端环境变量

在 `api/.env` 文件中配置以下环境变量：

```env
# Flask应用配置
SECRET_KEY=你的密钥
JWT_SECRET_KEY=JWT密钥
JWT_EXPIRES_HOURS=24
FLASK_ENV=development
FLASK_DEBUG=True

# 数据库配置
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=你的数据库密码
DB_NAME=magical_website

# 服务器配置
PORT=81
HOST=0.0.0.0

# 管理员配置
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

## API接口

### 用户认证
- `POST /api/register` - 用户注册
- `POST /api/login` - 用户登录
- `GET /api/user/info` - 获取用户信息

### 用户管理
- `POST /api/user/use-trial` - 使用试用次数
- `GET /api/user/check-trial` - 检查试用次数
- `GET /api/user/permissions` - 获取用户权限
- `POST /api/user/change-password` - 修改密码

### 管理员功能
- `GET /api/admin/users` - 获取用户列表
- `POST /api/admin/users/<id>/reset-trials` - 重置用户试用次数

## 生产部署

### 使用Docker Compose

创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: magical_website
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  api:
    build: ./api
    ports:
      - "81:81"
    environment:
      DB_HOST: mysql
      DB_USER: root
      DB_PASSWORD: password
      DB_NAME: magical_website
    depends_on:
      - mysql

  web:
    build: ./web
    ports:
      - "80:80"
    depends_on:
      - api

volumes:
  mysql_data:
```

运行命令：
```bash
docker-compose up -d
```

## 开发说明

### 后端技术栈
- Flask - Web框架
- SQLAlchemy - ORM
- Flask-JWT-Extended - JWT认证
- PyMySQL - MySQL连接器
- Flask-CORS - 跨域支持

### 前端技术栈
- React - 前端框架
- TypeScript - 类型支持
- Vite - 构建工具
- Tailwind CSS - CSS框架
- Radix UI - 组件库
- React Router - 路由管理
- Axios - HTTP客户端

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查数据库服务是否启动
   - 验证数据库连接信息是否正确
   - 确保数据库已创建

2. **前端无法访问后端API**
   - 检查后端服务是否在端口81运行
   - 验证CORS配置是否正确

3. **虚拟环境问题**
   - 确保已激活Python虚拟环境
   - 重新安装依赖：`pip install -r requirements.txt`

4. **前端依赖安装失败**
   - 清除缓存：`pnpm store prune`
   - 删除node_modules重新安装

## 联系方式

如有问题，请联系项目维护者。 