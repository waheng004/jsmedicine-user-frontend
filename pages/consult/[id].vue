<template>
  <div min-h-screen bg-gray-50>
    <header fixed top-0 left-0 right-0 h-16 bg-white z-50 border-b border-gray-100 shadow-sm>
      <div max-w-7xl mx-auto h-full flex justify-between items-center px-6>
        <div flex items-center space-x-3>
          <span text-2xl>🏥</span>
          <span text-xl font-bold text-amber-900>江苏中医在线</span>
        </div>
        <nav flex space-x-8 text-base>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/')">首页</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/topics')">专题学习</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/exam')">在线考核</span>
          <span cursor-pointer text-amber-800 font-bold>咨询医师</span>
        </nav>
        <div></div>
      </div>
    </header>

    <main pt-16>
      <div max-w-7xl mx-auto px-6 py-8>
        <div grid grid-cols-12 gap-8>
          <div col-span-4>
            <div sticky top-24 bg-white rounded-xl shadow-sm p-6>
              <h3 text-lg font-bold text-gray-900 mb-4>咨询分类</h3>
              <div space-y-2>
                <div v-for="category in categories" :key="category.id" flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors :class="activeCategory === category.id ? 'bg-amber-50' : ''" @click="activeCategory = category.id">
                  <span text-sm :class="activeCategory === category.id ? 'text-amber-800 font-medium' : 'text-gray-600'">{{ category.name }}</span>
                  <span text-xs bg-gray-100 px-2 py-0.5 rounded>{{ category.count }}</span>
                </div>
              </div>
            </div>
          </div>

          <div col-span-8>
            <div bg-white rounded-xl shadow-sm>
              <div p-6 border-b border-gray-100>
                <h2 text-lg font-bold text-gray-900>选择医师</h2>
              </div>

              <div p-6>
                <div grid grid-cols-2 gap-4>
                  <div v-for="doctor in filteredDoctors" :key="doctor.id" flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-amber-50 cursor-pointer transition-colors @click="$router.push(`/consult/${doctor.id}`)">
                    <div :class="doctor.avatarBg" w-20 h-20 rounded-full flex items-center justify-center text-3xl>{{ doctor.avatar }}</div>
                    <div flex-1>
                      <div flex items-center gap-2 mb-1>
                        <h3 text-base font-bold text-gray-900>{{ doctor.name }}</h3>
                        <span text-xs :class="doctor.badgeBg" :style="{ color: doctor.badgeColor, backgroundColor: doctor.badgeBg.replace('text-', '') + '20' }" px-2 py-0.5 rounded>{{ doctor.title }}</span>
                      </div>
                      <p text-sm text-gray-500 mb-1>{{ doctor.department }}</p>
                      <p text-xs text-gray-400 mb-2>擅长：{{ doctor.specialty }}</p>
                      <div flex items-center justify-between>
                        <span text-sm text-amber-600 font-medium>⭐ {{ doctor.rating }}</span>
                        <span v-if="doctor.online" text-xs text-emerald-600>在线</span>
                        <span v-else text-xs text-gray-400>离线</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer bg-gray-800 text-gray-300 mt-16>
      <div max-w-7xl mx-auto px-6 py-8>
        <div text-center>
          <p text-sm>© 2022 江苏凤凰优阅信息科技有限公司 版权所有</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('all')

const categories = ref([
  { id: 'all', name: '全部医师', count: 8 },
  { id: 'internal', name: '中医内科', count: 3 },
  { id: 'gynecology', name: '中医妇科', count: 2 },
  { id: 'acupuncture', name: '针灸科', count: 2 },
  { id: 'orthopedics', name: '骨伤科', count: 1 }
])

const doctors = ref([
  { id: '1', name: '张明华', title: '主任医师', department: '中医内科', specialty: '消化系统疾病、慢性胃炎', rating: '4.9', avatar: '👨‍⚕️', avatarBg: 'bg-amber-100', badgeBg: 'text-amber-700', badgeColor: '#92400e', online: true, category: 'internal' },
  { id: '2', name: '李婉清', title: '副主任医师', department: '中医妇科', specialty: '月经不调、痛经', rating: '4.8', avatar: '👩‍⚕️', avatarBg: 'bg-rose-100', badgeBg: 'text-rose-700', badgeColor: '#9f1239', online: true, category: 'gynecology' },
  { id: '3', name: '王建国', title: '主治医师', department: '针灸科', specialty: '颈椎病、腰椎间盘突出', rating: '4.7', avatar: '👨‍⚕️', avatarBg: 'bg-blue-100', badgeBg: 'text-blue-700', badgeColor: '#1e40af', online: false, category: 'acupuncture' },
  { id: '4', name: '陈晓东', title: '主任医师', department: '骨伤科', specialty: '骨折、关节炎', rating: '4.9', avatar: '👨‍⚕️', avatarBg: 'bg-emerald-100', badgeBg: 'text-emerald-700', badgeColor: '#065f46', online: true, category: 'orthopedics' }
])

const filteredDoctors = computed(() => {
  if (activeCategory.value === 'all') {
    return doctors.value
  }
  return doctors.value.filter(d => d.category === activeCategory.value)
})
</script>
