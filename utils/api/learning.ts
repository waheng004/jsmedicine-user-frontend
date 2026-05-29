/**
 * 用户端学习资源相关 API
 * User App Learning Resources APIs
 */
import { useApi } from '~/composables/useApi'

// 分页查询课程
export const getCourses = (params: {
  page: number
  size: number
  sort?: string
  keyword?: string
}) => {
  return useApi('/api/v1/app/learning/courses', {
    method: 'get',
    params
  })
}

// 课程详情
export const getCourseDetail = (id: number) => {
  return useApi(`/api/v1/app/learning/courses/${id}`)
}
