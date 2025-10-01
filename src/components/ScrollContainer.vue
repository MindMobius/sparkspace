<template>
  <div class="scroll-container" ref="scrollContainer">
    <div class="scroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollContainer = ref<HTMLElement | null>(null)
const scrollPosition = ref(0)
const scrollHeight = ref(0)

const emit = defineEmits<{
  (e: 'scroll', position: number): void
}>()

const updateScrollPosition = () => {
  if (scrollContainer.value) {
    scrollPosition.value = scrollContainer.value.scrollTop
    scrollHeight.value = scrollContainer.value.scrollHeight - scrollContainer.value.clientHeight
    const progress = scrollPosition.value / scrollHeight.value

    // 发送自定义滚动事件给AnimationCanvas
    const customEvent = new CustomEvent('customScroll', {
      detail: { progress }
    })
    window.dispatchEvent(customEvent)

    // 同时emit给父组件
    emit('scroll', progress)
  }
}

// 添加滚轮事件监听器
const handleWheel = (e: WheelEvent) => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop += e.deltaY
    updateScrollPosition()
    e.preventDefault()
  }
}

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', updateScrollPosition)
    // 添加滚轮事件监听器
    window.addEventListener('wheel', handleWheel, { passive: false })
  }
})

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', updateScrollPosition)
    window.removeEventListener('wheel', handleWheel)
  }
})

defineExpose({
  scrollPosition,
  scrollHeight
})
</script>

<style scoped>
.scroll-container {
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

.scroll-content {
  height: 500vh; /* 使页面可以滚动 */
}
</style>
