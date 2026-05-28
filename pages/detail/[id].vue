<template>
  <div class="detail-page">
    <div class="doctor-header">
      <div class="doctor-info">
        <img :src="doctorDetail.avatar" :alt="doctorDetail.name" class="doctor-avatar" />
        <div class="doctor-basic">
          <h1 class="doctor-name">{{ doctorDetail.name }}</h1>
          <div class="doctor-title">{{ doctorDetail.title }}</div>
          <div class="doctor-department">{{ doctorDetail.department }}</div>
        </div>
        <StatusTag :text="doctorDetail.status" :type="getStatusType(doctorDetail.status)" />
      </div>
      
      <div class="doctor-stats">
        <div class="stat-item">
          <span class="stat-value">{{ doctorDetail.rating }}</span>
          <span class="stat-label">评分</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ doctorDetail.experience }}</span>
          <span class="stat-label">年经验</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ doctorDetail.patients }}</span>
          <span class="stat-label">接诊数</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">👨‍⚕️ 医生简介</h2>
      <div class="section-content">
        <p>{{ doctorDetail.introduction }}</p>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🎯 擅长领域</h2>
      <div class="specialty-tags">
        <span v-for="(tag, index) in doctorDetail.specialties" :key="index" class="specialty-tag">
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">📅 本周排班</h2>
      <div class="schedule-calendar">
        <div 
          v-for="(day, index) in schedule" 
          :key="index"
          class="schedule-day"
          :class="{ active: selectedDay === index }"
          @click="selectDay(index)"
        >
          <span class="day-name">{{ day.name }}</span>
          <span class="day-date">{{ day.date }}</span>
          <span v-if="day.hasSlot" class="slot-indicator"></span>
        </div>
      </div>
      
      <div class="time-slots">
        <button 
          v-for="(slot, index) in currentSlots" 
          :key="index"
          class="slot-btn"
          :class="{ 
            active: selectedSlot === index,
            disabled: !slot.available 
          }"
          @click="selectSlot(index)"
        >
          {{ slot.time }}
          <span v-if="!slot.available" class="slot-status">已满</span>
        </button>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2 class="section-title">💬 用户评价</h2>
        <span class="review-count">{{ doctorDetail.reviews.length }}条</span>
      </div>
      <div class="reviews-list">
        <div v-for="(review, index) in doctorDetail.reviews" :key="index" class="review-item">
          <div class="review-header">
            <img :src="review.avatar" :alt="review.name" class="review-avatar" />
            <div class="review-info">
              <span class="review-name">{{ review.name }}</span>
              <span class="review-date">{{ review.date }}</span>
            </div>
            <div class="review-rating">
              <span v-for="i in 5" :key="i" class="star" :class="{ filled: i <= review.rating }">★</span>
            </div>
          </div>
          <p class="review-content">{{ review.content }}</p>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <button class="action-btn secondary" @click="handleConsult">
        💬 在线咨询
      </button>
      <button 
        class="action-btn primary" 
        :disabled="!selectedSlot"
        @click="handleAppointment"
      >
        📝 立即预约
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import StatusTag from '~/components/StatusTag.vue'
import { useApi } from '~/composables/useApi'

const route = useRoute()
const router = useRouter()

const doctorDetail = ref({
  id: '',
  name: '',
  avatar: '',
  title: '',
  department: '',
  status: '',
  rating: 0,
  experience: 0,
  patients: 0,
  introduction: '',
  specialties: [],
  schedule: [],
  reviews: []
})

const selectedDay = ref(0)
const selectedSlot = ref<number | null>(null)

const schedule = ref([
  { name: '周一', date: '5.27', hasSlot: true, slots: [] },
  { name: '周二', date: '5.28', hasSlot: true, slots: [] },
  { name: '周三', date: '5.29', hasSlot: true, slots: [] },
  { name: '周四', date: '5.30', hasSlot: false, slots: [] },
  { name: '周五', date: '5.31', hasSlot: true, slots: [] },
  { name: '周六', date: '6.1', hasSlot: true, slots: [] },
  { name: '周日', date: '6.2', hasSlot: false, slots: [] }
])

const mockSlots = [
  { time: '09:00', available: true },
  { time: '09:30', available: true },
  { time: '10:00', available: false },
  { time: '10:30', available: true },
  { time: '11:00', available: true },
  { time: '14:00', available: true },
  { time: '14:30', available: false },
  { time: '15:00', available: true },
  { time: '15:30', available: true },
  { time: '16:00', available: false },
  { time: '16:30', available: true },
  { time: '17:00', available: true }
]

const currentSlots = computed(() => {
  const day = schedule.value[selectedDay.value]
  if (!day.hasSlot) return []
  return mockSlots
})

const getStatusType = (status: string) => {
  if (status.includes('可预约')) return 'available'
  if (status.includes('调理中')) return 'busy'
  return 'default'
}

const selectDay = (index: number) => {
  selectedDay.value = index
  selectedSlot.value = null
}

