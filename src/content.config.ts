import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

// Define the schema for services (JSON)
const servicesCollection = defineCollection({
    loader: file("src/content/services/services.json"),
    schema: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        icon_name: z.string(),
        category: z.enum(['development', 'design', 'marketing', 'infrastructure', 'analytics']),
    }),
});

// Define the schema for blog posts (Markdown)
const blogCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        pubDate: z.date(),
        description: z.string(),
        author: z.string(),
    }),
});

export const collections = {
    'services': servicesCollection,
    'blog': blogCollection,
};