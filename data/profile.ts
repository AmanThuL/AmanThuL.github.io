
import { Achievement, Photo } from '../types';

export const getBioData = (lang: 'en' | 'zh') => {
  if (lang === 'zh') {
    return {
      heading: "视觉反馈循环",
      subheading: "构建光影 // 捕捉瞬间",
      philosophy: "对我而言，追求图形的高保真度与摄影艺术是一体两面：即对“视觉反馈”的执着。作为一名 GPU 工程师，我构建模拟光线的系统，追逐光子路径的数学完美。而在生活中，我用相机捕捉光线，定格现实中稍纵即逝的瞬间。这两个领域都需要对构图、色彩科学以及媒介技术极限的严谨理解。无论是调试着色器还是构图风景，通过视觉输出获得的即时反馈始终驱动着我前行。"
    };
  }
  return {
    heading: "VISUAL_FEEDBACK_LOOP",
    subheading: "ENGINEERING LIGHT // CAPTURING MOMENTS",
    philosophy: "For me, the pursuit of graphical fidelity and the art of photography are two sides of the same coin: the obsession with Visual Feedback. In my career as a GPU Engineer, I build systems that simulate light, chasing the mathematical perfection of a photon's path. In my life, I use my camera to capture light, freezing fleeting moments of reality. Both disciplines require a rigorous understanding of composition, color science, and the technical limits of the medium. Whether I am debugging a shader or framing a landscape, I am driven by the immediate, tangible result of the visual output."
  };
};

const commonAchievements = [
  { id: '1', year: '2023', type: 'Patent', link: '#' },
  { id: '2', year: '2022', type: 'Publication', link: '#' },
  { id: '3', year: '2021', type: 'Award' },
  { id: '4', year: '2020', type: 'Certification' }
];

export const getAchievements = (lang: 'en' | 'zh'): Achievement[] => {
  const isZh = lang === 'zh';
  return [
    { ...commonAchievements[0], title: isZh ? 'VR 高效射线三角形求交方法' : 'Method for Efficient Ray-Triangle Intersection in VR', organization: isZh ? '美国专利局' : 'US Patent Office', type: 'Patent' },
    { ...commonAchievements[1], title: isZh ? '实时全局光照技术' : 'Real-time Global Illumination Techniques', organization: 'SIGGRAPH Asia', type: 'Publication' },
    { ...commonAchievements[2], title: isZh ? '最佳技术成就奖' : 'Best Technical Achievement', organization: isZh ? 'Global Game Jam (罗切斯特)' : 'Global Game Jam (Rochester)', type: 'Award' },
    { ...commonAchievements[3], title: isZh ? 'NVIDIA 深度学习学院认证' : 'NVIDIA Deep Learning Institute Certification', organization: 'NVIDIA', type: 'Certification' }
  ];
};

const commonPhotos = [
  { id: 'p1', url: 'https://picsum.photos/seed/mountain/800/1000', params: { camera: 'Sony A7IV', lens: 'FE 24-70mm GM II', aperture: 'f/8.0', shutter: '1/200s', iso: '100' } },
  { id: 'p2', url: 'https://picsum.photos/seed/street/1000/800', params: { camera: 'Fujifilm X-T5', lens: '35mm f/1.4', aperture: 'f/1.4', shutter: '1/60s', iso: '800' } },
  { id: 'p3', url: 'https://picsum.photos/seed/desert/800/800', params: { camera: 'Sony A7IV', lens: '70-200mm GM', aperture: 'f/11', shutter: '1/500s', iso: '200' } },
  { id: 'p4', url: 'https://picsum.photos/seed/ocean/900/1200', params: { camera: 'Sony A7IV', lens: '16-35mm GM', aperture: 'f/5.6', shutter: '2s', iso: '50' } }
];

export const getPhotos = (lang: 'en' | 'zh'): Photo[] => {
  if (lang === 'zh') {
    return [
      { ...commonPhotos[0], title: '阿尔卑斯孤寂', location: '瑞士阿尔卑斯', thoughts: "光影在嶙峋山峰间的交错创造了一种近乎程序化生成的强烈对比。我等待云层散开的那一刻，阳光正好照亮中央的山脊，突显出地貌的宏伟尺度。" },
      { ...commonPhotos[1], title: '霓虹雨', location: '日本东京', thoughts: "现实生活中的赛博朋克美学。湿润沥青路面上的倒影让我想起了屏幕空间反射（SSR）的伪影，但在现实中，这种混乱是完美的。在这里，捕捉氛围比追求锐度更重要。" },
      { ...commonPhotos[2], title: '沙丘纹理', location: '死亡谷', thoughts: "纹理与重复。风将这些沙丘雕刻成每小时都在变化的数学曲线。我缩小光圈，以确保前景的每一粒沙子都和地平线一样清晰。" },
      { ...commonPhotos[3], title: '太平洋漂流', location: '加州大苏尔', thoughts: "长曝光摄影就像是在渲染缓冲区中累积样本。海洋化作迷雾，将混乱的波浪简化为平滑的渐变。它带来了一种肉眼无法察觉的宁静感。" }
    ];
  }
  return [
    { ...commonPhotos[0], title: 'Alpine Solitude', location: 'Swiss Alps', thoughts: "The interplay of light and shadow on the jagged peaks created a stark contrast that felt almost procedural. I waited for the cloud cover to break just enough to illuminate the central ridge, highlighting the sheer scale of the landscape." },
    { ...commonPhotos[1], title: 'Neon Rain', location: 'Tokyo, Japan', thoughts: "Cyberpunk aesthetics in real life. The reflections on the wet asphalt reminded me of screen-space reflection artifacts, but here, in reality, the chaos is perfect. Capturing the mood was more important than sharpness here." },
    { ...commonPhotos[2], title: 'Dune Patterns', location: 'Death Valley', thoughts: "Textures and repetition. The wind carves these dunes into mathematical curves that change every hour. I stopped down the aperture to ensure every grain of sand in the foreground was as sharp as the horizon." },
    { ...commonPhotos[3], title: 'Pacific Drift', location: 'Big Sur, CA', thoughts: "Long exposure photography is like accumulating samples in a render buffer. The ocean turns into mist, simplifying the chaotic waves into a smooth gradient. It brings a sense of calm that naked eyes cannot see." }
  ];
};
