import { Object3D, Quaternion, Vector3 } from "three";

var q = new Quaternion();

export function rotateAroundWorldAxis(
  object: Object3D,
  point: Vector3,
  axis: THREE.Vector3,
  angle: number
) {
  q.setFromAxisAngle(axis, angle);

  object.applyQuaternion(q);

  object.position.sub(point);
  object.position.applyQuaternion(q);
  object.position.add(point);
}
