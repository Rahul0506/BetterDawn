import { useRef, useState } from "react"
import { useThree, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { BufferAttribute, BufferGeometry, LineBasicMaterial, Vector3 } from "three"

function MoveLine({ startPoint, visible }) {
    const lineRef = useRef(null)
    const { get } = useThree()

    const points = new Float32Array(6)
    points[0] = startPoint[0]
    points[1] = startPoint[1]
    points[2] = startPoint[2]

    points[3] = startPoint[0]
    points[4] = startPoint[1]
    points[5] = startPoint[2]
    const projVec = new Vector3(0, 0, 0)

    const lineGeom = new BufferGeometry()
    lineGeom.setAttribute('position', new BufferAttribute(points, 3))
    lineGeom.setDrawRange(0, 2)

    useFrame(({ pointer }) => {
        projVec.set(pointer.x, pointer.y, 0)
        projVec.unproject(get().camera)

        points[3] = projVec.x
        points[4] = projVec.y
        lineGeom.attributes.position.needsUpdate = true
        lineGeom.computeBoundingBox();
        lineGeom.computeBoundingSphere();
    })

    return (
        <lineSegments
            geometry={lineGeom}
            material={new LineBasicMaterial({ color: "green" })}
            ref={lineRef}
            onClick={() => console.log(lineRef)}
            visible={visible} />
    )
}

export default function Squad(props) {
    const squadPos = props.position

    const [hovered, hover] = useState(false)
    const [showLine, setLine] = useState(false)

    return (
    <group>
        <mesh
            {...props}
            onClick={(e) => {setLine(true)}}
            onPointerMissed={(e) => {e.buttons === 2 && setLine(false)}}
            onPointerOver={(e) => hover(true)}
            onPointerOut={(e) => hover(false)} >

            <coneGeometry args={[4, 16, 30, 4]} />
            <meshPhongMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
        <MoveLine startPoint={squadPos} visible={showLine} />
    </group>
    )
}
