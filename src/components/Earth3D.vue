<template>
  <div class="earth-3d-container" ref="containerRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import ThreeGlobe from 'three-globe'

const containerRef = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let globe: ThreeGlobe
let stars: THREE.Points
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
    45,
    window.innerWidth / window.innerHeight,
    0.01,
    10000
  )
  camera.position.set(0, 0, 25)

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(containerRef.value!.clientWidth, containerRef.value!.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value!.appendChild(renderer.domElement)

  // 创建地球
  createEarth()

  // 创建星空背景
  createStars()

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0x333333)
  scene.add(ambientLight)

  const sunLight = new THREE.DirectionalLight(0xffffff, 1)
  sunLight.position.set(5, 3, 5)
  scene.add(sunLight)

  // 窗口大小调整
  window.addEventListener('resize', onWindowResize)
}

const createEarth = () => {
  // 创建3D地球
  globe = new ThreeGlobe({
    waitForGlobeReady: true
  })
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .atmosphereColor('rgba(100, 150, 255, 0.2)')
    .atmosphereAltitude(0.1)

  // 调整地球位置，使其位于屏幕底部
  globe.position.y = 10
  globe.scale.set(1, 1, 1)
  scene.add(globe)
}

const createStars = () => {
  const starGeometry = new THREE.BufferGeometry()
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    transparent: true,
    opacity: 0.8
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

const onWindowResize = () => {
  if (containerRef.value) {
    camera.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  }
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  // 地球自转
  if (globe) {
    globe.rotation.y += 0.002
  }

  // 渲染场景
  renderer.render(scene, camera)
}
</script>

<style scoped>
.earth-3d-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
