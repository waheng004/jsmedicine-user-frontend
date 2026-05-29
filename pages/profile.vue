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
          <span cursor-pointer text-amber-800 font-bold @click="$router.push('/profile')">我的</span>
        </nav>
        <div flex items-center space-x-4>
          <span v-if="isLoggedIn" text-sm text-gray-600>{{ userName }}</span>
          <span v-else cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/login')">登录</span>
        </div>
      </div>
    </header>

    <main pt-16>
      <div max-w-7xl mx-auto px-6 py-8>
        <div grid grid-cols-12 gap-8>
          <div col-span-3>
            <div sticky top-24 bg-white rounded-xl shadow-sm p-6>
              <div text-center mb-6>
                <div w-24 h-24 mx-auto bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center text-4xl mb-3>👤</div>
                <h2 text-lg font-bold text-gray-900>{{ userName }}</h2>
                <p text-sm text-gray-500>{{ isCertified ? '已认证学员' : '普通用户' }}</p>
              </div>

              <div v-if="!isCertified" p-4 bg-gradient-to-r from-amber-600 to-amber-500 rounded-xl text-white mb-6 cursor-pointer hover:shadow-lg transition-shadow @click="$router.push('/certify')">
                <div flex items-center gap-3>
                  <span text-2xl>📝</span>
                  <div>
                    <h3 text-sm font-bold>学员认证</h3>
                    <p text-xs opacity-80>完成认证开始学习</p>
                  </div>
                </div>
              </div>

              <div space-y-1>
                <div flex items-center space-x-3 p-3 rounded-lg bg-amber-50 cursor-pointer @click="$router.push('/profile')">
                  <span text-lg>👤</span>
                  <span text-sm font-medium>个人信息</span>
                </div>
                <div flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer @click="$router.push('/certify')">
                  <span text-lg>📋</span>
                  <span text-sm font-medium>学员认证</span>
                </div>
                <div flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer @click="$router.push('/favorites')">
                  <span text-lg>❤️</span>
                  <span text-sm font-medium>我的收藏</span>
                </div>
                <div flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer @click="$router.push('/message')">
                  <span text-lg>🔔</span>
                  <span text-sm font-medium>消息通知</span>
                </div>
                <div flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer>
                  <span text-lg>📖</span>
                  <span text-sm font-medium>浏览记录</span>
                </div>
              </div>
            </div>
          </div>

          <div col-span-9>
            <div bg-white rounded-xl shadow-sm p-6 mb-6>
              <h2 text-lg font-bold text-gray-900 mb-6 flex items-center>
                <span w-1 h-6 bg-amber-700 rounded mr-3></span>个人信息
              </h2>

              <div grid grid-cols-2 gap-6>
                <div>
                  <label block text-sm text-gray-500 mb-2>用户名</label>
                  <p text-base font-medium text-gray-900>{{ userName || '未登录' }}</p>
                </div>
                <div>
                  <label block text-sm text-gray-500 mb-2>手机号</label>
                  <p text-base font-medium text-gray-900>138****8888</p>
                </div>
                <div>
                  <label block text-sm text-gray-500 mb-2>认证状态</label>
                  <p text-base font-medium :class="isCertified ? 'text-emerald-600' : 'text-gray-400'">{{ isCertified ? '已认证' : '未认证' }}</p>
                </div>
                <div>
                  <label block text-sm text-gray-500 mb-2>注册时间</label>
                  <p text-base font-medium text-gray-900>2022-11-01</p>
                </div>
              </div>

              <div mt-6 pt-6 border-t border-gray-100 flex justify-end>
                <button bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 @click="$router.push('/settings')">编辑资料</button>
              </div>
            </div>

            <div bg-white rounded-xl shadow-sm p-6 mb-6>
              <h2 text-lg font-bold text-gray-900 mb-6 flex items-center>
                <span w-1 h-6 bg-amber-700 rounded mr-3></span>学习进度
              </h2>

              <div grid grid-cols-4 gap-4>
                <div bg-gray-50 rounded-xl p-4 text-center>
                  <p text-3xl font-bold text-amber-600 mb-1>{{ completedCourses }}</p>
                  <p text-sm text-gray-500>已完成课程</p>
                </div>
                <div bg-gray-50 rounded-xl p-4 text-center>
                  <p text-3xl font-bold text-amber-600 mb-1>{{ inProgressCourses }}</p>
                  <p text-sm text-gray-500>进行中课程</p>
                </div>
                <div bg-gray-50 rounded-xl p-4 text-center>
                  <p text-3xl font-bold text-amber-600 mb-1>{{ totalExams }}</p>
                  <p text-sm text-gray-500>参加考核</p>
                </div>
                <div bg-gray-50 rounded-xl p-4 text-center>
                  <p text-3xl font-bold text-emerald-600 mb-1>{{ passedExams }}</p>
                  <p text-sm text-gray-500>通过考核</p>
                </div>
              </div>
            </div>

            <div bg-white rounded-xl shadow-sm p-6>
              <h2 text-lg font-bold text-gray-900 mb-6 flex items-center>
                <span w-1 h-6 bg-amber-700 rounded mr-3></span>最近学习
              </h2>

              <div space-y-4>
                <div v-for="course in recentCourses" :key="course.id" flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-amber-50 cursor-pointer transition-colors>
                  <div :class="course.iconBg" w-12 h-12 rounded-lg flex items-center justify-center text-xl>{{ course.icon }}</div>
                  <div flex-1>
                    <h3 text-sm font-medium text-gray-900 mb-1>{{ course.title }}</h3>
                    <div flex items-center gap-2>
                      <span text-xs text-gray-500>{{ course.lecturer }}</span>
                      <span v-if="course.progress" text-xs text-amber-600>进度 {{ course.progress }}%</span>
                    </div>
                  </div>
                  <button text-sm text-amber-600 hover:text-amber-800 @click="$router.push(`/topics/${course.id}`)">继续学习</button>
                </div>
              </div>

              <div mt-4 text-center>
                <span text-sm text-amber-600 cursor-pointer hover:text-amber-800 @click="$router.push('/topics')">查看全部课程 →</span>
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
import { ref } from 'vue'

const isLoggedIn = ref(true)
const isCertified = ref(false)
const userName = ref('张三')

const completedCourses = ref(3)
const inProgressCourses = ref(2)
const totalExams = ref(5)
const passedExams = ref(4)

const recentCourses = ref([
  { id: 1, title: '中医基础理论入门', lecturer: '王明教授', progress: 75, icon: '📖', iconBg: 'bg-blue-100' },
  { id: 2, title: '针灸推拿实操课程', lecturer: '李华主任', progress: 30, icon: '💆', iconBg: 'bg-emerald-100' },
  { id: 3, title: '中药学详解', lecturer: '赵军教授', progress: null, icon: '🌿', iconBg: 'bg-amber-100' }
])
</script>
