import * as THREE from "three";
import {
  AmbientLight,
  Clock,
  Color,
  LoadingManager,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer
} from "three";
import Inspector from "three-inspect";
import { Font } from "three-stdlib";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PickHelper } from "./helpers/pick";
import { resizeRendererToDisplaySize } from "./helpers/responsiveness";
import { CardFightScene } from "./scenes/cardFight";

const CANVAS_ID = "scene";

export class Game {
  canvas: HTMLCanvasElement;
  renderer: WebGLRenderer;
  scene: Scene;
  loadingManager: LoadingManager;
  ambientLight: AmbientLight;
  pointLight: PointLight;
  camera: PerspectiveCamera;
  cameraControls: OrbitControls;
  clock: Clock;
  cardFont: Font;
  pickHelper: PickHelper;
  inspector: Inspector;

  // const animation = { enabled: false, play: true };

  constructor() {
    this.canvas = document.querySelector(`canvas#${CANVAS_ID}`)!;
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.scene = new Scene();
    this.setupLoadingManager();
    this.setupLights();

    this.setupCamera();
    this.setupControls();

    this.scene.background = new Color("grey");
    this.pickHelper = new PickHelper(this.scene, this.camera, this.canvas);
    this.inspector = new Inspector(
      THREE /* the THREE object used in your project */,
      this.scene,
      this.camera,
      this.renderer
    );


    // this.scene.add(new CardTestScene(this));
    this.scene.add(new CardFightScene(this));

  }

  setupCamera() {
    this.camera = new PerspectiveCamera(
      50,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 7);
  }
  animate() {
    requestAnimationFrame(() => this.animate());

    if (resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    this.cameraControls.update();
    this.renderer.render(this.scene, this.camera);
  }

  setupControls() {
    // ===== 🕹️ CONTROLS =====

    this.cameraControls = new OrbitControls(this.camera, this.canvas);
    //   cameraControls.target = cube.position.clone();
    this.cameraControls.enableDamping = true;
    this.cameraControls.autoRotate = false;
    this.cameraControls.update();

    // // Full screen
    // window.addEventListener("dblclick", (event) => {
    //   if (event.target === this.canvas) {
    //     toggleFullScreen(this.canvas);
    //   }
    // });
  }

  setupLights() {
    // ===== 💡 LIGHTS =====

    this.ambientLight = new AmbientLight("white", 0.4);
    this.pointLight = new PointLight("#ffdca8", 1.2, 100);
    this.pointLight.position.set(0, 0, 20);
    this.pointLight.castShadow = true;
    this.pointLight.shadow.radius = 4;
    this.pointLight.shadow.camera.near = 0.5;
    this.pointLight.shadow.camera.far = 4000;
    this.pointLight.shadow.mapSize.width = 2048;
    this.pointLight.shadow.mapSize.height = 2048;
    this.scene.add(this.ambientLight);
    this.scene.add(this.pointLight);
  }

  setupLoadingManager() {
    this.loadingManager = new LoadingManager();

    this.loadingManager.onStart = () => {
      console.log("loading started");
    };
    this.loadingManager.onProgress = (url, loaded, total) => {
      console.log("loading in progress:");
      console.log(`${url} -> ${loaded} / ${total}`);
    };
    this.loadingManager.onLoad = () => {
      console.log("loaded!");
    };
    this.loadingManager.onError = () => {
      console.log("❌ error while loading");
    };
  }
}

const game = new Game();
game.animate();
