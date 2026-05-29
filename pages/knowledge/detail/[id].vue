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
          <span cursor-pointer text-amber-800 font-bold>知识库</span>
        </nav>
        <div></div>
      </div>
    </header>

    <main pt-16>
      <div max-w-7xl mx-auto px-6 py-8>
        <div grid grid-cols-12 gap-8>
          <div col-span-8>
            <div bg-white rounded-xl shadow-sm>
              <div p-6 border-b border-gray-100>
                <div flex items-center gap-3 mb-4>
                  <span text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full>{{ knowledgeDetail.category }}</span>
                  <span text-xs text-gray-400>{{ knowledgeDetail.createdAt }}</span>
                  <span text-xs text-gray-400>👁 {{ knowledgeDetail.views }}次阅读</span>
                </div>
                <h1 text-2xl font-bold text-gray-900>{{ knowledgeDetail.title }}</h1>
              </div>

              <div p-6>
                <div prose max-w-none>
                  <h2 text-lg font-bold text-gray-900 mb-4>一、什么是中医体质辨识</h2>
                  <p text-gray-600 leading-relaxed mb-4>中医体质辨识是中医诊断的重要组成部分，通过望闻问切等方法，判断人体的体质类型，为个性化养生和治疗提供依据。</p>

                  <h2 text-lg font-bold text-gray-900 mb-4>二、中医体质的分类</h2>
                  <p text-gray-600 leading-relaxed mb-4>根据中医理论，人体体质主要分为以下九种：</p>

                  <div space-y-4>
                    <div p-4 bg-gray-50 rounded-xl>
                      <h3 text-base font-bold text-gray-800 mb-2>1. 平和质</h3>
                      <p text-sm text-gray-600>体质平和，阴阳平衡，身体健康，面色红润，精力充沛。</p>
                    </div>
                    <div p-4 bg-gray-50 rounded-xl>
                      <h3 text-base font-bold text-gray-800 mb-2>2. 阳虚质</h3>
                      <p text-sm text-gray-600>畏寒怕冷，手脚冰凉，面色苍白，喜热饮，大便稀溏。</p>
                    </div>
                    <div p-4 bg-gray-50 rounded-xl>
                      <h3 text-base font-bold text-gray-800 mb-2>3. 阴虚质</h3>
                      <p text-sm text-gray-600>怕热多汗，口干咽燥，手足心热，大便干结，舌红少苔。</p>
                    </div>
                    <div p-4 bg-gray-50 rounded-xl>
                      <h3 text-base font-bold text-gray-800 mb-2>4. 痰湿质</h3>
                      <p text-sm text-gray-600>体型肥胖，腹部肥满，胸闷痰多，肢体沉重，舌苔厚腻。</p>
                    </div>
                    <div p-4 bg-gray-50 rounded-xl>
                      <h3 text-base font-bold text-gray-800 mb-2>5. 湿热质</h3>
                      <p text-sm text-gray-600>面部油腻，口苦口臭，大便黏滞，小便短黄，易生痤疮。</p>
                    </div>
                  </div>

                  <h2 text-lg font-bold text-gray-900 mt-6 mb-4>三、体质辨识的方法</h2>
                  <p text-gray-600 leading-relaxed mb-4>中医体质辨识主要通过以下几个方面进行：</p>
                  <ul list-disc pl-6 space-y-2>
                    <li text-gray-600><span font-medium>望诊：</span>观察面色、舌苔、体型等</li>
                    <li text-gray-600><span font-medium>问诊：</span>询问饮食、睡眠、二便等情况</li>
                    <li text-gray-600><span font-medium>切诊：</span>通过脉象判断体质</li>
                  </ul>

                  <h2 text-lg font-bold text-gray-900 mt-6 mb-4>四、体质养生建议</h2>
                  <p text-gray-600 leading-relaxed mb-4>根据不同体质，采取相应的养生方法：</p>
                  <div grid grid-cols-2 gap-4>
                    <div p-4 bg-amber-50 rounded-xl>
                      <h4 text-sm font-bold text-amber-800>阳虚质</h4>
                      <p text-xs text-gray-600 mt-1>多吃温热食物，适当锻炼</p>
                    </div>
                    <div p-4 bg-emerald-50 rounded-xl>
                      <h4 text-sm font-bold text-emerald-800>阴虚质</h4>
                      <p text-xs text-gray-600 mt-1>多吃滋阴食物，避免辛辣</p>
                    </div>
                    <div p-4 bg-blue-50 rounded-xl>
                      <h4 text-sm font-bold text-blue-800>痰湿质</h4>
                      <p text-xs text-gray-600 mt-1>清淡饮食，加强运动</p>
                    </div>
                    <div p-4 bg-rose-50 rounded-xl>
                      <h4 text-sm font-bold text-rose-800>气虚质</h4>
                      <p text-xs text-gray-600 mt-1>补气健脾，适度锻炼</p>
                    </div>
                  </div>
                </div>

                <div mt-8 pt-6 border-t border-gray-200 flex items-center justify-between>
                  <button flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer :class="isFavorited ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'" @click="handleFavorite">
                    <span>{{ isFavorited ? '❤️' : '🤍' }}</span>
                    <span text-sm>{{ isFavorited ? '已收藏' : '收藏' }}</span>
                  </button>
                  <button flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg cursor-pointer hover:bg-amber-700 @click="handleShare">
                    <span>🔗</span>
                    <span text-sm>分享</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div col-span-4>
            <div sticky top-24 space-y-6>
              <div bg-white rounded-xl shadow-sm p-6>
                <h3 text-base font-bold text-gray-900 mb-4>相关知识</h3>
                <div space-y-3>
                  <div v-for="item in relatedKnowledge" :key="item.id" p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-amber-50 @click="$router.push(`/knowledge/detail/${item.id}`)">
                    <span text-sm text-gray-700>{{ item.title }}</span>
                  </div>
                </div>
              </div>

              <div bg-white rounded-xl shadow-sm p-6>
                <h3 text-base font-bold text-gray-900 mb-4>知识分类</h3>
                <div flex flex-wrap gap-2>
                  <span v-for="cat in categories" :key="cat" text-xs bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-amber-100>{{ cat }}</span>
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

const isFavorited = ref(false)

const knowledgeDetail = ref({
  id: '1',
  title: '中医体质辨识方法',
  category: '中医基础理论',
  createdAt: '2024-05-20',
  views: 1256
})

const relatedKnowledge = ref([
  { id: 'r1', title: '中医食疗养生指南' },
  { id: 'r2', title: '中药配伍禁忌' },
  { id: 'r3', title: '脉象诊断基础' }
])

const categories = ref([
  '中医基础理论', '中医诊断学', '中药学', '方剂学', '中医内科', '中医外科'
])

const handleFavorite = () => {
  isFavorited.value = !isFavorited.value
  alert(isFavorited.value ? '已收藏' : '已取消收藏')
}

const handleShare = () => {
  alert('分享链接已复制')
}
</script>
