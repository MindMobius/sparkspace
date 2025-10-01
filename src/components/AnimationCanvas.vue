<template>
  <div class="animation-canvas">
    <!-- 酷炫太空背景 -->
    <CosmicBackground />

    <!-- 3D地球 -->
    <Earth3D />

    <!-- 扁平化火箭元素 -->
    <div class="rocket-container" ref="rocketContainer">
      <img src="@/assets/flat-rocket.svg" alt="火箭" class="flat-rocket-icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Earth3D from './Earth3D.vue'
import CosmicBackground from './CosmicBackground.vue'

const rocketContainer = ref<HTMLDivElement | null>(null)

// 初始化动画属性 - 火箭从地球表面开始
let rocketX = -20
let rocketY = -300
let rocketScale = 0.2
let rocketRotation = 0

onMounted(() => {
  updateRocketPosition()

  // 监听自定义滚动事件
  window.addEventListener('customScroll', handleScroll as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('customScroll', handleScroll as EventListener)
})

// 更新火箭位置
const updateRocketPosition = () => {
  if (rocketContainer.value) {
    rocketContainer.value.style.transform = `translate(${rocketX}px, ${rocketY}px) scale(${rocketScale}) rotate(${rocketRotation}deg)`
  }
}

// 处理滚动事件
const handleScroll = (event: Event) => {
  const customEvent = event as CustomEvent
  const progress = customEvent.detail.progress

  // 根据滚动进度更新动画状态
  updateAnimationState(progress)

  // 更新显示
  updateRocketPosition()
}

// 根据进度更新动画状态
const updateAnimationState = (progress: number) => {
  // 限制进度在0-1之间
  progress = Math.max(0, Math.min(1, progress))

  // 火箭位置动画 - 分阶段
  if (progress <= 0.15) {
    // 0% -> 15%: 从地球表面起飞，由小变大
    const stageProgress = progress / 0.15
    rocketX = -20 + (30 * stageProgress)
    rocketY = -300 + (50 * stageProgress)
    rocketScale = 0.2 + (0.9 * stageProgress)
    rocketRotation = 0 + (5 * stageProgress)
  } else if (progress <= 0.45) {
    // 15% -> 45%: 突破大气层，继续变大并远离地球
    const stageProgress = (progress - 0.15) / 0.3
    rocketX = 10 + (100 * stageProgress)
    rocketY = -250 - (150 * stageProgress)
    rocketScale = 1.1 + (0.5 * stageProgress)
    rocketRotation = 5 + (10 * stageProgress)
  } else if (progress <= 0.75) {
    // 45% -> 75%: 进入轨道，保持较大尺寸
    const stageProgress = (progress - 0.45) / 0.3
    rocketX = 110 + (150 * stageProgress)
    rocketY = -400 - (100 * stageProgress)
    rocketScale = 1.6 - (0.3 * stageProgress)
    rocketRotation = 15 + (5 * stageProgress)
  } else {
    // 75% -> 100%: 轨道飞行，逐渐变小
    const stageProgress = (progress - 0.75) / 0.25
    rocketX = 260 + (100 * stageProgress)
    rocketY = -500 - (100 * stageProgress)
    rocketScale = 1.3 - (0.5 * stageProgress)
    rocketRotation = 20 + (5 * stageProgress)
  }
}
</script>

<style scoped>
.animation-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
}

.rocket-container {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 100px;
  height: 200px;
  transition: transform 0.1s ease-out;
}

.flat-rocket-icon {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
}

/* 响应式设计 */
@media (max-width: 768px) {
  .rocket-container {
    width: 80px;
    height: 160px;
  }
}
</style>
