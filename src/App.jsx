import { useState, useEffect } from 'react'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { FaFacebook, FaTwitter, FaWhatsapp, FaMoon, FaSun } from 'react-icons/fa'
import LanguageSwitcher from './components/LanguageSwitcher'
import { getTranslation, translations } from './i18n/translations'

// 谷歌广告组件
const GoogleAd = ({ adSlot, style }) => {
  useEffect(() => {
    try {
      const pushAd = () => {
        try {
          // 无论在什么页面上都显示广告，包括没有发布商内容的页面
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (innerErr) {
          console.error('Error pushing ad:', innerErr);
        }
      };

      if (window.adsbygoogle) {
        pushAd();
      } else {
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2149434191592924';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.onload = pushAd;
        document.head.appendChild(script);
      }
    } catch (err) {
      console.error('Google AdSense error:', err);
    }
  }, [adSlot]); // 当广告单元ID变化时重新加载

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client="ca-pub-2149434191592924"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-ad-layout="in-article"
    />
  );
};


const isInAgeRange = (resourceRange, selectedRange) => {
  if (selectedRange === 'all') return true
  
  const [resourceStart, resourceEnd] = resourceRange.split('-').map(Number)
  const [selectedStart, selectedEnd] = selectedRange.split('-').map(Number)
  
  return resourceStart >= selectedStart && resourceEnd <= selectedEnd
}

