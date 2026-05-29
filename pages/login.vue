<template>
  <div min-h-screen bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center p-6>
    <div w-full max-w-md bg-white rounded-2xl shadow-xl p-8>
      <div text-center mb-8>
        <div text-6xl mb-4>🏥</div>
        <h1 text-2xl font-bold text-gray-900 mb-2>中医馆管理系统</h1>
        <p text-sm text-gray-500>传承中医智慧，守护健康生活</p>
      </div>

      <div flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl>
        <button flex-1 py-3 rounded-lg text-sm font-medium transition-all :class="loginType === 'password' ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md' : 'text-gray-600'" @click="loginType = 'password'">密码登录</button>
        <button flex-1 py-3 rounded-lg text-sm font-medium transition-all :class="loginType === 'sms' ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md' : 'text-gray-600'" @click="loginType = 'sms'">短信验证码</button>
      </div>

      <form space-y-5 @submit.prevent="handleLogin">
        <div>
          <label block text-sm font-medium text-gray-700 mb-2>手机号码</label>
          <input v-model="form.phone" type="tel" placeholder="请输入手机号" px-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-xl outline-none focus="border-amber-500 bg-white" transition-all required />
        </div>

        <div>
          <label block text-sm font-medium text-gray-700 mb-2>{{ loginType === 'password' ? '密码' : '验证码' }}</label>
          <div relative>
            <input v-model="form.password" :type="loginType === 'password' ? 'password' : 'text'" :placeholder="loginType === 'password' ? '请输入密码' : '请输入验证码'" px-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-xl outline-none transition-all required />
            <button v-if="loginType === 'sms'" type="button" absolute right-2 :top="1/2" :-translate-y="1/2" px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs rounded-lg cursor-pointer :disabled="smsDisabled" :class="smsDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'" @click="sendSms">{{ smsText }}</button>
          </div>
        </div>

        <div flex justify-between items-center>
          <label flex items-center gap-2 cursor-pointer>
            <input type="checkbox" v-model="form.remember" />
            <span text-sm text-gray-600>记住我</span>
          </label>
          <span text-sm text-amber-600 cursor-pointer hover:text-amber-800>忘记密码？</span>
        </div>

        <button type="submit" w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-base font-semibold rounded-xl shadow-lg :shadow="`amber-500/30`" hover="shadow-xl opacity-90" :disabled="loading" transition-all :class="loading ? 'opacity-70 cursor-not-allowed' : ''">
          <span v-if="loading">登录中...</span>
          <span v-else>登 录</span>
        </button>
      </form>

      <div text-center mt-6>
        <span text-sm text-gray-500>还没有账号？</span>
        <span text-sm text-amber-600 font-medium cursor-pointer hover:text-amber-800 ml-1>立即注册</span>
      </div>

      <div mt-8 pt-6 border-t border-gray-100>
        <p text-center text-xs text-gray-400 mb-4>其他登录方式</p>
        <div flex justify-center gap-6>
          <div flex flex-col items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity>
            <span text-3xl>💬</span>
            <span text-xs text-gray-500>微信</span>
          </div>
          <div flex flex-col items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity>
            <span text-3xl>📱</span>
            <span text-xs text-gray-500>手机</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { login, sendSmsCode, loginBySms } from '~/utils/api/auth'

const router = useRouter()

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
    await sendSmsCode({ mobile: form.value.phone })
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
    if (loginType.value === 'password') {
      await login({ username: form.value.phone, password: form.value.password })
    } else {
      await loginBySms({ mobile: form.value.phone, code: form.value.password })
    }

    alert('登录成功')
    router.push('/')
  } catch (err: any) {
    alert(err.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>
