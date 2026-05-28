<template>
  <div class="topics-page">
    <div class="page-header">
      <h1 class="page-title">专题学习</h1>
      <p class="page-subtitle">系统学习中医知识</p>
    </div>
    
    <div class="topics-content">
      <div class="filter-tabs">
        <button 
          v-for="tab in filterTabs" 
          :key="tab.key"
          class="filter-tab"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <div class="topics-list">
        <div 
          v-for="topic in topics" 
          :key="topic.id" 
          class="topic-card"
          @click="goToTopicDetail(topic.id)"
        >
          <div class="topic-cover">
            <img :src="topic.coverImage" :alt="topic.title" />
            <div class="topic-badge">{{ topic.category }}</div>
          </div>
          <div class="topic-info">
            <h3 class="topic-title">{{ topic.title }}</h3>
            <p class="topic-desc">{{ topic.description }}</p>
            <div class="topic-meta">
              <span class="meta-item">📚 {{ topic.books.length }}本书</span>
              <span class="meta-item">🎬 {{ topic.videos.length }}个视频</span>
              <span class="meta-item">🎧 {{ topic.audios.length }}个音频</span>
            </div>
            <div class="topic-progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: topic.progress + '%' }"></div>
              </div>
              <span class="progress-text">已学习 {{ topic.progress }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('all')
const filterTabs = [
  { key: 'all', label: '全部' },
  { key: 'basic', label: '基础理论' },
  { key: 'diagnosis', label: '诊断学' },
  { key: 'herb', label: '中药学' },
  { key: 'prescription', label: '方剂学' }
]

const topics = ref([
  {
    id: '1',
    title: '中医基础理论入门',
    description: '系统学习中医基础理论，包括阴阳五行、脏腑经络、气血津液等核心概念',
    coverImage: 'https://via.placeholder.com/375x200/8b7355/ffffff?text=中医基础',
    category: '基础理论',
    books: [1, 2, 3],
    videos: [1, 2, 3, 4, 5],
    audios: [1, 2],
    progress: 45
  },
  {
    id: '2',
    title: '中医诊断学精讲',
    description: '掌握望闻问切四诊方法，学习辨证论治的基本思路',
    coverImage: 'https://via.placeholder.com/375x200/c19660/ffffff?text=中医诊断',
    category: '诊断学',
    books: [1, 2],
    videos: [1, 2, 3, 4],
    audios: [1, 2, 3],
    progress: 20
  },
  {
    id: '3',
    title: '中药学基础',
    description: '学习常用中药的性味归经、功效主治及配伍应用',
    coverImage: 'https://via.placeholder.com/375x200/d4a574/ffffff?text=中药学',
    category: '中药学',
    books: [1, 2, 3, 4],
    videos: [1, 2, 3, 4, 5, 6],
    audios: [1, 2, 3, 4],
    progress: 60
  },
  {
    id: '4',
    title: '方剂学详解',
    description: '深入学习经典方剂的组成、功效、主治及临床应用',
    coverImage: 'https://via.placeholder.com/375x200/a67c52/ffffff?text=方剂学',
    category: '方剂学',
    books: [1, 2, 3],
    videos: [1, 2, 3, 4, 5],
    audios: [1, 2, 3],
    progress: 10
  }
])

const goToTopicDetail = (id: string) => {
  router.push(`/topics/${id}`)
}
</script>

<style scoped>
.topics-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  padding: 40px 16px;
  color: #fff;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
}

.topics-content {
  padding: 16px;
}

.filter-tabs {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-tab {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  font-size: 13px;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-tab.active {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
}

.topics-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.topic-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.topic-cover {
  position: relative;
  height: 160px;
}

.topic-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.topic-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 12px;
  border-radius: 12px;
}

.topic-info {
  padding: 16px;
}

.topic-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.topic-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.topic-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.meta-item {
  font-size: 13px;
  color: #999;
}

.topic-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #d4a574 0%, #c19660 100%);
  border-radius: 3px;
  transition: width 0.3s;
}

.progress-text {
  font-size: 12px;
  color: #c19660;
  font-weight: 500;
}
</style>