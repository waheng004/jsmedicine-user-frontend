<template>
  <div class="discover-page">
    <div class="page-header">
      <h1 class="page-title">发现</h1>
      <p class="page-subtitle">探索中医养生之道</p>
    </div>
    
    <div class="discover-content">
      <div class="article-card">
        <h2 class="article-title">🌿 中医养生知识</h2>
        <div class="article-list">
          <div class="article-item">
            <div class="article-icon">🌱</div>
            <div class="article-info">
              <h3>春季养肝正当时</h3>
              <p>春季如何通过饮食和作息调理肝脏...</p>
            </div>
          </div>
          <div class="article-item">
            <div class="article-icon">🍵</div>
            <div class="article-info">
              <h3>中医茶饮养生</h3>
              <p>不同体质适合的茶饮推荐...</p>
            </div>
          </div>
          <div class="article-item">
            <div class="article-icon">🧘</div>
            <div class="article-info">
              <h3>八段锦入门教程</h3>
              <p>简单易学的养生功法...</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="tips-card">
        <h2 class="tips-title">💡 健康小贴士</h2>
        <div class="tips-content">
          <p>"春夏养阳，秋冬养阴"是中医养生的基本原则。根据季节变化调整生活方式，顺应自然规律，才能达到养生保健的目的。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.discover-page {
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

.discover-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-card, .tips-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.article-title, .tips-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #faf6f1;
  border-radius: 8px;
}

.article-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.article-info h3 {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.article-info p {
  font-size: 13px;
  color: #999;
  margin: 0;
}

.tips-content p {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin: 0;
}
</style>
