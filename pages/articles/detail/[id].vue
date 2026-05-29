<template>
  <div class="article-detail-page">
    <div class="article-header">
      <div class="header-content">
        <span class="article-category">{{ articleDetail.category }}</span>
        <h1 class="article-title">{{ articleDetail.title }}</h1>
        <div class="article-meta">
          <span class="meta-author">👤 {{ articleDetail.author }}</span>
          <span class="meta-date">📅 {{ articleDetail.publishDate }}</span>
          <span class="meta-views">👁️ {{ articleDetail.views }}阅读</span>
        </div>
      </div>
    </div>
    
    <div class="article-content">
      <div class="content-body">
        <div v-html="articleDetail.content"></div>
      </div>
      
      <div class="article-tags">
        <span 
          v-for="tag in articleDetail.tags" 
          :key="tag"
          class="article-tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    
    <div class="article-actions">
      <div class="action-item" @click="handleFavorite">
        <span class="action-icon">{{ isFavorited ? '❤️' : '🤍' }}</span>
        <span class="action-text">{{ isFavorited ? '已收藏' : '收藏' }}</span>
      </div>
      <div class="action-item" @click="handleShare">
        <span class="action-icon">🔗</span>
        <span class="action-text">分享</span>
      </div>
      <div class="action-item" @click="handleComment">
        <span class="action-icon">💬</span>
        <span class="action-text">评论</span>
      </div>
      <div class="action-item" @click="handleLike">
        <span class="action-icon">{{ isLiked ? '👍' : '👎' }}</span>
        <span class="action-text">{{ isLiked ? '已点赞' : '点赞' }}</span>
      </div>
    </div>
    
    <div class="comments-section">
      <h3 class="section-title">💬 评论 ({{ comments.length }})</h3>
      <div class="comments-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-header">
            <span class="comment-avatar">{{ comment.avatar }}</span>
            <div class="comment-info">
              <span class="comment-name">{{ comment.name }}</span>
              <span class="comment-time">{{ comment.time }}</span>
            </div>
          </div>
          <p class="comment-content">{{ comment.content }}</p>
        </div>
      </div>
      
      <div class="comment-input-area">
        <input 
          v-model="newComment"
          type="text" 
          class="comment-input"
          placeholder="发表你的看法..."
          @keyup.enter="submitComment"
        />
        <button class="submit-btn" @click="submitComment">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isFavorited = ref(false)
const isLiked = ref(false)
const newComment = ref('')

const articleDetail = ref<{
  id: string
  title: string
  category: string
  author: string
  publishDate: string
  views: number
  content: string
  tags: string[]
}>({
  id: '',
  title: '',
  category: '',
  author: '',
  publishDate: '',
  views: 0,
  content: '',
  tags: []
})

const comments = ref([
  {
    id: '1',
    avatar: '👤',
    name: '用户A',
    time: '2024-05-20 10:30',
    content: '非常有价值的文章，学到了很多中医知识！'
  },
  {
    id: '2',
    avatar: '👩',
    name: '用户B',
    time: '2024-05-20 11:45',
    content: '感谢分享，希望能看到更多这样的内容。'
  },
  {
    id: '3',
    avatar: '👨',
    name: '用户C',
    time: '2024-05-21 09:00',
    content: '写得很详细，收藏了！'
  }
])

