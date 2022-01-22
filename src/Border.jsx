import React from "react";
import { Line } from "react-konva";
import { Anchor } from "./Anchor";
import { NODE_SIZE } from "./NodeConfig";

//Define Node sizes
const width = NODE_SIZE.width;
const height = NODE_SIZE.height;
const points = [-5, -5, width + 5, -5, width + 5, height + 5, -5, height + 5, -5, -5];

function getAnchorPoints(x, y) {
  const halfWidth = NODE_SIZE.width / 2;
  const halfHeight = NODE_SIZE.height / 2;
  const anchorShift = NODE_SIZE.radius * 2
  return [
    {
      // Left anchor
      x: x - anchorShift,
      y: y + halfHeight
    },
    {
      // Top anchor
      x: x + halfWidth,
      y: y - anchorShift
    },
    {
      // Right anchor
      x: x + width + anchorShift,
      y: y + halfHeight
    },
    {
      // Bottom anchor
      x: x + halfWidth,
      y: y + height + anchorShift
    }
  ];
}

export function Border({
  node,
  id,
  onAnchorDragStart,
  onAnchorDragMove,
  onAnchorDragEnd
}) {
  const { x, y } = node;
  const anchorPoints = getAnchorPoints(x, y);
  const anchors = anchorPoints.map((position, index) => (
    <Anchor
      key={`anchor-${index}`}
      id={id}
      x={position.x}
      y={position.y}
      onDragStart={onAnchorDragStart}
      onDragMove={onAnchorDragMove}
      onDragEnd={onAnchorDragEnd}
    />
  ));
  return (
    <>
      <Line
        x={x}
        y={y}
        points={points}
        stroke={NODE_SIZE.selectFill}
        strokeWidth={3}
        perfectDrawEnabled={false}
        //closed={true}
        lineCap='square'
      />
      {anchors}
    </>
  );
}
