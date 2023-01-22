import * as THREE from 'three'
import { Suspense, useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { SVGLoader } from 'three-stdlib'

// import ClippedControls from '../../ClippedCamera'

export function Box() {
    return (
        <mesh>
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="hotpink" />
        </mesh>
    )
}

export function Cell({ color, shape, fillOpacity }) {
  const [hovered, hover] = useState(false)
  return (
    <mesh onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
      <meshBasicMaterial color={hovered ? 'hotpink' : color} opacity={fillOpacity} depthWrite={false} transparent />
      <shapeBufferGeometry args={[shape]} />
    </mesh>
  )
}

export function Svg({ url }) {
  const { paths } = useLoader(SVGLoader, url)
  const shapes = useMemo(
    () => paths.flatMap((p) => p.toShapes(true).map((shape) => ({ shape, color: p.color, fillOpacity: p.userData.style.fillOpacity }))),
    [paths]
  )

  const ref = useRef()
  useLayoutEffect(() => {
    const sphere = new THREE.Box3().setFromObject(ref.current).getBoundingSphere(new THREE.Sphere())
    ref.current.position.set(-sphere.center.x, -sphere.center.y, 0)
  }, [])

  return (
    <group ref={ref}>
      {shapes.map((props, index) => (
        <Cell key={props.shape.uuid} {...props} />
      ))}
    </group>
  )
}