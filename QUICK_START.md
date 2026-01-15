# 🚀 快速开始指南

## 项目初始化

```bash
# 克隆项目
git clone git@github.com:Jinchen-Yang/Cloudlay-a-theme-of-Astro.git
cd Cloudlay-a-theme-of-Astro

# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 访问 http://localhost:3000
```

---

## 📝 文档导航

| 文档 | 用途 | 适合人群 |
|-----|------|--------|
| [README.md](README.md) | 项目总体说明 + 性能分析 | 所有人 |
| [RESPONSIVE_DESIGN.md](RESPONSIVE_DESIGN.md) | 响应式设计深度文档 | 设计师 + 开发者 |
| [DESIGN_GUIDE.md](DESIGN_GUIDE.md) | 首页设计使用指南 | 使用者 + 定制者 |
| [REDESIGN_SUMMARY.md](REDESIGN_SUMMARY.md) | 重构总结 | 项目审查者 |

---

## 🎨 核心组件

### AuthorCard - 作者信息卡片

**位置**: `src/components/AuthorCard.astro`

```astro
<AuthorCard
  name="你的名字"
  title="你的职位"
  avatar="/avatar.jpg"
  bio="你的简介"
  tagline="你的标语"
  email="your@email.com"
  github="yourGithub"
  twitter="yourTwitter"
  website="https://example.com"
  stats={{ posts: 10, categories: 5, tags: 20 }}
/>
```

### PostCard - 文章卡片

**位置**: `src/components/PostCard.astro`

```astro
<PostCard
  title="文章标题"
  description="文章摘要"
  slug="article-slug"
  date={new Date()}
  author="作者名"
  tags={['标签1', '标签2']}
/>
```

---

## 🛠️ 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器

# 构建
npm run build            # 构建生产版本
npm run preview          # 预览构建结果

# 其他
npm run astro ...        # 执行 Astro CLI 命令
```

---

## 📱 响应式断点

| 设备 | 宽度 | 布局 |
|-----|------|------|
| 📱 手机 | < 480px | 单列堆叠 |
| 📱 大手机 | 480-768px | 单列堆叠 |
| 📱 平板 | 768-1024px | 两列 |
| 💻 桌面 | > 1024px | 两列（侧边栏固定） |

---

## 🎨 自定义

### 1. 修改作者信息

编辑 `src/pages/index.astro` 中的 `authorInfo` 对象

### 2. 修改颜色主题

编辑 `src/pages/index.astro` 中的CSS变量：
```css
:root {
  --color-primary: #667eea;     /* 主色 */
  --color-secondary: #764ba2;   /* 辅色 */
}
```

### 3. 修改头像

替换 `/public/avatar.jpg` 或修改路径

### 4. 修改社交链接

编辑 `AuthorCard` 组件中的社交链接部分

---

## 📊 性能指标

- ⚡ **首屏加载**: < 500ms
- 🔧 **JavaScript**: 0KB (默认)
- 📦 **CSS**: < 20KB
- 💾 **单页面**: < 50KB

---

## 🚀 部署

### GitHub Pages

```bash
# 修改 astro.config.mjs
export default defineConfig({
  site: 'https://yourusername.github.io',
});

npm run build
```

### Netlify / Vercel

直接连接 GitHub 仓库，自动部署

---

## 🐛 调试

### 测试响应式

```bash
# 在浏览器开发者工具中
1. 按 F12 打开DevTools
2. 按 Ctrl+Shift+M 打开设备模式
3. 选择不同设备测试
```

### 测试深色模式

```javascript
// 在浏览器控制台运行
document.documentElement.style.colorScheme = 'dark';
```

---

## 📚 重要文件

```
src/
├── pages/index.astro           # 首页（主要）
├── components/
│   ├── AuthorCard.astro        # 作者卡片
│   └── PostCard.astro          # 文章卡片
└── styles/global.css           # 全局样式
```

---

## 💡 提示

- 首页默认零JavaScript，性能最优
- 所有组件支持深色模式
- 使用CSS变量便于主题切换
- 文章通过Markdown编写

---

## 🔗 快速链接

- [Astro 官方文档](https://docs.astro.build/)
- [GitHub 仓库](https://github.com/Jinchen-Yang/Cloudlay-a-theme-of-Astro)
- [astro-koharu 灵感来源](https://github.com/cosZone/astro-koharu)

---

**最后更新**: 2026-01-15
