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
        <div mb-8>
          <h1 text-2xl font-bold text-gray-900 mb-2>中医知识库</h1>
          <p text-gray-500>按分类查阅中医资料，学习专业知识</p>
        </div>

        <div grid grid-cols-12 gap-8>
          <div col-span-3>
            <div sticky top-24 bg-white rounded-xl shadow-sm p-6>
              <h3 text-lg font-bold text-gray-900 mb-4>知识分类</h3>
              <div space-y-2>
                <div v-for="category in categories" :key="category.id" flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors :class="activeCategory === category.id ? 'bg-amber-50' : ''" @click="activeCategory = category.id">
                  <span text-sm :class="activeCategory === category.id ? 'text-amber-800 font-medium' : 'text-gray-600'">{{ category.name }}</span>
                  <span text-xs bg-gray-100 px-2 py-0.5 rounded>{{ category.count }}</span>
                </div>
              </div>
            </div>
          </div>

          <div col-span-9>
            <div bg-white rounded-xl shadow-sm mb-6>
              <div p-4 border-b border-gray-100>
                <div relative>
                  <input v-model="searchKeyword" type="text" placeholder="搜索知识库内容..." px-4 py-2.5 w-full bg-gray-50 border border-gray-200 rounded-xl outline-none focus="border-amber-500 bg-white" />
                  <span absolute right-4 :top="1/2" :-translate-y="1/2" text-gray-400>🔍</span>
                </div>
              </div>

              <div p-6>
                <div v-for="item in filteredEntries" :key="item.id" flex gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-amber-50 cursor-pointer transition-colors @click="$router.push(`/knowledge/detail/${item.id}`)">
                  <div :class="item.coverBg" w-16 h-16 rounded-lg flex items-center justify-center text-2xl>{{ item.cover }}</div>
                  <div flex-1>
                    <h3 text-base font-bold text-gray-900 mb-1>{{ item.title }}</h3>
                    <p text-sm text-gray-500 mb-2 line-clamp-1>{{ item.summary }}</p>
                    <div flex items-center gap-3>
                      <span text-xs text-gray-400>{{ item.category }}</span>
                      <span text-xs text-gray-400>👁 {{ item.views }}次阅读</span>
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

const searchKeyword = ref('')
const activeCategory = ref('all')

const categories = ref([
  { id: 'all', name: '全部', count: 24 },
  { id: 'basic', name: '中医基础理论', count: 6 },
  { id: 'diagnosis', name: '中医诊断学', count: 4 },
  { id: 'herb', name: '中药学', count: 5 },
  { id: 'prescription', name: '方剂学', count: 4 },
  { id: 'internal', name: '中医内科', count: 3 },
  { id: 'surgery', name: '中医外科', count: 2 }
])

const entries = ref([
  { id: '1', title: '中医体质辨识方法', summary: '中医体质辨识是中医诊断的重要组成部分，通过望闻问切等方法判断人体体质类型。', category: '中医基础理论', views: 1256, cover: '📊', coverBg: 'bg-amber-100' },
  { id: '2', title: '望诊：面部诊断要点', summary: '通过观察面部色泽、形态等判断身体健康状况，是中医望诊的重要内容。', category: '中医诊断学', views: 896, cover: '👁', coverBg: 'bg-blue-100' },
  { id: '3', title: '人参的功效与应用', summary: '人参是常见的滋补中药，具有大补元气、补脾益肺、生津养血的功效。', category: '中药学', views: 1543, cover: '🌿', coverBg: 'bg-emerald-100' },
  { id: '4', title: '四君子汤的组成与功效', summary: '四君子汤是补气代表方，由人参、白术、茯苓、甘草组成。', category: '方剂学', views: 876, cover: '🏺', coverBg: 'bg-rose-100' },
  { id: '5', title: '慢性胃炎的中医治疗', summary: '慢性胃炎属于中医"胃脘痛"范畴，辨证施治效果显著。', category: '中医内科', views: 2034, cover: '🩺', coverBg: 'bg-amber-100' },
  { id: '6', title: '湿疹的中医外治法', summary: '湿疹中医称"湿疮"，采用中药外洗、湿敷等方法效果良好。', category: '中医外科', views: 1123, cover: '🧴', coverBg: 'bg-sky-100' }
])

const filteredEntries = computed(() => {
  let result = entries.value
  if (activeCategory.value !== 'all') {
    result = result.filter(e => e.category === categories.value.find(c => c.id === activeCategory.value)?.name)
  }
  if (searchKeyword.value) {
    result = result.filter(e => e.title.includes(searchKeyword.value) || e.summary.includes(searchKeyword.value))
  }
  return result
})
</script>
