#!/usr/bin/env node

/**
 * 构建后优化脚本
 * 在 astro build 完成后执行额外的优化
 * 
 * 使用方法：在 package.json 中添加
 * "build": "astro build && node scripts/post-build-optimize.js"
 */

import { promises as fs } from 'fs';
import { execSync } from 'child_process';
import { join, relative } from 'path';

const DIST_DIR = './dist';
const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function findFiles(dir, pattern) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findFiles(fullPath, pattern)));
    } else if (pattern.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeHTML() {
  log('\n📄 优化 HTML 文件...');

  const htmlFiles = await findFiles(DIST_DIR, /\.html$/);
  log(`   找到 ${htmlFiles.length} 个 HTML 文件`, 'cyan');

  for (const file of htmlFiles) {
    try {
      let content = await fs.readFile(file, 'utf-8');

      // 移除 HTML 注释
      content = content.replace(/<!--[\s\S]*?-->/g, '');

      // 压缩空白（保持语义）
      content = content.replace(/\s+/g, ' ');
      content = content.replace(/>\s+</g, '><');

      // 写入优化后的文件
      await fs.writeFile(file, content);
    } catch (error) {
      log(`   ⚠️  无法优化 ${relative(DIST_DIR, file)}: ${error.message}`, 'yellow');
    }
  }

  log('   ✓ HTML 优化完成', 'green');
}

async function analyzeBundle() {
  log('\n📊 分析构建包体积...');

  const jsFiles = await findFiles(DIST_DIR, /\.js$/);
  const cssFiles = await findFiles(DIST_DIR, /\.css$/);
  const jsonFiles = await findFiles(DIST_DIR, /\.json$/);

  let totalJsSize = 0;
  let totalCssSize = 0;
  let totalJsonSize = 0;

  const jsDetails = [];
  const cssDetails = [];

  // 分析 JS 文件
  for (const file of jsFiles) {
    const size = await getFileSize(file);
    totalJsSize += size;
    if (size > 50000) {
      // 只显示大于 50KB 的文件
      jsDetails.push({
        path: relative(DIST_DIR, file),
        size,
      });
    }
  }

  // 分析 CSS 文件
  for (const file of cssFiles) {
    const size = await getFileSize(file);
    totalCssSize += size;
    cssDetails.push({
      path: relative(DIST_DIR, file),
      size,
    });
  }

  // 分析 JSON 文件
  for (const file of jsonFiles) {
    totalJsonSize += await getFileSize(file);
  }

  // 输出详细信息
  log(`\n   📦 JavaScript:`, 'cyan');
  log(`      总大小: ${formatSize(totalJsSize)}`);
  if (jsDetails.length > 0) {
    log(`      大文件 (>50KB):`, 'yellow');
    jsDetails
      .sort((a, b) => b.size - a.size)
      .forEach((item) => {
        log(`        - ${item.path}: ${formatSize(item.size)}`);
      });
  }

  log(`\n   🎨 CSS:`, 'cyan');
  log(`      总大小: ${formatSize(totalCssSize)}`);
  cssDetails
    .sort((a, b) => b.size - a.size)
    .forEach((item) => {
      log(`        - ${item.path}: ${formatSize(item.size)}`);
    });

  log(`\n   📋 其他:`, 'cyan');
  log(`      JSON: ${formatSize(totalJsonSize)}`);

  log(`\n   🎯 总计:`, 'cyan');
  log(`      ${formatSize(totalJsSize + totalCssSize + totalJsonSize)}`);

  return {
    js: totalJsSize,
    css: totalCssSize,
    json: totalJsonSize,
  };
}

async function generatePerformanceMetrics() {
  log('\n⚡ 生成性能指标...');

  const metrics = {
    timestamp: new Date().toISOString(),
    files: {
      html: 0,
      js: 0,
      css: 0,
      images: 0,
    },
    sizes: {
      html: 0,
      js: 0,
      css: 0,
      images: 0,
      total: 0,
    },
  };

  // 统计各类文件
  const patterns = [
    { pattern: /\.html$/, key: 'html' },
    { pattern: /\.js$/, key: 'js' },
    { pattern: /\.css$/, key: 'css' },
    { pattern: /\.(png|jpg|jpeg|gif|svg|webp)$/, key: 'images' },
  ];

  for (const { pattern, key } of patterns) {
    const files = await findFiles(DIST_DIR, pattern);
    metrics.files[key] = files.length;

    for (const file of files) {
      metrics.sizes[key] += await getFileSize(file);
    }

    metrics.sizes.total += metrics.sizes[key];
  }

  // 保存指标文件
  const metricsFile = join(DIST_DIR, 'build-metrics.json');
  await fs.writeFile(metricsFile, JSON.stringify(metrics, null, 2));

  log(`   ✓ 性能指标已保存到 ${metricsFile}`, 'green');

  // 打印摘要
  log(`\n   📈 构建摘要:`, 'cyan');
  log(`      HTML 文件: ${metrics.files.html} 个 (${formatSize(metrics.sizes.html)})`);
  log(`      JavaScript: ${metrics.files.js} 个 (${formatSize(metrics.sizes.js)})`);
  log(`      CSS: ${metrics.files.css} 个 (${formatSize(metrics.sizes.css)})`);
  log(`      图片: ${metrics.files.images} 个 (${formatSize(metrics.sizes.images)})`);
  log(`      总计: ${formatSize(metrics.sizes.total)}`);

  return metrics;
}

async function generateOptimizationReport() {
  log('\n📋 生成优化建议...');

  const htmlFiles = await findFiles(DIST_DIR, /\.html$/);
  const jsFiles = await findFiles(DIST_DIR, /\.js$/);

  const suggestions = [];

  // 检查是否有超大 JS 文件
  for (const file of jsFiles) {
    const size = await getFileSize(file);
    if (size > 300000) {
      suggestions.push({
        type: 'warning',
        message: `${relative(DIST_DIR, file)} 大小为 ${formatSize(size)}, 建议分割`,
      });
    }
  }

  // 检查 HTML 文件数量
  if (htmlFiles.length > 100) {
    suggestions.push({
      type: 'info',
      message: `项目有 ${htmlFiles.length} 个 HTML 文件，页面加载速度可能受影响`,
    });
  }

  if (suggestions.length > 0) {
    log(`\n   💡 优化建议:`, 'cyan');
    suggestions.forEach((suggestion) => {
      const prefix =
        suggestion.type === 'warning'
          ? '⚠️ '
          : suggestion.type === 'error'
            ? '❌'
            : 'ℹ️ ';
      log(`      ${prefix} ${suggestion.message}`);
    });
  } else {
    log(`   ✓ 没有明显的优化建议，构建质量良好`, 'green');
  }
}

async function main() {
  log('\n🚀 开始构建后优化...', 'blue');

  try {
    // 检查 dist 目录是否存在
    await fs.access(DIST_DIR);
  } catch (error) {
    log(`❌ 找不到 ${DIST_DIR} 目录，请先运行 astro build`, 'red');
    process.exit(1);
  }

  try {
    // 1. 优化 HTML
    await optimizeHTML();

    // 2. 分析包体积
    await analyzeBundle();

    // 3. 生成性能指标
    await generatePerformanceMetrics();

    // 4. 生成优化建议
    await generateOptimizationReport();

    log('\n✅ 构建后优化完成！\n', 'green');
  } catch (error) {
    log(`\n❌ 优化过程中发生错误: ${error.message}\n`, 'red');
    process.exit(1);
  }
}

main();
