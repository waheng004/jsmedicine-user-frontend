<template>
  <div class="knowledge-detail-page">
    <div class="detail-header">
      <button class="back-btn" @click="goBack">←</button>
      <h1 class="detail-title">{{ knowledgeDetail.title }}</h1>
    </div>
    
    <div class="detail-content">
      <div class="category-badge">{{ knowledgeDetail.category }}</div>
      
      <div class="content-body">
        <div v-html="knowledgeDetail.content"></div>
      </div>
      
      <div class="content-meta">
        <span class="meta-item">📅 {{ knowledgeDetail.createdAt }}</span>
        <span class="meta-item">👁️ {{ knowledgeDetail.views }}次阅读</span>
      </div>
    </div>
    
    <div class="related-section">
      <h3 class="section-title">📖 相关知识</h3>
      <div class="related-list">
        <div 
          v-for="item in relatedKnowledge" 
          :key="item.id"
          class="related-item"
          @click="goToDetail(item.id)"
        >
          <span class="related-title">{{ item.title }}</span>
        </div>
      </div>
    </div>
    
    <div class="bottom-bar">
      <button class="action-btn" @click="handleFavorite">
        <span class="btn-icon">{{ isFavorited ? '❤️' : '🤍' }}</span>
        <span class="btn-text">{{ isFavorited ? '已收藏' : '收藏' }}</span>
      </button>
      <button class="action-btn primary" @click="handleShare">
        <span class="btn-icon">🔗</span>
        <span class="btn-text">分享</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isFavorited = ref(false)

const knowledgeDetail = ref({
  id: '',
  title: '',
  category: '',
  content: '',
  createdAt: '',
  views: 0
})

const relatedKnowledge = ref([
  { id: 'r1', title: '中医体质辨识方法' },
  { id: 'r2', title: '中医食疗养生指南' },
  { id: 'r3', title: '中药配伍禁忌' }
])

const fetchKnowledgeDetail = () => {
  const id = route.params.id as string
  
  knowledgeDetail.value = {
    id: id,
    title: '中医体质辨识方法',
    category: '中医基础理论',
    content: `
      <h2>一、什么是中医体质辨识</h2>
      <p>中医体质辨识是中医诊断的重要组成部分，通过望闻问切等方法，判断人体的体质类型，为个性化养生和治疗提供依据。</p>
      
      <h2>二、中医体质的分类</h2>
      <p>根据中医理论，人体体质主要分为以下九种：</p>
      
      <h3>1. 平和质</h3>
      <p>体质平和，阴阳平衡，身体健康，面色红润，精力充沛。</p>
      
      <h3>2. 阳虚质</h3>
      <p>畏寒怕冷，手脚冰凉，面色苍白，喜热饮，大便稀溏。</p>
      
      <h3>3. 阴虚质</h3>
      <p>怕热多汗，口干咽燥，手足心热，大便干结，舌红少苔。</p>
      
      <h3>4. 痰湿质</h3>
      <p>体型肥胖，腹部肥满，胸闷痰多，肢体沉重，舌苔厚腻。</p>
      
      <h3>5. 湿热质</h3>
      <p>面部油腻，口苦口臭，大便黏滞，小便短黄，易生痤疮。</p>
      
      <h3>6. 血瘀质</h3>
      <p>面色晦暗，口唇紫暗，皮肤瘀斑，月经不调，舌质紫暗。</p>
      
      <h3>7. 气郁质</h3>
      <p>情绪抑郁，焦虑易怒，胸闷叹气，失眠多梦，善太息。</p>
      
      <h3>8. 特禀质</h3>
      <p>过敏体质，易患过敏性疾病，如过敏性鼻炎、哮喘等。</p>
      
      <h3>9. 气虚质</h3>
      <p>气短乏力，容易疲劳，精神不振，容易感冒，舌淡苔白。</p>
      
      <h2>三、体质辨识的方法</h2>
      <p>中医体质辨识主要通过以下几个方面进行：</p>
      <ul>
        <li><strong>望诊：</strong>观察面色、舌苔、体型等</li>
        <li><strong>问诊：</strong>询问饮食、睡眠、二便等情况</li>
        <li><strong>切诊：</strong>通过脉象判断体质</li>
      </ul>
      
      <h2>四、体质养生建议</h2>
      <p>根据不同体质，采取相应的养生方法：</p>
      <ul>
        <li><strong>阳虚质：</strong>多吃温热食物，适当锻炼，避免寒凉</li>
        <li><strong>阴虚质：</strong>多吃滋阴食物，避免辛辣燥热</li>
        <li><strong>痰湿质：</strong>清淡饮食，加强运动，化痰祛湿</li>
        <li><strong>气虚质：</strong>补气健脾，适度锻炼，避免劳累</li>
      </ul>
    `,
    createdAt: '2024-05-20',
    views: 1256
  }
}

const goBack = () => {
  router.back()
}

const goToDetail = (id: string) => {
  router.push(`/knowledge/detail/${id}`)
}

const handleFavorite = () => {
  isFavorited.value = !isFavorited.value
  alert(isFavorited.value ? '已收藏' : '已取消收藏')
}

const handleShare = () => {
  alert('分享链接已复制')
}

onMounted(() => {
  fetchKnowledgeDetail()
})
</script>

<style scoped>
.knowledge-detail-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 100px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.back-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
}

.detail-title {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.detail-content {
  margin: 16px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.category-badge {
  display: inline-block;
  padding: 4px 12px;
  background: #faf6f1;
  border-radius: 12px;
  font-size: 12px;
  color: #c19660;
  margin-bottom: 16px;
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

.content-body ul {
  margin: 0 0 12px 0;
  padding-left: 24px;
}

.content-body li {
  margin-bottom: 8px;
}

.content-body strong {
  color: #c19660;
}

.content-meta {
  display: flex;
  gap: 16px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.meta-item {
  font-size: 13px;
  color: #999;
}

.related-section {
  margin: 0 16px 16px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.related-item {
  padding: 12px;
  background: #fafafa;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.related-item:active {
  background: #f0f0f0;
}

.related-title {
  font-size: 14px;
  color: #333;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  background: #f5f5f5;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
}

.action-btn.primary {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
}

.btn-icon {
  font-size: 18px;
}

.btn-text {
  font-size: 15px;
}
</style>