import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

type Corner = {
    piece: number,
    rotation: THREE.Euler
}

class Structure {
    private scene: THREE.Scene | undefined;
    private glbLoader: GLTFLoader;
    private texLoader: THREE.TextureLoader;
    private structureGroup: THREE.Group;
    private rotator: THREE.Group;
    private corners: Corner[];
    private pieces: THREE.Mesh[];
    private frameCount: number

    constructor() {
        this.bind()
        this.frameCount = 0
        this.pieces = []
        this.texLoader = new THREE.TextureLoader()
        this.glbLoader = new GLTFLoader()
        this.structureGroup = new THREE.Group()
        this.rotator = new THREE.Group()
        this.corners = [
            {
                piece: Math.round(Math.random()),
                rotation: new THREE.Euler(0, 0, 0)
            },
            {
                piece: Math.round(Math.random()),
                rotation: new THREE.Euler(0, 0, Math.PI / 2)
            },
            {
                piece: Math.round(Math.random()),
                rotation: new THREE.Euler(0, 0, Math.PI)
            },
            {
                piece: Math.round(Math.random()),
                rotation: new THREE.Euler(0, 0, -Math.PI / 2)
            },
            {
                piece: Math.round(Math.random()),
                rotation: new THREE.Euler(0, Math.PI / 2, 0)
            },
            {
                piece: Math.round(Math.random()),
                rotation: new THREE.Euler(Math.PI, 0, 0)
            },
            {
                piece: Math.round(Math.random()),
                rotation: new THREE.Euler(Math.PI, 0, Math.PI / 2)
            },
            {
                piece: Math.round(Math.random()),
                rotation: new THREE.Euler(Math.PI, 0, Math.PI)
            }
        ];
    }

    init(scene: THREE.Scene) {
        this.scene = scene
        this.scene.add(this.rotator)
        this.rotator.add(this.structureGroup)
        this.structureGroup.rotateZ(Math.PI / 4)

        const matcapTex = this.texLoader.load("/textures/black-metal-matcap.png")
        matcapTex.colorSpace = THREE.SRGBColorSpace

        const blackMetalMat = new THREE.MeshMatcapMaterial({
            matcap: matcapTex
        })

        this.glbLoader.load("/models/tatsuya-pieces.glb", glb => {
            glb.scene.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    child.material = blackMetalMat
                    this.pieces.push(child)
                }
            })
            this.generateStructure()
        })

        // this.scene.add(new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial()))

    }

    private computeCorners() {
        const target = Math.floor(Math.random() * 8)
        this.corners[target].piece = Math.round(Math.random())
        this.generateStructure()
    }

    private generateStructure() {
        if (this.pieces.length !== 2) return
        this.structureGroup.clear()
        this.corners.forEach(corner => {
            const clone = this.pieces[corner.piece].clone()
            clone.rotation.copy(corner.rotation)
            this.structureGroup.add(clone)
        });
    }

    update() {
        this.frameCount++
        if (this.frameCount >= 10) {
            this.frameCount = 0
            this.computeCorners()
        }

        this.rotator.rotateX(0.007)
    }

    private bind() {
        this.computeCorners = this.computeCorners.bind(this)
        this.generateStructure = this.generateStructure.bind(this)
    }

}

const _instance = new Structure()
export default _instance