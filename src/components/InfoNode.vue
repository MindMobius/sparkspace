<template>
  <div class="info-node" :class="{ visible: isVisible }">
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  content: string
  isVisible: boolean
}

defineProps<Props>()
</script>

<style scoped>
.info-node {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%) translateX(30px);
  width: 30%;
  padding: 30px;
  background: rgba(10, 10, 20, 0.85);
  color: #ffffff;
  border: 1px solid rgba(100, 150, 255, 0.3);
  border-radius: 8px;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 20;
  max-width: 450px;
}

.info-node.visible {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

.info-node h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 300;
  color: #e0f7ff;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.info-node p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #bbdefb;
  font-weight: 300;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .info-node {
    width: 70%;
    right: 15%;
    padding: 20px;
    border-radius: 6px;
  }

  .info-node h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  .info-node p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .info-node {
    width: 80%;
    right: 10%;
    padding: 15px;
  }

  .info-node h2 {
    font-size: 1.3rem;
  }

  .info-node p {
    font-size: 0.9rem;
  }
}
</style>
