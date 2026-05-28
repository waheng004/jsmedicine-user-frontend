# 中医在线小程序 - 需求规格说明书

## 1. 项目概述

### 1.1 项目背景
本项目为江苏凤凰优阅信息科技有限公司开发的「中医在线」小程序端，旨在为用户提供中医健康服务，包括资讯浏览、专题学习、在线考试、医师咨询、知识库查询等功能。

### 1.2 运行环境要求

| 类型 | 名称 | 版本 | 功能描述 |
|------|------|------|----------|
| PC服务器 | PC服务器 | CPU 4核、内存8G以上 | 应用程序、数据载体 |
| 服务器操作系统 | Linux centos | 7.3及以上版本 | 运行应用程序服务器和数据库程序 |
| 数据库 | MySQL | 5.0以上 | 数据存储 |
| 应用程序服务器 | Nginx | 1.14.0 | 发布并运行应用程序 |
| 浏览器 | Chrome浏览器 | 72.0.3626及以上 | 访问应用程序 |

---

## 2. 功能需求

### 2.1 用户登录模块

| 需求编号 | 功能点 | 描述 | 状态 |
|----------|--------|------|------|
| REQ-001 | 微信授权登录 | 用户点击授权登录，允许授权则登录成功，首次登录自动注册 | 已实现 |
| REQ-002 | 密码登录 | 支持手机号+密码登录 | 已实现 |
| REQ-003 | 短信验证码登录 | 支持手机号+验证码登录 | 已实现 |

### 2.2 个人中心模块

| 需求编号 | 功能点 | 描述 | 状态 |
|----------|--------|------|------|
| REQ-004 | 用户信息展示 | 显示用户头像、姓名、角色 | 已实现 |
| REQ-005 | 学员认证 | 通过认证后成为学员，可进行学习 | 待实现 |
| REQ-006 | 我的收藏 | 查看收藏的资讯、专题等内容 | 待实现 |
| REQ-007 | 浏览记录 | 查看浏览历史 | 待实现 |
| REQ-008 | 使用手册 | 查看系统使用手册 | 待实现 |
| REQ-009 | 我的预约 | 查看预约记录 | 已实现入口 |
| REQ-010 | 就诊记录 | 查看就诊历史 | 已实现入口 |
| REQ-011 | 设置 | 系统设置入口 | 已实现入口 |
| REQ-012 | 退出登录 | 安全退出系统 | 已实现 |

### 2.3 首页模块

| 需求编号 | 功能点 | 描述 | 状态 |
|----------|--------|------|------|
| REQ-013 | 轮播图 | 展示中医相关宣传横幅 | 已实现 |
| REQ-014 | 科室分类 | 展示各科室入口 | 已实现 |
| REQ-015 | 推荐名医 | 展示推荐医生列表 | 已实现 |
| REQ-016 | 关键词搜索 | 支持医生、科室、病症搜索 | 已实现 |
| REQ-017 | 资讯列表 | 浏览中医药相关资讯 | 待实现 |

### 2.4 专题学习模块

| 需求编号 | 功能点 | 描述 | 状态 |
|----------|--------|------|------|
| REQ-018 | 专题列表 | 展示专题学习入口 | 待实现 |
| REQ-019 | 专题详情 | 显示专题学习要求、图书列表、视频列表 | 待实现 |
| REQ-020 | 视频学习 | 视频播放页面，支持视频学习 | 待实现 |
| REQ-021 | 音频学习 | 音频播放页面，支持音频学习 | 待实现 |

### 2.5 考核模块

| 需求编号 | 功能点 | 描述 | 状态 |
|----------|--------|------|------|
| REQ-022 | 试卷列表 | 展示可参与的考核试卷 | 待实现 |
| REQ-023 | 答题页面 | 支持单选、多选、填空题答题 | 待实现 |
| REQ-024 | 自动判分 | 答题完成后系统自动判分 | 待实现 |
| REQ-025 | 答题结果 | 展示答题结果和成绩 | 待实现 |

### 2.6 咨询模块

