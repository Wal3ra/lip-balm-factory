# Vercel 部署说明

## 项目概述
这是一个 Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui 的润唇膏定制配置界面。

## 部署步骤

### 1. 下载项目文件
从 Z.ai 平台点击 "Download" 按钮下载完整项目压缩包。

### 2. 上传到 Vercel
1. 访问 [vercel.com](https://vercel.com)
2. 登录您的账户
3. 点击 "New Project"
4. 选择上传方式：
   - 如果您有 Git 仓库，选择 "Import Git Repository"
   - 如果没有，选择 "Upload" 上传下载的压缩包

### 3. 项目配置
Vercel 会自动检测到 Next.js 项目并进行以下配置：
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. 环境变量（如果需要）
如果您的项目需要环境变量，在 Vercel 项目设置中添加：
- `NODE_ENV`: `production`
- 其他自定义环境变量

### 5. 部署
点击 "Deploy" 按钮，Vercel 会自动：
1. 安装依赖包
2. 构建项目
3. 部署到全球 CDN

## 重要说明

### 自定义服务器处理
项目包含 `server.ts` 文件（用于 Socket.IO），但 Vercel 会自动忽略自定义服务器文件，使用标准的 Next.js 无服务器部署。这意味着：
- ✅ 前端界面完全正常工作
- ✅ API 路由正常工作
- ⚠️ Socket.IO 功能需要额外配置

### Socket.IO 功能（可选）
如果您需要保留 Socket.IO 功能，需要：
1. 将 Socket.IO 逻辑迁移到 Vercel API 路由
2. 使用第三方 WebSocket 服务（如 Pusher、Ably）

### 预期结果
部署成功后，您会获得一个类似这样的 URL：
`https://your-project-name.vercel.app`

## 集成到 Wix

### 1. 获取 Vercel URL
部署完成后，复制 Vercel 提供的 URL。

### 2. 在 Wix 中集成
1. 登录 Wix 编辑器
2. 添加一个按钮或链接元素
3. 设置链接到您的 Vercel URL
4. 可以选择：
   - 在当前页面打开
   - 在新标签页打开（推荐）

### 3. 测试
发布 Wix 网站后，测试链接是否正常工作。

## 故障排除

### 构建失败
- 检查 `package.json` 中的依赖是否完整
- 确认所有文件都已正确上传

### 运行时错误
- 检查 Vercel 函数日志
- 确认 API 路由配置正确

### 样式问题
- Tailwind CSS 配置是自动处理的
- 确认 `tailwind.config.ts` 文件存在

## 技术支持
如果遇到问题：
1. 检查 Vercel 部署日志
2. 确认项目文件完整性
3. 验证配置文件正确性

---

**项目技术栈：**
- Next.js 15 (App Router)
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui 组件库
- Prisma ORM
- Socket.IO (可选)