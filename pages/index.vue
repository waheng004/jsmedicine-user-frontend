<template>
  <div min-h-screen bg-gray-50 text-gray-800 font-sans>
    <header fixed top-0 left-0 right-0 h-16 bg-white z-50 border-b border-gray-100 shadow-sm>
      <div max-w-7xl mx-auto h-full flex justify-between items-center px-6>
        <div flex items-center space-x-3 cursor-pointer @click="$router.push('/')">
          <span text-2xl>🪵</span>
          <span text-xl font-bold text-amber-900 tracking-wide>江苏中医在线</span>
        </div>

        <nav flex space-x-8 text-base>
          <span cursor-pointer text-amber-800 font-bold border-b-2 border-amber-800 pb-1>首页</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 transition-colors @click="$router.push('/topics')">专题学习</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 transition-colors @click="$router.push('/exam')">在线考核</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 transition-colors @click="$router.push('/knowledge')">知识库</span>
          <span cursor-pointer text-gray-500 hover:text-amber-800 transition-colors @click="$router.push('/consult')">咨询医师</span>
        </nav>

        <div flex items-center space-x-4>
          <span cursor-pointer text-gray-500 hover:text-amber-800 @click="$router.push('/login')">登录</span>
          <button bg-amber-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-amber-700 @click="$router.push('/consult')">在线问诊</button>
        </div>
      </div>
    </header>

    <main pt-16>
      <div max-w-7xl mx-auto px-6 py-8>
        <div grid grid-cols-12 gap-8>
          <div col-span-3>
            <div sticky top-24 bg-white rounded-xl shadow-sm p-6>
              <h3 text-lg font-bold text-gray-900 mb-4>功能导航</h3>
              <div space-y-3>
                <div flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors @click="$router.push('/topics')">
                  <span text-xl>📚</span>
                  <span text-sm font-medium>专题学习</span>
                </div>
                <div flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors @click="$router.push('/exam')">
                  <span text-xl>📝</span>
                  <span text-sm font-medium>在线考核</span>
                </div>
                <div flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors @click="$router.push('/knowledge')">
                  <span text-xl>🔍</span>
                  <span text-sm font-medium>知识库</span>
                </div>
                <div flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors @click="$router.push('/consult')">
                  <span text-xl>💬</span>
                  <span text-sm font-medium>咨询医师</span>
                </div>
              </div>

              <div mt-6 pt-6 border-t border-gray-100>
                <h3 text-sm font-bold text-gray-500 uppercase tracking-wider mb-3>快捷链接</h3>
                <div flex flex-wrap gap-2>
                  <span text-xs bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-amber-100>中医基础理论</span>
                  <span text-xs bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-amber-100>中药学</span>
                  <span text-xs bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-amber-100>方剂学</span>
                  <span text-xs bg-gray-100 px-2 py-1 rounded cursor-pointer hover:bg-amber-100>针灸推拿</span>
                </div>
              </div>
            </div>
          </div>

          <div col-span-9>
            <div mb-8>
              <div relative bg-gradient-to-r from-amber-700 to-amber-500 rounded-2xl p-8 text-white overflow-hidden>
                <div absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16></div>
                <div absolute right-20 bottom-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-10 mb-10></div>
                <h2 text-2xl font-bold mb-2>欢迎来到江苏中医在线</h2>
                <p text-amber-100 mb-4>传承中医文化，学习专业知识</p>
                <div relative flex items-center>
                  <input type="text" placeholder="搜索课程、医师或内容..." bg-white bg-opacity-20 rounded-full px-5 py-2.5 w-full max-w-md outline-none text-white placeholder-amber-200 border border-white border-opacity-30 focus="bg-opacity-30" />
                  <button absolute right-2 bg-white text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-amber-50>搜索</button>
                </div>
              </div>
            </div>

            <section mb-8>
              <div flex justify-between items-center mb-6>
                <h2 text-xl font-bold text-gray-900 flex items-center>
                  <span w-1 h-6 bg-amber-700 rounded mr-3></span>科室分类
                </h2>
              </div>
              <div grid grid-cols-8 gap-4>
                <div v-for="dept in departments" :key="dept.name" flex flex-col items-center p-4 rounded-xl hover:bg-amber-50 cursor-pointer transition-colors>
                  <span text-3xl mb-2>{{ dept.icon }}</span>
                  <span text-sm font-medium text-gray-700>{{ dept.name }}</span>
                </div>
              </div>
            </section>

            <section mb-8>
              <div flex justify-between items-center mb-6>
                <h2 text-xl font-bold text-gray-900 flex items-center>
                  <span w-1 h-6 bg-amber-700 rounded mr-3></span>推荐课程
                </h2>
                <span text-sm text-amber-600 cursor-pointer hover:text-amber-800 @click="$router.push('/topics')">查看更多 →</span>
              </div>
              <div grid grid-cols-3 gap-6>
                <div v-for="course in courses" :key="course.id" bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer>
                  <div :class="course.cover" h-36 flex items-center justify-center text-white text-4xl>{{ course.icon }}</div>
                  <div p-4>
                    <h3 text-sm font-bold text-gray-900 mb-1 truncate>{{ course.title }}</h3>
                    <p text-xs text-gray-500 mb-2>{{ course.lecturer }}</p>
                    <div flex justify-between items-center>
                      <span text-xs text-amber-600 font-medium>{{ course.students }}人在学</span>
                      <span v-if="course.progress" text-xs text-emerald-600>进度 {{ course.progress }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section mb-8>
              <div flex justify-between items-center mb-6>
                <h2 text-xl font-bold text-gray-900 flex items-center>
                  <span w-1 h-6 bg-amber-700 rounded mr-3></span>推荐医师
                </h2>
                <span text-sm text-amber-600 cursor-pointer hover:text-amber-800 @click="$router.push('/consult')">查看更多 →</span>
              </div>
              <div grid grid-cols-2 gap-4>
                <div v-for="doctor in doctors" :key="doctor.id" bg-white rounded-xl shadow-sm p-4 flex space-x-4 hover:shadow-md transition-shadow>
                  <div :class="doctor.avatarBg" w-16 h-16 rounded-full flex items-center justify-center text-2xl>{{ doctor.avatar }}</div>
                  <div flex-1>
                    <div flex items-center space-x-2 mb-1>
                      <h3 text-sm font-bold text-gray-900>{{ doctor.name }}</h3>
                      <span text-xs :class="doctor.badgeBg" :style="{ color: doctor.badgeColor }" px-2 py-0.5 rounded>{{ doctor.title }}</span>
                    </div>
                    <p text-xs text-gray-500 mb-1>{{ doctor.department }}</p>
                    <p text-xs text-gray-400 mb-2>擅长：{{ doctor.specialty }}</p>
                    <div flex justify-between items-center>
                      <span text-sm text-amber-600 font-medium>⭐ {{ doctor.rating }}</span>
                      <button v-if="doctor.available" bg-emerald-500 text-white text-xs px-3 py-1 rounded-full hover:bg-emerald-600>可预约</button>
                      <span v-else text-xs text-gray-400>暂不可预约</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div flex justify-between items-center mb-6>
                <h2 text-xl font-bold text-gray-900 flex items-center>
                  <span w-1 h-6 bg-amber-700 rounded mr-3></span>中医资讯
                </h2>
                <span text-sm text-amber-600 cursor-pointer hover:text-amber-800 @click="$router.push('/discover')">查看更多 →</span>
              </div>
              <div grid grid-cols-2 gap-6>
                <div v-for="article in articles" :key="article.id" bg-white rounded-xl shadow-sm p-4 flex space-x-4 hover:shadow-md transition-shadow cursor-pointer @click="$router.push(`/detail/${article.id}`)">
                  <div :class="article.coverBg" w-24 h-24 rounded-lg flex items-center justify-center text-2xl>{{ article.cover }}</div>
                  <div flex-1>
                    <h3 text-sm font-bold text-gray-900 mb-2 line-clamp-2>{{ article.title }}</h3>
                    <p text-xs text-gray-500 mb-2 line-clamp-2>{{ article.summary }}</p>
                    <div flex justify-between items-center>
                      <span text-xs text-gray-400>{{ article.date }}</span>
                      <span text-xs text-gray-400>👁 {{ article.views }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>

    <footer bg-gray-800 text-gray-300 mt-16>
      <div max-w-7xl mx-auto px-6 py-12>
        <div grid grid-cols-4 gap-8 mb-8>
          <div>
            <h3 text-white font-bold mb-4>关于我们</h3>
            <p text-sm>江苏凤凰优阅信息科技有限公司致力于中医文化的传承与推广，为用户提供专业的中医学习平台。</p>
          </div>
          <div>
            <h3 text-white font-bold mb-4>服务项目</h3>
            <ul text-sm space-y-2>
              <li cursor-pointer hover:text-amber-400 @click="$router.push('/topics')">专题学习</li>
              <li cursor-pointer hover:text-amber-400 @click="$router.push('/exam')">在线考核</li>
              <li cursor-pointer hover:text-amber-400 @click="$router.push('/knowledge')">知识库</li>
              <li cursor-pointer hover:text-amber-400 @click="$router.push('/consult')">在线咨询</li>
            </ul>
          </div>
          <div>
            <h3 text-white font-bold mb-4>帮助与支持</h3>
            <ul text-sm space-y-2>
              <li cursor-pointer hover:text-amber-400>使用手册</li>
              <li cursor-pointer hover:text-amber-400>常见问题</li>
              <li cursor-pointer hover:text-amber-400>意见反馈</li>
              <li cursor-pointer hover:text-amber-400>联系我们</li>
            </ul>
          </div>
          <div>
            <h3 text-white font-bold mb-4>联系方式</h3>
            <p text-sm>电话：400-888-9999</p>
            <p text-sm mt-2>邮箱：service@jszyzx.com</p>
            <p text-sm mt-2>地址：江苏省南京市鼓楼区</p>
          </div>
        </div>
        <div border-t border-gray-700 pt-8 text-center>
          <p text-sm>© 2022 江苏凤凰优阅信息科技有限公司 版权所有</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const departments = [
  { name: '内科', icon: '🩺' },
  { name: '妇科', icon: '🌸' },
  { name: '针灸', icon: '💉' },
  { name: '骨伤', icon: '🦴' },
  { name: '儿科', icon: '👶' },
  { name: '皮肤', icon: '🧴' },
  { name: '眼科', icon: '👁' },
  { name: '耳鼻喉', icon: '👂' }
]

const courses = [
  { id: 1, title: '中医基础理论入门', lecturer: '王明教授', students: 1234, icon: '📖', cover: 'bg-gradient-to-br from-blue-500 to-blue-600', progress: 75 },
  { id: 2, title: '针灸推拿实操课程', lecturer: '李华主任', students: 856, icon: '💆', cover: 'bg-gradient-to-br from-emerald-500 to-emerald-600', progress: null },
  { id: 3, title: '中药学详解', lecturer: '赵军教授', students: 2103, icon: '🌿', cover: 'bg-gradient-to-br from-amber-500 to-amber-600', progress: null }
]

const doctors = [
  { id: 1, name: '张明华', title: '主任医师', department: '中医内科', specialty: '消化系统疾病、慢性胃炎', rating: '4.9', avatar: '👨‍⚕️', avatarBg: 'bg-amber-100', badgeBg: 'bg-amber-100', badgeColor: '#92400e', available: true },
  { id: 2, name: '李婉清', title: '副主任医师', department: '中医妇科', specialty: '月经不调、痛经、更年期综合征', rating: '4.8', avatar: '👩‍⚕️', avatarBg: 'bg-rose-100', badgeBg: 'bg-rose-100', badgeColor: '#9f1239', available: true },
  { id: 3, name: '王建国', title: '主治医师', department: '针灸科', specialty: '颈椎病、腰椎间盘突出、面瘫', rating: '4.7', avatar: '👨‍⚕️', avatarBg: 'bg-blue-100', badgeBg: 'bg-blue-100', badgeColor: '#1e40af', available: false },
  { id: 4, name: '陈晓东', title: '主任医师', department: '骨伤科', specialty: '骨折、关节炎、跌打损伤', rating: '4.9', avatar: '👨‍⚕️', avatarBg: 'bg-emerald-100', badgeBg: 'bg-emerald-100', badgeColor: '#065f46', available: true }
]

const articles = [
  { id: 1, title: '中医养生：春季如何调理脾胃', summary: '春季是养生的好时节，本文介绍几种调理脾胃的方法...', date: '2022-11-20', views: 1256, cover: '🍃', coverBg: 'bg-emerald-100' },
  { id: 2, title: '针灸治疗失眠的效果观察', summary: '失眠是现代人常见的健康问题，针灸疗法作为一种非药物...', date: '2022-11-19', views: 896, cover: '😴', coverBg: 'bg-blue-100' },
  { id: 3, title: '中药煎煮的正确方法', summary: '中药煎煮是一门学问，正确的煎煮方法可以提高药效...', date: '2022-11-18', views: 1543, cover: '🏺', coverBg: 'bg-amber-100' },
  { id: 4, title: '女性冬季养生指南', summary: '冬季天气寒冷，女性朋友们需要注意保暖和养生...', date: '2022-11-17', views: 2034, cover: '❄️', coverBg: 'bg-sky-100' }
]
</script>
