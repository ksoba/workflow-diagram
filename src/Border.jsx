import React from "react";
import { Line } from "react-konva";
import { Anchor } from "./Anchor";
import { NODE_SIZE } from "./NodeConfig";

//Define Node sizes
const width = NODE_SIZE.width;
const height = NODE_SIZE.height;
const borderShift = NODE_SIZE.radius;
const points = [-borderShift, -borderShift, width + borderShift, -borderShift, width + borderShift, height + borderShift, -borderShift, height + borderShift, -borderShift, -borderShift];

function getAnchorPoints(x, y) {
  const halfWidth = NODE_SIZE.width / 2;
  const halfHeight = NODE_SIZE.height / 2;
  const anchorShift = NODE_SIZE.radius * 3
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
  anchor,
  onAnchorDragStart,
  onAnchorDragMove,
  onAnchorDragEnd,
  onAnchorMouseOver,
  onAnchorMouseOut
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
      onMouseOver={onAnchorMouseOver}
      onMouseOut={onAnchorMouseOut}
      scaleAnchor={anchor}
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
