# Flask Backend API Dockerfile
FROM python:3.11-alpine

# 设置工作目录
WORKDIR /app

# 安装系统依赖
RUN apk add --no-cache \
    gcc \
    musl-dev \
    libffi-dev \
    openssl-dev \
    mariadb-dev \
    curl \
    && rm -rf /var/cache/apk/*

# 复制依赖文件
COPY requirements.txt .

# 安装Python依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用文件
COPY . .

# 环境变量设置
ENV PYTHONUNBUFFERED=1
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV FLASK_DEBUG=False

# 服务器配置
ENV HOST=0.0.0.0
ENV PORT=81

# JWT配置
ENV SECRET_KEY=your-secret-key-change-in-production
ENV JWT_SECRET_KEY=jwt-secret-change-in-production
ENV JWT_EXPIRES_HOURS=24

# 数据库配置（可通过环境变量覆盖）
ENV DB_TYPE=mysql
ENV DB_HOST=mysql
ENV DB_PORT=3306
ENV DB_NAME=magical_website
ENV DB_USER=root
ENV DB_PASSWORD=password

# 管理员配置
ENV ADMIN_EMAIL=admin@example.com
ENV ADMIN_PASSWORD=admin123

# 暴露端口
EXPOSE 81

# 健康检查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:81/api/user/info || exit 1

# 启动应用
CMD ["python", "app.py"] 