function App() {
  // 添加谷歌广告脚本
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2149434191592924';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 获取浏览器语言设置，默认为中文
  const getBrowserLanguage = () => {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('zh') ? 'zh' : 'en';
  };

  const [activeCategory, setActiveCategory] = useState('all')
  const [activeLang, setActiveLang] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedResource, setSelectedResource] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [activeDifficulty, setActiveDifficulty] = useState('all')
  const [activeAgeRange, setActiveAgeRange] = useState('all')
  const [currentLanguage, setCurrentLanguage] = useState(getBrowserLanguage())


  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleFavorite = (resourceId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(resourceId)) {
        return prevFavorites.filter(id => id !== resourceId)
      } else {
        return [...prevFavorites, resourceId]
      }
    })
  }

  const handleCardClick = (resource) => {
    setSelectedResource(resource)
  }

  const closeModal = () => {
    setSelectedResource(null)
  }

  // 获取翻译文本
  const t = (key) => getTranslation(currentLanguage, key);

  // 动态生成分类，支持国际化
  const getCategories = () => [
    { id: 'all', name: t('categories.all') },
    { id: 'math', name: t('categories.math') },
    { id: 'chinese', name: t('categories.chinese') },
    { id: 'english', name: t('categories.english') },
    { id: 'science', name: t('categories.science') },
    { id: 'art', name: t('categories.art') },
    { id: 'games', name: t('categories.games') }
  ]
  
  const categories = getCategories()

  const resources = [
    { 
      id: 1, 
      title: '可汗学院数学', 
      category: 'math', 
      url: 'https://zh.khanacademy.org/math', 
      description: '免费的世界级教育平台，通过视频和互动练习学习数学',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/2436/2436683.png',
      ageRange: '7-12',
      difficulty: '初级到高级',
      isFavorite: false
    },
    { 
      id: 2, 
      title: 'IXL Math', 
      category: 'math', 
      url: 'https://www.ixl.com/math', 
      description: 'Comprehensive K-12 math practice program with adaptive learning',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/3870/3870779.png',
      ageRange: '6-14',
      difficulty: '初级到高级',
      isFavorite: false
    },
    { 
      id: 3, 
      title: '洪恩识字', 
      category: 'chinese', 
      url: 'https://www.hongen.com/products/literacy', 
      description: '专业的中文识字平台，通过趣味动画和互动游戏学习汉字',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/3976/3976625.png',
      ageRange: '3-8',
      difficulty: '初级',
      isFavorite: false
    },
    { 
      id: 4, 
      title: 'BBC Learning English Kids', 
      category: 'english', 
      url: 'https://learnenglishkids.britishcouncil.org', 
      description: 'British Council儿童英语学习平台，提供丰富的互动学习资源',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/3898/3898082.png',
      ageRange: '5-12',
      difficulty: '初级到中级',
      isFavorite: false
    },
    { 
      id: 5, 
      title: 'Duolingo Kids', 
      category: 'english', 
      url: 'https://www.duolingo.com', 
      description: 'Fun and effective way to learn English through games and stories',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/2373/2373201.png',
      ageRange: '4-12',
      difficulty: '初级',
      isFavorite: false
    },
    { 
      id: 6, 
      title: '科学实验室', 
      category: 'science', 
      url: 'https://kids.nationalgeographic.com/science', 
      description: '国家地理儿童科学频道，探索神奇的科学世界',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/1046/1046269.png',
      ageRange: '6-12',
      difficulty: '初级到中级',
      isFavorite: false
    },
    { 
      id: 7, 
      title: 'NASA Kids Club', 
      category: 'science', 
      url: 'https://www.nasa.gov/kidsclub/index.html', 
      description: 'Explore space science with NASA\'s interactive games and activities',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/2909/2909458.png',
      ageRange: '8-13',
      difficulty: '中级',
      isFavorite: false
    },
    { 
      id: 8, 
      title: '小小艺术家', 
      category: 'art', 
      url: 'https://www.hellokids.com/c_15933/drawing-for-kids', 
      description: '儿童绘画学习平台，提供丰富的绘画教程和创意课程',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/2970/2970785.png',
      ageRange: '4-12',
      difficulty: '初级到中级',
      isFavorite: false
    },
    { 
      id: 9, 
      title: 'Art for Kids Hub', 
      category: 'art', 
      url: 'https://www.artforkidshub.com', 
      description: 'Easy to follow drawing tutorials for kids of all ages',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/1048/1048950.png',
      ageRange: '5-15',
      difficulty: '初级到高级',
      isFavorite: false
    },
    { 
      id: 10, 
      title: 'ABCmouse', 
      category: 'games', 
      url: 'https://www.abcmouse.com', 
      description: '综合性儿童早教平台，包含游戏、动画、音乐等多种学习内容',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/2317/2317963.png',
      ageRange: '2-8',
      difficulty: '初级',
      isFavorite: false
    },
    { 
      id: 11, 
      title: 'PBS Kids Games', 
      category: 'games', 
      url: 'https://pbskids.org/games', 
      description: 'Educational games featuring PBS KIDS characters',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/3612/3612569.png',
      ageRange: '3-8',
      difficulty: '初级',
      isFavorite: false
    },
    {
      id: 12,
      title: 'Scratch编程',
      category: 'science',
      url: 'https://scratch.mit.edu',
      description: 'MIT开发的儿童编程平台，通过图形化编程培养逻辑思维',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/919/919846.png',
      ageRange: '8-16',
      difficulty: '初级到高级',
      isFavorite: false
    },
    {
      id: 13,
      title: 'Reading A-Z',
      category: 'english',
      url: 'https://www.readinga-z.com',
      description: 'Comprehensive reading program with leveled books and resources',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/3389/3389081.png',
      ageRange: '4-12',
      difficulty: '初级到高级',
      isFavorite: false
    },
    {
      id: 14,
      title: '洪恩数学',
      category: 'math',
      url: 'https://www.hongen.com/products/math',
      description: '趣味数学启蒙教育平台，通过游戏和动画学习数学概念',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/3974/3974475.png',
      ageRange: '3-8',
      difficulty: '初级',
      isFavorite: false
    },
    {
      id: 15,
      title: 'Code.org',
      category: 'science',
      url: 'https://code.org',
      description: 'Learn computer science through fun coding activities and games',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/2721/2721620.png',
      ageRange: '4-18',
      difficulty: '初级到高级',
      isFavorite: false
    },
    {
      id: 16,
      title: '小学语文',
      category: 'chinese',
      url: 'http://www.xiaoxue.com',
      description: '专业的小学语文学习平台，包含课文、阅读、写作等全面内容',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/3976/3976625.png',
      ageRange: '6-12',
      difficulty: '初级到中级',
      isFavorite: false
    },
    {
      id: 17,
      title: 'Starfall',
      category: 'english',
      url: 'https://www.starfall.com',
      description: 'Learn to read with phonics, language arts, and mathematics',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/2436/2436683.png',
      ageRange: '4-8',
      difficulty: '初级',
      isFavorite: false
    },
    {
      id: 18,
      title: '趣味科学实验',
      category: 'science',
      url: 'https://www.dkfindout.com/science',
      description: 'DK出版社的趣味科学实验和知识平台，生动有趣',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/1046/1046269.png',
      ageRange: '6-14',
      difficulty: '初级到中级',
      isFavorite: false
    },
    {
      id: 19,
      title: 'Typing.com',
      category: 'games',
      url: 'https://www.typing.com',
      description: 'Free online typing tutor and keyboarding lessons for kids',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/2721/2721620.png',
      ageRange: '7-15',
      difficulty: '初级到高级',
      isFavorite: false
    },
    {
      id: 20,
      title: '美术星球',
      category: 'art',
      url: 'https://www.meishuxingqiu.com',
      description: '少儿美术创意平台，激发艺术潜能',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/2970/2970785.png',
      ageRange: '4-15',
      difficulty: '初级到高级',
      isFavorite: false
    },
    {
      id: 21,
      title: 'Prodigy Math',
      category: 'math',
      url: 'https://www.prodigygame.com',
      description: 'Math learning platform disguised as an exciting RPG adventure game',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/2970/2970844.png',
      ageRange: '6-14',
      difficulty: '初级到中级',
      isFavorite: false
    },
    {
      id: 22,
      title: '数学思维训练',
      category: 'math',
      url: 'https://www.mathplayground.com',
      description: '专注于培养儿童数学思维能力的互动平台，寓教于乐',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/3870/3870783.png',
      ageRange: '5-12',
      difficulty: '初级到中级',
      isFavorite: false
    },
    {
      id: 23,
      title: 'BrainPOP',
      category: 'science',
      url: 'https://www.brainpop.com',
      description: 'Animated educational site for kids covering science, social studies, math and more',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/2909/2909461.png',
      ageRange: '6-14',
      difficulty: '初级到中级',
      isFavorite: false
    },
    {
      id: 24,
      title: '儿童科普乐园',
      category: 'science',
      url: 'https://phet.colorado.edu/zh_CN',
      description: '互动式科学模拟实验平台，让孩子在虚拟环境中探索科学原理',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/1046/1046273.png',
      ageRange: '8-16',
      difficulty: '中级到高级',
      isFavorite: false
    },
    {
      id: 25,
      title: '汉语拼音学习',
      category: 'chinese',
      url: 'https://www.qinxue365.com',
      description: '专注于汉语拼音教学的平台，通过动画和游戏帮助儿童掌握拼音基础',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/3976/3976628.png',
      ageRange: '4-8',
      difficulty: '初级',
      isFavorite: false
    },
    {
      id: 26,
      title: '成语故事',
      category: 'chinese',
      url: 'https://www.61baobao.com/chengyu',
      description: '通过生动有趣的故事讲解中国成语，帮助孩子理解中华文化精髓',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/3976/3976631.png',
      ageRange: '6-12',
      difficulty: '中级',
      isFavorite: false
    },
    {
      id: 27,
      title: 'Fun English',
      category: 'english',
      url: 'https://www.funenglishgames.com',
      description: 'Interactive games and activities designed specifically for ESL learners',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/3898/3898085.png',
      ageRange: '3-10',
      difficulty: '初级',
      isFavorite: false
    },
    {
      id: 28,
      title: 'Oxford Owl',
      category: 'english',
      url: 'https://www.oxfordowl.co.uk',
      description: 'Free e-books and reading resources from Oxford University Press',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/3389/3389085.png',
      ageRange: '3-11',
      difficulty: '初级到中级',
      isFavorite: false
    },
    {
      id: 29,
      title: 'Tinkercad',
      category: 'art',
      url: 'https://www.tinkercad.com',
      description: 'Kid-friendly 3D design and modeling tool for creative projects',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/1048/1048955.png',
      ageRange: '8-16',
      difficulty: '中级',
      isFavorite: false
    },
    {
      id: 30,
      title: '儿童创意手工',
      category: 'art',
      url: 'https://www.jigsawplanet.com',
      description: '提供丰富的儿童手工制作教程，激发创造力和动手能力',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/2970/2970788.png',
      ageRange: '4-12',
      difficulty: '初级到中级',
      isFavorite: false
    },
    {
      id: 31,
      title: 'Cool Math Games',
      category: 'games',
      url: 'https://www.coolmathgames.com',
      description: 'Brain training games that make learning math and logic fun',
      lang: 'en',
      image: 'https://cdn-icons-png.flaticon.com/512/3612/3612572.png',
      ageRange: '8-16',
      difficulty: '初级到高级',
      isFavorite: false
    },
    {
      id: 32,
      title: '花生壳编程',
      category: 'games',
      url: 'https://www.codemonkey.com',
      description: '寓教于乐的编程游戏平台，让孩子在游戏中学习编程基础',
      lang: 'zh',
      image: 'https://cdn-icons-png.flaticon.com/512/2317/2317965.png',
      ageRange: '7-14',
      difficulty: '初级到中级',
      isFavorite: false
    }
  ]

  // 处理语言切换
  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    // 更新HTML lang属性
    document.documentElement.lang = lang;
    // 更新页面标题
    document.title = lang === 'zh' ? '儿童学习导航' : 'Children\'s Learning Navigator';
  };

  return (
    <div className="app-container">
      <ThemeProvider theme={theme}>
        <div className={`app-wrapper ${darkMode ? 'dark-mode' : ''}`}>
          <header className="header">
            <div className="header-top">
              <h1>{t('title')}</h1>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filters">
                <div className="filter-group">
                  <label>{t('languageFilter')}</label>
                  <select value={activeLang} onChange={(e) => setActiveLang(e.target.value)}>
                    <option value="all">{t('allOption')}</option>
                    <option value="zh">{t('languages.zh')}</option>
                    <option value="en">{t('languages.en')}</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>{t('difficultyFilter')}</label>
                  <select value={activeDifficulty} onChange={(e) => setActiveDifficulty(e.target.value)}>
                    <option value="all">{t('allOption')}</option>
                    <option value="初级">{t('difficulty.beginner')}</option>
                    <option value="中级">{t('difficulty.intermediate')}</option>
                    <option value="高级">{t('difficulty.advanced')}</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>{t('ageFilter')}</label>
                  <select value={activeAgeRange} onChange={(e) => setActiveAgeRange(e.target.value)}>
                    <option value="all">{t('allOption')}</option>
                    <option value="2-6">{t('ageRanges.young')}</option>
                    <option value="7-12">{t('ageRanges.middle')}</option>
                    <option value="13-18">{t('ageRanges.teen')}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="banner-ad">
              <GoogleAd
                adSlot="5740670043"
                style={{ display: 'block', width: '728px', height: '90px' }}
              />
            </div>
            <LanguageSwitcher 
              currentLanguage={currentLanguage} 
              onLanguageChange={handleLanguageChange} 
            />
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </header>



          <nav className="categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </nav>

          <main className="resources-grid">
            {resources
              .filter(resource => 
                (activeCategory === 'all' || resource.category === activeCategory) &&
                (activeLang === 'all' || resource.lang === activeLang) &&
                (activeDifficulty === 'all' || resource.difficulty.includes(activeDifficulty)) &&
                (activeAgeRange === 'all' || isInAgeRange(resource.ageRange, activeAgeRange)) &&
                (searchQuery === '' || [
                  resource.title,
                  resource.description,
                  categories.find(c => c.id === resource.category)?.name,
                  resource.lang === 'zh' ? '中文' : 'English',
                  resource.difficulty,
                  resource.ageRange
                ].some(field => field && field.toLowerCase().includes(searchQuery.toLowerCase())))
              )
              .map((resource, index) => {
                // 每4个资源后插入一个广告
                const items = [];
                items.push(
                  <div key={resource.id} className="resource-card" onClick={() => handleCardClick(resource)}>
                    {/* 原有的资源卡片内容 */}
                    <div className="resource-image">
                      <img src={resource.image} alt={resource.title} />
                    </div>
                    <button 
                      className={`favorite-btn ${favorites.includes(resource.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(resource.id)
                      }}
                    >
                      ★
                    </button>
                    <div className="share-buttons">
                      <FacebookShareButton url={resource.url} quote={resource.title}>
                        <FaFacebook className="share-icon" />
                      </FacebookShareButton>
                      <TwitterShareButton url={resource.url} title={resource.title}>
                        <FaTwitter className="share-icon" />
                      </TwitterShareButton>
                      <WhatsappShareButton url={resource.url} title={resource.title}>
                        <FaWhatsapp className="share-icon" />
                      </WhatsappShareButton>
                    </div>
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                    <div className="card-footer">
                      <div className="tag-group">
                        <span className={`lang-tag ${resource.lang}`}>
                          {resource.lang === 'zh' ? '中文' : 'English'}
                        </span>
                        {resource.ageRange && (
                          <span className="age-tag">
                            {resource.ageRange}岁
                          </span>
                        )}
                        {resource.difficulty && (
                          <span className="difficulty-tag">
                            {resource.difficulty}
                          </span>
                        )}
                      </div>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="explore-btn">
                        {t('exploreButton')}
                      </a>
                    </div>
                  </div>
                );

                // 每4个资源后添加广告
                if ((index + 1) % 4 === 0) {
                  items.push(
                    <div key={`ad-${index}`} className="ad-card">
                      <GoogleAd
                        adSlot={`574067004${index/4 + 3}`}
                        style={{ display: 'block', width: '280px', height: '200px' }}
                      />
                    </div>
                  );
                }

                return items;
              })
            }
          </main>
          <aside className="sidebar-ad">
            <GoogleAd
              adSlot="5740670042"
              style={{ display: 'block', width: '160px', height: '600px' }}
            />
          </aside>

          {selectedResource && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>×</button>
                <div className="modal-image">
                  <img src={selectedResource.image} alt={selectedResource.title} />
                </div>
                <h2>{selectedResource.title}</h2>
                <p className="modal-description">{selectedResource.description}</p>
                <div className="modal-info">
                  <span className={`lang-tag ${selectedResource.lang}`}>
                    {selectedResource.lang === 'zh' ? '中文' : 'English'}
                  </span>
                  <span className="category-tag">
                    {categories.find(c => c.id === selectedResource.category)?.name}
                  </span>
                </div>
                <a href={selectedResource.url} target="_blank" rel="noopener noreferrer" className="modal-btn">
                  {t('exploreButton')}
                </a>
              </div>
            </div>
          )}
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
