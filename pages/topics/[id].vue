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
          <div h-48 rounded-xl overflow-hidden mb-6>
            <img :src="topicDetail.coverImage" :alt="topicDetail.title" w-full h-full object-cover />
          </div>
          <div flex items-center gap-3 mb-3>
            <span px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full>{{ topicDetail.category }}</span>
          </div>
          <h1 text-2xl font-bold text-gray-900 mb-3>{{ topicDetail.title }}</h1>
          <p text-gray-600>{{ topicDetail.description }}</p>
        </div>

        <div grid grid-cols-3 gap-8>
          <div col-span-2>
            <div bg-white rounded-xl shadow-sm p-6 mb-6>
              <h3 text-lg font-bold text-gray-900 mb-4>📋 学习要求</h3>
              <p text-gray-600 whitespace-pre-wrap>{{ topicDetail.requirements }}</p>
            </div>

            <div flex gap-4 mb-6>
              <button v-for="tab in contentTabs" :key="tab.key" px-6 py-3 rounded-xl font-medium cursor-pointer transition-all flex items-center gap-2 :class="activeContentTab === tab.key ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'" @click="activeContentTab = tab.key">
                {{ tab.label }}
                <span px-2 py-0.5 bg-white rounded-full text-xs>{{ tab.count }}</span>
              </button>
            </div>

            <div bg-white rounded-xl shadow-sm p-6>
              <div v-if="activeContentTab === 'books'" class="space-y-4">
                <div v-for="book in topicDetail.books" :key="book.id" flex gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-amber-50 transition-colors @click="openBook(book.id)">
                  <div w-14 h-20 bg-amber-100 rounded-lg flex items-center justify-center text-3xl>📖</div>
                  <div flex-1>
                    <h4 text-base font-bold text-gray-900 mb-1>{{ book.title }}</h4>
                    <p text-sm text-gray-500 mb-2>{{ book.author }}</p>
                    <div flex justify-between items-center>
                      <span text-xs text-gray-400>{{ book.pages }}页</span>
                      <span text-xs px-2 py-1 rounded-full :class="book.status === '未开始' ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-600'">{{ book.status }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="activeContentTab === 'videos'" class="space-y-4">
                <div v-for="video in topicDetail.videos" :key="video.id" flex gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-amber-50 transition-colors @click="playVideo(video.id)">
                  <div w-32 h-18 bg-amber-100 rounded-lg flex items-center justify-center relative>
                    <span text-2xl>▶️</span>
                    <span absolute bottom-1 right-1 px-1.5 py-0.5 bg-black text-white text-xs rounded>{{ video.duration }}</span>
                  </div>
                  <div flex-1>
                    <h4 text-base font-bold text-gray-900 mb-1>{{ video.title }}</h4>
                    <p text-sm text-gray-600 mb-2 line-clamp-2>{{ video.description }}</p>
                    <div flex justify-between items-center>
                      <span text-xs text-gray-400>👁️ {{ video.playCount }}次播放</span>
                      <span text-xs px-2 py-1 rounded-full :class="video.status === '未观看' ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-600'">{{ video.status }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="activeContentTab === 'audios'" class="space-y-4">
                <div v-for="audio in topicDetail.audios" :key="audio.id" flex gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-amber-50 transition-colors @click="playAudio(audio.id)">
                  <div w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-2xl>🎧</div>
                  <div flex-1>
                    <h4 text-base font-bold text-gray-900 mb-1>{{ audio.title }}</h4>
                    <p text-sm text-gray-600 mb-2 line-clamp-2>{{ audio.description }}</p>
                    <div flex justify-between items-center>
                      <span text-xs text-gray-400>{{ audio.duration }}</span>
                      <span text-xs px-2 py-1 rounded-full :class="audio.status === '未收听' ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-600'">{{ audio.status }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div space-y-6>
            <div bg-white rounded-xl shadow-sm p-6>
              <h3 text-base font-bold text-gray-900 mb-4>📊 学习进度</h3>
              <div mb-4>
                <div flex justify-between text-sm mb-2>
                  <span text-gray-600>总体进度</span>
                  <span text-amber-600 font-medium>{{ progress }}%</span>
                </div>
                <div h-3 bg-gray-100 rounded-full overflow-hidden>
                  <div h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full :style="{ width: progress + '%' }"></div>
                </div>
              </div>
              <div space-y-3>
                <div flex justify-between text-sm>
                  <span text-gray-600>视频学习</span>
                  <span text-gray-900>0/{{ topicDetail.videos.length }}</span>
                </div>
                <div flex justify-between text-sm>
                  <span text-gray-600>音频学习</span>
                  <span text-gray-900>0/{{ topicDetail.audios.length }}</span>
                </div>
                <div flex justify-between text-sm>
                  <span text-gray-600>图书阅读</span>
                  <span text-gray-900>0/{{ topicDetail.books.length }}</span>
                </div>
              </div>
            </div>

            <div flex gap-4>
              <button flex-1 py-3 bg-gray-100 text-gray-600 font-semibold rounded-xl cursor-pointer hover:bg-gray-200 @click="goBack">← 返回列表</button>
              <button flex-1 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl cursor-pointer hover:opacity-90 @click="startLearning">🎯 开始学习</button>
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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Book {
  id: string
  title: string
  author: string
  pages: number
  status: string
}

interface Video {
  id: string
  title: string
  description: string
  duration: string
  playCount: number
  status: string
}

interface Audio {
  id: string
  title: string
  description: string
  duration: string
  status: string
}

interface TopicDetail {
  id: string
  title: string
  description: string
  coverImage: string
  category: string
  requirements: string
  books: Book[]
  videos: Video[]
  audios: Audio[]
}

const route = useRoute()
const router = useRouter()

const activeContentTab = ref('videos')

const topicDetail = ref<TopicDetail>({
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

const progress = computed(() => {
  const total = topicDetail.value.books.length + topicDetail.value.videos.length + topicDetail.value.audios.length
  return total > 0 ? Math.round((0 / total) * 100) : 0
})

const fetchTopicDetail = () => {
  const id = route.params.id as string

  topicDetail.value = {
    id: id,
    title: '中医基础理论入门',
    description: '系统学习中医基础理论，包括阴阳五行、脏腑经络、气血津液等核心概念',
    coverImage: 'https://via.placeholder.com/800x200/8b7355/ffffff?text=中医基础理论',
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
