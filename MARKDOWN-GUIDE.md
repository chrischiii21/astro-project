# Astro Markdown Content Collections Guide

## Overview

This guide demonstrates how to manage content using Markdown files with Content Collections in Astro, including proper schema validation, dynamic routing, and Tailwind CSS styling with the Typography plugin.

## 1. Sample Markdown Files

### Structure
```
src/content/blog/
├── getting-started-with-astro.md
├── tailwind-css-tips.md
└── web-performance-guide.md
```

### Frontmatter Example
```markdown
---
title: "Getting Started with Astro: A Modern Web Framework"
pubDate: 2024-03-11
description: "Learn how to build fast, modern websites with Astro's unique approach to web development."
author: "Jane Developer"
---

# Your Markdown Content Here

Regular markdown content with **bold text**, *italic text*, and [links](https://example.com).
```

## 2. Schema Configuration (`src/content.config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    'blog': blogCollection,
};
```

### Schema Benefits
- **Type Safety**: TypeScript autocomplete and validation
- **Runtime Validation**: Zod ensures data integrity
- **Build-time Errors**: Catch issues before deployment

## 3. Dynamic Routing (`[slug].astro`)

### Key Components

#### Static Path Generation
```typescript
export async function getStaticPaths() {
    const blogPosts = await getCollection("blog");
    return blogPosts.map((post) => ({
        params: { slug: post.id },  // post.id is the filename
        props: { post },
    }));
}
```

#### Content Rendering
```typescript
import { render } from "astro:content";

const { post } = Astro.props;
const { Content } = await render(post);
```

#### Template Usage
```astro
<h1>{post.data.title}</h1>
<p>By {post.data.author}</p>
<time>{post.data.pubDate}</time>

<div class="prose">
    <Content />
</div>
```

## 4. Tailwind CSS Typography Styling

### Installation
```bash
npm install @tailwindcss/typography
```

### Configuration
The Typography plugin is already configured in your project.

### Usage Classes
```html
<div class="prose prose-lg prose-gray max-w-none 
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-h1:text-4xl prose-h1:mb-8
            prose-h2:text-3xl prose-h2:mb-6
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-blue-600 hover:prose-a:underline
            prose-code:bg-gray-100 prose-code:px-2 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500">
    <Content />
</div>
```

### Typography Modifiers
- `prose-lg`: Larger text size
- `prose-gray`: Gray color scheme
- `max-w-none`: Remove max-width constraint
- `prose-headings:*`: Style all headings
- `prose-h1:*`: Style H1 specifically
- `prose-p:*`: Style paragraphs
- `prose-a:*`: Style links
- `prose-code:*`: Style inline code
- `prose-pre:*`: Style code blocks

## 5. Data Flow Explanation

### Step-by-Step Process

1. **Markdown Files** → Store content with frontmatter metadata
2. **Content Config** → Validates frontmatter with Zod schema
3. **getCollection()** → Loads all validated blog posts
4. **getStaticPaths()** → Generates routes for each post
5. **render()** → Converts markdown to HTML component
6. **Template** → Renders data and content with styling
7. **Build** → Generates static HTML pages

### Data Access Patterns

```typescript
// Access frontmatter data
post.data.title
post.data.pubDate
post.data.author
post.data.description

// Access file metadata
post.id          // filename without extension
post.collection  // "blog"

// Render markdown content
const { Content } = await render(post);
```

## 6. Available Routes

After setup, you'll have these routes:

- `/blog` - Blog index page with all posts
- `/blog/getting-started-with-astro` - Individual post
- `/blog/tailwind-css-tips` - Individual post
- `/blog/web-performance-guide` - Individual post

## 7. Features Included

### Blog Index Page (`/blog`)
- Responsive grid layout
- Post previews with metadata
- Sorted by publication date
- Hover effects and animations

### Individual Post Pages (`/blog/[slug]`)
- Full article layout
- Typography-styled content
- Author and date information
- Navigation buttons
- Responsive design

### Styling Features
- **Responsive Design**: Mobile-first approach
- **Typography**: Beautiful text rendering
- **Hover Effects**: Interactive elements
- **Code Highlighting**: Styled code blocks
- **Semantic HTML**: Proper article structure

## 8. Customization Options

### Adding New Fields
```typescript
// In content.config.ts
schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
})
```

### Custom Styling
```astro
<!-- Custom prose classes -->
<div class="prose prose-blue prose-xl">
    <Content />
</div>
```

### Filtering and Sorting
```typescript
// Filter featured posts
const featuredPosts = blogPosts.filter(post => post.data.featured);

// Sort by date
const sortedPosts = blogPosts.sort((a, b) => 
    new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
);
```

## 9. Best Practices

1. **Consistent Frontmatter**: Use the same fields across all posts
2. **Descriptive Filenames**: Use kebab-case for URLs
3. **Date Format**: Use ISO date format (YYYY-MM-DD)
4. **Image Optimization**: Optimize images before adding
5. **SEO**: Include meta descriptions and proper headings
6. **Accessibility**: Use semantic HTML and alt text

## 10. Next Steps

- Add tags and categories
- Implement search functionality
- Add RSS feed generation
- Create related posts feature
- Add social sharing buttons
- Implement reading time calculation

This setup provides a solid foundation for a content-driven website with excellent developer experience and performance!