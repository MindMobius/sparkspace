<template>
  <div class="particle-background" ref="containerRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const containerRef = ref<HTMLDivElement | null>(null)
const particles: Particle[] = []
let animationId: number
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

class Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string

  constructor() {
    this.x = Math.random() * window.innerWidth
    this.y = Math.random() * window.innerHeight
    this.size = Math.random() * 2 + 0.5
    this.speedX = Math.random() * 1 - 0.5
    this.speedY = Math.random() * 1 - 0.5
    this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > window.innerWidth || this.x < 0) this.speedX = -this.speedX
    if (this.y > window.innerHeight || this.y < 0) this.speedY = -this.speedY
  }

  draw() {
    if (ctx) {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

onMounted(() => {
  if (containerRef.value) {
    init()
    animate()
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})

const init = () => {
  canvas = document.createElement('canvas')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.position = 'absolute'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.zIndex = '0'

  ctx = canvas.getContext('2d')!
  containerRef.value!.appendChild(canvas)

  // 创建粒子
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle())
  }

  // 窗口大小调整
  window.addEventListener('resize', handleResize)
}

const handleResize = () => {
  if (canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  // 清空画布
  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 更新和绘制粒子
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
    }
  }
}
</script>

<style scoped>
.particle-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  overflow: hidden;
}
</style>
