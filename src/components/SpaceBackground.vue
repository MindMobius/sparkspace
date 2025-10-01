<template>
  <div class="space-background" ref="containerRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let stars: THREE.Points
let animationId: number

// 星空粒子
const starVertices: number[] = []
const starColors: number[] = []

// 生成星空粒子
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = (Math.random() - 0.5) * 2000
  starVertices.push(x, y, z)

  // 随机星体颜色
  const color = Math.random() > 0.7 ? 0xffffff :
                Math.random() > 0.5 ? 0xffff00 :
                Math.random() > 0.3 ? 0x00ffff : 0xffffff
  const colorObj = new THREE.Color(color)
  starColors.push(colorObj.r, colorObj.g, colorObj.b)
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
  if (renderer) {
    renderer.dispose()
  }
})

const init = () => {
  // 创建场景
  scene = new THREE.Scene()

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  )
  camera.position.z = 50

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(containerRef.value!.clientWidth, containerRef.value!.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value!.appendChild(renderer.domElement)

  // 创建星空
  createStars()

  // 窗口大小调整
  window.addEventListener('resize', onWindowResize)
}

const createStars = () => {
  const starGeometry = new THREE.BufferGeometry()
  const starMaterial = new THREE.PointsMaterial({
    size: 1.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.9
  })

  starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starVertices, 3)
  )

  starGeometry.setAttribute(
    'color',
    new THREE.Float32BufferAttribute(starColors, 3)
  )

  stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)
}

const onWindowResize = () => {
  if (containerRef.value) {
    camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  }
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  // 星空缓慢旋转
  if (stars) {
    stars.rotation.y += 0.0001
  }

  // 渲染场景
  renderer.render(scene, camera)
}
</script>

<style scoped>
.space-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, #000011 0%, #000000 70%);
  overflow: hidden;
}
</style>
