import sitemap from "@astrojs/sitemap";
import svelte, { vitePreprocess } from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import swup from "@swup/astro";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeComponents from "rehype-components";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkMath from "remark-math";
import remarkSectionize from "remark-sectionize";
import { siteConfig } from "./src/config.ts";
import { pluginCustomCopyButton } from "./src/plugins/expressive-code/custom-copy-button.js";
import { pluginLanguageBadge } from "./src/plugins/expressive-code/language-badge.ts";
import { AdmonitionComponent } from "./src/plugins/rehype-component-admonition.mjs";
import { GithubCardComponent } from "./src/plugins/rehype-component-github-card.mjs";
import { rehypeMermaid } from "./src/plugins/rehype-mermaid.mjs";
import { rehypeWrapTable } from "./src/plugins/rehype-wrap-table.mjs";
import { parseDirectiveNode } from "./src/plugins/remark-directive-rehype.js";
import { remarkExcerpt } from "./src/plugins/remark-excerpt.js";
import { remarkMermaid } from "./src/plugins/remark-mermaid.js";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";
import { rehypeImageWidth } from "./src/plugins/rehype-image-width.mjs";

// https://astro.build/config
export default defineConfig({
	site: siteConfig.siteURL,
	base: "/",
	trailingSlash: "always",

	output: "static",

	integrations: [
		tailwind({
			nesting: true,
		}),
		icon({
			// 限制 astro-icon 只加载我们需要的图标库，避免加载不必要的图标
			include: {
				// 只加载我们使用到的图标库
				'fa6-solid': ['eye', 'envelope', 'chevron-right', 'arrow-up-right-from-square', 'xmark'],
				'fa6-brands': ['github', 'git-alt', 'bilibili', 'creative-commons'],
				'fa6-regular': ['address-card'],
				'material-symbols': [
					'search', 'timeline', 'keyboard-arrow-up-rounded', 'home', 'person', 'archive',
					'group', 'movie', 'book', 'photo-library', 'work', 'psychology',
					'more-horiz', 'trending-up', 'trending-down', 'article-outline',
					'folder-outline', 'label-outline', 'text-ad-outline-rounded', 'calendar-clock-outline',
					'ecg-heart-outline', 'restart-alt-rounded', 'keyboard-arrow-down-rounded',
					'chevron-right-rounded', 'school', 'code', 'emoji-events', 'event',
					'home-pin-outline', 'palette-outline', 'unfold-more', 'chevron-right-rounded',
					'format-list-bulleted-rounded', 'chevron-left-rounded', 'calendar-today-outline-rounded',
					'edit-calendar-outline-rounded', 'book-2-outline-rounded', 'article-outline-rounded',
					'tag-rounded', 'visibility-outline-rounded', 'copyright-outline-rounded', 'verified',
					'database', 'error-outline', 'sentiment-sad', 'search-off', 'notes-rounded',
					'schedule-outline-rounded', 'share', 'history-rounded', 'rss-feed', 'link',
					'article', 'help-outline', 'open-in-new', 'settings-suggest-outline',
					'arrow-forward-rounded', 'mail'
				],
				'logos': ['astro-icon']
			}
		}),
		swup({
			theme: false,
			animationClass: "transition-swup-",
			containers: ["main"],
			smoothScrolling: false, // 禁用平滑滚动以提升性能，避免与锚点导航冲突
			cache: true,
			preload: true, // swup 默认鼠标悬停预加载
			accessibility: true,
			updateHead: true,
			updateBodyClass: false,
			globalInstance: true,
			// 滚动相关配置优化
			resolveUrl: (url) => url,
			animateHistoryBrowsing: false,
			skipPopStateHandling: (event) => {
				// 跳过锚点链接的处理，让浏览器原生处理
				return (
					event.state &&
					event.state.url &&
					event.state.url.includes("#")
				);
			},
		}),
		expressiveCode({
			themes: ["github-light", "github-dark"],
			plugins: [
				pluginCollapsibleSections(),
				pluginLineNumbers(),
				pluginLanguageBadge(),
				pluginCustomCopyButton(),
			],
			defaultProps: {
				wrap: true,
				overridesByLang: {
					shellsession: { showLineNumbers: false },
					bash: { frame: "code" },
					shell: { frame: "code" },
					sh: { frame: "code" },
					zsh: { frame: "code" },
				},
			},
			styleOverrides: {
				codeBackground: "var(--codeblock-bg)",
				borderRadius: "0.75rem",
				borderColor: "none",
				codeFontSize: "0.875rem",
				codeFontFamily:
					"'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
				codeLineHeight: "1.5rem",
				frames: {
					editorBackground: "var(--codeblock-bg)",
					terminalBackground: "var(--codeblock-bg)",
					terminalTitlebarBackground: "var(--codeblock-bg)",
					editorTabBarBackground: "var(--codeblock-bg)",
					editorActiveTabBackground: "none",
					editorActiveTabIndicatorBottomColor: "var(--primary)",
					editorActiveTabIndicatorTopColor: "none",
					editorTabBarBorderBottomColor: "var(--codeblock-bg)",
					terminalTitlebarBorderBottomColor: "none",
				},
				textMarkers: {
					delHue: 0,
					insHue: 180,
					markHue: 250,
				},
			},
			frames: {
				showCopyToClipboardButton: false,
			},
		}),
		svelte({
			preprocess: vitePreprocess(),
		}),
		sitemap(),
	],
	markdown: {
		remarkPlugins: [
			remarkMath,
			remarkReadingTime,
			remarkExcerpt,
			remarkGithubAdmonitionsToDirectives,
			remarkDirective,
			remarkSectionize,
			parseDirectiveNode,
			remarkMermaid,
		],
		rehypePlugins: [
			rehypeKatex,
			rehypeSlug,
			rehypeWrapTable,
			rehypeMermaid,
			rehypeImageWidth,
			[
				rehypeComponents,
				{
					components: {
						github: GithubCardComponent,
						note: (x, y) => AdmonitionComponent(x, y, "note"),
						tip: (x, y) => AdmonitionComponent(x, y, "tip"),
						important: (x, y) =>
							AdmonitionComponent(x, y, "important"),
						caution: (x, y) => AdmonitionComponent(x, y, "caution"),
						warning: (x, y) => AdmonitionComponent(x, y, "warning"),
					},
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					behavior: "append",
					properties: {
						className: ["anchor"],
					},
					content: {
						type: "element",
						tagName: "span",
						properties: {
							className: ["anchor-icon"],
							"data-pagefind-ignore": true,
						},
						children: [{ type: "text", value: "#" }],
					},
				},
			],
		],
	},
	vite: {
		build: {
			// 静态资源处理优化，防止小图片转 base64 导致 HTML 体积过大（可选，根据需要调整）
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
	},
});
