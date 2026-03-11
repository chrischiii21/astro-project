# Astro Content Collections Guide

## What Are Content Collections?

Content Collections are Astro's way of managing content (like blog posts, documentation, or product data) using Markdown or JSON files. Instead of hardcoding content in your components, you store it in organized files.

## How It Works

### 1. Folder Structure
```
src/content/
├── config.ts          # Define schemas for your collections
├── blog/              # Blog collection
│   ├── first-post.md
│   └── second-post.md
└── features/          # Features collection
    ├── performance.md
    ├── easy-to-use.md
    └── customizable.md
```

### 2. Markdown Files (Content)

Each `.md` file has two parts:

**Frontmatter** (metadata between `---`):
```markdown
---
title: "My Blog Post"
date: 2024-03-11
author: "John Doe"
---
```

**Content** (the actual markdown):
```markdown
# Heading

This is the content that will be rendered.
```

### 3. Schema Definition (`config.ts`)

Defines what fields each collection should have and validates them:

```typescript
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),        // Required string
    date: z.date(),           // Required date
    author: z.string(),       // Required string
    featured: z.boolean().default(false), // Optional with default
  }),
});
```

### 4. Loading Content in Pages

Use `getCollection()` to load all items from a collection:

```astro
---
import { getCollection } from 'astro:content';

// Load all blog posts
const blogPosts = await getCollection('blog');

// Filter featured posts
const featured = blogPosts.filter(post => post.data.featured);
---

{blogPosts.map(post => (
  <h2>{post.data.title}</h2>
  <p>{post.data.description}</p>
))}
```

### 5. Dynamic Routes (`[slug].astro`)

Create individual pages for each content item:

```astro
---
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<h1>{post.data.title}</h1>
<Content />
```

## Benefits

✅ **Separation of Concerns**: Content separate from code
✅ **Type Safety**: Schema validation catches errors
✅ **Easy Updates**: Edit markdown files without touching code
✅ **No Duplication**: Single source of truth for content
✅ **Better Organization**: Structured content management

## Try It Out

1. Visit `/content-demo` to see features loaded from markdown
2. Click on a blog post to see dynamic routing in action
3. Edit any `.md` file in `src/content/` and see changes instantly
4. Add new markdown files to create new content automatically

## Example: Adding a New Blog Post

1. Create `src/content/blog/my-new-post.md`:
```markdown
---
title: "My New Post"
description: "This is my new post"
author: "Your Name"
date: 2024-03-11
featured: true
---

# My Content Here

Write your blog post content...
```

2. That's it! The post automatically appears on `/content-demo` and gets its own page at `/blog/my-new-post`

No code changes needed!
