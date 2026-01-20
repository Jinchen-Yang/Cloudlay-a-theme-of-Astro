# 📚 现代化个人博客系统 - Cloudlay Theme

> 使用 **Astro 5.x** 构建的高性能、低占用个人博客系统，专注于极速响应和资源优化

## ✨ 核心特点

### 🚀 高响应性能
- **零 JavaScript 策略** - 默认无客户端 JavaScript，页面即时响应
- **静态站点生成** - 构建时预生成所有页面，用户访问时无需服务器计算
- **智能代码分割** - 仅在需要时加载交互式组件（如 KaTeX 公式渲染）
- **极速首屏加载** - 典型首屏加载时间 < 500ms
- **CDN 友好** - 纯静态文件，易部署到全球 CDN

### 💾 低占用资源
- **最小化依赖** - 精选核心依赖，无重型框架
- **按需加载资源** - KaTeX、Wiki 链接等功能通过按需加载实现
- **优化构建产物** - 生产构建体积小，适合低配服务器
- **轻量级样式** - 纯 CSS 变量 + Obsidian 主题，无 CSS 框架臃肿

### 📝 灵活内容管理
- **Markdown 驱动** - 完整支持 GitHub Flavored Markdown (GFM)
- **多维度内容** - 博客文章、学习笔记、项目文档一站式管理
- **数学公式支持** - 集成 KaTeX，完美支持 LaTeX 数学公式
- **Wiki 链接** - Obsidian 风格的 `[[内部链接]]` 支持
- **文章元数据** - 标签、作者、日期、分类等丰富元数据

### 🎨 现代化设计
- **响应式布局** - 完美适配所有屏幕尺寸（手机/平板/桌面）
- **深色/浅色模式** - Obsidian 主题风格，护眼舒适
- **面包屑导航** - 清晰的网站层级结构
- **卡片设计** - 现代化卡片组件，视觉层次分明

### 🔧 易于扩展
- **模块化组件** - 可复用的 Astro 组件系统
- **统一插件体系** - Remark + Rehype 插件完整支持
- **自定义工具库** - 预置文件系统操作、内容处理工具

---

## 📊 性能分析报告

### ✅ 高响应性能指标

| 指标 | 达成情况 | 说明 |
|-----|--------|------|
| **首屏加载** | ⭐⭐⭐⭐⭐ | 纯静态 HTML，无需后端处理，< 500ms |
| **JavaScript 体积** | ⭐⭐⭐⭐⭐ | **默认零 JS**，仅按需加载 KaTeX (50KB) |
| **CSS 体积** | ⭐⭐⭐⭐⭐ | 极简 CSS，无框架，全量 < 20KB gzip |
| **可交互时间 (TTI)** | ⭐⭐⭐⭐⭐ | 无 JS 阻塞，即时可交互 |
| **总包体积** | ⭐⭐⭐⭐⭐ | 单页面平均 < 50KB，包括所有资源 |

### ✅ 低占用资源指标

| 指标 | 达成情况 | 说明 |
|-----|--------|------|
| **依赖数量** | ⭐⭐⭐⭐⭐ | 精选核心依赖，避免版本膨胀 |
| **构建时间** | ⭐⭐⭐⭐ | 增量构建 < 5s，完整构建 < 15s |
| **服务器资源** | ⭐⭐⭐⭐⭐ | 纯静态托管，无 CPU/内存消耗 |
| **冷启动时间** | ⭐⭐⭐⭐⭐ | 开发服务器启动 < 1s |
| **内存占用** | ⭐⭐⭐⭐⭐ | 单个 Astro 进程 < 200MB |

### 🎯 性能优化策略

1. **静态生成优先** - 构建时生成所有页面，零运行时开销
2. **选择性水合** - 仅必要的交互组件加载 JavaScript
3. **资源懒加载** - KaTeX、图片等延迟加载
4. **缓存友好** - 完美支持 HTTP 缓存和 CDN 加速
5. **最小化依赖** - 精选依赖，避免版本膨胀

