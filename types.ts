
export type ProjectCategory = 'All' | 'DirectX' | 'Rendering' | 'Shader' | 'Unity' | 'Gameplay' | 'AI' | 'Python' | 'Tech Art' | 'C++' | 'C#';

export type ProjectTheme = 'hero_role_gpu' | 'hero_role_research' | 'hero_role_game';

export interface ProjectTeamMember {
  name: string;
  role?: string;
}

export interface ProjectDetails {
  overview: string;
  team: string[];
  role: string | string[];
  timeline: string;
  location: string;
  contributions: string[];
  longFormContent: Array<{
    type: 'text' | 'image' | 'video' | 'heading';
    content: string;
    caption?: string;
  }>;
  assetLinks: Array<{ label: string; url: string }>;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  thumbnail: string;
  gallery: string[]; // URLs for the hover slideshow
  theme: ProjectTheme;
  tags: ProjectCategory[];
  slug: string;
  featured?: boolean; // New field for highlighting
  details: ProjectDetails;
}

// Blog Types
export type BlogCategory = 'All' | 'Graphics' | 'Unity' | 'HDRP' | 'Tutorial' | 'Career';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: BlogCategory[];
  thumbnail: string;
  content: Array<{
    type: 'text' | 'image' | 'heading' | 'code';
    content: string;
    caption?: string;
  }>;
}

// Profile / About Types
export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year: string;
  type: 'Patent' | 'Publication' | 'Award' | 'Certification';
  link?: string;
}

export interface Photo {
  id: string;
  url: string;
  title: string;
  location: string;
  thoughts: string; // Brief paragraph about the shot
  params: {
    camera: string;
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
}
