/**
 * 用户端知识库相关 API
 * User App Knowledge Base APIs
 */
import { useApi } from '~/composables/useApi'

// 获取知识库分类树
export const getKnowledgeCategoriesTree = () => {
  return useApi('/api/v1/app/knowledge/categories/tree')
}

// 搜索知识库条目
export const searchKnowledgeEntries = (params: {
  page: number
  size: number
  keyword?: string
  categoryId?: number
}) => {
  return useApi('/api/v1/app/knowledge/entries', {
    method: 'get',
    params
  })
}

// 获取知识库条目详情
export const getKnowledgeEntryDetail = (id: number) => {
  return useApi(`/api/v1/app/knowledge/entries/${id}`)
}