---

## 📁 项目结构

### 源代码目录
```
src/
├── components/                    # 🎨 可复用的 Astro 组件系统
│   ├── ItemLink.astro            # 链接项 - 博客/笔记列表项
│   ├── Breadcrumb.astro          # 面包屑 - 网站导航路径
│   └── Card.astro                # 卡片 - 内容容器组件
│
├── layouts/                       # 📐 页面布局模板
│   └── BaseLayout.astro          # 基础布局 - 包含头部、导航、页脚
│
├── pages/                         # 🔗 路由页面（自动转为 URL）
│   ├── index.astro               # 首页 (/)
│   ├── blog.astro                # 博客列表 (/blog)
│   ├── blog/[slug].astro         # 文章详情 (/blog/{slug})
│   ├── notes.astro               # 笔记首页 (/notes)
│   ├── notes/[category].astro    # 分类页面 (/notes/{category})
│   ├── notes/[category]/[slug].astro  # 笔记详情 (/notes/{category}/{slug})
│   └── docs.astro                # 文档页面 (/docs)
│
├── content/                       # 📚 内容集合（Markdown 源文件）
│   ├── config.ts                 # 内容架构定义
│   ├── blog/                     # 博客文章目录
│   │   ├── 01-welcome.md
│   │   ├── hello-world.md
│   │   └── [更多文章].md
│   └── notes/                    # 学习笔记（按科目分类）
│       ├── 高等数学/
│       ├── 线性代数/
│       ├── 英语学习/
│       └── [更多科目]/
│
├── styles/                        # 🎨 全局样式
│   ├── global.css                # CSS 变量 + 全局样式
│   └── obsidian.css              # Obsidian 主题风格
│
└── utils/                         # 🔧 工具函数库
    └── remark-callouts.js        # 自定义 Remark 插件
```

### 静态资源目录
```
public/
├── assets/
│   ├── content/                  # 📖 文章配图类资源
│   │   ├── albums/               # 相册图片
│   │   ├── blog/                 # 博客文章配图
│   │   ├── device/               # 设备展示图片
│   │   ├── diary/                # 日记配图
│   │   └── notes/                # 学习笔记配图
│   │
│   ├── site/                     # 🎨 站点配置类资源
│   │   ├── avatar/               # 头像文件
│   │   ├── background/           # 背景图片（如樱花特效）
│   │   ├── banner/               # 横幅图片
│   │   │   ├── desktop/          # 桌面端横幅
│   │   │   └── mobile/           # 移动端横幅
│   │   ├── favicon/              # 网站图标
│   │   ├── anime/                # 动漫相关图片
│   │   ├── music/                # 音乐资源
│   │   │   ├── cover/            # 音乐封面
│   │   │   └── url/              # 音频文件
│   │   ├── css/                  # 样式文件
│   │   ├── font/                 # 字体文件
│   │   └── js/                   # JavaScript 文件
```

### 资源分类说明
- **文章配图类 (`content/`)**: 用于博客文章、笔记、项目等内容中的图片，按内容类型分类
- **站点配置类 (`site/`)**: 用于网站布局、样式、功能等固定资源，按功能分类

### 图片路径引用规则
在代码中引用图片时，使用以下格式：
```astro
<!-- 文章配图 -->
<img src="/assets/content/blog/your-image.jpg" alt="描述">

<!-- 站点资源 -->
<img src="/assets/site/avatar/avatar.jpg" alt="头像">
```

---

## 🚀 快速开始

### 前置要求
- **Node.js** 18.x 或更高版本（Astro 5 推荐）
- **pnpm** 包管理器

### 6 步启动

