<template>
  <div class="message-page">
    <div class="page-header">
      <h1 class="page-title">消息</h1>
    </div>
    
    <div class="message-content">
      <div v-if="messages.length === 0" class="empty-state">
        <div class="empty-icon">💬</div>
        <p>暂无消息</p>
      </div>
      
      <div v-else class="message-list">
        <div 
          v-for="message in messages" 
          :key="message.id" 
          class="message-item"
          @click="openMessage(message)"
        >
          <div class="message-avatar">{{ message.avatar }}</div>
          <div class="message-info">
            <div class="message-header">
              <span class="message-name">{{ message.name }}</span>
              <span class="message-time">{{ message.time }}</span>
            </div>
            <p class="message-preview">{{ message.preview }}</p>
          </div>
          <div v-if="message.unread" class="unread-badge">{{ message.unread }}</div>
        </div>
      </div>
    </div>
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

<style scoped>
.message-page {
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

.message-content {
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

.message-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.message-avatar {
  font-size: 40px;
}

.message-info {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.message-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.message-time {
  font-size: 12px;
  color: #999;
}

.message-preview {
  font-size: 14px;
  color: #666;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.unread-badge {
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: #f44336;
  color: #fff;
  border-radius: 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