| 需求编号 | 功能点 | 描述 | 状态 |
|----------|--------|------|------|
| REQ-026 | 医师列表 | 根据分类展示不同医师 | 已实现 |
| REQ-027 | 医师详情 | 查看医师详细信息 | 已实现 |
| REQ-028 | 在线咨询 | 与医师进行在线对话 | 待实现 |
| REQ-029 | 预约挂号 | 预约医师门诊 | 已实现入口 |

### 2.7 知识库模块

| 需求编号 | 功能点 | 描述 | 状态 |
|----------|--------|------|------|
| REQ-030 | 分类目录 | 按中医基础理论、中医诊断学、中药学、方剂学、中医内科、中医外科、四大经典等分类 | 待实现 |
| REQ-031 | 内容检索 | 支持关键词检索，方便资料查阅 | 待实现 |
| REQ-032 | 内容详情 | 展示知识内容详情 | 待实现 |

### 2.8 资讯详情模块

| 需求编号 | 功能点 | 描述 | 状态 |
|----------|--------|------|------|
| REQ-033 | 资讯详情展示 | 展示资讯完整内容 | 待实现 |
| REQ-034 | 收藏功能 | 收藏/取消收藏资讯 | 待实现 |
| REQ-035 | 分享功能 | 分享资讯到微信 | 待实现 |

### 2.9 消息模块

| 需求编号 | 功能点 | 描述 | 状态 |
|----------|--------|------|------|
| REQ-036 | 消息列表 | 展示系统消息、医师消息 | 已实现 |
| REQ-037 | 未读提示 | 显示未读消息数量 | 已实现 |

---

## 3. 页面结构

```
/pages
├── index.vue                    # 首页
├── login.vue                    # 登录页
├── profile.vue                  # 个人中心
├── discover.vue                 # 发现页
├── search.vue                   # 搜索页
├── message.vue                  # 消息页
├── detail/[id].vue              # 医生详情页
├── topics/                      # 专题学习模块
│   ├── index.vue                # 专题列表
│   └── [id].vue                 # 专题详情
├── exam/                        # 考核模块
│   ├── index.vue                # 试卷列表
│   └── [id].vue                 # 答题页面
├── knowledge/                   # 知识库模块
│   ├── index.vue                # 知识分类
│   └── [id].vue                 # 知识详情
├── favorites.vue                # 我的收藏
├── records.vue                  # 浏览记录
├── settings.vue                 # 设置页
└── consult/[id].vue             # 咨询对话页
```

---

## 4. 技术架构

### 4.1 框架与依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| Nuxt.js | 3.x | 前端框架 |
| Vue.js | 3.x | UI框架 |
| TypeScript | 5.x | 类型安全 |
| Pinia | 2.x | 状态管理 |
| Tailwind CSS | 3.x | 样式框架 |

### 4.2 目录结构

```
/
├── .nuxt/                       # Nuxt构建输出
├── assets/                      # 静态资源
│   └── css/                     # 样式文件
├── components/                  # 公共组件
├── composables/                 # 组合式函数
├── layouts/                     # 布局组件
├── pages/                       # 页面组件
├── stores/                      # Pinia状态管理
├── utils/                       # 工具函数
│   └── api/                     # API接口封装
├── app.vue                      # 根组件
├── nuxt.config.ts               # Nuxt配置
├── tsconfig.json                # TypeScript配置
└── tailwind.config.js           # Tailwind配置
```

---

## 5. 接口规范

### 5.1 认证相关

| 接口 | 方法 | 描述 |
|------|------|------|
| /api/login | POST | 用户登录 |
| /api/logout | POST | 用户退出 |
| /api/sms/send | POST | 发送验证码 |

### 5.2 用户相关

| 接口 | 方法 | 描述 |
|------|------|------|
| /api/user/info | GET | 获取用户信息 |
| /api/user/certify | POST | 学员认证 |
| /api/user/favorites | GET | 获取收藏列表 |
| /api/user/history | GET | 获取浏览记录 |

### 5.3 首页相关

| 接口 | 方法 | 描述 |
|------|------|------|
| /api/home/banners | GET | 获取轮播图 |
| /api/home/articles | GET | 获取资讯列表 |
| /api/home/topics | GET | 获取专题列表 |