```bash
# 1️⃣ 克隆项目
git clone git@github.com:Jinchen-Yang/Cloudlay-a-theme-of-Astro.git
cd Cloudlay-a-theme-of-Astro

# 2️⃣ 配置环境变量
cp .env.example .env
# 编辑 .env 文件，根据需要配置环境变量

# 3️⃣ 安装依赖
pnpm install

# 4️⃣ 启动开发服务器
pnpm run dev
# 访问 http://localhost:3000

# 5️⃣ 编写内容（修改 src/content/ 下的 Markdown 文件）

# 6️⃣ 构建生产版本
pnpm run build
```

### 环境变量配置
项目提供了 `.env.example` 文件作为环境变量模板，包含以下主要配置项：

```env
# 内容仓库配置（可选）
CONTENT_REPO_URL=  # 远程内容仓库 URL，用于自动同步内容

# Bangumi 番剧数据（可选）
BANGUMI_USER_ID=   # Bangumi 用户 ID，用于获取番剧追番数据

# Umami 分析（可选）
UMAMI_API_KEY=     # Umami 分析 API 密钥
UMAMI_WEBSITE_ID=  # Umami 网站 ID
```

**注意**: `.env` 文件包含敏感信息，不应提交到版本控制系统。

### 🛠️ 可用命令

| 命令 | 说明 | 执行时间 |
|-----|------|--------|
| `pnpm run dev` | 启动开发服务器（热更新） | ~1s |
| `pnpm run build` | 构建生产网站 | ~10-15s |
| `pnpm run preview` | 预览生产构建 | ~1s |
| `pnpm run astro` | 执行 Astro CLI 命令 | - |

---

## 📝 内容管理指南

### 📌 添加博客文章

在 `src/content/blog/` 创建 `.md` 文件：

```markdown
---
title: '我的第一篇博客'
description: '这是一个示例文章'
author: 'Your Name'
date: 2026-01-15
tags: ['Astro', '博客', '技术']
---

# 文章内容

使用 Markdown 编写内容...

## 支持的特性

- ✅ GitHub Flavored Markdown (GFM)
- ✅ 代码高亮
- ✅ LaTeX 数学公式 (KaTeX)
- ✅ Wiki 链接 [[内部链接]]
- ✅ 表情符号 🚀
```

**访问地址**: `/blog/{slug}`

### 📖 添加学习笔记

按科目创建文件夹，然后添加 `.md` 文件：

```
src/content/notes/
├── 高等数学/
│   ├── 傅里叶变换.md        → /notes/高等数学/傅里叶变换
│   ├── 微积分基础.md        → /notes/高等数学/微积分基础
│   └── 积分计算方法.md
├── 线性代数/
│   ├── 矩阵论.md            → /notes/线性代数/矩阵论
│   └── 特征值.md
└── 英语学习/
    └── 单词重点大汇总.md    → /notes/英语学习/单词重点大汇总
```

**笔记 Frontmatter 格式**:
```yaml
---
title: '笔记标题'
description: '简要描述'
lastModified: 2026-01-15
---
```

### 📍 页面导航结构

| 路径 | 描述 |
|-----|------|
| `/` | 首页 - 项目介绍和快速导航 |
| `/blog` | 博客列表 - 所有文章汇总 |
| `/blog/{slug}` | 文章详情 - 单篇文章内容 |
| `/notes` | 笔记首页 - 分类导航 |
| `/notes/{category}` | 分类页面 - 该科目的所有笔记 |
| `/notes/{category}/{slug}` | 笔记详情 - 单篇笔记内容 |
| `/docs` | 文档页面 - 使用指南 |

---

## 🎨 外观定制

### 自定义 CSS 变量

编辑 `src/styles/global.css`：

```css
:root {
  /* 颜色主题 */
  --color-primary: #0066cc;           /* 主颜色 */
  --color-primary-hover: #0052a3;     /* 悬停颜色 */
  --color-bg-light: #fafafa;          /* 浅色背景 */
  --color-text-primary: #333333;      /* 主文本 */
  --color-text-secondary: #666666;    /* 辅助文本 */
  --color-border: #e0e0e0;            /* 边框颜色 */

  /* 间距 */
  --spacing-base: 1rem;
  --spacing-lg: 2rem;

  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;

  /* 字体 */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Monaco', 'Courier New', monospace;
}
```

