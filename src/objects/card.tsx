import * as THREE from "three";
import React from "react";
import { motion } from "framer-motion-3d";
import { MotionProps } from "framer-motion";
import { Text, CatmullRomLine, Svg } from "@react-three/drei";
import { Card } from "../types/card";
import "../materials/gradient";

export const CARD_WIDTH = 1;
export const CARD_HEIGHT = 1.5;
export const CARD_PADDING = 0.1;

function createRoundedRectGeometry(
  x = -0.5,
  y = -0.5,
  width = 1,
  height = 1.5,
  radius = 0.1
) {
  let shape = new THREE.Shape();
  shape.moveTo(x, y + radius);
  shape.lineTo(x, y + height - radius);
  shape.quadraticCurveTo(x, y + height, x + radius, y + height);
  shape.lineTo(x + width - radius, y + height);
  shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  shape.lineTo(x + width, y + radius);
  shape.quadraticCurveTo(x + width, y, x + width - radius, y);
  shape.lineTo(x + radius, y);
  shape.quadraticCurveTo(x, y, x, y + radius);

  return new THREE.ShapeGeometry(shape);
}

function createEllipse(
  aX: number,
  aY: number,
  xRadius: number,
  yRadius: number,
  aStartAngle: number,
  aEndAngle: number,
  aClockwise: boolean,
  aRotation: number
) {
  let shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.ellipse(
    aX,
    aY,
    xRadius,
    yRadius,
    aStartAngle,
    aEndAngle,
    aClockwise,
    aRotation
  );
  return shape;
}

const faceGeometry = createRoundedRectGeometry();
const faceGeometryEdges = new THREE.EdgesGeometry(faceGeometry);
const faceCircle = createEllipse(0, 0, 1, 1.4, 0, 2 * Math.PI, false, 0);
const faceCircleSmall = createEllipse(0, 0, 1, 1, 0, 2 * Math.PI, false, 0);
const faceCirclePoints = faceCircle.getPoints();
const faceCircleSmallPoints = faceCircleSmall.getPoints();
const faceCircleGeometry = new THREE.ShapeGeometry(faceCircle);
const faceCircleSmallGeometry = new THREE.ShapeGeometry(faceCircleSmall);
type Props = MotionProps & {
  card: Card;
  [x: string]: any;
};

export function CardContainer({ card, ...rest }: Props) {
  const color = card.color();
  return (
    <motion.group
      name={card.string()}
      rotation-y={!card.open ? THREE.MathUtils.degToRad(180) : 0}
      {...rest}
    >
      <lineSegments geometry={faceGeometryEdges}>
        <lineBasicMaterial color={0xffffff} />
      </lineSegments>

      <mesh name="Front" geometry={faceGeometry}>
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh
        name="FrontCirc"
        geometry={faceCircleGeometry}
        scale={0.45}
        position={[0, 0.3, 0.001]}
      >
        <meshStandardMaterial color={0xffffff} />
      </mesh>
      <CatmullRomLine
        name="FrontCircOutline"
        points={faceCirclePoints}
        color={color}
        segments={40}
        scale={0.424}
        position={[0.0, 0.3, 0.002]}
        lineWidth={3}
      ></CatmullRomLine>
      <mesh
        name="FrontCircBottom"
        geometry={faceCircleSmallGeometry}
        scale={0.3}
        position={[0, -0.19, 0.008]}
      >
        <meshStandardMaterial color={0xffffff} />
      </mesh>
      <CatmullRomLine
        name="FrontCircBottomOutline1"
        points={faceCircleSmallPoints}
        segments={40}
        color={color}
        scale={0.27}
        position={[0, -0.19, 0.009]}
        lineWidth={2}
      ></CatmullRomLine>
      <CatmullRomLine
        name="FrontCircBottomOutline2"
        points={faceCircleSmallPoints}
        segments={40}
        color={color}
        scale={0.23}
        position={[0, -0.19, 0.009]}
        lineWidth={1}
      ></CatmullRomLine>
      <mesh
        name="Back"
        geometry={faceGeometry}
        position={[0, 0, 0.001]}
        rotation={[0, THREE.MathUtils.degToRad(180), 0]}
      >
        <gradientMaterial color1="blue" color2="red" />
      </mesh>
      <Text
        position={[0, 0.45, 0.002]}
        color={"#002D2D"}
        fontSize={0.7}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        anchorX="center"
        anchorY="middle"
      >
        {card.rank}
      </Text>
      <Text
        position={[0, -0.18, 0.01]}
        color={"#002D2D"}
        fontSize={0.3}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      >
        {card.suit}
      </Text>
    </motion.group>
  );
}
