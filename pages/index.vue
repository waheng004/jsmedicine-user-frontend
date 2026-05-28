<template>
  <div class="index-page">
    <div class="search-section">
      <div class="search-bar" @click="goToSearch">
        <span class="search-icon">🔍</span>
        <span class="search-placeholder">搜索医生、科室或病症</span>
      </div>
    </div>

    <div class="banner-section">
      <div class="banner-carousel">
        <div class="banner-track" :style="{ transform: `translateX(-${currentBanner * 100}%)` }">
          <div v-for="(banner, index) in banners" :key="index" class="banner-item">
            <img :src="banner.image" :alt="banner.title" />
            <div class="banner-content">
              <h3>{{ banner.title }}</h3>
              <p>{{ banner.subtitle }}</p>
            </div>
          </div>
        </div>
        <div class="banner-dots">
          <span 
            v-for="(_, index) in banners" 
            :key="index"
            class="dot"
            :class="{ active: currentBanner === index }"
            @click="currentBanner = index"
          ></span>
        </div>
      </div>
    </div>

    <div class="department-section">
      <h2 class="section-title">科室分类</h2>
      <div class="department-grid">
        <div 
          v-for="dept in departments" 
          :key="dept.id" 
          class="department-item"
          @click="goToDepartment(dept.id)"
        >
          <div class="dept-icon">{{ dept.icon }}</div>
          <span class="dept-name">{{ dept.name }}</span>
        </div>
      </div>
    </div>

    <div class="doctors-section">
      <div class="section-header">
        <h2 class="section-title">推荐名医</h2>
        <a href="#" class="more-link">查看更多 →</a>
      </div>
      <div class="doctors-list">
        <DoctorCard 
          v-for="doctor in doctors" 
          :key="doctor.id" 
          :doctor="doctor"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import DoctorCard from '~/components/DoctorCard.vue'
import { useApi } from '~/composables/useApi'

const router = useRouter()

const currentBanner = ref(0)
let bannerTimer: any = null

const banners = ref([
  {
    image: 'https://via.placeholder.com/375x160/d4a574/ffffff?text=中医调理',
    title: '冬病夏治',
    subtitle: '三伏贴预约进行中'
  },
  {
    image: 'https://via.placeholder.com/375x160/c19660/ffffff?text=专家义诊',
    title: '名医义诊',
    subtitle: '省级中医专家免费问诊'
  },
  {
    image: 'https://via.placeholder.com/375x160/8b7355/ffffff?text=养生讲座',
    title: '健康讲座',
    subtitle: '中医养生知识分享'
  }
])

const departments = ref([
  { id: 1, icon: '🩺', name: '内科' },
  { id: 2, icon: '🌸', name: '妇科' },
  { id: 3, icon: '💉', name: '针灸' },
  { id: 4, icon: '🦴', name: '骨伤' },
  { id: 5, icon: '👶', name: '儿科' },
  { id: 6, icon: '🍵', name: '养生' },
  { id: 7, icon: '🌿', name: '皮肤' },
  { id: 8, icon: '💆', name: '推拿' }
])

const doctors = ref([
  {
    id: 1,
    name: '张明华',
    avatar: 'https://via.placeholder.com/80x80/d4a574/ffffff?text=张',
    title: '主任医师',
    department: '中医内科',
    specialty: '消化系统疾病、慢性胃炎、胃溃疡',
    rating: 4.9,
    status: '可预约'
  },
  {
    id: 2,
    name: '李秀珍',
    avatar: 'https://via.placeholder.com/80x80/c19660/ffffff?text=李',
    title: '副主任医师',
    department: '中医妇科',
    specialty: '月经不调、痛经、妇科炎症',
    rating: 4.8,
    status: '可预约'
  },
  {
    id: 3,
    name: '王建国',
    avatar: 'https://via.placeholder.com/80x80/8b7355/ffffff?text=王',
    title: '主治医师',
    department: '针灸科',
    specialty: '颈椎病、腰椎间盘突出、面瘫',
    rating: 4.7,
    status: '调理中'
  }
])

const goToSearch = () => {
  router.push('/search')
}

const goToDepartment = (id: number) => {
  console.log('跳转到科室:', id)
}

const startBannerAutoPlay = () => {
  bannerTimer = setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.value.length
  }, 3000)
}

onMounted(() => {
  startBannerAutoPlay()
})

onUnmounted(() => {
  if (bannerTimer) {
    clearInterval(bannerTimer)
  }
})
</script>

<style scoped>
.index-page {
  background: #f5f5f5;
}

.search-section {
  padding: 12px 16px;
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fff;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-bar:active {
  transform: scale(0.98);
}

.search-icon {
  font-size: 18px;
}

.search-placeholder {
  flex: 1;
  font-size: 14px;
  color: #999;
}

.banner-section {
  padding: 16px;
}

.banner-carousel {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.banner-track {
  display: flex;
  transition: transform 0.5s ease;
}

.banner-item {
  flex: 0 0 100%;
  position: relative;
}

.banner-item img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.banner-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: #fff;
}

.banner-content h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
}

.banner-content p {
  margin: 0;
  font-size: 13px;
  opacity: 0.9;
}

.banner-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  width: 20px;
  border-radius: 4px;
  background: #fff;
}

.department-section {
  padding: 0 16px 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.department-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.department-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.3s;
}

.department-item:active {
  transform: scale(0.95);
}

.dept-icon {
  font-size: 36px;
  line-height: 1;
}

.dept-name {
  font-size: 13px;
  color: #666;
}

.doctors-section {
  padding: 0 16px 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header .section-title {
  margin: 0;
}

.more-link {
  font-size: 13px;
  color: #c19660;
  text-decoration: none;
}

.doctors-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
