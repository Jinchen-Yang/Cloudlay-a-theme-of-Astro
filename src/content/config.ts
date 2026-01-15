import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    date: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }).transform((data) => ({
    ...data,
    pubDate: data.pubDate || data.date || new Date(),
  })),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
  }).transform((data) => ({
    ...data,
    title: data.title || '未命名笔记',
  })),
});

export const collections = { blog, notes };
