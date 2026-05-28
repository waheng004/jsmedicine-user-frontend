PS C:\Desktop\NuxtProject> git commit -m "feat: 初始化中医用户端Nuxt项目及API配置"
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.       

fatal: unable to auto-detect email address (got '10779@wednesday.(none)')PS C:\Desktop\NuxtProject> git commit -m "feat: 初始化中医用户端Nuxt项目及API配置"
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.       

fatal: unable to auto-detect email address (got '10779@wednesday.(none)')<template>
  <div class="exam-page">
    <div class="page-header">
      <h1 class="page-title">在线考核</h1>
      <p class="page-subtitle">检验学习成果</p>
    </div>
    
    <div class="exam-content">
      <div class="exam-stats">
        <div class="stat-card">
          <span class="stat-icon">�</span>
          <div class="stat-info">
            <span class="stat-value">{{ stats.totalExams }}</span>
            <span class="stat-label">总试卷</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">✅</span>
          <div class="stat-info">
            <span class="stat-value">{{ stats.passedExams }}</span>
            <span class="stat-label">已通过</span>
          </div>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📝</span>
          <div class="stat-info">
            <span class="stat-value">{{ stats.attemptedExams }}</span>
            <span class="stat-label">已参与</span>
          </div>
        </div>
      </div>
      
      <div class="section-header">
        <h2 class="section-title">考核列表</h2>
      </div>
      
      <div class="exam-list">
        <div 
          v-for="exam in exams" 
          :key="exam.id" 
          class="exam-card"
          :class="{ locked: !exam.accessible }"
          @click="goToExam(exam)"
        >
          <div class="exam-icon">📝</div>
          <div class="exam-info">
            <div class="exam-header">
              <h3 class="exam-title">{{ exam.title }}</h3>
              <span v-if="exam.passed" class="exam-status passed">✓ 已通过</span>
              <span v-else-if="exam.attempted" class="exam-status attempted">重试</span>
              <span v-else-if="!exam.accessible" class="exam-status locked">🔒</span>
            </div>
            <p class="exam-desc">{{ exam.description }}</p>
            <div class="exam-meta">
              <span class="meta-item">⏱️ {{ exam.duration }}分钟</span>
              <span class="meta-item">📊 {{ exam.totalScore }}分</span>
              <span class="meta-item">📝 {{ exam.questionCount }}题</span>
            </div>
            <div v-if="exam.score !== undefined" class="exam-result">
              <span class="result-label">最高得分：</span>
              <span class="result-score" :class="{ passed: exam.score >= 60 }">{{ exam.score }}分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

const goToExam = (exam: any) => {
  if (!exam.accessible) {
    alert('请先完成前置学习才能参加此考核')
    return
  }
  router.push(`/exam/${exam.id}`)
}
</script>

<style scoped>
.exam-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  padding: 40px 16px;
  color: #fff;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.page-subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
}

.exam-content {
  padding: 16px;
}

.exam-stats {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.stat-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  font-size: 28px;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  color: #333;
}

.stat-label {
  font-size: 12px;
  color: #999;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.exam-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exam-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  opacity: 1;
}

.exam-card.locked {
  opacity: 0.7;
}

.exam-icon {
  font-size: 40px;
  flex-shrink: 0;
}

.exam-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.exam-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.exam-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.exam-status {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
}

.exam-status.passed {
  background: #e8f5e9;
  color: #4caf50;
}

.exam-status.attempted {
  background: #fff3e0;
  color: #ff9800;
}

.exam-status.locked {
  background: #f5f5f5;
  color: #999;
}

.exam-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.exam-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}

.meta-item {
  font-size: 13px;
  color: #999;
}

.exam-result {
  display: flex;
  align-items: center;
  gap: 6px;
}

.result-label {
  font-size: 13px;
  color: #999;
}

.result-score {
  font-size: 16px;
  font-weight: 600;
  color: #f44336;
}

.result-score.passed {
  color: #4caf5