<template>
  <div class="consult-page">
    <div class="chat-header">
      <button class="back-btn" @click="goBack">←</button>
      <div class="doctor-info">
        <img :src="doctorInfo.avatar" :alt="doctorInfo.name" class="doctor-avatar" />
        <div class="doctor-detail">
          <h3 class="doctor-name">{{ doctorInfo.name }}</h3>
          <span class="doctor-title">{{ doctorInfo.title }}</span>
        </div>
      </div>
      <button class="more-btn">⋯</button>
    </div>
    
    <div class="chat-content" ref="chatContent">
      <div class="system-message">
        开始咨询，请描述您的症状或问题
      </div>
      
      <div 
        v-for="message in messages" 
        :key="message.id"
        class="message-item"
        :class="{ mine: message.isMine }"
      >
        <img v-if="!message.isMine" :src="doctorInfo.avatar" class="message-avatar" />
        <div class="message-bubble">
          <p>{{ message.content }}</p>
          <span class="message-time">{{ message.time }}</span>
        </div>
        <img v-if="message.isMine" :src="userAvatar" class="message-avatar" />
      </div>
    </div>
    
    <div class="chat-input-area">
      <input 
        v-model="inputMessage"
        type="text" 
        class="chat-input"
        placeholder="请输入您的问题..."
        @keyup.enter="sendMessage"
      />
      <button class="send-btn" :disabled="!inputMessage.trim()" @click="sendMessage">
        发送
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const chatContent = ref<HTMLElement | null>(null)
const inputMessage = ref('')
const userAvatar = '👤'

const doctorInfo = ref({
  id: '',
  name: '张明华',
  avatar: 'https://via.placeholder.com/60x60/d4a574/ffffff?text=张',
  title: '主任医师'
})

const messages = ref([
  {
    id: '1',
    content: '您好，我是张医生，请问有什么可以帮助您的？',
    time: '10:30',
    isMine: false
  },
  {
    id: '2',
    content: '医生您好，我最近总是感觉疲劳乏力，食欲也不好，请问是什么原因呢？',
    time: '10:32',
    isMine: true
  },
  {
    id: '3',
    content: '感谢您的信任。根据您的描述，可能与脾胃功能虚弱有关。中医认为，脾胃为后天之本，负责运化水谷精微，如果脾胃功能减弱，就会出现疲劳乏力、食欲不振等症状。',
    time: '10:35',
    isMine: false
  },
  {
    id: '4',
    content: '那我该怎么调理呢？',
    time: '10:36',
    isMine: true
  },
  {
    id: '5',
    content: '首先，建议您注意饮食规律，三餐定时定量，避免生冷油腻食物。可以适当食用一些健脾养胃的食物，如小米、山药、红枣等。另外，适当的运动也有助于脾胃运化。',
    time: '10:40',
    isMine: false
  }
])

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  const newMessage = {
    id: Date.now().toString(),
    content: inputMessage.value,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    isMine: true
  }
  
  messages.value.push(newMessage)
  inputMessage.value = ''
  
  scrollToBottom()
  
  setTimeout(() => {
    const replyMessage = {
      id: (Date.now() + 1).toString(),
      content: '感谢您的咨询。根据您的情况，我建议您注意休息，保持心情舒畅，同时可以考虑中药调理。如果症状持续不缓解，建议您到医院就诊。',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      isMine: false
    }
    
    messages.value.push(replyMessage)
    scrollToBottom()
  }, 1000)
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContent.value) {
      chatContent.value.scrollTop = chatContent.value.scrollHeight
    }
  })
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  const id = route.params.id as string
  doctorInfo.value.id = id
})
</script>

<style scoped>
.consult-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.back-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
}

.doctor-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.doctor-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.doctor-detail {
  display: flex;
  flex-direction: column;
}

.doctor-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.doctor-title {
  font-size: 13px;
  color: #999;
}

.more-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.system-message {
  text-align: center;
  padding: 8px 16px;
  background: #f0f0f0;
  border-radius: 16px;
  font-size: 13px;
  color: #999;
  margin-bottom: 16px;
}

.message-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.message-item.mine {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.message-bubble {
  max-width: 70%;
}

.message-bubble p {
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}

.message-item:not(.mine) .message-bubble p {
  background: #fff;
  border-radius: 0 16px 16px 16px;
  color: #333;
}

.message-item.mine .message-bubble p {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  border-radius: 16px 0 16px 16px;
  color: #fff;
}

.message-time {
  display: block;
  font-size: 11px;
  color: #999;
  padding: 4px 8px;
}

.message-item.mine .message-time {
  text-align: right;
}

.chat-input-area {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.chat-input:focus {
  border-color: #c19660;
}

.send-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>