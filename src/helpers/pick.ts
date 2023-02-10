import { Camera, EventDispatcher, Raycaster, Scene } from "three";

export class PickHelper extends EventDispatcher {
  raycaster: THREE.Raycaster;

  constructor(
    private scene: Scene,
    private camera: Camera,
    private canvas: HTMLCanvasElement
  ) {
    super();
    this.raycaster = new Raycaster();
    const getCanvasRelativePosition = (event: {
      clientX: number;
      clientY: number;
    }) => {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const setPickPosition = (event: Touch | MouseEvent) => {
      const pos = getCanvasRelativePosition(event);
      this.setPickPosition(
        (pos.x / this.canvas.clientWidth) * 2 - 1,
        (pos.y / this.canvas.clientHeight) * -2 + 1
      ); // note we flip Y
    };
    window.addEventListener(
      "touchstart",
      (event) => {
        // prevent the window from scrolling
        event.preventDefault();
        setPickPosition(event.touches[0]);
      },
      { passive: false }
    );
    window.addEventListener(
      "click",
      (event) => {
        // prevent the window from scrolling
        event.preventDefault();
        setPickPosition(event);
      },
      { passive: false }
    );
  }

  setPickPosition(x: number, y: number) {
    // cast a ray through the frustum
    this.raycaster.setFromCamera({ x, y }, this.camera);
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster
      .intersectObjects(this.scene.children)
      .filter((x) => x.object.visible);

    for (const i of intersectedObjects) {
      const o = i.object;
      if (o.userData.interactive) {
        o.dispatchEvent({
          type: "clicked",
        });
        break;
      }
    }
  }
}
