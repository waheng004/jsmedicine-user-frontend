<template>
  <div class="favorites-page">
    <div class="page-header">
      <h1 class="page-title">我的收藏</h1>
    </div>
    
    <div class="tabs-container">
      <button 
        v-for="tab in tabs" 
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <div class="favorites-content">
      <div v-if="favorites[activeTab].length === 0" class="empty-state">
        <div class="empty-icon">{{ getEmptyIcon() }}</div>
        <p>{{ getEmptyText() }}</p>
      </div>
      
      <div v-else class="favorites-list">
        <div 
          v-for="item in favorites[activeTab]" 
          :key="item.id"
          class="favorite-item"
          @click="goToDetail(item)"
        >
          <div class="item-cover">
            <img v-if="item.cover" :src="item.cover" :alt="item.title" />
            <span v-else class="cover-icon">{{ getCoverIcon() }}</span>
          </div>
          <div class="item-info">
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-desc">{{ item.description }}</p>
            <span class="item-date">{{ item.date }}</span>
          </div>
          <button class="delete-btn" @click.stop="removeFavorite(item)">✕</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('articles')

const tabs = [
  { key: 'articles', label: '资讯' },
  { key: 'topics', label: '专题' },
  { key: 'knowledge', label: '知识' }
]

const favorites = ref({
  articles: [
    {
      id: '1',
      title: '春季养肝正当时',
      description: '春季如何通过饮食和作息调理肝脏...',
      cover: 'https://via.placeholder.com/120x80/d4a574/ffffff?text=养生',
      date: '2024-05-20',
      type: 'article'
    },
    {
      id: '2',
      title: '中医茶饮养生',
      description: '不同体质适合的茶饮推荐...',
      cover: 'https://via.placeholder.com/120x80/c19660/ffffff?text=茶饮',
      date: '2024-05-18',
      type: 'article'
    }
  ],
  topics: [
    {
      id: '1',
      title: '中医基础理论入门',
      description: '系统学习中医基础理论...',
      cover: 'https://via.placeholder.com/120x80/8b7355/ffffff?text=基础',
      date: '2024-05-15',
      type: 'topic'
    }
  ],
  knowledge: [
    {
      id: '1',
      title: '中医体质辨识方法',
      description: '中医体质的分类和辨识方法...',
      cover: '',
      date: '2024-05-20',
      type: 'knowledge'
    }
  ]
})

const getEmptyIcon = () => {
  const icons: Record<string, string> = {
    articles: '📰',
    topics: '📚',
    knowledge: '📖'
  }
  return icons[activeTab.value] || '📭'
}

const getEmptyText = () => {
  const texts: Record<string, string> = {
    articles: '暂无收藏的资讯',
    topics: '暂无收藏的专题',
    knowledge: '暂无收藏的知识'
  }
  return texts[activeTab.value] || '暂无收藏'
}

const getCoverIcon = () => {
  const icons: Record<string, string> = {
    articles: '📰',
    topics: '📚',
    knowledge: '📖'
  }
  return icons[activeTab.value] || '📄'
}

const goToDetail = (item: any) => {
  if (item.type === 'article') {
    router.push(`/articles/detail/${item.id}`)
  } else if (item.type === 'topic') {
    router.push(`/topics/${item.id}`)
  } else if (item.type === 'knowledge') {
    router.push(`/knowledge/detail/${item.id}`)
  }
}

const removeFavorite = (item: any) => {
  if (confirm(`确定要取消收藏"${item.title}"吗？`)) {
    const list = favorites.value[activeTab.value]
    const index = list.findIndex((i: any) => i.id === item.id)
    if (index > -1) {
      list.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.favorites-page {
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
  margin: 0;
}

.tabs-container {
  display: flex;
  padding: 8px 16px;
  background: #fff;
  gap: 8px;
}

.tab-btn {
  flex: 1;
  padding: 12px;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
}

.favorites-content {
  padding: 16px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state p {
  color: #999;
  font-size: 14px;
}

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.favorite-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.item-cover {
  width: 100px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-icon {
  font-size: 32px;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.item-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0 0 6px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-desc {
  font-size: 13px;
  color: #666;
  margin: 0 0 6px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-date {
  font-size: 12px;
  color: #999;
}

.delete-btn {
  padding: 8px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  transition: all 0.3s;
}

.delete-btn:hover {
  background: #ffebee;
  color: #f44336