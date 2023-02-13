import * as THREE from "three";
import { Color, Vector2 } from "three";
import { Line2, LineGeometry, LineMaterial } from "three-stdlib";
export function createCatmulRomLine(
  nodes: Vector2[],
  color: Color,
  width = 3,
  segments = 40
): Line2 {
  const nodes3 = nodes.map((v) => new THREE.Vector3(v.x, v.y, 0));
  const curve = new THREE.CatmullRomCurve3(nodes3);
  const segementPoints = curve.getPoints(segments);
  const positions: number[] = [];
  segementPoints.forEach((point) => positions.push(point.x, point.y, point.z));

  const geometry = new LineGeometry();
  geometry.setPositions(positions);
  const material = new LineMaterial({
    color: color.getHex(),
    resolution: new Vector2(window.innerWidth, window.innerHeight),
    linewidth: width,
  });

  // Create the final object to add to the scene
  const line = new Line2(geometry, material);
  line.computeLineDistances();
  return line;
}
