# 🚀 项目快速参考

这是一个速查表，包含项目的关键信息和常用命令。

## 📋 快速导航

### 页面对应关系

| URL | 文件位置 | 功能 |
|-----|--------|------|
| `/` | `src/pages/index.astro` | 首页 - 项目介绍和特性展示 |
| `/blog` | `src/pages/blog.astro` | 博客列表 - 所有文章 |
| `/blog/{slug}` | `src/pages/blog/[slug].astro` | 文章详情 |
| `/notes` | `src/pages/notes.astro` | 笔记首页 - 分类列表 |
| `/notes/{category}` | `src/pages/notes/[category].astro` | 分类下的文件列表 |
| `/notes/{category}/{slug}` | `src/pages/notes/[category]/[slug].astro` | 笔记详情 |
| `/docs` | `src/pages/docs.astro` | 开发文档 |

### 内容位置

| 内容类型 | 位置 | 说明 |
|---------|------|------|
| 博客文章 | `src/content/blog/*.md` | 使用 Markdown 编写 |
| 学习笔记 | `src/content/notes/{类别}/*.md` | 按分类组织 |
| 组件 | `src/components/*.astro` | 可复用组件 |
| 布局 | `src/layouts/BaseLayout.astro` | 页面框架 |
| 样式 | `src/styles/global.css` | 全局样式和 CSS 变量 |
| 工具 | `src/utils/fs.ts` | 文件操作函数 |

## ⚡ 常用命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 添加集成
npm run astro add [framework]

# 检查代码
npm run check
```

## 📝 文章创建模板

### 博客文章

创建文件：`src/content/blog/your-post.md`

```markdown
---
title: '文章标题'
description: '文章简短描述'
author: '作者名称'
date: 2026-01-15
tags: ['标签1', '标签2']
---

# 文章标题

正文内容...
```

### 学习笔记

创建文件夹：`src/content/notes/学科名称/`

创建文件：`src/content/notes/学科名称/笔记标题.md`

```markdown
---
title: '笔记标题'
---

# 笔记标题

笔记内容...
```

## 🎨 CSS 变量速查

```css
/* 主题颜色 */
--color-primary: #0066cc;           /* 主颜色 */
--color-primary-hover: #0052a3;     /* 悬停颜色 */

/* 背景 */
--color-bg-light: #fafafa;          /* 浅背景 */
--color-bg-lighter: #f5f5f5;        /* 更浅背景 */

/* 文本 */
--color-text-primary: #333;         /* 主文本 */
--color-text-secondary: #666;       /* 次文本 */
--color-text-muted: #999;           /* 灰色文本 */

/* 边框 */
--color-border: #eee;               /* 浅边框 */
--color-border-dark: #ddd;          /* 深边框 */

/* 强调 */
--color-accent: #d63384;            /* 强调色 */
```

## 🔧 常用工具函数

### 获取目录项

```typescript
import { getDirectoryItems } from '../utils/fs';

const items = await getDirectoryItems('./src/content/notes');
```

### 获取分类文件

```typescript
import { getCategoryFiles } from '../utils/fs';

const files = await getCategoryFiles('./src/content/notes/高等数学');
```

### 提取标题

```typescript
import { extractTitleFromFrontmatter } from '../utils/fs';

const title = extractTitleFromFrontmatter(markdownContent);
```

### 提取正文

```typescript
import { extractMarkdownContent } from '../utils/fs';

const markdown = extractMarkdownContent(markdownContent);
```

## 📦 组件使用示例

### ItemLink

```astro
<ItemLink
  href="/path"
  icon="📁"
  title="链接标题"
/>
```

### Breadcrumb

```astro
<Breadcrumb items={[
  { label: '首页', href: '/' },
  { label: '分类', href: '/category' }
]} />
```

### Card

```astro
<Card title="卡片标题" description="描述">
  卡片内容
</Card>
```

## 🎯 开发流程

### 1. 添加新文章

```bash
cd src/content/blog
# 创建 .md 文件，添加 frontmatter
```

### 2. 启动服务器

```bash
npm run dev
```

### 3. 预览效果

访问 `http://localhost:4321`

### 4. 提交代码

```bash
git add .
git commit -m "Add new article"
git push
```

## 📚 目录结构速览

```
src/
├── components/          ← 可复用组件
│   ├── ItemLink.astro
│   ├── Breadcrumb.astro
│   └── Card.astro
├── layouts/             ← 页面布局
│   └── BaseLayout.astro
├── pages/               ← 页面和路由
│   ├── index.astro
│   ├── blog.astro
│   ├── blog/[slug].astro
│   ├── notes.astro
│   ├── notes/[category].astro
│   ├── notes/[category]/[slug].astro
│   └── docs.astro
├── content/             ← 内容文件
│   ├── blog/
│   ├── notes/
│   └── config.ts
├── styles/              ← 样式
│   └── global.css
└── utils/               ← 工具函数
    └── fs.ts
```

## 🐛 常见问题排查

### 服务器无法启动？

```bash
# 清除缓存
rm -rf .astro

# 重新安装依赖
npm install

# 重新启动
npm run dev
```

### 文章不显示？

- 检查文件位置是否在 `src/content/blog/`
- 检查 frontmatter 是否有效
- 查看浏览器控制台是否有错误

### 样式未应用？

- 检查 CSS 变量名称是否正确
- 清除浏览器缓存
- 重启开发服务器

### 页面 404？

- 检查页面文件名是否正确
- 检查文件是否在 `src/pages/` 目录
- 动态路由检查参数是否正确

## 📖 相关文档

- **完整文档**：见 `PROJECT.md`
- **README**：见 `README.md`
- **Astro 官方**：https://docs.astro.build

## 🚀 部署清单

- [ ] 所有内容已完成
- [ ] 本地测试无误
- [ ] 构建成功 (`npm run build`)
- [ ] 预览检查通过 (`npm run preview`)
- [ ] 推送到 GitHub
- [ ] 连接到 Vercel/Netlify
- [ ] 设置自定义域名

## 💾 重要文件

| 文件 | 用途 |
|------|------|
| `PROJECT.md` | 📋 完整项目文档 |
| `README.md` | 📖 项目自述文件 |
| `src/layouts/BaseLayout.astro` | 📐 页面布局 |
| `src/styles/global.css` | 🎨 全局样式 |
| `src/content/config.ts` | ⚙️ 内容配置 |
| `astro.config.mjs` | ⚡ Astro 配置 |

---

**最后更新**：2026-01-15  
💡 **提示**：将此文件加入书签以便快速查阅！
