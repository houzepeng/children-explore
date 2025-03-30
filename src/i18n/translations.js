// 国际化翻译文件

export const translations = {
  en: {
    // 头部和导航
    title: "Children's Learning Navigator",
    searchPlaceholder: "Search educational resources...",
    languageFilter: "Language:",
    difficultyFilter: "Difficulty:",
    ageFilter: "Age:",
    allOption: "All",
    exploreButton: "Explore",
    
    // 分类
    categories: {
      all: "All",
      math: "Math",
      chinese: "Chinese",
      english: "English",
      science: "Science",
      art: "Art",
      games: "Educational Games"
    },
    
    // 难度
    difficulty: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced"
    },
    
    // 年龄段
    ageRanges: {
      young: "2-6 years",
      middle: "7-12 years",
      teen: "13-18 years"
    },
    
    // 语言标签
    languages: {
      zh: "Chinese",
      en: "English"
    },
    
    // 卡片和模态框
    ageLabel: "years",
    favoriteButton: "★",
    modalClose: "×"
  },
  
  zh: {
    // 头部和导航
    title: "儿童学习导航",
    searchPlaceholder: "搜索教育资源...",
    languageFilter: "语言：",
    difficultyFilter: "难度：",
    ageFilter: "年龄：",
    allOption: "全部",
    exploreButton: "开始探索",
    
    // 分类
    categories: {
      all: "全部",
      math: "数学",
      chinese: "语文",
      english: "英语",
      science: "科学",
      art: "艺术",
      games: "益智游戏"
    },
    
    // 难度
    difficulty: {
      beginner: "初级",
      intermediate: "中级",
      advanced: "高级"
    },
    
    // 年龄段
    ageRanges: {
      young: "2-6岁",
      middle: "7-12岁",
      teen: "13-18岁"
    },
    
    // 语言标签
    languages: {
      zh: "中文",
      en: "英文"
    },
    
    // 卡片和模态框
    ageLabel: "岁",
    favoriteButton: "★",
    modalClose: "×"
  }
};

// 获取翻译函数
export const getTranslation = (lang, key) => {
  // 支持嵌套键，如 'categories.all'
  const keys = key.split('.');
  let result = translations[lang];
  
  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k];
    } else {
      // 如果找不到翻译，返回英文版本或键名
      const enResult = getEnglishFallback(key);
      return enResult !== key ? enResult : key;
    }
  }
  
  return result;
};

// 英文回退函数
const getEnglishFallback = (key) => {
  const keys = key.split('.');
  let result = translations['en'];
  
  for (const k of keys) {
    if (result && result[k] !== undefined) {
      result = result[k];
    } else {
      return key;
    }
  }
  
  return result;
};