<template>
  <div class="certify-page">
    <div class="page-header">
      <h1 class="page-title">学员认证</h1>
      <p class="page-subtitle">完成认证后即可开始学习</p>
    </div>
    
    <div class="certify-content">
      <div class="certify-card">
        <div class="step-indicator">
          <div 
            v-for="(step, index) in steps" 
            :key="index"
            class="step-item"
            :class="{ active: currentStep === index, completed: currentStep > index }"
          >
            <span class="step-number">{{ index + 1 }}</span>
            <span class="step-label">{{ step }}</span>
          </div>
        </div>
        
        <div v-if="currentStep === 0" class="form-section">
          <h3 class="section-title">基本信息</h3>
          <form @submit.prevent="nextStep" class="certify-form">
            <div class="form-group">
              <label class="form-label">真实姓名 *</label>
              <input 
                v-model="form.realName" 
                type="text" 
                class="form-input" 
                placeholder="请输入真实姓名"
                required
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">身份证号 *</label>
              <input 
                v-model="form.idCard" 
                type="text" 
                class="form-input" 
                placeholder="请输入身份证号"
                required
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">手机号 *</label>
              <input 
                v-model="form.phone" 
                type="tel" 
                class="form-input" 
                placeholder="请输入手机号"
                required
              />
            </div>
            
            <button type="submit" class="submit-btn">下一步 →</button>
          </form>
        </div>
        
        <div v-else-if="currentStep === 1" class="form-section">
          <h3 class="section-title">学历信息</h3>
          <form @submit.prevent="nextStep" class="certify-form">
            <div class="form-group">
              <label class="form-label">最高学历 *</label>
              <select v-model="form.education" class="form-input" required>
                <option value="">请选择学历</option>
                <option value="high">高中</option>
                <option value="college">大专</option>
                <option value="bachelor">本科</option>
                <option value="master">硕士</option>
                <option value="doctor">博士</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">毕业院校</label>
              <input 
                v-model="form.school" 
                type="text" 
                class="form-input" 
                placeholder="请输入毕业院校"
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">专业</label>
              <input 
                v-model="form.major" 
                type="text" 
                class="form-input" 
                placeholder="请输入专业"
              />
            </div>
            
            <div class="btn-group">
              <button type="button" class="back-btn" @click="prevStep">← 上一步</button>
              <button type="submit" class="submit-btn">下一步 →</button>
            </div>
          </form>
        </div>
        
        <div v-else-if="currentStep === 2" class="form-section">
          <h3 class="section-title">上传证明材料</h3>
          <form @submit.prevent="submitCertify" class="certify-form">
            <div class="upload-group">
              <label class="upload-label">
                <div class="upload-box" @click="uploadIdCardFront">
                  <span class="upload-icon">📷</span>
                  <span class="upload-text">身份证正面</span>
                  <span v-if="form.idCardFront" class="upload-hint">已上传</span>
                </div>
              </label>
            </div>
            
            <div class="upload-group">
              <label class="upload-label">
                <div class="upload-box" @click="uploadIdCardBack">
                  <span class="upload-icon">📷</span>
                  <span class="upload-text">身份证背面</span>
                  <span v-if="form.idCardBack" class="upload-hint">已上传</span>
                </div>
              </label>
            </div>
            
            <div class="upload-group">
              <label class="upload-label">
                <div class="upload-box" @click="uploadDiploma">
                  <span class="upload-icon">📄</span>
                  <span class="upload-text">学历证明（选填）</span>
                  <span v-if="form.diploma" class="upload-hint">已上传</span>
                </div>
              </label>
            </div>
            
            <div class="btn-group">
              <button type="button" class="back-btn" @click="prevStep">← 上一步</button>
              <button type="submit" class="submit-btn">提交认证</button>
            </div>
          </form>
        </div>
        
        <div v-else-if="currentStep === 3" class="success-section">
          <div class="success-icon">✅</div>
          <h3 class="success-title">提交成功</h3>
          <p class="success-desc">您的认证申请已提交，我们将在1-3个工作日内审核，请耐心等待。</p>
          <button class="back-home-btn" @click="goHome">返回首页</button>
        </div>
      </div>
      
      <div class="certify-tips">
        <h4 class="tips-title">📌 认证须知</h4>
        <ul class="tips-list">
          <li>认证信息需真实有效，虚假信息将影响认证结果</li>
          <li>身份证照片需清晰完整，确保信息可辨认</li>
          <li>认证通过后将获得学员身份，可参与学习和考核</li>
          <li>如有疑问请联系客服</li>
        </ul>
      </div>
    </div>
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

<style scoped>
.certify-page {
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

.certify-content {
  padding: 16px;
}

.certify-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
}

.step-indicator {
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.step-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
  color: #999;
  transition: all 0.3s;
}

.step-item.active .step-number {
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
}

.step-item.completed .step-number {
  background: #4caf50;
  color: #fff;
}

.step-label {
  font-size: 12px;
  color: #999;
}

.step-item.active .step-label,
.step-item.completed .step-label {
  color: #333;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.certify-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #c19660;
}

.submit-btn {
  padding: 14px;
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.btn-group {
  display: flex;
  gap: 12px;
}

.back-btn {
  flex: 1;
  padding: 14px;
  background: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.success-section {
  text-align: center;
}

.success-icon {
  font-size: 80px;
  margin-bottom: 16px;
}

.success-title {
  font-size: 22px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
}

.success-desc {
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
}

.back-home-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #d4a574 0%, #c19660 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.certify-tips {
  background: #fff3e0;
  border-radius: 12px;
  padding: 16px;
}

.tips-title {
  font-size: 14px;
  font-weight: 600;
  color: #ff9800;
  margin: 0 0 12px 0;
}

.tips-list {
  margin: 0;
  padding-left: 20px;
}

.tips-list li {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}

.tips-list li:last-child {
  margin-bottom: 0;
}

.upload-group {
  margin-bottom: 16px;
}

.upload-label {
  cursor: pointer;
}

.upload-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  border: 2px dashed #e0e0e0;
  border-radius: 12px;
  background: #fafafa;
  transition: all 0.3s;
}

.upload-box:hover {
  border-color: #c19660;
}

.upload-icon {
  font-size: 32px;
}

.upload-text {
  font-size: 14px;
  color: #333;
}

.upload-hint {
  font-size: 12px;
  color: #4caf50;
}
</style>