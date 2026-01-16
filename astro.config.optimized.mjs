// 优化版本的 astro.config.mjs
// 包含代码分割、最小化和性能优化配置
// 将此文件中的优化选项合并到你的 astro.config.mjs 中

export const viteOptimizations = {
  build: {
    // 静态资源处理优化
    assetsInlineLimit: 4096,
    
    // 显式启用最小化
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除 console.log
        passes: 2, // 两次压缩传递以获得最大优化
        pure_funcs: ['console.log', 'console.info'],
        unsafe: true,
        unsafe_methods: true,
      },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/,
        },
      },
    },
    
    // 代码分割配置
    rollupOptions: {
      output: {
        // 手动块配置 - 分离大型库以实现更好的缓存
        manualChunks: {
          // Icon 库分割
          'vendor-icons': ['@iconify/svelte', 'astro-icon'],
          
          // UI 库分割
          'vendor-ui': ['photoswipe', '@fancyapps/ui', 'overlayscrollbars'],
          
          // Markdown 和数学库分割
          'vendor-markdown': ['marked', 'markdown-it', 'katex'],
          
          // 其他工具库
          'vendor-utils': ['dayjs', 'crypto-js', 'qrcode', 'sanitize-html'],
        },
        // 优化输出文件夹结构
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/chunk-[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg/.test(ext)) {
            return `images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          } else if (ext === 'css') {
            return `css/[name]-[hash][extname]`;
          }
          return `[name]-[hash][extname]`;
        },
      },
      
      // 警告过滤
      onwarn(warning, warn) {
        // 忽略 Rollup 的动态导入警告
        if (
          warning.message.includes('is dynamically imported by') &&
          warning.message.includes('but also statically imported by')
        ) {
          return;
        }
        warn(warning);
      },
    },

    // 其他构建优化
    reportCompressedSize: false, // 禁用压缩大小报告加快构建
    cssCodeSplit: true, // CSS 代码分割（默认）
    sourcemap: false, // 生产环境禁用 sourcemap，可减少构建输出大小
  },

  // Vite 优化选项
  optimizeDeps: {
    include: [
      '@iconify/svelte',
      'photoswipe',
      'dayjs',
    ],
  },

  // 定义环境变量
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
};

// 在 astro.config.mjs 中的使用示例：
/*
import { defineConfig } from "astro/config";
import { viteOptimizations } from "./astro.config.optimized.mjs";

export default defineConfig({
  // ... 其他配置
  vite: viteOptimizations,
});
*/
