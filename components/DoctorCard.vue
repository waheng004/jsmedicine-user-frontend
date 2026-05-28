<template>
  <div class="doctor-card">
    <div class="card-left">
      <img :src="doctor.avatar" :alt="doctor.name" class="doctor-avatar" />
    </div>
    <div class="card-right">
      <div class="doctor-header">
        <h3 class="doctor-name">{{ doctor.name }}</h3>
        <StatusTag :text="doctor.status" :type="getStatusType(doctor.status)" />
      </div>
      <div class="doctor-info">
        <span class="doctor-title">{{ doctor.title }}</span>
        <span class="doctor-department">{{ doctor.department }}</span>
      </div>
      <div class="doctor-specialty">
        <span class="specialty-label">擅长：</span>
        <span class="specialty-text">{{ doctor.specialty }}</span>
      </div>
      <div class="doctor-footer">
        <div class="rating">
          <span class="rating-star">⭐</span>
          <span class="rating-value">{{ doctor.rating }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusTag from './StatusTag.vue'

interface Doctor {
  name: string
  avatar: string
  title: string
  department: string
  specialty: string
  rating: number
  status: string
}

const props = defineProps<{
  doctor: Doctor
}>()

const getStatusType = (status: string) => {
  if (status.includes('可预约')) return 'available'
  if (status.includes('调理中')) return 'busy'
  return 'default'
}
</script>

<style scoped>
.doctor-card {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.card-left {
  flex-shrink: 0;
}

.doctor-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  background: #f0f0f0;
}

.card-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.doctor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.doctor-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.doctor-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.doctor-title {
  font-size: 14px;
  color: #c19660;
  font-weight: 500;
}

.doctor-department {
  font-size: 14px;
  color: #666;
}

.doctor-specialty {
  display: flex;
  gap: 4px;
  align-items: flex-start;
}

.specialty-label {
  font-size: 13px;
  color: #999;
  flex-shrink: 0;
}

.specialty-text {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.doctor-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-star {
  font-size: 16px;
}

.rating-value {
  font-size: 14px;
  color: #ff9800;
  font-weight: 600;
}
</style>
