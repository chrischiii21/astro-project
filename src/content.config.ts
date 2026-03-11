import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// Define the schema for services
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

export const collections = {
    'services': servicesCollection,
};