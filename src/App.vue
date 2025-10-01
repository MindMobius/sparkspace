<script setup lang="ts">
import { ref } from 'vue'
import ScrollContainer from './components/ScrollContainer.vue'
import AnimationCanvas from './components/AnimationCanvas.vue'
import CinematicTimeline from './components/CinematicTimeline.vue'

const scrollProgress = ref(0)

const handleScroll = (progress: number) => {
  scrollProgress.value = progress
}
</script>

<template>
  <ScrollContainer @scroll="handleScroll">
    <AnimationCanvas />
  </ScrollContainer>

  <!-- 电影感时间轴 -->
  <CinematicTimeline :progress="scrollProgress" />

  <!-- 滚动提示 -->
  <div class="scroll-hint" v-if="scrollProgress < 0.05">
    <div class="mouse">
      <div class="wheel"></div>
    </div>
    <p>滚动探索</p>
  </div>
</template>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  overflow: hidden;
}

/* 滚动提示 */
.scroll-hint {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  z-index: 100;
  opacity: 1;
  transition: opacity 1s ease;
}

.scroll-hint.fade-out {
  opacity: 0;
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  position: relative;
  margin-bottom: 10px;
}

.wheel {
  width: 4px;
  height: 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 2px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(-50%) translateY(0);
    opacity: 0;
  }
  50% {
    transform: translateX(-50%) translateY(15px);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(30px);
    opacity: 0;
  }
}

.scroll-hint p {
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}

/* Firefox */
* {
  scrollbar-width: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .scroll-hint {
    bottom: 20px;
  }

  .mouse {
    width: 25px;
    height: 40px;
  }

  .wheel {
    width: 3px;
    height: 8px;
  }
}
</style>
