export type BlogVisibility = 'live' | 'wip' | 'hidden';

export const siteConfig = {
  // 'live' shows posts, 'wip' keeps the page with a placeholder, 'hidden' removes it entirely.
  blogVisibility: 'wip' as BlogVisibility,
};
