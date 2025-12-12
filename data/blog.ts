
import { BlogCategory, BlogPost } from '../types';

type Lang = 'en' | 'zh';

interface BlogLocaleFields {
  title: string;
  excerpt: string;
  readTime: string;
  content: BlogPost['content'];
}

interface BlogBase {
  id: string;
  slug: string;
  date: string;
  thumbnail: string;
  tags: BlogCategory[];
}

const blogBases: BlogBase[] = [
  {
    id: '1',
    slug: 'unity-hdrp-lego',
    date: '2021-10-18',
    thumbnail: 'https://picsum.photos/seed/hdrp_thumb/800/400',
    tags: ['Unity', 'HDRP', 'Graphics'],
  },
];

const blogLocales: Record<string, Record<Lang, BlogLocaleFields>> = {
  'unity-hdrp-lego': {
    en: {
      title: 'Unity HDRP — Lego Microgame',
      excerpt:
        'Upgrading the Unity Lego Microgame to the High Definition Render Pipeline (HDRP) to explore next-gen graphics features.',
      readTime: '5 min read',
      content: [
        {
          type: 'text',
          content:
            "I recently decided to dive deep into Unity's High Definition Render Pipeline (HDRP) to understand how it differs from the Universal Render Pipeline (URP). To do this practically, I took the existing Lego Microgame—originally built for URP—and upgraded the entire project to HDRP. This allowed me to experiment with high-end graphical features typically reserved for AAA titles.",
        },
        { type: 'heading', content: 'Ground Truth Ambient Occlusion (GTAO)' },
        {
          type: 'text',
          content:
            'One of the most impactful additions was Ground Truth Ambient Occlusion (GTAO). Unlike standard SSAO which can look muddy or create artifacts, GTAO provides a much more physically accurate approximation of how light is occluded in corners and crevices.',
        },
        {
          type: 'image',
          content: 'https://picsum.photos/seed/gtao_comparison/1200/600',
          caption: 'Comparison: Standard Ambient Occlusion vs GTAO',
        },
        { type: 'heading', content: 'Conclusion' },
        {
          type: 'text',
          content:
            'Migrating the project was a challenge, but the visual fidelity gained from GTAO, Volumetrics, and proper PBR material handling in HDRP significantly elevated the look of the simple microgame.',
        },
      ],
    },
    zh: {
      title: 'Unity HDRP — 乐高微游戏升级实战',
      excerpt: '将 Unity 乐高微游戏升级到高清渲染管线 (HDRP)，探索次世代图形特性。',
      readTime: '5 分钟阅读',
      content: [
        {
          type: 'text',
          content:
            '我最近决定深入研究 Unity 的高清渲染管线 (HDRP)，以了解它与通用渲染管线 (URP) 的区别。为了务实地进行这项工作，我采用了原本为 URP 构建的现有乐高微游戏，并将整个项目升级到了 HDRP。这使我能够尝试通常仅用于 3A 游戏的高端图形功能。',
        },
        { type: 'heading', content: '基准环境光遮蔽 (GTAO)' },
        {
          type: 'text',
          content:
            '最具影响力的添加之一是基准环境光遮蔽 (GTAO)。与可能看起来浑浊或产生伪影的标准 SSAO 不同，GTAO 提供了物理上更精确的近似值，模拟了光线在角落和缝隙中被遮挡的方式。',
        },
        {
          type: 'image',
          content: 'https://picsum.photos/seed/gtao_comparison/1200/600',
          caption: '对比：标准环境光遮蔽 vs GTAO',
        },
        { type: 'heading', content: '总结' },
        {
          type: 'text',
          content:
            '迁移项目是一个挑战，但从 GTAO、体积光和 HDRP 中正确的 PBR 材质处理获得的视觉保真度显著提升了这个简单微游戏的观感。',
        },
      ],
    },
  },
};

const buildPost = (base: BlogBase, lang: Lang): BlogPost => {
  const locale = blogLocales[base.slug][lang] ?? blogLocales[base.slug].en;
  return {
    ...base,
    title: locale.title,
    excerpt: locale.excerpt,
    readTime: locale.readTime,
    content: locale.content,
  };
};

export const getBlogPosts = (lang: Lang): BlogPost[] =>
  blogBases.map((base) => buildPost(base, lang));
