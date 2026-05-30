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
          <span cursor-pointer text-amber-800 font-bold>发现</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/exam')">在线考核</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/profile')">我的</span>
        </nav>
        <div></div>
      </div>
    </header>

    <main pt-16>
      <div max-w-7xl mx-auto px-6 py-8>
        <div mb-8>
          <h1 text-2xl font-bold text-gray-900 mb-2>发现</h1>
          <p text-gray-500>探索中医养生之道</p>
        </div>

        <div grid grid-cols-3 gap-6>
          <div col-span-2>
            <div bg-white rounded-xl shadow-sm p-6 mb-6>
              <h2 text-lg font-bold text-gray-900 mb-4>🌿 中医养生知识</h2>
              <div space-y-4>
                <div v-for="article in articles" :key="article.id" flex gap-4 p-4 bg-amber-50 rounded-xl cursor-pointer hover:bg-amber-100 transition-colors>
                  <div w-14 h-14 bg-white rounded-lg flex items-center justify-center text-2xl>{{ article.icon }}</div>
                  <div>
                    <h3 text-base font-bold text-gray-900 mb-1>{{ article.title }}</h3>
                    <p text-sm text-gray-600>{{ article.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div bg-gradient-to-r from-amber-600 to-amber-500 rounded-xl shadow-lg p-8 text-white>
              <h3 text-xl font-bold mb-4>💡 健康小贴士</h3>
              <p text-base opacity-90 leading-relaxed>"春夏养阳，秋冬养阴"是中医养生的基本原则。根据季节变化调整生活方式，顺应自然规律，才能达到养生保健的目的。</p>
            </div>
          </div>

          <div space-y-6>
            <div bg-white rounded-xl shadow-sm p-6>
              <h3 text-base font-bold text-gray-900 mb-4>📅 今日养生</h3>
              <div bg-amber-50 rounded-xl p-4>
                <div flex items-center gap-3 mb-3>
                  <span text-2xl>🌞</span>
                  <span text-sm font-medium text-gray-800>今日宜：</span>
                </div>
                <p text-sm text-gray-600>晨起散步，饮食清淡，保持心情舒畅</p>
              </div>
            </div>

            <div bg-white rounded-xl shadow-sm p-6>
              <h3 text-base font-bold text-gray-900 mb-4>🏆 健康成就</h3>
              <div space-y-3>
                <div flex items-center justify-between>
                  <span text-sm text-gray-600>连续学习</span>
                  <span text-sm font-bold text-amber-600>7天</span>
                </div>
                <div flex items-center justify-between>
                  <span text-sm text-gray-600>完成课程</span>
                  <span text-sm font-bold text-amber-600>12门</span>
                </div>
                <div flex items-center justify-between>
                  <span text-sm text-gray-600>获得证书</span>
                  <span text-sm font-bold text-amber-600>3个</span>
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

<script setup lang="ts">
import { ref } from 'vue'

const articles = ref([
  {
    id: 1,
    icon: '🌱',
    title: '春季养肝正当时',
    description: '春季如何通过饮食和作息调理肝脏...'
  },
  {
    id: 2,
    icon: '🍵',
    title: '中医茶饮养生',
    description: '不同体质适合的茶饮推荐...'
  },
  {
    id: 3,
    icon: '🧘',
    title: '八段锦入门教程',
    description: '简单易学的养生功法...'
  }
])
</script>
