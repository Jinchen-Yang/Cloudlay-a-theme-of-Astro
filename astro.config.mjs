import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkWikiLink from 'remark-wiki-link';
import rehypeKatex from 'rehype-katex';
import rehypeAttr from 'rehype-attr';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkCallouts from './src/utils/remark-callouts.js';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkMath, 
      remarkGfm, 
      remarkDirective,
      remarkCallouts,
      [remarkWikiLink, {
        // 配置 wiki 链接插件
        pageResolver: (name) => {
          // 将 Obsidian 内部链接转换为实际路径
          // 这里我们需要根据文件名查找实际的笔记路径
          // 由于我们无法在构建时访问文件系统，我们返回一个通用路径
          // 实际路径将由前端 JavaScript 处理或通过重写规则处理
          return [`/notes/${name}`];
        },
        hrefTemplate: (permalink) => permalink,
        aliasDivider: '|', // 支持别名语法 [[显示文本|实际文件]]
        wikiLinkClassName: 'wiki-link', // 添加自定义 CSS 类
        newClassName: 'new-wiki-link', // 新链接的 CSS 类
      }]
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeAttr,
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append',
        properties: {
          className: ['anchor-link'],
          ariaLabel: '链接到标题'
        }
      }]
    ],
    // 启用 GitHub Flavored Markdown 特性
    gfm: true,
    // 支持更多 Markdown 特性
    smartypants: true,
  },
});
