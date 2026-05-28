/**
 * 文章/健康资讯 API
 * Article/Health Information APIs
 */
import { useApi } from '~/composables/useApi'

// 获取文章列表
export const getArticles = (params?: { 
  categoryId?: number
  page?: number 
  size?: number 
}) => {
  return useApi('/api/v1/app/articles', {
    method: 'get',
    params
  })
}

// 获取文章详情
export const getArticleDetail = (id: number) => {
  return useApi(`/api/v1/app/articles/${id}`)
}

// 收藏文章
export const favoriteArticle = (articleId: number) => {
  return useApi('/api/v1/app/articles/favorite', {
    method: 'post',
    body: { articleId }
  })
}

// 点赞文章
export const likeArticle = (articleId: number) => {
  return useApi('/api/v1/app/articles/like', {
    method: 'post',
    body: { articleId }
  })
}

// 获取健康话题列表
export const getTopics = (params?: { page?: number; size?: number }) => {
  return useApi('/api/v1/app/topics', {
    method: 'get',
    params
  })
}