import React, { useEffect, useRef } from 'react'
import styles from "./ThreeScene.module.scss"
import MainThreeScene from "./webgl-scripts/MainThreeScene"

export default function ThreeScene() {
    const threeContainerRef = useRef<HTMLDivElement | null>(null)
    const backdrop = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (threeContainerRef.current) {
            MainThreeScene.init(threeContainerRef.current)
        }

        setTimeout(() => {
            backdrop.current?.classList.add(styles.on)
            threeContainerRef.current?.classList.add(styles.on)
        }, 200)
    }, [threeContainerRef])

    return (
        <>
            <div className={styles.info}>
                <p>Real time 3D version of <a target='_blank' href="https://twitter.com/TatsuyaBot/status/1703255020765053073">TatsuyaM™'s</a> artwork</p>
                <p>Made with Three.sj and Blender by <a target='_blank' href="https://mariusballot.com/">Marius Ballot</a></p>
            </div>
            <div ref={backdrop} className={`${styles.backdrop}`}></div>
            <div className={styles.three_scene_container} ref={threeContainerRef}>
            </div>
        </>
    )
}