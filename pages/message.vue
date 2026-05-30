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
          <span cursor-pointer text-amber-800 font-bold>消息中心</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/profile')">我的</span>
        </nav>
        <div></div>
      </div>
    </header>

    <main pt-16>
      <div max-w-7xl mx-auto px-6 py-8>
        <div mb-8>
          <h1 text-2xl font-bold text-gray-900 mb-2>消息中心</h1>
          <p text-gray-500>查看最新消息通知</p>
        </div>

        <div max-w-3xl mx-auto>
          <div v-if="messages.length === 0" bg-white rounded-xl shadow-sm p-16 text-center>
            <span text-6xl mb-4 block>💬</span>
            <p text-gray-500>暂无消息</p>
          </div>

          <div v-else class="space-y-4">
            <div v-for="message in messages" :key="message.id" bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 cursor-pointer hover:bg-amber-50 transition-colors @click="openMessage(message)">
              <div w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl>{{ message.avatar }}</div>
              <div flex-1>
                <div flex justify-between items-start mb-2>
                  <h3 text-base font-bold text-gray-900>{{ message.name }}</h3>
                  <span text-sm text-gray-400>{{ message.time }}</span>
                </div>
                <p text-sm text-gray-600>{{ message.preview }}</p>
              </div>
              <div v-if="message.unread" w-6 h-6 bg-red-500 rounded-full flex items-center justify-center>
                <span text-xs text-white font-bold>{{ message.unread }}</span>
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

const messages = ref([
  {
    id: 1,
    avatar: '👨‍⚕️',
    name: '张明华医生',
    time: '10:30',
    preview: '您的预约已确认，请按时就诊...',
    unread: 2
  },
  {
    id: 2,
    avatar: '🏥',
    name: '系统通知',
    time: '昨天',
    preview: '新的健康资讯已更新...',
    unread: 0
  }
])

const openMessage = (message: any) => {
  console.log('打开消息:', message.id)
}
</script>