const fetchArticleDetail = () => {
  const id = route.params.id as string
  
  articleDetail.value = {
    id: id,
    title: '春季养肝正当时',
    category: '养生保健',
    author: '中医专家',
    publishDate: '2024-05-20',
    views: 2580,
    content: `
      <p>春季是万物复苏的季节，也是养肝的黄金时期。中医认为，春季属木，与肝脏相应，此时肝气旺盛，是调理肝脏的最佳时机。</p>
      
      <h2>一、春季养肝的重要性</h2>
      <p>肝脏是人体的重要器官，具有解毒、代谢、储存等多种功能。春季肝气旺盛，如果养护不当，容易出现情绪波动、疲劳乏力、失眠多梦等问题。因此，春季养肝对于维护身体健康至关重要。</p>
      
      <h2>二、春季养肝的方法</h2>
      
      <h3>1. 饮食调理</h3>
      <p>春季养肝应多吃一些绿色蔬菜和清淡食物，如菠菜、芹菜、西兰花、绿豆等。这些食物有助于疏肝理气，清热解毒。同时，应少吃辛辣、油腻的食物，以免加重肝脏负担。</p>
      
      <h3>2. 起居调养</h3>
      <p>春季应早睡早起，保证充足的睡眠。中医认为，凌晨1-3点是肝经当令的时间，此时入睡有助于肝脏的修复和排毒。同时，适当的户外活动也有助于肝气的舒畅。</p>
      
      <h3>3. 情志调节</h3>
      <p>春季肝气旺盛，容易出现情绪烦躁、易怒等问题。因此，保持心情舒畅对于养肝非常重要。可以通过听音乐、练习太极拳、散步等方式来调节情绪。</p>
      
      <h3>4. 穴位按摩</h3>
      <p>按摩太冲穴、行间穴等肝经穴位，可以起到疏肝理气的作用。每天按摩5-10分钟，有助于缓解疲劳和情绪压力。</p>
      
      <h2>三、春季养肝食谱推荐</h2>
      
      <h3>1. 菠菜猪肝汤</h3>
      <p>材料：菠菜200克，猪肝100克，姜片适量。</p>
      <p>做法：猪肝切片，用清水浸泡30分钟，去除血水。菠菜洗净切段。锅中加水烧开，放入姜片和猪肝，煮5分钟后加入菠菜，再煮3分钟，加盐调味即可。</p>
      
      <h3>2. 绿豆汤</h3>
      <p>材料：绿豆50克，冰糖适量。</p>
      <p>做法：绿豆淘洗干净，提前浸泡2小时。锅中加适量清水，放入绿豆，大火烧开后转小火煮30分钟，加入冰糖调味即可。</p>
      
      <h2>四、注意事项</h2>
      <p>春季养肝虽然重要，但也要注意适度原则。避免过度劳累和情绪波动，保持规律的生活作息。如果出现严重的身体不适，应及时就医。</p>
      
      <p>希望大家在这个春天都能养好肝脏，保持身体健康！</p>
    `,
    tags: ['春季养生', '养肝', '中医调理', '健康']
  }
}

const handleFavorite = () => {
  isFavorited.value = !isFavorited.value
  alert(isFavorited.value ? '已收藏到我的收藏' : '已取消收藏')
}

const handleShare = () => {
  alert('分享链接已复制到剪贴板')
}

const handleComment = () => {
  (document.querySelector('.comment-input') as HTMLElement)?.focus()
}

const handleLike = () => {
  isLiked.value = !isLiked.value
}

const submitComment = () => {
  if (!newComment.value.trim()) {
    alert('请输入评论内容')
    return
  }
  
  comments.value.push({
    id: Date.now().toString(),
    avatar: '👤',
    name: '我',
    time: new Date().toLocaleString('zh-CN'),
    content: newComment.value
  })
  
  newComment.value = ''
}

onMounted(() => {
  fetchArticleDetail()
})
</script>

<style scoped>
.article-detail-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.article-header {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  padding: 24px 16px;
  color: #fff;
}

.article-category {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: 12px;
}

.article-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 12px 0;
}

.article-meta {
  display: flex;
  gap: 16px;
}

.meta-author, .meta-date, .meta-views {
  font-size: 13px;
  opacity: 0.9;
}

.article-content {
  margin: 16px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.content-body {
  font-size: 15px;
  color: #333;
  line-height: 1.8;
}

.content-body h2 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 20px 0 12px 0;
}

.content-body h3 {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 16px 0 8px 0;
}

.content-body p {
  margin: 0 0 12px 0;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.article-tag {
  padding: 6px 12px;
  background: #faf6f1;
  border-radius: 16px;
  font-size: 13px;
  color: #c19660;
}

.article-actions {
  display: flex;
  justify-content: center;
  gap: 32px;
  padding: 16px;
  background: #fff;
  margin: 0 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.3s;
}

.action-item:active {
  transform: scale(0.95);
}

.action-icon {
  font-size: 24px;
}

.action-text {
  font-size: 13px;
  color: #666;
}

.comments-section {
  margin: 16px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment-item {
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.comment-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.comment-avatar {
  font-size: 32px;
}

.comment-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.comment-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-content {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.comment-input-area {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.comment-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.comment-input:focus {
  border-color: #c19660;
}

.submit-btn {
  padding: 12px 20px;
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}
</style>