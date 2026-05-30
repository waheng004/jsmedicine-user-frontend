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
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/consult/1')">咨询医师</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/profile')">我的</span>
        </nav>
        <div></div>
      </div>
    </header>

    <main pt-16>
      <div max-w-4xl mx-auto px-6 py-8>
        <div bg-white rounded-xl shadow-sm p-6 mb-6>
          <div flex items-center gap-6>
            <img :src="doctorDetail.avatar" :alt="doctorDetail.name" w-24 h-24 rounded-full object-cover />
            <div flex-1>
              <div flex items-center gap-3 mb-2>
                <h1 text-xl font-bold text-gray-900>{{ doctorDetail.name }}</h1>
                <span px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full>{{ doctorDetail.status }}</span>
              </div>
              <p text-gray-600 mb-2>{{ doctorDetail.title }}</p>
              <p text-gray-500 text-sm>{{ doctorDetail.department }}</p>
            </div>
          </div>
          <div flex justify-around mt-6 pt-6 border-t border-gray-100>
            <div text-center>
              <p text-2xl font-bold text-amber-600>{{ doctorDetail.rating }}</p>
              <p text-sm text-gray-500>评分</p>
            </div>
            <div text-center>
              <p text-2xl font-bold text-gray-900>{{ doctorDetail.experience }}年</p>
              <p text-sm text-gray-500>从医经验</p>
            </div>
            <div text-center>
              <p text-2xl font-bold text-gray-900>{{ doctorDetail.patients }}</p>
              <p text-sm text-gray-500>接诊数</p>
            </div>
          </div>
        </div>

        <div bg-white rounded-xl shadow-sm p-6 mb-6>
          <h3 text-lg font-bold text-gray-900 mb-4>👨‍⚕️ 医生简介</h3>
          <p text-gray-600 leading-relaxed>{{ doctorDetail.introduction }}</p>
        </div>

        <div bg-white rounded-xl shadow-sm p-6 mb-6>
          <h3 text-lg font-bold text-gray-900 mb-4>🎯 擅长领域</h3>
          <div flex flex-wrap gap-2>
            <span v-for="(tag, index) in doctorDetail.specialties" :key="index" px-4 py-2 bg-amber-50 text-amber-800 text-sm rounded-full>{{ tag }}</span>
          </div>
        </div>

        <div bg-white rounded-xl shadow-sm p-6 mb-6>
          <h3 text-lg font-bold text-gray-900 mb-4>📅 本周排班</h3>
          <div flex gap-4>
            <div v-for="(day, index) in schedule" :key="index" flex-1 text-center p-4 rounded-xl cursor-pointer transition-all :class="selectedDay === index ? 'bg-amber-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'" @click="selectDay(index)">
              <p text-sm font-medium>{{ day.name }}</p>
              <p text-xs mt-1>{{ day.date }}</p>
              <span v-if="day.hasSlot" mt-2 w-2 h-2 bg-green-500 rounded-full mx-auto block></span>
            </div>
          </div>
        </div>

        <div flex gap-4>
          <button flex-1 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl cursor-pointer hover:bg-gray-200 @click="goBack">返回</button>
          <button flex-1 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl cursor-pointer hover:opacity-90 @click="handleConsult">立即咨询</button>
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

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface DoctorDetail {
  name: string
  title: string
  department: string
  avatar: string
  status: string
  rating: number
  experience: number
  patients: number
  introduction: string
  specialties: string[]
}

const route = useRoute()
const router = useRouter()
const selectedDay = ref(0)

const doctorDetail = ref<DoctorDetail>({
  name: '张仲景',
  title: '主任医师',
  department: '中医内科',
  avatar: 'https://via.placeholder.com/96x96/d4a574/ffffff?text=张',
  status: '在线',
  rating: 4.9,
  experience: 30,
  patients: 12580,
  introduction: '张仲景，主任医师，教授，博士生导师。出身中医世家，从事中医临床工作30余年，擅长运用中医辨证论治方法治疗各种内科杂病，尤其对慢性病调理、亚健康状态调整有独到见解。',
  specialties: ['慢性病调理', '亚健康状态', '脾胃疾病', '失眠调理', '中医养生', '体质辨识']
})

const schedule = ref([
  { name: '周一', date: '05/27', hasSlot: true },
  { name: '周二', date: '05/28', hasSlot: true },
  { name: '周三', date: '05/29', hasSlot: false },
  { name: '周四', date: '05/30', hasSlot: true },
  { name: '周五', date: '05/31', hasSlot: true },
  { name: '周六', date: '06/01', hasSlot: false },
  { name: '周日', date: '06/02', hasSlot: false }
])

const selectDay = (index: number) => {
  selectedDay.value = index
}

const handleConsult = () => {
  router.push(`/consult/${route.params.id}`)
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  const id = route.params.id
  console.log('Doctor ID:', id)
})
</script>
