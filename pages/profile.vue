<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="profile-info">
        <div class="profile-avatar">{{ userInfo.avatar || '👤' }}</div>
        <div class="profile-details">
          <h1 class="profile-name">{{ userInfo.name || '用户' }}</h1>
          <p class="profile-role">{{ userInfo.role || '普通用户' }}</p>
        </div>
      </div>
      <button class="edit-btn" @click="editProfile">编辑资料</button>
    </div>
    
    <div v-if="!isCertified" class="certify-card" @click="navigateTo('/certify')">
      <div class="certify-icon">📝</div>
      <div class="certify-info">
        <h3 class="certify-title">学员认证</h3>
        <p class="certify-desc">完成认证后即可开始学习和考核</p>
      </div>
      <span class="certify-arrow">›</span>
    </div>
    
    <div class="menu-section">
      <div class="menu-item" @click="navigateTo('/appointments')">
        <span class="menu-icon">📅</span>
        <span class="menu-text">我的预约</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item" @click="navigateTo('/records')">
        <span class="menu-icon">👀</span>
        <span class="menu-text">浏览记录</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item" @click="navigateTo('/favorites')">
        <span class="menu-icon">❤️</span>
        <span class="menu-text">我的收藏</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item" @click="navigateTo('/topics')">
        <span class="menu-icon">📚</span>
        <span class="menu-text">专题学习</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item" @click="navigateTo('/exam')">
        <span class="menu-icon">📝</span>
        <span class="menu-text">在线考核</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item" @click="navigateTo('/knowledge')">
        <span class="menu-icon">📖</span>
        <span class="menu-text">知识库</span>
        <span class="menu-arrow">›</span>
      </div>
    </div>
    
    <div class="menu-section">
      <div class="menu-item" @click="navigateTo('/settings')">
        <span class="menu-icon">⚙️</span>
        <span class="menu-text">设置</span>
        <span class="menu-arrow">›</span>
      </div>
      <div class="menu-item" @click="showManual">
        <span class="menu-icon">📖</span>
        <span class="menu-text">使用手册</span>
        <span class="menu-arrow">›</span>
      </div>
    </div>
    
    <div class="menu-section">
      <div class="menu-item" @click="handleLogout">
        <span class="menu-icon">🚪</span>
        <span class="menu-text">退出登录</span>
        <span class="menu-arrow">›</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const userStore = useUserStore()

const userInfo = ref({
  name: '',
  avatar: '',
  role: ''
})

const isCertified = ref(false)

const editProfile = () => {
  console.log('编辑资料')
}

const navigateTo = (path: string) => {
  router.push(path)
}

const showManual = () => {
  alert('使用手册：\n\n1. 用户登录：点击授权登录即可进入\n2. 个人中心：查看收藏、浏览记录、使用手册\n3. 首页：浏览资讯、搜索功能\n4. 专题学习：学习中医知识\n5. 在线考核：检验学习成果\n6. 知识库：查阅中医资料\n7. 咨询：在线咨询医师')
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.profile-header {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  padding: 40px 16px 24px;
  color: #fff;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}

.profile-details {
  flex: 1;
}

.profile-name {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 4px 0;
}

.profile-role {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
}

.edit-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  background: transparent;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.menu-section {
  margin: 16px;
  background: #fff;
  border-radius: 12px;
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

.certify-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px;
  padding: 16px;
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(193, 150, 96, 0.3);
}

.certify-icon {
  font-size: 32px;
}

.certify-info {
  flex: 1;
}

.certify-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0 0 4px 0;
}

.certify-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.certify-arrow {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
}
</style>
