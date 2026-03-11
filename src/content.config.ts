import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define the schema for blog posts
const blogCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        date: z.date(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().default(false),
    }),
});

// Define the schema for features/cards
const featuresCollection = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/features" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        order: z.number(),
    }),
});

export const collections = {
    'blog': blogCollection,
    'features': featuresCollection,
};