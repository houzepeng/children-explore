import { useState } from 'react';
import { Card, CardContent, Typography, Grid, Container, Box, Chip, IconButton, Modal } from '@mui/material';
import { FaBookOpen, FaTimes } from 'react-icons/fa';
import { getTranslation } from '../i18n/translations';

const stories = [
  {
    id: 1,
    title: '小兔子的梦想',
    category: t('bedtimeCategories.dream'),
    content: '从前有一只小兔子，它梦想着能飞上天空。每天晚上，它都会仰望星空，想象自己展开翅膀飞翔的样子...',
    tags: [t('bedtimeTags.inspirational'), t('bedtimeTags.dream'), t('bedtimeTags.courage')],
    age: '3-8岁'
  },
  {
    id: 2,
    title: '森林里的音乐会',
    category: t('bedtimeCategories.nature'),
    content: '春天来了，森林里的小动物们决定举办一场音乐会。小鸟负责唱歌，青蛙弹钢琴，蟋蟀拉小提琴...',
    tags: [t('bedtimeTags.friendship'), t('bedtimeTags.cooperation'), t('bedtimeTags.music')],
    age: '4-10岁'
  },
  { id: 3,
    title: '智慧老树的故事',
    category: t('bedtimeCategories.wisdom'),
    content: '在一片古老的森林里，有一棵巨大的老树。它经历了数百年的风风雨雨，积累了许多智慧...',
    tags: [t('bedtimeTags.wisdom'), t('bedtimeTags.growth'), t('bedtimeTags.nature')],
    age: '5-12岁'
  },
  {
    id: 4,
    title: '小熊的蜂蜜罐',
    category: t('bedtimeCategories.adventure'),
    content: '小熊维尼最喜欢蜂蜜了。有一天，他的蜂蜜罐空了，于是他决定去森林深处寻找新的蜂蜜...',
    tags: [t('bedtimeTags.adventure'), t('bedtimeTags.brave'), t('bedtimeTags.explore')],
    age: '3-7岁'
  },
  {
    id: 5,
    title: '月亮船',
    category: t('bedtimeCategories.imagination'),
    content: '小女孩莉莉有一个秘密，她的床会在夜晚变成一艘月亮船，载着她飞向遥远的星空...',
    tags: [t('bedtimeTags.imagination'), t('bedtimeTags.fantasy'), t('bedtimeTags.night')],
    age: '4-9岁'
  },
  {
    id: 6,
    title: '小王子的玫瑰',
    category: t('bedtimeCategories.love'),
    content: '小王子离开了他的星球，去探索宇宙。他遇到了许多不同的人和事，但他始终思念着他的那朵独一无二的玫瑰...',
    tags: [t('bedtimeTags.love'), t('bedtimeTags.friendship'), t('bedtimeTags.philosophy')],
    age: '6-12岁'
  },
  {
    id: 7,
    title: '勇敢的小锡兵',
    category: t('bedtimeCategories.bravery'),
    content: '一个只有一条腿的小锡兵爱上了一个美丽的纸芭蕾舞演员。他经历了一系列惊险的冒险，最终回到了她的身边...',
    tags: [t('bedtimeTags.brave'), t('bedtimeTags.persistence'), t('bedtimeTags.love')],
    age: '5-10岁'
  },
  {
    id: 8,
    title: '丑小鸭',
    category: t('bedtimeCategories.growth'),
    content: '一只被大家嘲笑的丑小鸭，历经磨难，最终蜕变成美丽的白天鹅。这个故事告诉我们，不要以貌取人，每个人都有自己的闪光点...',
    tags: [t('bedtimeTags.growth'), t('bedtimeTags.selfConfidence'), t('bedtimeTags.transformation')],
    age: '4-8岁'
  }
];

const Bedtime = ({ currentLanguage }) => {
  const t = (key) => getTranslation(currentLanguage, key);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = [
    { id: 'all', label: () => t('allCategories') },
    { id: '自然', label: () => t('bedtimeCategories.nature') },
    { id: '勇气', label: () => t('bedtimeCategories.courage') },
    { id: '梦想', label: () => t('bedtimeCategories.dream') },
    { id: '智慧', label: () => t('bedtimeCategories.wisdom') },
    { id: '友情', label: () => t('bedtimeCategories.friendship') },
    { id: '冒险', label: () => t('bedtimeCategories.adventure') },
    { id: '想象', label: () => t('bedtimeCategories.imagination') },
    { id: '爱', label: () => t('bedtimeCategories.love') },
    { id: '勇敢', label: () => t('bedtimeCategories.bravery') },
    { id: '成长', label: () => t('bedtimeCategories.growth') }
  ];
  const [selectedStory, setSelectedStory] = useState(null);

  const filteredStories = selectedCategory === 'all'
    ? stories
    : stories.filter(story => story.category === selectedCategory);

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const handleCloseModal = () => {
    setSelectedStory(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        {t('bedtimeTitle')}
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.label()}
            onClick={() => setSelectedCategory(category.id)}
            color={selectedCategory === category.id ? 'primary' : 'default'}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>

      <Grid container spacing={3}>
        {filteredStories.map((story) => (
          <Grid item xs={12} sm={6} md={4} key={story.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
              onClick={() => handleStoryClick(story)}
            >
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {story.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t('bedtimeAgeLabel')}{story.age}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                  {story.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {story.content.substring(0, 100)}...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={selectedStory !== null}
        onClose={handleCloseModal}
        aria-labelledby="story-modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '60%' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          {selectedStory && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2" id="story-modal-title">
                  {selectedStory.title}
                </Typography>
                <IconButton onClick={handleCloseModal} size="small">
                  <FaTimes />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {t('bedtimeAgeLabel')}{selectedStory.age}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
                {selectedStory.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" />
                ))}
              </Box>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {selectedStory.content}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Bedtime;