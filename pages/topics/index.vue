<template>
  <div min-h-screen bg-gray-50>
    <header fixed top-0 left-0 right-0 h-16 bg-white z-50 border-b border-gray-100 shadow-sm>
      <div max-w-7xl mx-auto h-full flex justify-between items-center px-6>
        <div flex items-center space-x-3>
          <span text-2xl>🏥</span>
          <span text-xl font-bold text-amber-900>江苏中医在线</span>
        </div>
        <nav flex space-x-8 text-base>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/')">首页</span>
          <span cursor-pointer text-amber-800 font-bold>专题学习</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/exam')">在线考核</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/profile')">我的</span>
        </nav>
        <div></div>
      </div>
    </header>

    <main pt-16>
      <div max-w-7xl mx-auto px-6 py-8>
        <div mb-8>
          <h1 text-2xl font-bold text-gray-900 mb-2>专题学习</h1>
          <p text-gray-500>系统学习中医知识，提升专业技能</p>
        </div>

        <div flex gap-3 mb-8 p-1 bg-white rounded-xl shadow-sm w-fit>
          <button v-for="tab in filterTabs" :key="tab.key" px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer :class="activeTab === tab.key ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'" @click="activeTab = tab.key">{{ tab.label }}</button>
        </div>

        <div grid grid-cols-2 gap-6>
          <div v-for="topic in topics" :key="topic.id" bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer @click="$router.push(`/topics/${topic.id}`)">
            <div relative :class="topic.coverBg" h-48 flex items-center justify-center>
              <span text-6xl opacity-80>{{ topic.icon }}</span>
              <span absolute top-4 left-4 bg-black bg-opacity-50 text-white text-xs px-3 py-1 rounded-full>{{ topic.category }}</span>
            </div>
            <div p-6>
              <h3 text-lg font-bold text-gray-900 mb-2>{{ topic.title }}</h3>
              <p text-sm text-gray-500 mb-4 line-clamp-2>{{ topic.description }}</p>

              <div flex items-center gap-4 mb-4>
                <span text-sm text-gray-400>📚 {{ topic.books }}本书</span>
                <span text-sm text-gray-400>🎬 {{ topic.videos }}个视频</span>
                <span text-sm text-gray-400>🎧 {{ topic.audios }}个音频</span>
              </div>

              <div v-if="topic.progress > 0">
                <div flex justify-between items-center mb-2>
                  <span text-xs text-gray-500>学习进度</span>
                  <span text-xs text-amber-600 font-medium>{{ topic.progress }}%</span>
                </div>
                <div h-2 bg-gray-100 rounded-full overflow-hidden>
                  <div :class="topic.progressBarBg" h-full rounded-full transition-all :style="{ width: topic.progress + '%' }"></div>
                </div>
              </div>
              <div v-else flex justify-end>
                <span text-sm text-amber-600 font-medium>开始学习 →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer bg-gray-800 text-gray-300 mt-16>
      <div max-w-7xl mx-auto px-6 py-8>
        <div text-center>
          <p text-sm>© 2022 江苏凤凰优阅信息科技有限公司 版权所有</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
    category: '基础理论',
    icon: '📖',
    coverBg: 'bg-gradient-to-br from-amber-600 to-amber-800',
    progressBarBg: 'bg-gradient-to-r from-amber-500 to-amber-600',
    books: 3,
    videos: 5,
    audios: 2,
    progress: 45
  },
  {
    id: '2',
    title: '中医诊断学精讲',
    description: '掌握望闻问切四诊方法，学习辨证论治的基本思路',
    category: '诊断学',
    icon: '🔍',
    coverBg: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
    progressBarBg: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    books: 2,
    videos: 4,
    audios: 3,
    progress: 20
  },
  {
    id: '3',
    title: '中药学基础',
    description: '学习常用中药的性味归经、功效主治及配伍应用',
    category: '中药学',
    icon: '🌿',
    coverBg: 'bg-gradient-to-br from-green-600 to-green-800',
    progressBarBg: 'bg-gradient-to-r from-green-500 to-green-600',
    books: 4,
    videos: 6,
    audios: 4,
    progress: 60
  },
  {
    id: '4',
    title: '方剂学详解',
    description: '深入学习经典方剂的组成、功效、主治及临床应用',
    category: '方剂学',
    icon: '🏺',
    coverBg: 'bg-gradient-to-br from-blue-600 to-blue-800',
    progressBarBg: 'bg-gradient-to-r from-blue-500 to-blue-600',
    books: 3,
    videos: 5,
    audios: 3,
    progress: 10
  }
])
</script>
