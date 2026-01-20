/**
 * 网站个人信息配置文件
 * 这个文件包含所有需要用户自定义的个人信息
 * 修改这些值来个性化你的博客
 */

// ==================== 站点基本信息 ====================
export const siteInfo = {
  // 网站标题
  title: "CloudLay",

  // 网站副标题
  subtitle: "Record the moments in life",

  // 站点URL（请替换为你的实际域名）
  url: "http://tangjincheng.website",

  // 站点开始运行日期（用于统计运行天数）
  startDate: "2026-01-15",

  // 语言配置
  lang: "zh_CN",

  // 时区（UTC+8 为北京时间，仅允许特定值）
  timezone: 8 as const,

  // 主题色彩（0-360）
  themeColor: 230,
};

// ==================== 个人信息 ====================
export const personalInfo = {
  // 你的名字
  name: "云间辞",

  // 个人简介
  bio: "北邮咸鱼一枚",

  // 头像路径（相对于 public 目录）
  avatar: "/assets/site/avatar/avatar.jpg",

  // 邮箱
  email: "189532159@qq.com",

  // GitHub 用户名
  github: "jinchen-Yang",

  // Gitee 用户名
  gitee: "your-gitee-username",

  // Bilibili 用户名
  bilibili: "your-bilibili-username",

  // 个人网站
  website: "https://your-domain.com",
};

// ==================== 社交链接 ====================
export const socialLinks = [
  {
    name: "GitHub",
    icon: "fa6-brands:github",
    url: `https://github.com/${personalInfo.github}`,
  },
  {
    name: "Gitee",
    icon: "fa6-brands:git-alt",
    url: `https://gitee.com/${personalInfo.gitee}`,
  },
  {
    name: "Bilibili",
    icon: "fa6-brands:bilibili",
    url: `https://space.bilibili.com/${personalInfo.bilibili}`,
  },
  {
    name: "邮箱",
    icon: "fa6-solid:envelope",
    url: `mailto:${personalInfo.email}`,
  },
];

// ==================== 导航菜单 ====================
export const navigationLinks = [
  {
    name: "首页",
    url: "/",
    icon: "material-symbols:home",
  },
  {
    name: "归档",
    url: "/archive/",
    icon: "material-symbols:archive",
  },
  {
    name: "链接",
    url: "/links/",
    icon: "material-symbols:link",
    children: [
      {
        name: "GitHub",
        url: `https://github.com/${personalInfo.github}`,
        external: true,
        icon: "fa6-brands:github",
      },
      {
        name: "Gitee",
        url: `https://gitee.com/${personalInfo.gitee}`,
        external: true,
        icon: "fa6-brands:git-alt",
      },
      {
        name: "Bilibili",
        url: `https://space.bilibili.com/${personalInfo.bilibili}`,
        external: true,
        icon: "fa6-brands:bilibili",
      },
      {
        name: "邮箱",
        url: `mailto:${personalInfo.email}`,
        external: true,
        icon: "material-symbols:mail",
      },
    ],
  },
  {
    name: "其他",
    url: "#",
    icon: "material-symbols:more-horiz",
    children: [
      {
        name: "项目",
        url: "/projects/",
        icon: "material-symbols:work",
      },
      {
        name: "技能",
        url: "/skills/",
        icon: "material-symbols:psychology",
      },
      {
        name: "时间线",
        url: "/timeline/",
        icon: "material-symbols:timeline",
      },
    ],
  },
];

// ==================== 横幅配置 ====================
export const bannerConfig = {
  // 主标题
  title: "CloudLay",

  // 副标题（打字机效果）
  subtitles: [
    "Record the moments in life",
    "share my thoughts with the world",
    "explore the world of coding",
    "Coding my way through life",
  ],

  // 桌面端横幅图片
  desktopBanner: "/assets/site/banner/desktop/1.webp",

  // 移动端横幅图片
  mobileBanner: "/assets/site/banner/mobile/1.webp",

  // 是否启用轮播
  carousel: false,

  // 是否启用水波纹效果
  waves: false,
};

// ==================== 公告配置 ====================
export const announcement = {
  title: "公告",
  content: "welcome to my blog!",
  link: {
    text: "了解更多",
    url: "/about/",
    external: false,
  },
  closable: true,
};

// ==================== 音乐播放器配置 ====================
export const musicPlayer = {
  enabled: false,
  api: "",
  id: "",
  server: "netease",
  type: "playlist",
};

// ==================== 评论系统配置 ====================
export const commentSystem = {
  enabled: false,
  envId: "",
};

// ==================== 看板娘配置 ====================
export const pioConfig = {
  enabled: false,
  welcome: "欢迎来到我的博客！",
  touch: [
    "你在干什么呢？",
    "别碰我！",
    "讨厌！",
    "不要这样欺负我！",
  ],
};

// ==================== 其他配置 ====================
export const otherConfig = {
  // 是否显示站点统计
  showStats: true,

  // 是否显示日历
  showCalendar: true,

  // 是否启用樱花特效
  showSakura: false,

  // 文章列表布局
  postLayout: "list", // "list" 或 "grid"

  // 是否允许切换布局
  allowLayoutSwitch: true,

  // 是否显示TOC目录
  showTOC: true,

  // 是否显示文章封面
  showCover: true,

  // 是否显示最后修改时间
  showLastModified: true,
};

// ==================== 导出所有配置 ====================
export default {
  siteInfo,
  personalInfo,
  socialLinks,
  navigationLinks,
  bannerConfig,
  announcement,
  musicPlayer,
  commentSystem,
  pioConfig,
  otherConfig,
};
