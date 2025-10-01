<template>
  <div class="three-container" ref="containerRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const containerRef = ref<HTMLDivElement | null>(null)

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let rocket: THREE.Group
let controls: OrbitControls
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
  if (controls) {
    controls.dispose()
  }
})

const init = () => {
  // 创建场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000022)
  scene.fog = new THREE.Fog(0x000022, 100, 300)

  // 创建相机
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(0, 0, 50)

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(containerRef.value!.clientWidth, containerRef.value!.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  containerRef.value!.appendChild(renderer.domElement)

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0x404040, 2)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  // 创建火箭
  createRocket()

  // 添加星星背景
  createStars()

  // 添加控制器
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05

  // 窗口大小调整
  window.addEventListener('resize', onWindowResize)
}

const createRocket = () => {
  rocket = new THREE.Group()

  // 火箭主体
  const bodyGeometry = new THREE.CylinderGeometry(0.5, 1, 8, 32)
  const bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0xcccccc,
    shininess: 100,
    emissive: 0x222222
  })
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
  body.rotation.x = Math.PI / 2
  rocket.add(body)

  // 火箭头部
  const noseGeometry = new THREE.ConeGeometry(0.5, 2, 32)
  const noseMaterial = new THREE.MeshPhongMaterial({
    color: 0xff4444,
    shininess: 100
  })
  const nose = new THREE.Mesh(noseGeometry, noseMaterial)
  nose.position.x = 5
  nose.rotation.z = -Math.PI / 2
  rocket.add(nose)

  // 火箭尾翼
  for (let i = 0; i < 4; i++) {
    const finGeometry = new THREE.BoxGeometry(0.1, 2, 1)
    const finMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 })
    const fin = new THREE.Mesh(finGeometry, finMaterial)
    fin.position.x = -3
    fin.position.y = Math.sin(i * Math.PI / 2) * 1.5
    fin.position.z = Math.cos(i * Math.PI / 2) * 1.5
    fin.rotation.z = i * Math.PI / 2
    rocket.add(fin)
  }

  // 引擎喷口
  const engineGeometry = new THREE.CylinderGeometry(0.8, 1, 1, 32)
  const engineMaterial = new THREE.MeshPhongMaterial({
    color: 0x444444,
    emissive: 0x222222
  })
  const engine = new THREE.Mesh(engineGeometry, engineMaterial)
  engine.position.x = -5
  engine.rotation.x = Math.PI / 2
  rocket.add(engine)

  // 火焰效果
  const flameGeometry = new THREE.ConeGeometry(0.6, 3, 32)
  const flameMaterial = new THREE.MeshBasicMaterial({
    color: 0xff4400,
    transparent: true,
    opacity: 0.8
  })
  const flame = new THREE.Mesh(flameGeometry, flameMaterial)
  flame.position.x = -7
  flame.rotation.x = Math.PI / 2
  rocket.add(flame)

  scene.add(rocket)
}

const createStars = () => {
  const starGeometry = new THREE.BufferGeometry()
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.2,
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

  const stars = new THREE.Points(starGeometry, starMaterial)
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

  // 火箭旋转动画
  if (rocket) {
    rocket.rotation.y += 0.01
  }

  // 更新控制器
  if (controls) {
    controls.update()
  }

  // 渲染场景
  renderer.render(scene, camera)
}
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
