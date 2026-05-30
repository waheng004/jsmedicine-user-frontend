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
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/profile')">我的</span>
          <span cursor-pointer text-amber-800 font-bold>设置</span>
        </nav>
        <div></div>
      </div>
    </header>

    <main pt-16>
      <div max-w-2xl mx-auto px-6 py-8>
        <div mb-8>
          <h1 text-2xl font-bold text-gray-900 mb-2>设置</h1>
          <p text-gray-500>管理您的账户和偏好设置</p>
        </div>

        <div bg-white rounded-xl shadow-sm mb-6>
          <div p-4 border-b border-gray-100>
            <h3 text-base font-bold text-gray-900>账户设置</h3>
          </div>
          <div space-y-1>
            <div flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors @click="handleNotification">
              <div flex items-center gap-3>
                <span text-xl>🔔</span>
                <span text-gray-700>消息通知</span>
              </div>
              <span text-gray-400>›</span>
            </div>
            <div flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors @click="handlePrivacy">
              <div flex items-center gap-3>
                <span text-xl>🔒</span>
                <span text-gray-700>隐私设置</span>
              </div>
              <span text-gray-400>›</span>
            </div>
            <div flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors @click="handleSecurity">
              <div flex items-center gap-3>
                <span text-xl>🔑</span>
                <span text-gray-700>账号安全</span>
              </div>
              <span text-gray-400>›</span>
            </div>
          </div>
        </div>

        <div bg-white rounded-xl shadow-sm mb-6>
          <div p-4 border-b border-gray-100>
            <h3 text-base font-bold text-gray-900>应用设置</h3>
          </div>
          <div space-y-1>
            <div flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors @click="handleClearCache">
              <div flex items-center gap-3>
                <span text-xl>🗑️</span>
                <span text-gray-700>清除缓存</span>
              </div>
              <span text-gray-400>›</span>
            </div>
          </div>
        </div>

        <div bg-white rounded-xl shadow-sm mb-6>
          <div p-4 border-b border-gray-100>
            <h3 text-base font-bold text-gray-900>帮助与反馈</h3>
          </div>
          <div space-y-1>
            <div flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors @click="handleFeedback">
              <div flex items-center gap-3>
                <span text-xl>💬</span>
                <span text-gray-700>意见反馈</span>
              </div>
              <span text-gray-400>›</span>
            </div>
            <div flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors @click="handleAbout">
              <div flex items-center gap-3>
                <span text-xl>ℹ️</span>
                <span text-gray-700>关于我们</span>
              </div>
              <span text-gray-400>›</span>
            </div>
          </div>
        </div>

        <div bg-white rounded-xl shadow-sm p-4 text-center>
          <p text-sm text-gray-500>版本号：1.0.0</p>
          <p text-xs text-gray-400 mt-1>江苏凤凰优阅信息科技有限公司</p>
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
const handleNotification = () => {
  alert('消息通知设置功能开发中')
}

const handlePrivacy = () => {
  alert('隐私设置功能开发中')
}

const handleSecurity = () => {
  alert('账号安全设置功能开发中')
}

const handleClearCache = () => {
  if (confirm('确定要清除缓存吗？')) {
    alert('缓存已清除')
  }
}

const handleFeedback = () => {
  alert('意见反馈功能开发中')
}

const handleAbout = () => {
  alert('关于我们功能开发中')
}
</script>
