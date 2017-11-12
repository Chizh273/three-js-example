import * as THREE from 'three'
import {DEG_360, HALF_PI, RADIAN_IN_ONE_DEG} from './constants'
import PrismGeometry from './PrismGeometry'

export const createShape = (countSide, radius, height) => {
  const group = new THREE.Group()
  const geometry = new PrismGeometry(getShapePoints(countSide, radius), height)

  const materialInner = new THREE.MeshBasicMaterial({color: 0x000000})
  const prismInner = new THREE.Mesh(geometry, materialInner)

  const material = new THREE.MeshBasicMaterial({
    color: 0x00fdfd,
    wireframe: true,
    wireframe_linewidth: 100000
  })
  const prism = new THREE.Mesh(geometry, [materialInner, material])

  group.add(prismInner)
  group.add(prism)

  return group
}

export const getShapePoints = (countSide, radius) => {
  const points = []
  const angleRadian = (DEG_360 / countSide) * RADIAN_IN_ONE_DEG

  for (let i = 0; i < countSide; i++) {
    points.push(getPoint(radius, angleRadian * i))
  }

  return points
}

export const getPoint = (radius, radian) => new THREE.Vector2(
  radius * Math.cos(radian - HALF_PI),
  radius * Math.sin(radian - HALF_PI)
)
