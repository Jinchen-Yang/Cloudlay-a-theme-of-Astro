import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/**
 * 获取博客文章并按日期排序
 * @param limit 限制返回文章数量，默认返回所有
 * @returns 排序后的博客文章数组
 */
export async function getSortedBlogPosts(limit?: number): Promise<CollectionEntry<'blog'>[]> {
  const posts = (await getCollection('blog')).sort(
    (a, b) => {
      const dateA = a.data.date?.valueOf() || a.data.pubDate?.valueOf() || 0;
      const dateB = b.data.date?.valueOf() || b.data.pubDate?.valueOf() || 0;
      return dateB - dateA;
    }
  );

  if (limit) {
    return posts.slice(0, limit);
  }

  return posts;
}

/**
 * 获取笔记内容并按标题排序
 * @param category 可选分类过滤
 * @returns 排序后的笔记数组
 */
export async function getSortedNotes(category?: string): Promise<CollectionEntry<'notes'>[]> {
  let notes = await getCollection('notes');

  if (category) {
    notes = notes.filter(note => note.slug.startsWith(category));
  }

  return notes.sort((a, b) => {
    const titleA = a.data.title?.toLowerCase() || '未命名笔记';
    const titleB = b.data.title?.toLowerCase() || '未命名笔记';
    return titleA.localeCompare(titleB, 'zh-CN');
  });
}

/**
 * 获取所有博客文章的标签
 * @returns 标签数组
 */
export async function getBlogTags(): Promise<string[]> {
  const posts = await getCollection('blog');
  const tags = new Set<string>();

  posts.forEach(post => {
    if (post.data.tags) {
      post.data.tags.forEach(tag => tags.add(tag));
    }
  });

  return Array.from(tags).sort();
}

/**
 * 获取所有笔记的分类
 * @returns 分类数组
 */
export async function getNoteCategories(): Promise<string[]> {
  const notes = await getCollection('notes');
  const categories = new Set<string>();

  notes.forEach(note => {
    const category = note.slug.split('/')[0];
    if (category && category !== note.slug) {
      categories.add(category);
    }
  });

  return Array.from(categories).sort();
}

/**
 * 获取统计信息
 * @returns 包含文章数量、分类数量、标签数量的对象
 */
export async function getStats() {
  const [posts, notes, tags, categories] = await Promise.all([
    getCollection('blog'),
    getCollection('notes'),
    getBlogTags(),
    getNoteCategories()
  ]);

  return {
    posts: posts.length,
    notes: notes.length,
    tags: tags.length,
    categories: categories.length
  };
}
