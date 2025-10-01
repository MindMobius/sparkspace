<template>
  <div class="cinematic-timeline">
    <!-- 时间轴轨道 -->
    <div class="timeline-track">
      <div class="track-progress" :style="{ width: progress * 100 + '%' }"></div>
      <div class="track-glow"></div>
    </div>

    <!-- 时间轴节点 -->
    <div class="timeline-nodes">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="timeline-node"
        :class="{ active: index === currentStep, past: index < currentStep }"
        :style="{ left: (index * 25) + '%' }"
      >
        <div class="node-wrapper">
          <div class="node-glow"></div>
          <div class="node-core"></div>
          <div class="node-pulse" v-if="index === currentStep"></div>
        </div>
        <div class="node-label">{{ step.label }}</div>
      </div>
    </div>

    <!-- 当前阶段内容 -->
    <div class="current-content" v-if="currentStepInfo">
      <div class="content-wrapper">
        <h2 class="content-title">{{ currentStepInfo.title }}</h2>
        <p class="content-text">{{ currentStepInfo.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface TimelineStep {
  label: string
  title: string
  content: string
}

const props = defineProps<{
  progress: number
}>()

const steps = ref<TimelineStep[]>([
  {
    label: '发射',
    title: '电循环，新纪元',
    content: '星火空间“进化一号”'
  },
  {
    label: '起飞',
    title: '一颗强大的“电核”',
    content: '我们用高效的电动泵替代复杂的涡轮泵，大幅简化结构，将每一次发射成本降至新低。'
  },
  {
    label: '突破',
    title: '90吨，雷霆推力',
    content: '9台发动机并联，不仅提供强大的起飞推力，更通过冗余设计确保了任务的极致可靠性。'
  },
  {
    label: '入轨',
    title: '精准入轨，部署未来',
    content: '服务于通信、遥感、科研等多元化的太空探索任务。'
  }
])

const currentStep = computed(() => {
  const progress = Math.max(0, Math.min(1, props.progress))
  if (progress < 0.25) return 0
  if (progress < 0.5) return 1
  if (progress < 0.75) return 2
  return 3
})

const currentStepInfo = computed(() => {
  return steps.value[currentStep.value]
})
</script>

<style scoped>
.cinematic-timeline {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 20;
  overflow: hidden;
}

/* 时间轴轨道 */
.timeline-track {
  position: absolute;
  top: 50%;
  left: 10%;
  width: 80%;
  height: 2px;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  overflow: hidden;
}

.track-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  box-shadow: 0 0 10px rgba(79, 172, 254, 0.5);
  transition: width 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.track-glow {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 20px;
  transform: translateY(-50%);
  background: linear-gradient(90deg,
    transparent,
    rgba(79, 172, 254, 0.1),
    transparent);
  filter: blur(5px);
}

/* 时间轴节点 */
.timeline-nodes {
  position: absolute;
  top: 50%;
  left: 10%;
  width: 80%;
  height: 20px;
  transform: translateY(-50%);
}

.timeline-node {
  position: absolute;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.node-wrapper {
  position: relative;
  width: 16px;
  height: 16px;
  margin-bottom: 10px;
}

.node-core {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.timeline-node.past .node-core {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  box-shadow: 0 0 15px rgba(79, 172, 254, 0.7);
}

.timeline-node.active .node-core {
  background: linear-gradient(135deg, #ffffff, #4facfe);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  transform: scale(1.3);
}

.node-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(79, 172, 254, 0.3), transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.timeline-node.past .node-glow,
.timeline-node.active .node-glow {
  opacity: 1;
}

.node-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent 70%);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.7;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0.3;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

.node-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
  white-space: nowrap;
}

.timeline-node.past .node-label,
.timeline-node.active .node-label {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
}

.timeline-node.active .node-label {
  transform: scale(1.1);
}

/* 当前阶段内容 */
.current-content {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  max-width: 800px;
  text-align: center;
  opacity: 0;
  animation: fadeIn 0.8s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.content-wrapper {
  background: rgba(10, 15, 30, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px 40px;
  border: 1px solid rgba(100, 150, 255, 0.2);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.content-title {
  font-size: 28px;
  font-weight: 300;
  color: #e0f7ff;
  margin: 0 0 15px 0;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(79, 172, 254, 0.5);
}

.content-text {
  font-size: 16px;
  line-height: 1.7;
  color: #bbdefb;
  font-weight: 300;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .timeline-track {
    left: 5%;
    width: 90%;
  }

  .timeline-nodes {
    left: 5%;
    width: 90%;
  }

  .current-content {
    width: 90%;
    bottom: 80px;
  }

  .content-wrapper {
    padding: 20px 25px;
    border-radius: 15px;
  }

  .content-title {
    font-size: 22px;
  }

  .content-text {
    font-size: 14px;
  }

  .node-label {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .current-content {
    bottom: 60px;
  }

  .content-wrapper {
    padding: 15px 20px;
  }

  .content-title {
    font-size: 18px;
  }

  .content-text {
    font-size: 12px;
  }

  .node-label {
    font-size: 10px;
  }
}
</style>
