# === 第一阶段：构建 (Build Stage) ===
# 依然使用 slim 镜像，体积小且兼容性好
FROM node:lts-slim AS build

WORKDIR /app

# 1.【关键修改】全局安装 pnpm
RUN npm install -g pnpm

# 2. 设置 pnpm 的淘宝镜像加速
RUN pnpm config set registry https://registry.npmmirror.com

# 3.【关键修改】复制 package.json 和 pnpm-lock.yaml
# 如果你本地没有 pnpm-lock.yaml，这行也不会报错，但建议本地先 pnpm install 一次生成它
COPY package.json pnpm-lock.yaml* ./

# 4.【关键修改】使用 pnpm 安装依赖
RUN pnpm install

# 5. 复制源码
COPY . .

# 6.【关键修改】使用 pnpm 构建
RUN pnpm run build

# === 第二阶段：生产 (Production Stage) ===
# 这部分保持不变
FROM nginx:alpine

# 拷贝构建产物
COPY --from=build /app/dist /usr/share/nginx/html

# 拷贝 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]