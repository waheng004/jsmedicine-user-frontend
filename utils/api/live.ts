/**
 * 用户端直播相关 API
 * User App Live Streaming APIs
 */
import { useApi } from '~/composables/useApi'

// 分页查询直播
export const getLiveSessions = (params: {
  page: number
  size: number
  keyword?: string
  liveStatus?: 'NOT_STARTED' | 'LIVE' | 'ENDED' | 'CANCELED'
}) => {
  return useApi('/api/v1/app/live-sessions', {
    method: 'get',
    params
  })
}

// 直播详情
export const getLiveSessionDetail = (id: number) => {
  return useApi(`/api/v1/app/live-sessions/${id}`)
}
