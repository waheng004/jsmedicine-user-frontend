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
          <span cursor-pointer text-amber-800 font-bold>在线考核</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/profile')">我的</span>
        </nav>
        <div></div>
      </div>
    </header>

    <main pt-16>
      <div max-w-7xl mx-auto px-6 py-8>
        <div mb-8>
          <h1 text-2xl font-bold text-gray-900 mb-2>在线考核</h1>
          <p text-gray-500>检验学习成果，提升专业水平</p>
        </div>

        <div grid grid-cols-3 gap-6 mb-8>
          <div bg-white rounded-xl shadow-sm p-6 flex items-center gap-4>
            <div w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-2xl>📝</div>
            <div>
              <p text-3xl font-bold text-gray-900>{{ stats.totalExams }}</p>
              <p text-sm text-gray-500>总试卷</p>
            </div>
          </div>
          <div bg-white rounded-xl shadow-sm p-6 flex items-center gap-4>
            <div w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center text-2xl>✅</div>
            <div>
              <p text-3xl font-bold text-emerald-600>{{ stats.passedExams }}</p>
              <p text-sm text-gray-500>已通过</p>
            </div>
          </div>
          <div bg-white rounded-xl shadow-sm p-6 flex items-center gap-4>
            <div w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-2xl>📊</div>
            <div>
              <p text-3xl font-bold text-blue-600>{{ stats.attemptedExams }}</p>
              <p text-sm text-gray-500>已参与</p>
            </div>
          </div>
        </div>

        <div bg-white rounded-xl shadow-sm>
          <div p-6 border-b border-gray-100>
            <h2 text-lg font-bold text-gray-900>考核列表</h2>
          </div>

          <div p-6 space-y-4>
            <div v-for="exam in exams" :key="exam.id" flex items-start gap-5 p-5 bg-gray-50 rounded-xl hover:bg-amber-50 cursor-pointer transition-colors :class="exam.accessible ? '' : 'opacity-60'" @click="goToExam(exam)">
              <div :class="exam.passed ? 'bg-emerald-100' : exam.accessible ? 'bg-amber-100' : 'bg-gray-200'" w-16 h-16 rounded-xl flex items-center justify-center text-2xl>{{ exam.passed ? '✅' : exam.accessible ? '📝' : '🔒' }}</div>
              <div flex-1>
                <div flex justify-between items-start mb-2>
                  <h3 text-base font-bold text-gray-900>{{ exam.title }}</h3>
                  <span v-if="exam.passed" text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full>已通过</span>
                  <span v-else-if="exam.attempted" text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full>可重试</span>
                  <span v-else-if="!exam.accessible" text-xs bg-gray-200 text-gray-500 px-3 py-1 rounded-full>未解锁</span>
                </div>
                <p text-sm text-gray-500 mb-3>{{ exam.description }}</p>
                <div flex items-center gap-4>
                  <span text-xs text-gray-400>⏱️ {{ exam.duration }}分钟</span>
                  <span text-xs text-gray-400>📊 {{ exam.totalScore }}分</span>
                  <span text-xs text-gray-400>📝 {{ exam.questionCount }}题</span>
                </div>
                <div v-if="exam.score !== undefined" mt-3 pt-3 border-t border-gray-200>
                  <span text-sm text-gray-500>最高得分：</span>
                  <span text-lg font-bold :class="exam.score >= 60 ? 'text-emerald-600' : 'text-red-500'">{{ exam.score }}分</span>
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
import { ref } from 'vue'

const stats = ref({
  totalExams: 4,
  passedExams: 2,
  attemptedExams: 3
})

const exams = ref([
  {
    id: '1',
    title: '中医基础理论考核',
    description: '考核中医基础理论知识，包括阴阳五行、脏腑经络等',
    duration: 30,
    totalScore: 100,
    questionCount: 20,
    accessible: true,
    attempted: true,
    passed: true,
    score: 85
  },
  {
    id: '2',
    title: '中医诊断学考核',
    description: '考核望闻问切四诊方法及辨证论治知识',
    duration: 40,
    totalScore: 100,
    questionCount: 25,
    accessible: true,
    attempted: true,
    passed: false,
    score: 58
  },
  {
    id: '3',
    title: '中药学考核',
    description: '考核常用中药的性味归经、功效主治及配伍应用',
    duration: 45,
    totalScore: 100,
    questionCount: 30,
    accessible: true,
    attempted: false,
    passed: false
  },
  {
    id: '4',
    title: '方剂学考核',
    description: '考核经典方剂的组成、功效、主治及临床应用',
    duration: 40,
    totalScore: 100,
    questionCount: 25,
    accessible: false,
    attempted: false,
    passed: false
  }
])

const goToExam = (exam) => {
  if (!exam.accessible) {
    alert('请先完成前置学习才能参加此考核')
    return
  }
}
</script>
