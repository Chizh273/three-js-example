import 'scss/index.scss'

import * as THREE from 'three'
import OrbitControlsFunc from 'three-orbit-controls'
import {createCamera, createRenderer, createScene, deg2Radian} from './helper'
import {createShape} from './shape'
import shapes from './data'

const OrbitControls = OrbitControlsFunc(THREE)
const camera = createCamera()
const scene = createScene()

const renderer = createRenderer()
document.body.appendChild(renderer.domElement)

let prevHeight = 0
const rootShape = new THREE.Group()
for (let {countSide, radius} of shapes) {
  const shape = createShape(countSide, radius, 100, 0x000000)
  shape.rotation.z = deg2Radian(90)
  shape.position.z = prevHeight
  rootShape.add(shape)

  prevHeight += 100
}

scene.add(rootShape)

camera.lookAt(rootShape.position)

const orbit = new OrbitControls(camera, renderer.domElement)
orbit.enableZoom = true

function animate () {
  rootShape.rotation.z += deg2Radian(1)

  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
