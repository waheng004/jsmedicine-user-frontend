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
          <span cursor-pointer text-amber-800 font-bold>学员认证</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/profile')">我的</span>
        </nav>
        <div></div>
      </div>
    </header>

    <main pt-16>
      <div max-w-4xl mx-auto px-6 py-8>
        <div mb-8>
          <h1 text-2xl font-bold text-gray-900 mb-2>学员认证</h1>
          <p text-gray-500>完成认证后即可开始学习</p>
        </div>

        <div grid grid-cols-3 gap-8>
          <div col-span-2>
            <div bg-white rounded-xl shadow-sm p-8>
              <div flex justify-center mb-8>
                <div v-for="(step, index) in steps" :key="index" flex items-center>
                  <div flex flex-col items-center>
                    <div w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold :class="currentStep === index ? 'bg-amber-600 text-white' : currentStep > index ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'">
                      {{ index + 1 }}
                    </div>
                    <span mt-2 text-sm :class="currentStep >= index ? 'text-gray-900 font-medium' : 'text-gray-400'">{{ step }}</span>
                  </div>
                  <div v-if="index < steps.length - 1" w-20 h-1 mx-4 :class="currentStep > index ? 'bg-green-500' : 'bg-gray-200'" rounded-full></div>
                </div>
              </div>

              <div v-if="currentStep === 0">
                <h3 text-lg font-bold text-gray-900 mb-6>基本信息</h3>
                <form @submit.prevent="nextStep" class="space-y-6">
                  <div>
                    <label block text-sm font-medium text-gray-700 mb-2>真实姓名 *</label>
                    <input v-model="form.realName" type="text" px-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-xl outline-none focus="border-amber-500" placeholder="请输入真实姓名" required />
                  </div>
                  <div>
                    <label block text-sm font-medium text-gray-700 mb-2>身份证号 *</label>
                    <input v-model="form.idCard" type="text" px-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-xl outline-none focus="border-amber-500" placeholder="请输入身份证号" required />
                  </div>
                  <div>
                    <label block text-sm font-medium text-gray-700 mb-2>手机号 *</label>
                    <input v-model="form.phone" type="tel" px-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-xl outline-none focus="border-amber-500" placeholder="请输入手机号" required />
                  </div>
                  <button type="submit" w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl shadow-lg cursor-pointer hover="opacity-90">下一步 →</button>
                </form>
              </div>

              <div v-else-if="currentStep === 1">
                <h3 text-lg font-bold text-gray-900 mb-6>学历信息</h3>
                <form @submit.prevent="nextStep" class="space-y-6">
                  <div>
                    <label block text-sm font-medium text-gray-700 mb-2>最高学历 *</label>
                    <select v-model="form.education" px-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-xl outline-none focus="border-amber-500" required>
                      <option value="">请选择学历</option>
                      <option value="high">高中</option>
                      <option value="college">大专</option>
                      <option value="bachelor">本科</option>
                      <option value="master">硕士</option>
                      <option value="doctor">博士</option>
                    </select>
                  </div>
                  <div>
                    <label block text-sm font-medium text-gray-700 mb-2>毕业院校</label>
                    <input v-model="form.school" type="text" px-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-xl outline-none focus="border-amber-500" placeholder="请输入毕业院校" />
                  </div>
                  <div>
                    <label block text-sm font-medium text-gray-700 mb-2>专业</label>
                    <input v-model="form.major" type="text" px-4 py-3 w-full bg-gray-50 border border-gray-200 rounded-xl outline-none focus="border-amber-500" placeholder="请输入专业" />
                  </div>
                  <div flex gap-4>
                    <button type="button" flex-1 py-4 bg-gray-100 text-gray-600 font-semibold rounded-xl cursor-pointer hover="bg-gray-200" @click="prevStep">← 上一步</button>
                    <button type="submit" flex-1 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl shadow-lg cursor-pointer hover="opacity-90">下一步 →</button>
                  </div>
                </form>
              </div>

              <div v-else-if="currentStep === 2">
                <h3 text-lg font-bold text-gray-900 mb-6>上传证明材料</h3>
                <form @submit.prevent="submitCertify" class="space-y-6">
                  <div>
                    <label block text-sm font-medium text-gray-700 mb-2>身份证正面</label>
                    <div border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover="border-amber-500" @click="uploadIdCardFront">
                      <span text-4xl mb-3 block>{{ form.idCardFront ? '✓' : '📷' }}</span>
                      <span text-sm text-gray-600>{{ form.idCardFront ? '已上传' : '点击上传身份证正面' }}</span>
                    </div>
                  </div>
                  <div>
                    <label block text-sm font-medium text-gray-700 mb-2>身份证背面</label>
                    <div border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover="border-amber-500" @click="uploadIdCardBack">
                      <span text-4xl mb-3 block>{{ form.idCardBack ? '✓' : '📷' }}</span>
                      <span text-sm text-gray-600>{{ form.idCardBack ? '已上传' : '点击上传身份证背面' }}</span>
                    </div>
                  </div>
                  <div>
                    <label block text-sm font-medium text-gray-700 mb-2>学历证明（选填）</label>
                    <div border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover="border-amber-500" @click="uploadDiploma">
                      <span text-4xl mb-3 block>{{ form.diploma ? '✓' : '📄' }}</span>
                      <span text-sm text-gray-600>{{ form.diploma ? '已上传' : '点击上传学历证明' }}</span>
                    </div>
                  </div>
                  <div flex gap-4>
                    <button type="button" flex-1 py-4 bg-gray-100 text-gray-600 font-semibold rounded-xl cursor-pointer hover="bg-gray-200" @click="prevStep">← 上一步</button>
                    <button type="submit" flex-1 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl shadow-lg cursor-pointer hover="opacity-90">提交认证</button>
                  </div>
                </form>
              </div>

              <div v-else-if="currentStep === 3" text-center py-12>
                <span text-8xl mb-6 block>✅</span>
                <h3 text-2xl font-bold text-gray-900 mb-3>提交成功</h3>
                <p text-gray-600 mb-8>您的认证申请已提交，我们将在1-3个工作日内审核，请耐心等待。</p>
                <button py-4 px-8 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl shadow-lg cursor-pointer hover="opacity-90" @click="goHome">返回首页</button>
              </div>
            </div>
          </div>

          <div>
            <div bg-amber-50 rounded-xl p-6>
              <h4 text-base font-bold text-amber-800 mb-4>📌 认证须知</h4>
              <ul space-y-3 pl-4>
                <li text-sm text-gray-600 list-disc>认证信息需真实有效，虚假信息将影响认证结果</li>
                <li text-sm text-gray-600 list-disc>身份证照片需清晰完整，确保信息可辨认</li>
                <li text-sm text-gray-600 list-disc>认证通过后将获得学员身份，可参与学习和考核</li>
                <li text-sm text-gray-600 list-disc>如有疑问请联系客服</li>
              </ul>
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

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const steps = ['基本信息', '学历信息', '上传材料']
const currentStep = ref(0)

const form = reactive({
  realName: '',
  idCard: '',
  phone: '',
  education: '',
  school: '',
  major: '',
  idCardFront: '',
  idCardBack: '',
  diploma: ''
})

const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const uploadIdCardFront = () => {
  form.idCardFront = 'uploaded'
}

const uploadIdCardBack = () => {
  form.idCardBack = 'uploaded'
}

const uploadDiploma = () => {
  form.diploma = 'uploaded'
}

const submitCertify = () => {
  if (!form.idCardFront || !form.idCardBack) {
    alert('请上传身份证照片')
    return
  }
  nextStep()
}

const goHome = () => {
  router.push('/')
}
</script>
