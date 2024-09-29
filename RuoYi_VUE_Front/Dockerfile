# 使用 Node.js 镜像 , as build 别名构建阶段
FROM node:18 AS build
# 指定构建目录
WORKDIR /app
# 将宿主机的所有文件，放到指定的WORKDIR工作目录里面来
COPY ./ /app/
# 安装项目依赖
RUN npm install
# 执行 npm run build:prod 命令
# RUN npm run build:prod
RUN npm run build:prod

# 使用官方的 Nginx 镜像
FROM nginx:latest
# 指定运行时的工作目录
# WORKDIR /app
# 将宿主机的 nginx.conf 文件复制到容器中的 /etc/nginx/ 目录
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
# 从第一build阶段获取dist下的文件移动到容器中的 /usr/share/nginx/html/ 目录
COPY --from=build /app/dist/ /usr/share/nginx/html/
# 暴露端口
# 此处端口必须与「服务设置」-「流水线」以及「手动上传代码包」部署时填写的端口一致，否则会部署失败。
EXPOSE 443
# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
