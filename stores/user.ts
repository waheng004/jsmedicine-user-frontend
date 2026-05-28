import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCookie } from '#app'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const isLoggedIn = ref(false)
  const userInfo = ref({
    avatar: '',
    role: ''
  })

  const tokenCookie = useCookie('token')

  const login = async (newToken: string, userData?: any) => {
    token.value = newToken
    isLoggedIn.value = true
    tokenCookie.value = newToken
    
    if (userData) {
      updateUserInfo(userData)
    }
  }

  const logout = () => {
    token.value = ''
    isLoggedIn.value = false
    userInfo.value = {
      avatar: '',
      role: ''
    }
    tokenCookie.value = null
  }

  const updateUserInfo = (info: { avatar?: string; role?: string }) => {
    userInfo.value = {
      ...userInfo.value,
      ...info
    }
  }

  const loadFromCookie = () => {
    const savedToken = tokenCookie.value
    if (savedToken) {
      token.value = savedToken
      isLoggedIn.value = true
    }
  }

  return {
    token,
    isLoggedIn,
    userInfo,
    login,
    logout,
    updateUserInfo,
    loadFromCookie
  }
})