# 第一阶段：构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制package文件并安装依赖
COPY package*.json ./
RUN npm ci

# 复制源代码并构建
COPY . .
RUN npm run build

# 第二阶段：生产阶段
FROM nginx:alpine

# 复制nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 复制构建文件
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"] 