import { useRef } from 'react';
import { useThree } from '@react-three/fiber'
import { MapControls } from '@react-three/drei'
import { Vector3 } from 'three';

export default function ClippedControls() {
    const controlsRef = useRef();
    const { camera } = useThree();
    const MIN_DIM = new Vector3(-100, -100, -10000)
    const MAX_DIM = new Vector3(100, 100, 10000)
    const ZOOM_MIN = 1
    const ZOOM_MAX = 20

    const clipChange = () => {
        camera.zoom = Math.min(Math.max(camera.zoom, ZOOM_MIN), ZOOM_MAX)
        camera.position.clamp(MIN_DIM, MAX_DIM)
        controlsRef.current.target = camera.position
    }

    return (
        <MapControls
            ref={controlsRef}
            onChange={clipChange}
            enableDamping={true}
            enableZoom={true}
            enableRotate={false}
        />
    )
}
