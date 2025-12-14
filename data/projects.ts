
import { Project, ProjectCategory, ProjectDetails, ProjectTheme } from '../types';

type Lang = 'en' | 'zh';

interface ProjectLocaleFields {
  title: string;
  shortDescription: string;
  details: ProjectDetails;
}

interface ProjectBase {
  id: string;
  slug: string;
  theme: ProjectTheme;
  tags: ProjectCategory[];
  thumbnail: string;
  gallery: string[];
  featured?: boolean;
  hidden?: boolean; // optional flag to keep templates/drafts out of rendering
}

type MetaModule = { default: ProjectBase };
type LocaleModule = { default: ProjectLocaleFields };

const metaModules = import.meta.glob<MetaModule>('../content/projects/**/meta.json', { eager: true });
const localeModules = import.meta.glob<LocaleModule>('../content/projects/**/{en,zh}.json', { eager: true });

const projectBases: ProjectBase[] = Object.values(metaModules).map((mod) => mod.default);
const projectLocales: Record<string, Partial<Record<Lang, ProjectLocaleFields>>> = {};

Object.entries(localeModules).forEach(([path, mod]) => {
  const match = path.match(/projects\/([^/]+)\/(en|zh)\.json$/);
  if (!match) return;
  const [, slug, lang] = match;
  projectLocales[slug] ??= {};
  projectLocales[slug]![lang as Lang] = mod.default;
});

const visibleBases = projectBases.filter((base) => !base.hidden);
const sortedBases = [...visibleBases].sort((a, b) => Number(a.id) - Number(b.id));

const buildProject = (base: ProjectBase, lang: Lang): Project => {
  const locale = projectLocales[base.slug]?.[lang] ?? projectLocales[base.slug]?.en;
  if (!locale) {
    throw new Error(`Missing locale data for project ${base.slug}`);
  }

  return {
    ...base,
    title: locale.title,
    shortDescription: locale.shortDescription,
    details: locale.details,
  };
};

export const getProjects = (lang: Lang): Project[] => sortedBases.map((base) => buildProject(base, lang));
