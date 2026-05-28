/**
 * 播客/音频 API
 * Podcast/Audio APIs
 */
import { useApi } from '~/composables/useApi'

// 获取播客分类
export const getPodcastCategories = () => {
  return useApi('/api/v1/app/podcasts/categories')
}

// 获取播客列表
export const getPodcasts = (params?: {
  categoryId?: number
  page?: number
  size?: number
}) => {
  return useApi('/api/v1/app/podcasts', {
    method: 'get',
    params
  })
}

// 获取播客详情
export const getPodcastDetail = (id: number) => {
  return useApi(`/api/v1/app/podcasts/${id}`)
}

// 获取播客音频列表
export const getPodcastAudios = (podcastId: number, params?: { page?: number; size?: number }) => {
  return useApi(`/api/v1/app/podcasts/${podcastId}/audios`, {
    method: 'get',
    params
  })
}

// 获取音频详情
export const getAudioDetail = (id: number) => {
  return useApi(`/api/v1/app/podcasts/audios/${id}`)
}

// 收藏播客
export const favoritePodcast = (podcastId: number) => {
  return useApi('/api/v1/app/podcasts/favorite', {
    method: 'post',
    body: { podcastId }
  })
}