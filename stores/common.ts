import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookie } from '#app'

export const useCommonStore = defineStore('common', () => {
  const searchHistory = ref<string[]>([])
  const searchHistoryCookie = useCookie('searchHistory')

  const addSearchHistory = (keyword: string) => {
    if (!keyword.trim()) return
    
    const index = searchHistory.value.indexOf(keyword)
    if (index > -1) {
      searchHistory.value.splice(index, 1)
    }
    
    searchHistory.value.unshift(keyword)
    
    if (searchHistory.value.length > 10) {
      searchHistory.value.pop()
    }
    
    searchHistoryCookie.value = JSON.stringify(searchHistory.value)
  }

  const clearSearchHistory = () => {
    searchHistory.value = []
    searchHistoryCookie.value = null
  }

  const removeSearchHistory = (index: number) => {
    searchHistory.value.splice(index, 1)
    searchHistoryCookie.value = JSON.stringify(searchHistory.value)
  }

  const loadFromCookie = () => {
    const savedHistory = searchHistoryCookie.value
    if (savedHistory) {
      try {
        searchHistory.value = JSON.parse(savedHistory)
      } catch (e) {
        searchHistory.value = []
      }
    }
  }

  return {
    searchHistory,
    addSearchHistory,
    clearSearchHistory,
    removeSearchHistory,
    loadFromCookie
  }
})