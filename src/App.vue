<script setup lang="ts">
import { ref } from 'vue'
import ScrollContainer from './components/ScrollContainer.vue'
import AnimationCanvas from './components/AnimationCanvas.vue'
import InfoNode from './components/InfoNode.vue'

const scrollProgress = ref(0)

const handleScroll = (progress: number) => {
  scrollProgress.value = progress
  // 确保值在0-1之间
  if (scrollProgress.value < 0) scrollProgress.value = 0
  if (scrollProgress.value > 1) scrollProgress.value = 1
}
</script>

<template>
  <ScrollContainer @scroll="handleScroll">
    <AnimationCanvas>
      <!-- 初始状态 (0%) -->
      <InfoNode
        title="电循环，新纪元"
        content="星火空间“进化一号”"
        :is-visible="scrollProgress >= 0 && scrollProgress < 0.15"
      />

      <!-- 节点一：点火起飞 (~15%) -->
      <InfoNode
        title="一颗强大的“电核”"
        content="我们用高效的电动泵替代复杂的涡轮泵，大幅简化结构，将每一次发射成本降至新低。"
        :is-visible="scrollProgress >= 0.15 && scrollProgress < 0.45"
      />

      <!-- 节点二：突破大气 (~45%) -->
      <InfoNode
        title="90吨，雷霆推力"
        content="9台发动机并联，不仅提供强大的起飞推力，更通过冗余设计确保了任务的极致可靠性。"
        :is-visible="scrollProgress >= 0.45 && scrollProgress < 0.75"
      />

      <!-- 节点三：进入轨道 (~75%) -->
      <InfoNode
        title="精准入轨，部署未来"
        content="服务于通信、遥感、科研等多元化的太空探索任务。"
        :is-visible="scrollProgress >= 0.75 && scrollProgress < 0.95"
      />

      <!-- 最终状态 (100%) -->
      <InfoNode
        title="星火，点亮无限可能"
        content="[了解更多] [联系我们]"
        :is-visible="scrollProgress >= 0.95"
      />
    </AnimationCanvas>
  </ScrollContainer>

  <!-- 滚动提示 -->
  <div class="scroll-hint" v-if="scrollProgress < 0.05">
    <div class="mouse">
      <div class="wheel"></div>
    </div>
    <p>滚动查看</p>
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
  border: 2px solid white;
  border-radius: 20px;
  position: relative;
  margin-bottom: 10px;
}

.wheel {
  width: 4px;
  height: 10px;
  background: white;
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
