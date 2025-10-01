<template>
  <div class="cosmic-background" ref="containerRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let stars: THREE.Points
let nebula: THREE.Points
let animationId: number

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

  // 创建星云效果
  createNebula()

  // 窗口大小调整
  window.addEventListener('resize', onWindowResize)
}

const createStars = () => {
  const starGeometry = new THREE.BufferGeometry()
  const starMaterial = new THREE.PointsMaterial({
    size: 1.5,
    color: 0xffffff,
    transparent: true,
    opacity: 0.9
  })

  const starVertices: number[] = []
  for (let i = 0; i < 5000; i++) {
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = (Math.random() - 0.5) * 2000
    starVertices.push(x, y, z)
  }

  starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starVertices, 3)
  )

  stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)
}

const createNebula = () => {
  const nebulaGeometry = new THREE.BufferGeometry()
  const nebulaMaterial = new THREE.PointsMaterial({
    size: 15,
    color: 0x4488ff,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
  })

  const nebulaVertices: number[] = []
  for (let i = 0; i < 200; i++) {
    const x = (Math.random() - 0.5) * 1000
    const y = (Math.random() - 0.5) * 1000
    const z = (Math.random() - 0.5) * 1000
    nebulaVertices.push(x, y, z)
  }

  nebulaGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(nebulaVertices, 3)
  )

  nebula = new THREE.Points(nebulaGeometry, nebulaMaterial)
  scene.add(nebula)
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

  // 星云缓慢移动
  if (nebula) {
    nebula.rotation.y += 0.0002
    nebula.rotation.x += 0.0001
  }

  // 渲染场景
  renderer.render(scene, camera)
}
</script>

<style scoped>
.cosmic-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, #000011 0%, #000000 70%);
  overflow: hidden;
}
</style>
