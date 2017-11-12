import * as THREE from 'three'

export default class PrismGeometry extends THREE.ExtrudeGeometry {
  constructor (vertices, height) {
    const Shape = new THREE.Shape()

    PrismGeometry.createPointShape(Shape, vertices)

    const settings = {
      amount: height,
      bevelEnabled: false,
      steps: 1,
      bevelThickness: 100,
      bevelSize: 1,
      bevelSegments: 1
    }

    super(Shape, settings)
  }

  static createPointShape (shape, vertices) {
    shape.moveTo(vertices[0].x, vertices[0].y)

    for (let point of vertices) {
      shape.lineTo(point.x, point.y)
    }

    shape.lineTo(vertices[0].x, vertices[0].y)
  }
}
