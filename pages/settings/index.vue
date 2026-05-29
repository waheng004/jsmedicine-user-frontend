<template>
  <div class="settings-page">
    <div class="page-header">
      <h1 class="page-title">设置</h1>
    </div>
    
    <div class="settings-content">
      <div class="menu-section">
        <div class="menu-item" @click="handleNotification">
          <span class="menu-icon">🔔</span>
          <span class="menu-text">消息通知</span>
          <span class="menu-arrow">›</span>
        </div>
        <div class="menu-item" @click="handlePrivacy">
          <span class="menu-icon">🔒</span>
          <span class="menu-text">隐私设置</span>
          <span class="menu-arrow">›</span>
        </div>
        <div class="menu-item" @click="handleClearCache">
          <span class="menu-icon">🗑️</span>
          <span class="menu-text">清除缓存</span>
          <span class="menu-arrow">›</span>
        </div>
      </div>
      
      <div class="menu-section">
        <div class="menu-item" @click="handleFeedback">
          <span class="menu-icon">💬</span>
          <span class="menu-text">意见反馈</span>
          <span class="menu-arrow">›</span>
        </div>
        <div class="menu-item" @click="handleAbout">
          <span class="menu-icon">ℹ️</span>
          <span class="menu-text">关于我们</span>
          <span class="menu-arrow">›</span>
        </div>
      </div>
      
      <div class="version-info">
        <span class="version-text">版本号：1.0.0</span>
        <span class="copyright">江苏凤凰优阅信息科技有限公司</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleNotification = () => {
  alert('消息通知设置功能开发中')
}

const handlePrivacy = () => {
  alert('隐私设置功能开发中')
}

const handleClearCache = () => {
  if (confirm('确定要清除缓存吗？')) {
    alert('缓存已清除')
  }
}

const handleFeedback = () => {
  alert('意见反馈功能开发中')
}

const handleAbout = () => {
  alert('关于我们：\n\n中医在线小程序\n版本：1.0.0\n开发：江苏凤凰优阅信息科技有限公司\n\n传承中医智慧，守护健康生活')
}
</script>

<style scoped>
.settings-page {
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

.settings-content {
  padding: 16px;
}

.menu-section {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.3s;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background: #fafafa;
}

.menu-icon {
  font-size: 20px;
  margin-right: 12px;
}

.menu-text {
  flex: 1;
  font-size: 15px;
  color: #333;
}

.menu-arrow {
  font-size: 18px;
  color: #ccc;
}

.version-info {
  text-align: center;
  padding: 32px 0;
}

.version-text {
  display: block;
  font-size: 13px;
  color: #999;
  margin-bottom: 8px;
}

.copyright {
  font-size: 12px;
  color: #ccc;
}
</style>