### 5.4 医生相关

| 接口 | 方法 | 描述 |
|------|------|------|
| /api/doctor/list | GET | 获取医生列表 |
| /api/doctor/[id] | GET | 获取医生详情 |

### 5.5 专题学习

| 接口 | 方法 | 描述 |
|------|------|------|
| /api/topic/list | GET | 获取专题列表 |
| /api/topic/[id] | GET | 获取专题详情 |
| /api/video/list | GET | 获取视频列表 |
| /api/audio/list | GET | 获取音频列表 |

### 5.6 考核相关

| 接口 | 方法 | 描述 |
|------|------|------|
| /api/exam/list | GET | 获取试卷列表 |
| /api/exam/[id] | GET | 获取试卷详情 |
| /api/exam/submit | POST | 提交答案 |

### 5.7 知识库

| 接口 | 方法 | 描述 |
|------|------|------|
| /api/knowledge/categories | GET | 获取分类目录 |
| /api/knowledge/list | GET | 获取知识列表 |
| /api/knowledge/[id] | GET | 获取知识详情 |

### 5.8 咨询相关

| 接口 | 方法 | 描述 |
|------|------|------|
| /api/consult/send | POST | 发送消息 |
| /api/consult/history | GET | 获取对话历史 |

---

## 6. 数据模型

### 6.1 用户模型

```typescript
interface User {
  id: string
  name: string
  avatar: string
  phone: string
  role: 'user' | 'student' | 'doctor'
  isCertified: boolean
  createdAt: string
}
```

### 6.2 医生模型

```typescript
interface Doctor {
  id: string
  name: string
  avatar: string
  title: string
  department: string
  specialty: string
  rating: number
  experience: number
  patients: number
  introduction: string
  specialties: string[]
  status: '可预约' | '调理中' | '休息中'
}
```

### 6.3 专题模型

```typescript
interface Topic {
  id: string
  title: string
  description: string
  coverImage: string
  requirements: string
  books: Book[]
  videos: Video[]
  audios: Audio[]
}
```

### 6.4 试卷模型

```typescript
interface Exam {
  id: string
  title: string
  description: string
  duration: number
  totalScore: number
  questions: Question[]
}

interface Question {
  id: string
  type: 'single' | 'multiple' | 'fill'
  content: string
  options?: string[]
  answer: string | string[]
  score: number
}
```

### 6.5 知识模型

```typescript
interface Knowledge {
  id: string
  category: string
  title: string
  content: string
  createdAt: string
}
```

---

## 7. 安全要求

| 需求编号 | 安全要求 | 描述 |
|----------|----------|------|
| SEC-001 | Token验证 | 所有接口请求需携带有效Token |
| SEC-002 | 密码加密 | 用户密码需加密存储和传输 |
| SEC-003 | 敏感信息保护 | 手机号、身份证等敏感信息脱敏处理 |
| SEC-004 | 输入验证 | 前端需对用户输入进行合法性验证 |
| SEC-005 | XSS防护 | 防止跨站脚本攻击 |

---

## 8. 性能要求

| 需求编号 | 性能指标 | 描述 |
|----------|----------|------|
| PERF-001 | 页面加载时间 | 首屏加载时间≤3秒 |
| PERF-002 | 接口响应时间 | 接口响应时间≤1秒 |
| PERF-003 | 图片优化 | 图片资源压缩，支持WebP格式 |
| PERF-004 | 缓存策略 | 合理使用缓存，减少重复请求 |

---

## 9. 兼容性要求

| 需求编号 | 兼容要求 | 描述 |
|----------|----------|------|
| COMP-001 | 微信小程序 | 支持微信小程序端运行 |
| COMP-002 | 移动端适配 | 支持iOS和Android移动端 |
| COMP-003 | 浏览器兼容 | 支持Chrome 72+、Safari等主流浏览器 |

---

**文档版本**: v1.0  
**创建日期**: 2026-05-28  
**编制单位**: 江苏凤凰优阅信息科技有限公司