# 项目优化指南

## 📊 项目分析

本项目是一个基于 Astro + Svelte + TailwindCSS 的现代博客系统，已具备基本的性能优化。以下是进一步优化的建议方案。

---

## 1️⃣ 项目结构优化

### 1.1 模块化重构建议

#### 当前结构分析
```
src/
├── components/       # 混合：布局、UI、功能组件
├── plugins/         # 插件目录
├── utils/           # 工具函数
└── scripts/         # 脚本集合
```

#### 优化方案
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
├── middleware/          # 中间件（如果需要）
└── services/            # 业务逻辑服务
```

**实施步骤：**
```bash
# 1. 创建新目录结构
mkdir -p src/{hooks,services,plugins/{markdown,rehype,remark},utils/{parsers,images,transforms},components/{layouts,ui,features}}

# 2. 逐步迁移文件（按模块）
# 3. 更新导入路径（利用 tsconfig.json 中的 path alias）
# 4. 运行构建验证
```

---

## 2️⃣ 性能优化

### 2.1 代码分割优化

**当前配置分析（astro.config.mjs）：**
```javascript
// ✓ 已优化
- output: "static"
- swup 缓存和预加载启用
- assetsInlineLimit: 4096
```

**进一步优化建议：**

```javascript
// astro.config.mjs 修改
export default defineConfig({
  vite: {
    build: {
      assetsInlineLimit: 4096,
      minify: 'terser', // 显式启用最小化
      terserOptions: {
        compress: {
          drop_console: true, // 生产环境移除 console
          passes: 2,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // 分离大的库
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

### 2.2 图片优化

**当前状态：**
- ✓ 使用 WebP 格式
- ✓ 有 lazy loading
- ✓ sharp 依赖已安装

**进一步优化：**

```astro
<!-- src/components/misc/ImageWrapper.astro 增强 -->
---
import { Image } from "astro:assets";
import { ROUTES } from "@constants/icon";

interface Props {
  id?: string;
  src: string;
  alt?: string;
  loading?: "eager" | "lazy";
  placeholder?: "blurred" | "dominantColor";
  densities?: number[];
}

const {
  loading = "lazy",
  placeholder = "blurred",
  densities = [1, 2],
  ...rest
} = Astro.props;
---

<Image
  {loading}
  {placeholder}
  {densities}
  {...rest}
/>
```

### 2.3 字体优化

**当前依赖：**
- @fontsource/roboto (✓ 变量字体)
- @fontsource-variable/jetbrains-mono (✓ 变量字体)

**进一步优化：**

```javascript
// 1. 在 CSS 中添加字体预加载
// src/styles/globals.css
@font-face {
  font-family: 'Roboto';
  src: url('/fonts/roboto.woff2') format('woff2');
  font-display: swap; /* 关键：避免 FOUT */
  font-weight: 100 900;
  font-variation-settings: 'wght' 400;
}

// 2. 在 Layout 中预连接
// src/layouts/Layout.astro
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### 2.4 CSS 优化

**移除未使用的 CSS：**

```javascript
// tailwind.config.cjs
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  // 启用内容清理
  safelist: [
    // 动态生成的类名白名单
    /^hljs-/,
    /^anime-/,
    /^album-/,
  ],
};
```

---

## 3️⃣ 构建优化

### 3.1 更新 package.json 脚本

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "npm run prebuild && astro build --force && pagefind --site dist && npm run optimize",
    "prebuild": "node scripts/sync-content.js || true",
    "optimize": "node scripts/post-build-optimize.js",
    "analyze": "astro build --profile",
    "type-check": "tsc --noEmit"
  }
}
```

### 3.2 创建后置构建优化脚本

```javascript
// scripts/post-build-optimize.js
import { promises as fs } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function optimizeDistFolder() {
  console.log('🚀 开始构建后优化...\n');

  try {
    // 1. 压缩 HTML
    console.log('📄 优化 HTML 文件...');
    await execAsync(`find dist -name "*.html" -exec gzip -9 {} \\;`);

    // 2. 分析构建大小
    console.log('📊 生成构建分析...');
    const htmlFiles = await fs.readdir('dist', { recursive: true });
    const jsFiles = htmlFiles.filter(f => f.endsWith('.js'));
    
    console.log(`\n✅ 优化完成！`);
    console.log(`   - HTML 文件已 gzip 压缩`);
    console.log(`   - 共 ${jsFiles.length} 个 JS 文件`);
  } catch (error) {
    console.error('❌ 优化失败:', error);
  }
}

optimizeDistFolder();
```

---

## 4️⃣ 运行时性能优化

### 4.1 Svelte 组件优化

**当前优化：**
- ✓ 预处理配置
- ✓ 响应式声明

**进一步优化：**

```svelte
<!-- src/components/Search.svelte -->
<script>
  // 使用 requestIdleCallback 延迟初始化
  onMount(() => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => initSearch());
    } else {
      setTimeout(initSearch, 0);
    }
  });

  // 防抖搜索
  const debouncedSearch = debounce(async (query) => {
    results = await performSearch(query);
  }, 300);
</script>
```

### 4.2 交互优化

**当前配置：**
- ✓ Swup 缓存
- ✓ 平滑滚动禁用（性能考虑）

**进一步优化：**

```javascript
// src/scripts/interaction-optimizer.js
// 实现：
// 1. 虚拟滚动（用于长列表）
// 2. 事件委托
// 3. 防抖/节流
// 4. 交叉观察器优化

export class InteractionOptimizer {
  static delegateEvent(parent, selector, event, handler) {
    parent.addEventListener(event, (e) => {
      if (e.target.matches(selector)) handler.call(e.target, e);
    });
  }

  static debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  static observeElements(selector, callback) {
    const observer = new IntersectionObserver(callback, {
      rootMargin: '200px',
    });
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
    return observer;
  }
}
```

---

## 5️⃣ 依赖优化

### 5.1 现有依赖分析

| 库 | 用途 | 大小 | 优化建议 |
|---|---|---|---|
| marked | Markdown 解析 | ~40KB | 已通过 Remark 使用 ✓ |
| katex | 数学公式 | ~200KB | 必要，但支持按需加载 |
| photoswipe | 图片库 | ~50KB | 按需加载 ✓ |
| @fancyapps/ui | UI 库 | ~80KB | 检查是否全部使用 |
| overlayscrollbars | 滚动条 | ~30KB | 考虑原生替代 |

### 5.2 优化策略

```javascript
// 1. 按需加载重型库
// src/utils/lazy-imports.ts
export const lazyLoadKatex = () => import('katex');
export const lazyLoadPhotoSwipe = () => import('photoswipe');

// 2. 定期更新依赖
// package.json
{
  "scripts": {
    "deps:check": "pnpm audit",
    "deps:update": "pnpm update --interactive --recursive"
  }
}
```

---

## 6️⃣ SEO 和元数据优化

### 6.1 当前状况
- ✓ 已有 sitemap
- ✓ Swup 更新 head
- ✓ Meta 标签支持

### 6.2 增强建议

```astro
<!-- src/components/Head.astro -->
---
export interface Props {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
}

const { title, description, image, canonical } = Astro.props;
const fullUrl = new URL(Astro.url).href;
---

<meta name="robots" content="index, follow" />
<meta name="description" content={description} />
<meta name="og:title" content={title} />
<meta name="og:description" content={description} />
{image && <meta name="og:image" content={image} />}
<link rel="canonical" href={canonical || fullUrl} />

<!-- 性能相关 -->
<link rel="dns-prefetch" href="//fonts.googleapis.com" />
<link rel="preconnect" href="//pagefind.app" />
```

---

## 7️⃣ 监控和指标

### 7.1 Web Vitals 监控

```javascript
// src/scripts/web-vitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// 仅在生产环境监控
if (import.meta.env.PROD) {
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
}
```

### 7.2 构建分析

```bash
# 安装工具
pnpm add -D astro-bundle-analyzer

# 在 astro.config.mjs 添加
import { AstroBundleAnalyzer } from 'astro-bundle-analyzer';

export default defineConfig({
  integrations: [AstroBundleAnalyzer()],
});

# 运行分析
pnpm build --profile
```

---

## 📋 优化清单（优先级）

### 🔴 高优先级（立即实施）
- [ ] 实施项目结构重组（模块化）
- [ ] 添加代码分割配置
- [ ] 启用生产构建优化（minify, drop_console）
- [ ] 优化字体加载（font-display: swap）

### 🟡 中优先级（本周完成）
- [ ] 创建后置构建优化脚本
- [ ] 实现虚拟滚动（列表优化）
- [ ] 按需加载重型库
- [ ] 添加 Web Vitals 监控

### 🟢 低优先级（后续优化）
- [ ] 构建分析和可视化
- [ ] 性能预算设置
- [ ] 缓存策略优化
- [ ] CDN 集成

---

## 🔧 实施示例

### 快速开始：文件分割优化

```bash
# 1. 更新 astro.config.mjs
# 复制下面的配置到 rollupOptions

rollupOptions: {
  output: {
    manualChunks: {
      'vendor-icons': ['@iconify/svelte', 'astro-icon'],
      'vendor-ui': ['photoswipe', '@fancyapps/ui'],
      'vendor-markdown': ['marked', 'markdown-it', 'katex'],
    },
  },
}

# 2. 重新构建并验证
pnpm build

# 3. 检查输出的 dist 文件夹
ls -lh dist/_astro/ | grep -E '\.(js|css)$'
```

---

## 📚 相关资源

- [Astro 性能优化](https://docs.astro.build/zh-cn/guides/performance/)
- [Web Vitals](https://web.dev/vitals/)
- [Tailwind CSS 优化](https://tailwindcss.com/docs/optimizing-for-production)
- [图片优化指南](https://web.dev/image-optimization/)

---

**最后更新：2026-01-15**