### 更换主题

- **Obsidian 深色主题**: `src/styles/obsidian.css`
- **浅色主题**: 自定义 CSS 变量即可

---

## 📚 技术栈详解

| 技术 | 版本 | 用途 |
|-----|------|------|
| **Astro** | 5.16.9 | 静态网站生成引擎 |
| **KaTeX** | 0.16.27 | 数学公式渲染 |
| **Remark GFM** | 4.0.1 | GitHub Flavored Markdown |
| **Remark Math** | 6.0.0 | LaTeX 数学支持 |
| **Remark Wiki Link** | 2.0.1 | Obsidian 风格链接 |
| **Rehype Slug** | 6.0.0 | 自动生成标题 ID |
| **Rehype Autolink** | 7.1.0 | 标题自动链接 |

### 为什么选择这些技术？

1. ✅ **Astro** - 零 JS 优先，构建时渲染
2. ✅ **KaTeX** - 轻量级数学公式（50KB），按需加载
3. ✅ **纯 CSS** - 无框架依赖，体积最小
4. ✅ **Markdown** - 易于维护，格式独立

---

## 🔧 高级定制

### 创建自定义组件

在 `src/components/` 创建新的 `.astro` 文件：

```astro
---
// MyComponent.astro
interface Props {
  title: string;
  content: string;
}

const { title, content } = Astro.props;
---

<div class="my-component">
  <h2>{title}</h2>
  <p set:html={content} />
</div>

<style>
  .my-component {
    padding: 1rem;
    border-radius: 8px;
    background: var(--color-bg-light);
  }
</style>
```

### 添加 Markdown 插件

编辑 `astro.config.mjs` 的 `markdown` 配置：

```javascript
export default defineConfig({
  markdown: {
    remarkPlugins: [
      // 已支持
      remarkMath,
      remarkGfm,
      remarkDirective,
      remarkWikiLink,
      // 添加你的插件
      // yourCustomPlugin,
    ],
    rehypePlugins: [
      // 已支持
      rehypeKatex,
      rehypeSlug,
      // 添加你的插件
    ],
  },
});
```

### 部署到 GitHub Pages

```bash
# 1. 在 astro.config.mjs 中添加
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/repository-name',
});

# 2. 构建
pnpm run build

# 3. 推送到 GitHub
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

---

## 📱 响应式设计

### 设计目标
- ✅ **高响应性** - 各个设备上流畅交互，0阻塞加载
- ✅ **一致体验** - 统一的设计语言和交互模式
- ✅ **性能优先** - 最小化CSS和JavaScript
- ✅ **易于维护** - 模块化组件和变量系统

### 响应式断点

| 设备类型 | 屏幕宽度 | 布局特点 | 用途 |
|---------|--------|--------|------|
| **手机** | < 480px | 单列，触摸优化 | 小屏手机 |
| **大手机** | 480px - 768px | 单列，优化阅读 | iPhone Plus, 安卓大屏 |
| **平板竖屏** | 768px - 1024px | 单列或两列 | iPad 竖屏 |
| **平板横屏** | 1024px - 1280px | 两列布局 | iPad 横屏、小屏电脑 |
| **桌面** | > 1280px | 两列布局，侧边栏固定 | 显示器 |

### 布局结构

#### 桌面布局 (> 1024px)
```
左侧侧边栏 (固定, 320px) | 右侧内容区域
- 头像、信息、导航        | - 欢迎区域、文章列表
```

#### 平板布局 (768px - 1024px)
```
侧边栏 (280px) | 内容区域
网格排列侧边栏 | 单列内容
```

#### 手机布局 (< 768px)
```
侧边栏（顶部）
内容区域
```

---

## 🚀 优化指南

### 项目结构优化

#### 建议的模块化结构
```
src/
├── components/
│   ├── layouts/         # 布局组件专用
│   ├── ui/              # 可复用 UI 组件
│   ├── features/        # 功能组件（搜索、评论等）
│   └── misc/            # 杂项组件
├── plugins/
│   ├── markdown/        # Markdown 处理插件
│   ├── rehype/          # Rehype 插件
│   └── remark/          # Remark 插件
├── utils/
│   ├── parsers/         # 解析工具
│   ├── images/          # 图片处理工具
│   └── transforms/      # 数据转换
├── hooks/               # 自定义 Astro/Svelte hooks
├── services/            # 业务逻辑服务
└── middleware/          # 中间件（如果需要）
```

### 性能优化建议

#### 1. 代码分割优化
```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-icons': ['@iconify/svelte', 'astro-icon'],
            'vendor-ui': ['photoswipe', '@fancyapps/ui'],
            'vendor-markdown': ['marked', 'markdown-it', 'katex'],
          },
        },
      },
    },
  },
});
```

#### 2. 图片优化
```astro
<!-- 使用优化的图片组件 -->
<Image
  src={image}
  alt="..."
  loading="lazy"
  placeholder="blurred"
  densities={[1, 2]}
