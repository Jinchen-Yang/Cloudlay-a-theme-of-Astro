# 项目结构重组指南

本文档提供了如何逐步重组项目结构以提高可维护性和性能的具体步骤。

## 📋 目标结构

```
src/
├── components/
│   ├── layouts/          # 布局组件
│   │   ├── Layout.astro
│   │   ├── MainGridLayout.astro
│   │   └── sidebar-layouts/
│   ├── ui/               # 可复用 UI 组件
│   │   ├── buttons/
│   │   ├── cards/
│   │   ├── forms/
│   │   └── icons/
│   ├── features/         # 功能组件（使用频率高）
│   │   ├── Search.svelte
│   │   ├── Navigation.astro
│   │   ├── Comment.astro
│   │   ├── LightDarkSwitch.svelte
│   │   └── LanguageSwitcher.svelte
│   └── misc/             # 杂项组件
│       ├── ConfigCarrier.astro
│       ├── Icon.astro
│       └── ...
├── plugins/
│   ├── markdown/         # Markdown 处理插件
│   │   ├── remark-excerpt.js
│   │   └── remark-reading-time.mjs
│   ├── rehype/           # Rehype 处理插件
│   │   ├── rehype-image-width.mjs
│   │   ├── rehype-mermaid.mjs
│   │   └── rehype-wrap-table.mjs
│   ├── remark/           # Remark 插件集合
│   │   └── remark-directive-rehype.js
│   └── expressive-code/  # 代码块美化插件
├── utils/
│   ├── parsers/          # 解析工具
│   │   └── markdown-parser.ts
│   ├── images/           # 图片处理
│   │   └── image-optimizer.ts
│   ├── transforms/       # 数据转换
│   │   └── content-transformer.ts
│   ├── interaction-optimizer.ts    # 交互优化
│   ├── web-vitals.ts               # 性能监控
│   ├── cache-utils.ts              # 缓存工具
│   └── url-utils.ts                # URL 工具
├── hooks/
│   ├── use-theme.ts
│   └── use-mobile.ts
├── services/             # 业务逻辑服务
│   ├── search-service.ts
│   ├── analytics-service.ts
│   └── comment-service.ts
├── middleware/           # 中间件（可选）
│   └── security.ts
├── layouts/
│   ├── Layout.astro
│   └── MainGridLayout.astro
├── pages/
├── content/
├── styles/
├── types/
├── constants/
├── i18n/
├── data/
└── scripts/
```

## 🔄 迁移步骤

### 第 1 步：创建新的目录结构

```bash
# 备份当前结构（可选但推荐）
cp -r src src.backup

# 创建新目录
mkdir -p src/{components/{layouts,ui,features},plugins/{markdown,rehype,remark},utils/{parsers,images,transforms},hooks,services,middleware}
```

### 第 2 步：迁移组件文件

#### 2.1 布局组件 -> `components/layouts/`
```bash
# 移动布局相关组件
mv src/components/{Layout,MainGridLayout}.astro src/components/layouts/
```

#### 2.2 功能组件 -> `components/features/`
```bash
# 高频使用的功能组件
mv src/components/{Search,LightDarkSwitch,LayoutSwitchButton}.* src/components/features/
mv src/components/{Navbar,Footer}.astro src/components/features/
mv src/components/{PasswordProtection,Encryptor}.astro src/components/features/
```

#### 2.3 UI 组件 -> `components/ui/`
```bash
# 低级别可复用组件
mkdir -p src/components/ui/{buttons,cards}
# 创建子目录并组织相关组件
```

#### 2.4 杂项组件 -> `components/misc/`
```bash
# 保留或已存在
# 检查并清理不需要的组件
```

### 第 3 步：迁移插件

```bash
# 1. Markdown 相关插件
mv src/plugins/remark-*.{js,mjs,ts} src/plugins/markdown/
mv src/plugins/remark-*.ts src/plugins/markdown/

# 2. Rehype 相关插件
mv src/plugins/rehype-*.mjs src/plugins/rehype/
mv src/plugins/rehype-component-*.mjs src/plugins/rehype/

# 3. Expressive Code 插件
mkdir -p src/plugins/expressive-code
mv src/plugins/expressive-code/* src/plugins/expressive-code/ 2>/dev/null || true
```

### 第 4 步：组织 utils 文件

```bash
# 1. 创建子目录
mkdir -p src/utils/{parsers,images,transforms}

# 2. 移动相关文件
# 根据实际情况分类现有的 utils 文件

# 3. 添加新的优化工具（已创建）
# src/utils/interaction-optimizer.ts
# src/utils/web-vitals.ts
```

### 第 5 步：创建新的 services 目录

```bash
mkdir -p src/services

# 创建服务文件
cat > src/services/search-service.ts << 'EOF'
/**
 * 搜索服务
 */
export class SearchService {
  async search(query: string) {
    // 搜索逻辑
  }
}
EOF

cat > src/services/analytics-service.ts << 'EOF'
/**
 * 分析服务
 * 与 Umami 或其他分析工具集成
 */
export class AnalyticsService {
  track(eventName: string, data?: Record<string, any>) {
    // 分析逻辑
  }
}
EOF
```

