<template>
  <div class="topic-detail-page">
    <div class="topic-header">
      <img :src="topicDetail.coverImage" :alt="topicDetail.title" class="topic-banner" />
      <div class="topic-overlay">
        <div class="topic-badge">{{ topicDetail.category }}</div>
        <h1 class="topic-title">{{ topicDetail.title }}</h1>
        <p class="topic-desc">{{ topicDetail.description }}</p>
      </div>
    </div>
    
    <div class="learning-requirements">
      <div class="requirement-card">
        <h3 class="requirement-title">📋 学习要求</h3>
        <p class="requirement-content">{{ topicDetail.requirements }}</p>
      </div>
    </div>
    
    <div class="content-tabs">
      <button 
        v-for="tab in contentTabs" 
        :key="tab.key"
        class="content-tab"
        :class="{ active: activeContentTab === tab.key }"
        @click="activeContentTab = tab.key"
      >
        {{ tab.label }}
        <span class="tab-count">{{ tab.count }}</span>
      </button>
    </div>
    
    <div class="content-list">
      <div v-if="activeContentTab === 'books'" class="books-list">
        <div 
          v-for="book in topicDetail.books" 
          :key="book.id" 
          class="book-item"
          @click="openBook(book.id)"
        >
          <div class="book-cover">📖</div>
          <div class="book-info">
            <h4 class="book-title">{{ book.title }}</h4>
            <p class="book-author">{{ book.author }}</p>
            <div class="book-meta">
              <span class="book-pages">{{ book.pages }}页</span>
              <span class="book-status" :class="book.status">{{ book.status }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="activeContentTab === 'videos'" class="videos-list">
        <div 
          v-for="video in topicDetail.videos" 
          :key="video.id" 
          class="video-item"
          @click="playVideo(video.id)"
        >
          <div class="video-cover">
            <span class="video-icon">▶️</span>
            <span class="video-duration">{{ video.duration }}</span>
          </div>
          <div class="video-info">
            <h4 class="video-title">{{ video.title }}</h4>
            <p class="video-desc">{{ video.description }}</p>
            <div class="video-meta">
              <span class="video-playcount">👁️ {{ video.playCount }}次播放</span>
              <span class="video-status" :class="video.status">{{ video.status }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="activeContentTab === 'audios'" class="audios-list">
        <div 
          v-for="audio in topicDetail.audios" 
          :key="audio.id" 
          class="audio-item"
          @click="playAudio(audio.id)"
        >
          <div class="audio-cover">🎧</div>
          <div class="audio-info">
            <h4 class="audio-title">{{ audio.title }}</h4>
            <p class="audio-desc">{{ audio.description }}</p>
            <div class="audio-meta">
              <span class="audio-duration">{{ audio.duration }}</span>
              <span class="audio-status" :class="audio.status">{{ audio.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bottom-bar">
      <button class="action-btn secondary" @click="goBack">
        ← 返回列表
      </button>
      <button class="action-btn primary" @click="startLearning">
        🎯 开始学习
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeContentTab = ref('videos')

const topicDetail = ref({
  id: '',
  title: '',
  description: '',
  coverImage: '',
  category: '',
  requirements: '',
  books: [],
  videos: [],
  audios: []
})

const contentTabs = computed(() => [
  { key: 'books', label: '图书', count: topicDetail.value.books.length },
  { key: 'videos', label: '视频', count: topicDetail.value.videos.length },
  { key: 'audios', label: '音频', count: topicDetail.value.audios.length }
])

const fetchTopicDetail = () => {
  const id = route.params.id as string
  
  topicDetail.value = {
    id: id,
    title: '中医基础理论入门',
    description: '系统学习中医基础理论，包括阴阳五行、脏腑经络、气血津液等核心概念',
    coverImage: 'https://via.placeholder.com/600x300/8b7355/ffffff?text=中医基础理论',
    category: '基础理论',
    requirements: '1. 具备一定的中医基础知识\n2. 每天保证30分钟学习时间\n3. 完成所有视频和音频学习\n4. 通过最终考核',
    books: [
      { id: '1', title: '中医基础理论', author: '孙广仁', pages: 320, status: '未开始' },
      { id: '2', title: '中医入门', author: '秦伯未', pages: 280, status: '未开始' },
      { id: '3', title: '中医学基础', author: '张登本', pages: 450, status: '未开始' }
    ],
    videos: [
      { id: '1', title: '第1讲：中医基础理论概述', description: '介绍中医基础理论的发展历程和核心思想', duration: '25:30', playCount: 1256, status: '未观看' },
      { id: '2', title: '第2讲：阴阳学说', description: '深入讲解阴阳的概念、属性和应用', duration: '32:15', playCount: 980, status: '未观看' },
      { id: '3', title: '第3讲：五行学说', description: '讲解五行的特性、生克关系及临床应用', duration: '28:45', playCount: 856, status: '未观看' },
      { id: '4', title: '第4讲：脏腑学说（上）', description: '介绍五脏的生理功能和病理特点', duration: '35:20', playCount: 723, status: '未观看' },
      { id: '5', title: '第5讲：脏腑学说（下）', description: '介绍六腑的生理功能和脏腑关系', duration: '30:10', playCount: 689, status: '未观看' }
    ],
    audios: [
      { id: '1', title: '中医基础理论导论', description: '中医基础理论的基本概念和学习方法', duration: '15:00', status: '未收听' },
      { id: '2', title: '阴阳五行学说详解', description: '阴阳五行学说的核心内容解读', duration: '20:30', status: '未收听' }
    ]
  }
}

const openBook = (id: string) => {
  alert(`打开图书：${id}`)
}

const playVideo = (id: string) => {
  alert(`播放视频：${id}`)
}

const playAudio = (id: string) => {
  alert(`播放音频：${id}`)
}

const goBack = () => {
  router.back()
}

const startLearning = () => {
  if (topicDetail.value.videos.length > 0) {
    playVideo(topicDetail.value.videos[0].id)
  }
}

onMounted(() => {
  fetchTopicDetail()
})
</script>

<style scoped>
.topic-detail-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 100px;
}

.topic-header {
  position: relative;
  height: 200px;
}

.topic-banner {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.topic-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: #fff;
}

.topic-badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: 8px;
}

.topic-title {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.topic-desc {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.learning-requirements {
  padding: 16px;
}

.requirement-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.requirement-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.requirement-content {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
}

.content-tabs {
  display: flex;
  padding: 0 16px;
  gap: 8px;
  margin-bottom: 16px;
}

.content-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px;
  background: #fff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.content-tab.active {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
}

.tab-count {
  font-size: 12px;
  padding: 2px 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.content-tab.active .tab-count {
  background: rgba(255, 255, 255, 0.2);
}

.content-list {
  padding: 0 16px;
}

.books-list, .videos-list, .audios-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.book-item, .video-item, .audio-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.book-cover, .audio-cover {
  width: 60px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #faf6f1;
  border-radius: 8px;
  font-size: 32px;
  flex-shrink: 0;
}

.video-cover {
  width: 120px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #faf6f1;
  border-radius: 8px;
  position: relative;
  flex-shrink: 0;
}

.video-icon {
  font-size: 28px;
}

.video-duration {
  position: absolute;
  bottom: 6px;
  right: 6px;
  padding: 2px 6px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 11px;
  border-radius: 4px;
}

.book-info, .video-info, .audio-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.book-title, .video-title, .audio-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.book-author {
  font-size: 13px;
  color: #999;
  margin: 0 0 8px 0;
}

.video-desc, .audio-desc {
  font-size: 13px;
  color: #666;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-meta, .video-meta, .audio-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-pages, .video-playcount, .audio-duration {
  font-size: 12px;
  color: #999;
}

.book-status, .video-status, .audio-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 8px;
}

.book-status.未开始, .video-status.未观看, .audio-status.未收听 {
  background: #f0f0f0;
  color: #999;
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
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn.secondary {
  background: #f5f5f5;
  color: #666;
}

.action-btn.primary {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(193, 150, 96, 0.3);
}
</style>