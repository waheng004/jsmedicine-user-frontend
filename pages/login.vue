<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="logo">🏥</div>
        <h1 class="title">中医馆管理系统</h1>
        <p class="subtitle">传承中医智慧，守护健康生活</p>
      </div>
      
      <div class="login-tabs">
        <button 
          class="tab-btn" 
          :class="{ active: loginType === 'password' }"
          @click="loginType = 'password'"
        >
          密码登录
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: loginType === 'sms' }"
          @click="loginType = 'sms'"
        >
          短信验证码
        </button>
      </div>
      
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label">手机号码</label>
          <input 
            v-model="form.phone" 
            type="tel" 
            class="form-input" 
            placeholder="请输入手机号"
            required
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">
            {{ loginType === 'password' ? '密码' : '验证码' }}
          </label>
          <div class="input-group">
            <input 
              v-model="form.password" 
              :type="loginType === 'password' ? 'password' : 'text'" 
              class="form-input" 
              :placeholder="loginType === 'password' ? '请输入密码' : '请输入验证码'"
              required
            />
            <button 
              v-if="loginType === 'sms'" 
              type="button" 
              class="sms-btn"
              :disabled="smsDisabled"
              @click="sendSms"
            >
              {{ smsText }}
            </button>
          </div>
        </div>
        
        <div class="form-options">
          <label class="checkbox-label">
            <input type="checkbox" v-model="form.remember" />
            <span>记住我</span>
          </label>
          <a href="#" class="forgot-link">忘记密码？</a>
        </div>
        
        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading">登录中...</span>
          <span v-else>登 录</span>
        </button>
      </form>
      
      <div class="login-footer">
        <span>还没有账号？</span>
        <a href="#" class="register-link">立即注册</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { useApi } from '~/composables/useApi'

const router = useRouter()
const userStore = useUserStore()

const loginType = ref<'password' | 'sms'>('password')
const loading = ref(false)
const smsCountdown = ref(0)

const form = ref({
  phone: '',
  password: '',
  remember: false
})

const smsDisabled = computed(() => smsCountdown.value > 0 || !form.value.phone)

const smsText = computed(() => {
  if (smsCountdown.value > 0) {
    return `${smsCountdown.value}s`
  }
  return '获取验证码'
})

const sendSms = async () => {
  if (!form.value.phone) {
    alert('请先输入手机号')
    return
  }
  
  try {
    await useApi('/api/sms/send', {
      method: 'POST',
      body: { phone: form.value.phone }
    })
    smsCountdown.value = 60
    const timer = setInterval(() => {
      smsCountdown.value--
      if (smsCountdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  } catch (err) {
    alert('发送验证码失败')
  }
}

const handleLogin = async () => {
  if (!form.value.phone || !form.value.password) {
    alert('请填写完整信息')
    return
  }
  
  loading.value = true
  
  try {
    const response = await useApi('/api/login', {
      method: 'POST',
      body: {
        phone: form.value.phone,
        password: form.value.password,
        type: loginType.value
      }
    })
    
    const { token, userInfo } = response.data
    
    await userStore.login(token, userInfo)
    
    alert('登录成功')
    router.push('/')
  } catch (err: any) {
    alert(err.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #faf6f1 0%, #f0ebe5 100%);
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 10px 40px rgba(193, 150, 96, 0.15);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  font-size: 64px;
  margin-bottom: 16px;
}

.title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
}

.subtitle {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.login-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  padding: 6px;
  background: #f5f5f5;
  border-radius: 12px;
}

.tab-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.tab-btn.active {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
  box-shadow: 0 2px 8px rgba(193, 150, 96, 0.3);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-input {
  padding: 14px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  color: #333;
  background: #fafafa;
  transition: all 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #c19660;
  background: #fff;
}

.input-group {
  position: relative;
}

.sms-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
}

.sms-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.forgot-link {
  font-size: 13px;
  color: #c19660;
  text-decoration: none;
}

.login-btn {
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(193, 150, 96, 0.3);
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(193, 150, 96, 0.4);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #666;
}

.register-link {
  color: #c19660;
  text-decoration: none;
  font-weight: 500;
}
</style>
