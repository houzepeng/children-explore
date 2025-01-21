import { useState } from 'react'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeLang, setActiveLang] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedResource, setSelectedResource] = useState(null)
  const [favorites, setFavorites] = useState([])

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

  const categories = [
    { id: 'all', name: '全部' },
    { id: 'math', name: '数学' },
    { id: 'chinese', name: '语文' },
    { id: 'english', name: '英语' },
    { id: 'science', name: '科学' },
    { id: 'art', name: '艺术' },
    { id: 'games', name: '益智游戏' }
  ]

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
    }
  ]

  return (
    <div className="app-container">
      <header className="header">
        <h1>儿童学习导航</h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="搜索学习资源..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => setSearchQuery(searchQuery.trim())}>搜索</button>
        </div>
        <div className="language-toggle">
          <button 
            className={`lang-btn ${activeLang === 'all' ? 'active' : ''}`}
            onClick={() => setActiveLang('all')}
          >
            全部
          </button>
          <button 
            className={`lang-btn ${activeLang === 'zh' ? 'active' : ''}`}
            onClick={() => setActiveLang('zh')}
          >
            中文
          </button>
          <button 
            className={`lang-btn ${activeLang === 'en' ? 'active' : ''}`}
            onClick={() => setActiveLang('en')}
          >
            English
          </button>
        </div>
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
            (searchQuery === '' || 
              resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map(resource => (
            <div key={resource.id} className="resource-card" onClick={() => handleCardClick(resource)}>
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
                  开始探索
                </a>
              </div>
            </div>
          ))}
      </main>

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
              开始探索
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
