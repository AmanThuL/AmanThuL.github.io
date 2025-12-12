
export type TranslationKey =
  | 'nav_projects'
  | 'nav_profile'
  | 'nav_blog'
  | 'nav_resume'
  | 'footer_system'
  | 'footer_credit'
  | 'hero_role_gpu'
  | 'hero_role_research'
  | 'hero_role_game'
  | 'hero_scroll'
  | 'section_featured'
  | 'section_archive'
  | 'filter_all'
  | 'btn_execute'
  | 'back_home'
  | 'back_blog'
  | 'read_time'
  | 'project_overview'
  | 'project_contributions'
  | 'project_role'
  | 'project_timeline'
  | 'project_team'
  | 'profile_intro_heading'
  | 'profile_intro_sub'
  | 'profile_awards'
  | 'profile_photos'
  | 'lightbox_analysis'
  | 'lightbox_log'
  | 'lightbox_exif'
  | 'resume_title'
  | 'resume_subtitle'
  | 'resume_upload'
  | 'resume_download'
  | 'resume_placeholder_file'
  | 'resume_note'
  | 'resume_status_placeholder'
  | 'resume_status_loaded';

export const translations: Record<'en' | 'zh', Record<TranslationKey, string>> = {
  en: {
    nav_projects: 'Projects',
    nav_profile: 'Profile',
    nav_blog: 'Blog',
    nav_resume: 'Resume',
    footer_system: 'System Operational',
    footer_credit: 'Designed & Engineered by Rudy Zhang',
    hero_role_gpu: 'GPU Software Engineer',
    hero_role_research: 'Graphics Programmer',
    hero_role_game: 'Game Developer',
    hero_scroll: 'Scroll to Initialize',
    section_featured: 'PRIME_DIRECTIVES',
    section_archive: 'DATA_ARCHIVE',
    filter_all: 'All',
    btn_execute: 'Execute',
    back_home: 'Back to Grid',
    back_blog: 'Back to Database',
    read_time: 'read',
    project_overview: 'OVERVIEW',
    project_contributions: 'KEY_CONTRIBUTIONS',
    project_role: 'Role',
    project_timeline: 'Timeline',
    project_team: 'Team',
    profile_intro_heading: 'VISUAL_FEEDBACK_LOOP',
    profile_intro_sub: 'ENGINEERING LIGHT // CAPTURING MOMENTS',
    profile_awards: 'ACCOLADE_REGISTRY',
    profile_photos: 'VISUAL_INPUT_BUFFER',
    lightbox_analysis: 'Visual_Analysis',
    lightbox_log: "Photographer's Log",
    lightbox_exif: 'EXIF_DATA_READOUT',
    resume_title: 'RESUME_TERMINAL',
    resume_subtitle: 'Preview, upload, and download your resume PDF directly without leaving the site.',
    resume_upload: 'Upload PDF',
    resume_download: 'Download',
    resume_placeholder_file: 'Placeholder resume.pdf',
    resume_note: 'Uploads stay local to this browser session—replace the placeholder when ready.',
    resume_status_placeholder: 'Placeholder active',
    resume_status_loaded: 'Local upload active'
  },
  zh: {
    nav_projects: '项目展示',
    nav_profile: '关于我',
    nav_blog: '技术博客',
    nav_resume: '简历',
    footer_system: '系统运行正常',
    footer_credit: '设计与开发：Rudy Zhang',
    hero_role_gpu: 'GPU驱动软件工程师',
    hero_role_research: '图形学程序员',
    hero_role_game: '独立游戏开发者',
    hero_scroll: '滑动初始化',
    section_featured: '核心项目',
    section_archive: '数据归档',
    filter_all: '全部',
    btn_execute: '执行',
    back_home: '返回首页',
    back_blog: '返回数据库',
    read_time: '阅读',
    project_overview: '项目概览',
    project_contributions: '核心贡献',
    project_role: '担任角色',
    project_timeline: '时间轴',
    project_team: '团队成员',
    profile_intro_heading: '视觉反馈循环',
    profile_intro_sub: '构建光影 // 捕捉瞬间',
    profile_awards: '荣誉记录',
    profile_photos: '视觉输入缓存',
    lightbox_analysis: '视觉分析',
    lightbox_log: '摄影师日志',
    lightbox_exif: 'EXIF 数据读取',
    resume_title: '简历终端',
    resume_subtitle: '在站内预览简历 PDF，可随时上传更新并下载本地副本。',
    resume_upload: '上传 PDF',
    resume_download: '下载文件',
    resume_placeholder_file: '占位简历.pdf',
    resume_note: '上传内容仅保留在浏览器本地，需要时替换占位文件即可。',
    resume_status_placeholder: '占位文件',
    resume_status_loaded: '本地上传'
  }
};
