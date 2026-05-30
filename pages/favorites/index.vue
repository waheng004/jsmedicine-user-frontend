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
          <span cursor-pointer text-amber-800 font-bold>我的收藏</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/profile')">我的</span>
        </nav>
        <div></div>
      </div>
    </header>

    <main pt-16>
      <div max-w-7xl mx-auto px-6 py-8>
        <div mb-8>
          <h1 text-2xl font-bold text-gray-900 mb-2>我的收藏</h1>
          <p text-gray-500>管理您收藏的内容</p>
        </div>

        <div flex gap-4 mb-8 max-w-3xl>
          <button v-for="tab in tabs" :key="tab.key" px-6 py-3 rounded-xl font-medium cursor-pointer transition-all :class="activeTab === tab.key ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'" @click="activeTab = tab.key">
            {{ tab.label }}
          </button>
        </div>

        <div max-w-3xl>
          <div v-if="favorites[activeTab].length === 0" bg-white rounded-xl shadow-sm p-16 text-center>
            <span text-6xl mb-4 block>{{ getEmptyIcon() }}</span>
            <p text-gray-500>{{ getEmptyText() }}</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="item in favorites[activeTab]" :key="item.id" bg-white rounded-xl shadow-sm p-5 flex gap-4 cursor-pointer hover:bg-amber-50 transition-colors @click="goToDetail(item)">
              <div w-24 h-16 bg-amber-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0>
                <img v-if="item.cover" :src="item.cover" :alt="item.title" w-full h-full object-cover rounded-lg />
                <span v-else>{{ getCoverIcon() }}</span>
              </div>
              <div flex-1>
                <h3 text-base font-bold text-gray-900 mb-1>{{ item.title }}</h3>
                <p text-sm text-gray-600 mb-2 line-clamp-2>{{ item.description }}</p>
                <span text-xs text-gray-400>{{ item.date }}</span>
              </div>
              <button w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 cursor-pointer transition-colors @click.stop="removeFavorite(item)">✕</button>
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
      cover: 'https://via.placeholder.com/96x64/d4a574/ffffff?text=养生',
      date: '2024-05-20',
      type: 'article'
    },
    {
      id: '2',
      title: '中医茶饮养生',
      description: '不同体质适合的茶饮推荐...',
      cover: 'https://via.placeholder.com/96x64/c19660/ffffff?text=茶饮',
      date: '2024-05-18',
      type: 'article'
    }
  ],
  topics: [
    {
      id: '1',
      title: '中医基础理论入门',
      description: '系统学习中医基础理论...',
      cover: 'https://via.placeholder.com/96x64/8b7355/ffffff?text=基础',
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
