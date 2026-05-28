/**
 * 预约相关 API
 * Appointment APIs
 */
import { useApi } from '~/composables/useApi'

// 创建预约
export const createAppointment = (data: {
  doctorId: number
  date: string
  timeSlot: string
  symptom?: string
}) => {
  return useApi('/api/v1/app/appointments', {
    method: 'post',
    body: data
  })
}

// 获取预约列表
export const getAppointments = (params?: { 
  status?: string
  page?: number 
  size?: number 
}) => {
  return useApi('/api/v1/app/appointments', {
    method: 'get',
    params
  })
}

// 获取预约详情
export const getAppointmentDetail = (id: number) => {
  return useApi(`/api/v1/app/appointments/${id}`)
}

// 取消预约
export const cancelAppointment = (id: number) => {
  return useApi(`/api/v1/app/appointments/${id}/cancel`, {
    method: 'put'
  })
}

// 获取可预约时段
export const getAvailableSlots = (params: { doctorId: number; date: string }) => {
  return useApi('/api/v1/app/appointments/available-slots', {
    method: 'get',
    params
  })
}