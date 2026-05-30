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
      <div max-w-4xl mx-auto px-6 py-8>
        <div bg-white rounded-xl shadow-sm p-8 mb-6>
          <div flex items-center gap-2 mb-4>
            <span px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full>{{ articleDetail.category }}</span>
          </div>
          <h1 text-2xl font-bold text-gray-900 mb-4>{{ articleDetail.title }}</h1>
          <div flex items-center gap-6 text-sm text-gray-500 mb-6>
            <span>👤 {{ articleDetail.author }}</span>
            <span>📅 {{ articleDetail.publishDate }}</span>
            <span>👁️ {{ articleDetail.views }}阅读</span>
          </div>
          <div class="article-body" v-html="articleDetail.content"></div>
        </div>

        <div bg-white rounded-xl shadow-sm p-6 mb-6>
          <h3 text-lg font-bold text-gray-900 mb-4>标签</h3>
          <div flex flex-wrap gap-2>
            <span v-for="tag in articleDetail.tags" :key="tag" px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full>{{ tag }}</span>
          </div>
        </div>

        <div bg-white rounded-xl shadow-sm p-6>
          <h3 text-lg font-bold text-gray-900 mb-4>💬 评论 ({{ comments.length }})</h3>
          <div class="space-y-4">
            <div v-for="comment in comments" :key="comment.id" p-4 bg-gray-50 rounded-xl>
              <div flex items-center gap-3 mb-3>
                <span text-2xl>{{ comment.avatar }}</span>
                <div>
                  <span text-sm font-medium text-gray-900>{{ comment.name }}</span>
                  <span text-xs text-gray-400 ml-3>{{ comment.time }}</span>
                </div>
              </div>
              <p text-sm text-gray-600>{{ comment.content }}</p>
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const articleDetail = ref({
  category: '中医养生',
  title: '春季养肝正当时 中医养生有妙招',
  author: '张医师',
  publishDate: '2024-05-20',
  views: 1256,
  content: '<p>春季是养肝的最佳时节，中医认为肝脏主疏泄，与春季相应。以下是几个养肝要点：</p><p><strong>1. 情志调养</strong>：保持心情舒畅，避免抑郁发怒</p><p><strong>2. 作息规律</strong>：早睡早起，保证充足睡眠</p><p><strong>3. 饮食调理</strong>：多食青色食物，如菠菜、芹菜等</p><p><strong>4. 运动保健</strong>：适当运动，如散步、太极拳等</p>',
  tags: ['春季养生', '养肝', '中医调理', '健康生活']
})

const comments = ref([
  { id: '1', avatar: '😃', name: '健康达人', time: '2小时前', content: '写的真好，非常实用！' },
  { id: '2', avatar: '😊', name: '养生爱好者', time: '5小时前', content: '收藏了，感谢分享！' },
  { id: '3', avatar: '🙂', name: '中医迷', time: '1天前', content: '说得很有道理' }
])

onMounted(() => {
  const id = route.params.id
  console.log('Article ID:', id)
})
</script>

<style scoped>
.article-body {
  color: #374151;
  line-height: 1.625;
}
.article-body p {
  margin-bottom: 1rem;
}
</style>