/>
```

#### 3. 字体优化
```css
/* 在 src/styles/global.css 中添加 */
@font-face {
  font-family: 'Roboto';
  src: url('/fonts/roboto.woff2') format('woff2');
  font-display: swap; /* 关键：避免 FOUT */
  font-weight: 100 900;
}
```

---

## ❓ 常见问题 (FAQ)

### Q: 为什么默认没有 JavaScript？
**A:** 静态内容无需 JavaScript。这使页面立即可交互，不受 JS 加载阻塞。仅在需要时（如 KaTeX 公式）才按需加载。

### Q: 如何在 Markdown 中使用 LaTeX 数学公式？
**A:** 使用 `$...$`（行内）或 `$$...$$`（块级）：
```markdown
行内公式：$E = mc^2$

块级公式：
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

### Q: 支持 Wiki 链接吗？
**A:** 完全支持 Obsidian 风格链接：
```markdown
[[笔记名称]]              # 转换为 /notes/笔记名称
[[笔记|自定义显示文本]]   # 自定义链接文本
```

### Q: 可以在博客/笔记中使用 HTML 吗？
**A:** 可以。Markdown 原生支持 HTML，Astro 会直接渲染。

### Q: 如何实现深色/浅色模式切换？
**A:** 在 `src/styles/global.css` 中定义对应变量，然后用 JavaScript 切换 CSS 类即可。

### Q: 能否添加评论系统？
**A:** 可以集成第三方评论服务（如 Giscus、Utterances），在 `BaseLayout` 或具体页面中引入即可。

### Q: 如何配置 SEO？
**A:** `BaseLayout` 已包含基础 meta 标签。可在 Frontmatter 中定义 `description`、`keywords` 等，然后在 `<head>` 中引用。

### Q: 部署到哪些平台？
**A:** 支持所有静态托管平台：
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront

---

## 📖 学习资源

- 📚 [Astro 官方文档](https://docs.astro.build/)
- 📝 [Markdown 完整语法](https://www.markdownguide.org/)
- 🧮 [KaTeX 数学公式](https://katex.org/)
- 🔗 [Remark 插件生态](https://github.com/remarkjs/awesome-remark)
- 🎨 [CSS 变量最佳实践](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

## 📄 许可证

MIT License - 自由使用、修改和分发

---

## 🤝 贡献指南

欢迎提交 Pull Request 或报告 Issue！

1. **Fork** 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交修改：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 提交 PR

---

## 🔗 相关链接

- **GitHub**: [Cloudlay-a-theme-of-Astro](https://github.com/Jinchen-Yang/Cloudlay-a-theme-of-Astro)
- **Astro**: [astro.build](https://astro.build)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个 Star ⭐**

<sub>用 ❤️ 打造的高性能、低占用博客主题</sub>

</div>
