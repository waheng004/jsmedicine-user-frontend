<template>
  <div class="app-layout">
    <header class="app-header">
      <button v-if="showBack" class="back-btn" @click="goBack">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="header-title">{{ pageTitle }}</h1>
      <div class="header-right"></div>
    </header>
    
    <main class="app-main">
      <slot />
    </main>
    
    <nav class="tab-bar">
      <router-link 
        v-for="tab in tabs" 
        :key="tab.path"
        :to="tab.path"
        class="tab-item"
        :class="{ active: isActive(tab.path) }"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = [
  { path: '/', icon: '🏠', label: '首页' },
  { path: '/discover', icon: '🔍', label: '发现' },
  { path: '/message', icon: '💬', label: '消息' },
  { path: '/profile', icon: '👤', label: '我的' }
]

const pageTitle = computed(() => {
  const tab = tabs.find(t => t.path === route.path)
  return tab ? tab.label : '中医诊疗'
})

const showBack = computed(() => {
  return !tabs.some(t => t.path === route.path)
})

const isActive = (path: string) => {
  return route.path === path
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  max-width: 768px;
  margin: 0 auto;
  position: relative;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: #fff;
  cursor: pointer;
  padding: 0;
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.header-right {
  width: 36px;
}

.app-main {
  flex: 1;
  padding: 16px;
  padding-bottom: 80px;
  overflow-y: auto;
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 768px;
  display: flex;
  background: #fff;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  text-decoration: none;
  color: #999;
  transition: all 0.3s;
}

.tab-item.active {
  color: #c19660;
}

.tab-icon {
  font-size: 24px;
  line-height: 1;
  margin-bottom: 4px;
}

.tab-label {
  font-size: 12px;
  line-height: 1;
}
</style>
