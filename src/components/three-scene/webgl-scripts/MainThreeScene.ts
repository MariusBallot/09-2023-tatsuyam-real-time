import * as THREE from "three";
import { OrbitControls } from 'three-orbitcontrols-ts';
import RAF from '../../../utils/RAF';
import Structure from "./Structure"

class MainThreeScene {
    private camera: THREE.PerspectiveCamera | undefined;
    private scene: THREE.Scene | undefined;
    private renderer: THREE.WebGLRenderer | undefined;
    private controls: OrbitControls | undefined;
    private isActive: Boolean

    constructor() {
        this.bind();
        this.isActive = false
    }

    init(container: HTMLElement) {
        if(this.isActive) return
        this.isActive = true
        console.log(container)
        // RENDERER SETUP
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.debug.checkShaderErrors = true;
        container.appendChild(this.renderer.domElement);

        // MAIN SCENE INSTANCE
        this.scene = new THREE.Scene();

        // CAMERA AND ORBIT CONTROLLER
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
        if (this.camera) {
            this.camera.position.set(0, 0, 10);
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            if (this.controls) {
                this.controls.enabled = true; // You can adjust this based on your config.
                this.controls.maxDistance = 1500;
                this.controls.minDistance = 0;
            }
        }


        

        Structure.init(this.scene)

        // RENDER LOOP AND WINDOW SIZE UPDATER SETUP
        window.addEventListener("resize", () => this.resizeCanvas());
        RAF.subscribe('threeSceneUpdate', () => this.update());
    }

    update() {
        Structure.update()

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    resizeCanvas() {
        if (this.renderer && this.camera) {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }
    }

    private bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.update = this.update.bind(this);
        this.init = this.init.bind(this);
    }
}

const _instance = new MainThreeScene();
export default _instance;
