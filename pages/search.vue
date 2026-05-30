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
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/topics')">专题学习</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/knowledge')">知识库</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/profile')">我的</span>
        </nav>
        <div></div>
      </div>
    </header>

    <main pt-16>
      <div max-w-7xl mx-auto px-6 py-8>
        <div mb-6>
          <h1 text-2xl font-bold text-gray-900 mb-2>搜索</h1>
          <p text-gray-500>搜索医生、科室或病症</p>
        </div>

        <div max-w-2xl mb-8>
          <div flex gap-4>
            <div flex-1 relative>
              <span absolute left-4 :top="1/2" :transform="`translateY(-50%)`" text-gray-400>🔍</span>
              <input v-model="searchKeyword" type="text" placeholder="搜索医生、科室或病症" w-full h-12 pl-12 pr-12 rounded-xl border border-gray-200 bg-white focus:border-amber-500 focus:outline-none @input="handleSearch" />
              <button v-if="searchKeyword" absolute right-4 :top="1/2" :transform="`translateY(-50%)`" text-gray-400 hover:text-gray-600 cursor-pointer @click="clearSearch">✕</button>
            </div>
            <button px-6 py-3 bg-amber-600 text-white rounded-xl font-medium cursor-pointer hover:bg-amber-700 @click="goBack">取消</button>
          </div>
        </div>

        <div max-w-2xl>
          <div v-if="!searchKeyword && !isSearching">
            <div v-if="searchHistory.length > 0" mb-8>
              <div flex justify-between items-center mb-4>
                <h3 text-base font-bold text-gray-900>搜索历史</h3>
                <button text-sm text-gray-500 hover:text-amber-600 cursor-pointer @click="clearHistory">清空</button>
              </div>
              <div flex flex-wrap gap-2>
                <span v-for="(keyword, index) in searchHistory" :key="index" px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full cursor-pointer hover:bg-amber-50 hover:text-amber-600 @click="handleHistoryClick(keyword)">{{ keyword }}</span>
              </div>
            </div>

            <div>
              <h3 text-base font-bold text-gray-900 mb-4>热门搜索</h3>
              <div class="space-y-3">
                <div v-for="(item, index) in hotSearch" :key="index" flex items-center gap-4 p-3 bg-white rounded-xl cursor-pointer hover:bg-amber-50 @click="handleHistoryClick(item.keyword)">
                  <span w-6 h-6 flex items-center justify-center rounded text-sm font-bold :class="index < 3 ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-500'">{{ index + 1 }}</span>
                  <span text-gray-900>{{ item.keyword }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="isSearching" class="text-center py-16">
            <span text-4xl mb-4 block>🔍</span>
            <p text-gray-500>搜索中...</p>
          </div>

          <div v-else>
            <div v-if="searchResults.length === 0" class="text-center py-16">
              <span text-4xl mb-4 block>📭</span>
              <p text-gray-500>未找到相关结果</p>
            </div>
            <div v-else class="space-y-4">
              <div v-for="result in searchResults" :key="result.id" p-5 bg-white rounded-xl shadow-sm cursor-pointer hover:bg-amber-50 @click="goToDetail(result)">
                <div flex items-center gap-4>
                  <div w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-2xl>{{ result.icon }}</div>
                  <div flex-1>
                    <h4 text-base font-bold text-gray-900 mb-1>{{ result.title }}</h4>
                    <p text-sm text-gray-600>{{ result.description }}</p>
                  </div>
                </div>
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

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchKeyword = ref('')
const isSearching = ref(false)
const searchHistory = ref(['中医养生', '失眠调理', '中医减肥'])
const searchResults = ref<any[]>([])

const hotSearch = ref([
  { keyword: '中医养生', count: 1256 },
  { keyword: '失眠调理', count: 980 },
  { keyword: '中医减肥', count: 856 },
  { keyword: '颈椎病', count: 723 },
  { keyword: '脾胃调理', count: 689 }
])

const handleSearch = () => {
  if (!searchKeyword.value) {
    searchResults.value = []
    return
  }
  isSearching.value = true
  setTimeout(() => {
    searchResults.value = [
      { id: '1', icon: '👨‍⚕️', title: '张仲景 主任医师', description: '中医内科 · 30年经验', type: 'doctor' },
      { id: '2', icon: '🏥', title: '中医科', description: '擅长调理各类慢性病', type: 'department' },
      { id: '3', icon: '📚', title: '中医养生指南', description: '收藏量 10万+', type: 'article' }
    ]
    isSearching.value = false
  }, 500)
}

const clearSearch = () => {
  searchKeyword.value = ''
  searchResults.value = []
}

const clearHistory = () => {
  searchHistory.value = []
}

const handleHistoryClick = (keyword: string) => {
  searchKeyword.value = keyword
  handleSearch()
}

const goToDetail = (result: any) => {
  if (result.type === 'doctor') {
    router.push(`/detail/${result.id}`)
  } else if (result.type === 'department') {
    router.push(`/knowledge?dept=${result.id}`)
  } else if (result.type === 'article') {
    router.push(`/articles/detail/${result.id}`)
  }
}

const goBack = () => {
  router.back()
}
</script>
