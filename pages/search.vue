<template>
  <div class="search-page">
    <div class="search-header">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          ref="searchInput"
          v-model="searchKeyword"
          type="text" 
          class="search-input" 
          placeholder="搜索医生、科室或病症"
          @input="handleSearch"
        />
        <button v-if="searchKeyword" class="clear-btn" @click="clearSearch">
          ✕
        </button>
      </div>
      <button class="cancel-btn" @click="goBack">取消</button>
    </div>

    <div v-if="!searchKeyword && !isSearching" class="search-content">
      <div v-if="searchHistory.length > 0" class="history-section">
        <div class="section-header">
          <h3 class="section-title">搜索历史</h3>
          <button class="clear-history" @click="clearHistory">清空</button>
        </div>
        <div class="history-tags">
          <span 
            v-for="(keyword, index) in searchHistory" 
            :key="index"
            class="history-tag"
            @click="handleHistoryClick(keyword)"
          >
            {{ keyword }}
          </span>
        </div>
      </div>

      <div class="hot-section">
        <h3 class="section-title">热门搜索</h3>
        <div class="hot-list">
          <div 
            v-for="(item, index) in hotSearch" 
            :key="index"
            class="hot-item"
            @click="handleHistoryClick(item.keyword)"
          >
            <span class="hot-rank" :class="{ top: index < 3 }">{{ index + 1 }}</span>
            <span class="hot-keyword">{{ item.keyword }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="isSearching" class="loading-state">
      <div class="loading-spinner"></div>
      <p>搜索中...</p>
    </div>

    <div v-else-if="searchResults.length > 0" class="results-section">
      <div class="results-tabs">
        <button 
          class="result-tab"
          :class="{ active: resultTab === 'doctors' }"
          @click="resultTab = 'doctors'"
        >
          医生
        </button>
        <button 
          class="result-tab"
          :class="{ active: resultTab === 'plans' }"
          @click="resultTab = 'plans'"
        >
          调理方案
        </button>
      </div>

      <div class="results-list">
        <DoctorCard 
          v-if="resultTab === 'doctors'"
          v-for="doctor in searchResults" 
          :key="doctor.id" 
          :doctor="doctor"
        />
        
        <div 
          v-if="resultTab === 'plans'"
          v-for="plan in treatmentPlans" 
          :key="plan.id" 
          class="plan-card"
        >
          <h4 class="plan-title">{{ plan.title }}</h4>
          <p class="plan-desc">{{ plan.description }}</p>
          <div class="plan-tags">
            <span v-for="tag in plan.tags" :key="tag" class="plan-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">🔍</div>
      <p class="empty-text">未找到相关结果</p>
      <p class="empty-hint">试试其他关键词</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DoctorCard from '~/components/DoctorCard.vue'
import { useCommonStore } from '~/stores/common'
import { useApi } from '~/composables/useApi'

const router = useRouter()
const commonStore = useCommonStore()

const searchInput = ref<HTMLInputElement | null>(null)
const searchKeyword = ref('')
const isSearching = ref(false)
const searchResults = ref<any[]>([])
const treatmentPlans = ref<any[]>([])
const resultTab = ref<'doctors' | 'plans'>('doctors')

const searchHistory = ref<string[]>([])
const hotSearch = ref([
  { keyword: '三伏贴' },
  { keyword: '针灸调理' },
  { keyword: '中医减肥' },
  { keyword: '颈椎病' },
  { keyword: '月经不调' },
  { keyword: '失眠调理' }
])

let debounceTimer: any = null

const handleSearch = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  
  debounceTimer = setTimeout(async () => {
    if (searchKeyword.value.trim()) {
      await performSearch(searchKeyword.value)
    } else {
      searchResults.value = []
      treatmentPlans.value = []
    }
  }, 500)
}

const performSearch = async (keyword: string) => {
  isSearching.value = true
  
  try {
    const response = await useApi('/api/search', {
      method: 'POST',
      body: { keyword }
    })
    
    if (response.data) {
      searchResults.value = response.data.doctors || []
      treatmentPlans.value = response.data.plans || []
    }
  } catch (err) {
    console.error('搜索失败:', err)
    searchResults.value = getMockDoctors(keyword)
    treatmentPlans.value = getMockPlans(keyword)
  } finally {
    isSearching.value = false
  }
}

const getMockDoctors = (keyword: string) => {
  return [
    {
      id: 1,
      name: '刘明中医师',
      avatar: 'https://via.placeholder.com/80x80/d4a574/ffffff?text=刘',
      title: '主治医师',
      department: '中医内科',
      specialty: `擅长${keyword}等疾病的诊治`,
      rating: 4.8,
      status: '可预约'
    }
  ]
}

const getMockPlans = (keyword: string) => {
  return [
    {
      id: 1,
      title: `${keyword}调理方案`,
      description: `针对${keyword}的专业中医调理方案，采用中药、针灸、推拿等综合疗法`,
      tags: ['14天疗程', '中医调理', '个性化方案']
    }
  ]
}

const handleHistoryClick = (keyword: string) => {
  searchKeyword.value = keyword
  performSearch(keyword)
}

const clearSearch = () => {
  searchKeyword.value = ''
  searchResults.value = []
  treatmentPlans.value = []
  searchInput.value?.focus()
}

const clearHistory = () => {
  commonStore.clearSearchHistory()
  searchHistory.value = []
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  commonStore.loadFromCookie()
  searchHistory.value = commonStore.searchHistory
  searchInput.value?.focus()
})
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.search-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #f5f5f5;
  border-radius: 20px;
}

.search-icon {
  font-size: 16px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  outline: none;
}

.search-input::placeholder {
  color: #999;
}

.clear-btn {
  padding: 4px;
  border: none;
  background: transparent;
  color: #999;
  font-size: 14px;
  cursor: pointer;
}

.cancel-btn {
  padding: 8px 4px;
  border: none;
  background: transparent;
  color: #666;
  font-size: 14px;
  cursor: pointer;
}

.search-content {
  padding: 16px;
}

.history-section {
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.clear-history {
  border: none;
  background: transparent;
  color: #c19660;
  font-size: 13px;
  cursor: pointer;
}

.history-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.history-tag {
  padding: 8px 16px;
  background: #fff;
  border-radius: 16px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.history-tag:active {
  background: #f0f0f0;
}

.hot-section {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.hot-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}

.hot-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.hot-item:last-child {
  border-bottom: none;
}

.hot-rank {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}

.hot-rank.top {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
}

.hot-keyword {
  font-size: 14px;
  color: #333;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0f0f0;
  border-top-color: #c19660;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  margin-top: 16px;
  color: #999;
  font-size: 14px;
}

.results-section {
  padding: 0 16px 16px;
}

.results-tabs {
  display: flex;
  gap: 8px;
  padding: 12px 0;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.result-tab {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 8px;
}

.result-tab.active {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.plan-card {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.plan-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.plan-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.6;
}

.plan-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.plan-tag {
  padding: 4px 10px;
  background: #faf6f1;
  border-radius: 12px;
  font-size: 12px;
  color: #c19660;
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

.empty-text {
  font-size: 16px;
  color: #333;
  margin: 0 0 8px 0;
}

.empty-hint {
  font-size: 14px;
  color: #999;
  margin: 0;
}
</style>