const selectSlot = (index: number) => {
  const slot = currentSlots.value[index]
  if (slot.available) {
    selectedSlot.value = index
  }
}

const handleConsult = () => {
  alert('跳转到在线咨询')
}

const handleAppointment = () => {
  if (!selectedSlot.value) {
    alert('请选择预约时间')
    return
  }
  
  const day = schedule.value[selectedDay.value]
  const slot = currentSlots.value[selectedSlot.value]
  
  alert(`预约成功！\n时间：${day.name} ${day.date} ${slot.time}`)
}

const fetchDoctorDetail = async () => {
  const id = route.params.id as string
  
  try {
    const response = await useApi(`/api/doctor/${id}`)
    
    if (response.data) {
      doctorDetail.value = response.data
    } else {
      doctorDetail.value = getMockDoctor(id)
    }
  } catch (err) {
    console.error('获取医生详情失败:', err)
    doctorDetail.value = getMockDoctor(id)
  }
}

const getMockDoctor = (id: string) => ({
  id: id,
  name: '张明华',
  avatar: 'https://via.placeholder.com/100x100/d4a574/ffffff?text=张',
  title: '主任医师',
  department: '中医内科',
  status: '可预约',
  rating: 4.9,
  experience: 25,
  patients: 8650,
  introduction: '张医生毕业于北京中医药大学，从事中医临床工作25年，擅长中医内科各种疑难杂症的诊治。尤其在消化系统疾病、呼吸系统疾病和心脑血管疾病的中医治疗方面有丰富的经验和独特的见解。',
  specialties: ['消化系统疾病', '慢性胃炎', '胃溃疡', '呼吸系统疾病', '心脑血管疾病'],
  schedule: [],
  reviews: [
    {
      id: 1,
      name: '李女士',
      avatar: 'https://via.placeholder.com/40x40/c19660/ffffff?text=李',
      rating: 5,
      date: '2024-05-20',
      content: '张医生医术高明，态度和蔼，我的慢性胃炎调理了一段时间后明显好转，非常感谢！'
    },
    {
      id: 2,
      name: '王先生',
      avatar: 'https://via.placeholder.com/40x40/8b7355/ffffff?text=王',
      rating: 5,
      date: '2024-05-15',
      content: '专业、耐心，开的药方很有效，会继续坚持调理。'
    },
    {
      id: 3,
      name: '张女士',
      avatar: 'https://via.placeholder.com/40x40/d4a574/ffffff?text=张',
      rating: 4,
      date: '2024-05-10',
      content: '第一次来看病，医生很细心，讲解也很详细，期待后续效果。'
    }
  ]
})

onMounted(() => {
  fetchDoctorDetail()
})
</script>

<style scoped>
.detail-page {
  background: #f5f5f5;
  padding-bottom: 100px;
}

.doctor-header {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  padding: 24px 16px;
  color: #fff;
}

.doctor-info {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.doctor-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.5);
}

.doctor-basic {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.doctor-name {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.doctor-title {
  font-size: 16px;
  font-weight: 500;
  opacity: 0.9;
}

.doctor-department {
  font-size: 14px;
  opacity: 0.8;
}

.doctor-stats {
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 16px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 22px;
  font-weight: 700;
}

.stat-label {
  font-size: 13px;
  opacity: 0.8;
}

.section {
  margin: 16px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.review-count {
  font-size: 13px;
  color: #999;
}

.section-content p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.8;
}

.specialty-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.specialty-tag {
  padding: 6px 12px;
  background: #faf6f1;
  border-radius: 16px;
  font-size: 13px;
  color: #c19660;
}

.schedule-calendar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
}

.schedule-day {
  flex: 0 0 calc(100% / 7 - 6px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  background: #f5f5f5;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 48px;
}

.schedule-day.active {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
}

.day-name {
  font-size: 12px;
  margin-bottom: 4px;
}

.day-date {
  font-size: 14px;
  font-weight: 600;
}

.slot-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #c19660;
  margin-top: 6px;
}

.schedule-day.active .slot-indicator {
  background: #fff;
}

.time-slots {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.slot-btn {
  padding: 10px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.slot-btn:hover:not(.disabled) {
  border-color: #c19660;
  color: #c19660;
}

.slot-btn.active {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  border-color: #c19660;
  color: #fff;
}

.slot-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.slot-status {
  font-size: 11px;
  color: #999;
}

.slot-btn.active .slot-status {
  color: rgba(255, 255, 255, 0.8);
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-item {
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.review-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.review-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.review-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.review-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.review-date {
  font-size: 12px;
  color: #999;
}

.review-rating {
  font-size: 14px;
}

.star {
  color: #ddd;
}

.star.filled {
  color: #ffc107;
}

.review-content {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
}

.action-btn {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.action-btn.secondary {
  background: #f5f5f5;
  color: #666;
}

.action-btn.primary {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(193, 150, 96, 0.3);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
