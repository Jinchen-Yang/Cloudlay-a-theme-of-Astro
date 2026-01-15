# Astro 博客主题开发指南

## 项目结构

```
src/
├── components/      # 可复用的 Astro 组件
├── layouts/        # 页面布局模板
├── pages/          # 路由页面（每个文件自动成为一个路由）
├── styles/        # 全局样式文件
├── content/       # 内容文件（如 Markdown 文章）
└── assets/        # 图片、字体等静态资源
```

## 快速开始

### 1. 启动开发服务器
```bash
npm run dev
```
访问 `http://localhost:3000` 查看你的博客。

### 2. 构建生产版本
```bash
npm run build
```

### 3. 预览生产构建
```bash
npm run preview
```

## 核心概念

### Astro 组件 (`.astro` 文件)
- **前面的代码栏 (Code Fence)**: --- 之间的代码在服务器运行
- **模板**: 下面的 HTML 是要渲染的内容
- **作用域样式**: `<style>` 标签中的样式仅作用于该组件

### 布局 (Layouts)
- 在 `src/layouts/` 中创建布局组件
- 使用 `<slot />` 来放置页面内容
- 接收 props 来自动化常见的页面属性

### 路由 (Pages)
- `src/pages/` 中的每个 `.astro` 或 `.md` 文件自动成为一个路由
- 文件名直接映射到 URL 路径
- 例如: `src/pages/about.astro` → `/about`

## 开发任务

### 添加新页面
1. 在 `src/pages/` 中创建新的 `.astro` 文件
2. 导入 `BaseLayout` 或其他布局
3. 编写内容

### 创建新组件
1. 在 `src/components/` 中创建新的 `.astro` 文件
2. 定义 interface Props 来声明组件接受的属性
3. 在其他组件或页面中导入使用

### 添加样式
- 组件级样式: 在 `.astro` 文件中使用 `<style>` 标签
- 全局样式: 在 `BaseLayout.astro` 中使用 `<style is:global>`
- 外部样式表: 在 `src/styles/` 中创建，然后导入

## 有用的 Astro 特性

### 1. 动态导入
```astro
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
```

### 2. 条件渲染
```astro
{condition && <div>显示这个</div>}
```

### 3. 列表循环
```astro
{items.map(item => <div>{item.name}</div>)}
```

### 4. Props 验证
```astro
---
interface Props {
  title: string;
  count?: number;
}
const { title, count = 0 } = Astro.props;
---
```

## 添加框架支持

需要使用 React、Vue 等框架？
```bash
npm run astro add react    # 或 vue, svelte, etc.
```

## 进一步学习

- 📚 [Astro 官方文档](https://docs.astro.build)
- 🎓 [Astro 教程](https://docs.astro.build/en/tutorial/0-introduction/)
- 🚀 [Astro 集成](https://astro.build/integrations)

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动本地开发服务器 |
| `npm run build` | 构建生产网站 |
| `npm run preview` | 本地预览生产构建 |
| `npm run astro add` | 添加 Astro 集成 |

---

祝你开发愉快！🚀
