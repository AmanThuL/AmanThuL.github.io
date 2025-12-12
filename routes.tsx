import React from 'react';
import { Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { BlogList } from './pages/BlogList';
import { BlogPostPage } from './pages/BlogPost';
import { BlogPlaceholder } from './pages/BlogPlaceholder';
import { Profile } from './pages/Profile';
import { Resume } from './pages/Resume';
import { siteConfig } from './data/siteConfig';

export interface AppRoute {
  path: string;
  element: React.ReactElement;
}

const blogRoutes: AppRoute[] = (() => {
  switch (siteConfig.blogVisibility) {
    case 'live':
      return [
        { path: '/blog', element: <BlogList /> },
        { path: '/blog/:slug', element: <BlogPostPage /> },
      ];
    case 'wip':
      return [
        { path: '/blog', element: <BlogPlaceholder /> },
        { path: '/blog/:slug', element: <BlogPlaceholder /> },
      ];
    default:
      return [
        { path: '/blog', element: <Navigate to="/" replace /> },
        { path: '/blog/:slug', element: <Navigate to="/" replace /> },
      ];
  }
})();

export const appRoutes: AppRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/resume', element: <Resume /> },
  { path: '/project/:slug', element: <ProjectDetail /> },
  ...blogRoutes,
  { path: '/profile', element: <Profile /> },
];
