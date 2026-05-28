<template>
  <span class="status-tag" :class="typeClass">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type StatusType = 'available' | 'busy' | 'default'

const props = defineProps<{
  text: string
  type?: StatusType
}>()

const typeClass = computed(() => {
  switch (props.type) {
    case 'available':
      return 'available'
    case 'busy':
      return 'busy'
    default:
      return 'default'
  }
})
</script>

<style scoped>
.status-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.status-tag.available {
  background: #e8f5e9;
  color: #4caf50;
}

.status-tag.busy {
  background: #fff3e0;
  color: #ff9800;
}

.status-tag.default {
  background: #f5f5f5;
  color: #666;
}
</style>
