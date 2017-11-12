import * as THREE from 'three'
import {RADIAN_IN_ONE_DEG} from './constants'

export const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000)

  camera.position.x = -665
  camera.position.y = 325
  camera.position.z = 760

  return camera
}

export const createScene = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  return scene
}

export const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  return renderer
}

export const deg2Radian = (deg) => deg * RADIAN_IN_ONE_DEG