### 第 6 步：更新导入路径

#### 6.1 更新 tsconfig.json 中的 path aliases

```json
{
  "compilerOptions": {
    "paths": {
      "@components/*": ["src/components/*"],
      "@components/layouts/*": ["src/components/layouts/*"],
      "@components/ui/*": ["src/components/ui/*"],
      "@components/features/*": ["src/components/features/*"],
      "@plugins/*": ["src/plugins/*"],
      "@utils/*": ["src/utils/*"],
      "@services/*": ["src/services/*"],
      "@hooks/*": ["src/hooks/*"],
      "@types/*": ["src/types/*"],
      "@constants/*": ["src/constants/*"],
      "@i18n/*": ["src/i18n/*"],
      "@layouts/*": ["src/layouts/*"],
      "@": ["src/*"]
    }
  }
}
```

#### 6.2 使用全局搜索替换更新导入

```bash
# 使用 VS Code 或命令行工具
# 例如：查找所有需要更新的导入

grep -r "from.*components/" src/ --include="*.ts" --include="*.astro" --include="*.svelte" | head -20

# 然后用搜索和替换工具更新路径
# 建议模式：
# 查找：from "../../../../components/
# 替换：from "@components/

# 查找：from "../../utils/
# 替换：from "@utils/
```

### 第 7 步：验证迁移

```bash
# 1. 类型检查
pnpm type-check

# 2. 构建测试
pnpm build

# 3. 开发服务器测试
pnpm dev

# 4. 查看构建输出
ls -lh dist/ | head -20

# 5. 运行优化脚本
node scripts/post-build-optimize.js
```

## 🧹 清理和优化

### 1. 删除旧文件结构（验证无误后）

```bash
# 只在完全验证迁移成功后执行
rm -rf src/components/comment/     # 如果已移到 features
rm -rf src/components/control/     # 如果已移到 ui
rm -rf src/components/layout/      # 已移到 layouts/
# 等等...
```

### 2. 优化 astro.config.mjs

在 `astro.config.mjs` 中应用优化配置：

```javascript
// 导入优化配置
import { viteOptimizations } from './astro.config.optimized.mjs';

export default defineConfig({
  // ... 其他配置
  vite: viteOptimizations,
});
```

### 3. 更新 package.json 脚本

```json
{
  "scripts": {
    "build": "astro build && node scripts/post-build-optimize.js",
    "build:analyze": "astro build --profile",
    "type-check": "tsc --noEmit --isolatedDeclarations",
    "structure:validate": "node scripts/validate-structure.js"
  }
}
```

## 📊 迁移检查清单

- [ ] 备份原始项目结构
- [ ] 创建新的目录结构
- [ ] 迁移布局组件到 `components/layouts/`
- [ ] 迁移功能组件到 `components/features/`
- [ ] 迁移 UI 组件到 `components/ui/`
- [ ] 迁移插件到 `plugins/{markdown,rehype,remark}/`
- [ ] 组织 `utils` 文件
- [ ] 创建 `services` 目录和服务文件
- [ ] 创建 `hooks` 目录（如需要）
- [ ] 更新 `tsconfig.json` 中的 path aliases
- [ ] 全局更新导入路径
- [ ] 运行类型检查 (`pnpm type-check`)
- [ ] 本地构建测试 (`pnpm build`)
- [ ] 开发服务器测试 (`pnpm dev`)
- [ ] 验证所有功能正常
- [ ] 运行优化脚本分析
- [ ] 删除旧的目录结构（确认无误后）
- [ ] 提交到版本控制系统

## ⚠️ 常见问题

### Q: 迁移过程中导入路径出错？
**A:** 使用全局搜索替换，逐步更新。先在小范围测试，验证成功后再全局替换。

### Q: 如何验证迁移是否完全？
**A:** 运行以下命令：
```bash
pnpm type-check  # 类型检查
pnpm build       # 完整构建
pnpm dev         # 开发服务器
```

### Q: 可以回滚吗？
**A:** 可以，只需恢复 `src.backup`：
```bash
rm -rf src
mv src.backup src
```

## 🎯 迁移后的好处

1. **更好的代码组织** - 相关文件在一起
2. **改进的可维护性** - 清晰的文件夹结构
3. **更简单的导入** - 使用 path aliases
4. **更好的性能** - 通过代码分割优化
5. **更容易扩展** - 新组件有清晰的位置
6. **团队协作** - 更清楚的文件位置约定

## 📚 参考资源

- [Astro 项目结构最佳实践](https://docs.astro.build/zh-cn/guides/project-structure/)
- [TypeScript Path Aliases](https://www.typescriptlang.org/tsconfig#paths)
- [Vite 代码分割](https://vitejs.dev/guide/features.html#dynamic-import)

---

**最后更新：2026-01-15**
