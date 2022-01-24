import React, { useState } from 'react';
import { Stage, Layer, Rect, Text, Line, Group, Circle } from 'react-konva';
import { Border } from "./Border";
import { INITIAL_STATE, NODE_SIZE } from './NodeConfig';
import './App.css';

// Returns connection points for connection line
function createConnectionPoints(source, destination, control1=null, control2=null) {
  if (!control1 || !control2) {
    return [source.x, source.y, destination.x, destination.y];
  }
  return [source.x, source.y, control1.x, control1.y, control2.x, control2.y, destination.x, destination.y];
}

//forked from codesandbox -> checks for intersection within full size node, TODO change to anchor areas 
function hasIntersection(position, node) {
  return !(
    node.x > position.x ||
    node.x + NODE_SIZE.width < position.x ||
    node.y > position.y ||
    node.y + NODE_SIZE.height < position.y
  );
}

// Checks for existing connections between nodes, currently seems to allow for 2 connections between two nodes, source -> target and target -> source
function detectConnection(position, id, nodes) {
  const intersectingNode = Object.keys(nodes).find((key) => {
    return key !== id && hasIntersection(position, nodes[key]);
  });
  if (intersectingNode) {
    return intersectingNode;
  }
  return null;
}

const App = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [connectionPreview, setConnectionPreview] = useState(null);
  const [connections, setConnections] = useState([]);
  const [nodes, setNodes] = useState(INITIAL_STATE.nodes);

  function handleSelection(id) {
    if (selectedNode === id) {
      setSelectedNode(null);
    } else {
      setSelectedNode(id);
    }
  }

  function handleNodeDrag(e, key) {
    const position = e.target.position();
    setNodes({
      ...nodes,
      [key]: {
        ...nodes[key],
        ...position
      }
    });
  }

  // Creates line upon dragging from anchor point
  function handleAnchorDragStart(e) {
    const position = e.target.position();
    setConnectionPreview(
      <Line
        x={position.x}
        y={position.y}
        points={createConnectionPoints(position, position)}
        stroke={NODE_SIZE.selectFill}
        strokeWidth={3}
      />
    );
  }

  // Gets current mouse pointer location
  function getMousePos(e) {
    const position = e.target.position();
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    return {
      x: pointerPosition.x - position.x,
      y: pointerPosition.y - position.y
    };
  }

  // Updates line preview based on current mouse pointer location
  function handleAnchorDragMove(e) {
    const position = e.target.position();
    const mousePos = getMousePos(e);
    const controlPoint1 = {
      x: 0,
      y: 0
    };

    const controlPoint2 = {
      x: mousePos.x,
      y: 0
    };
    setConnectionPreview(
      <Line
        x={position.x}
        y={position.y}
        points={createConnectionPoints({ x: 0, y: 0 }, mousePos, controlPoint1, controlPoint2)}
        stroke={NODE_SIZE.selectFill}
        strokeWidth={3}
        bezier={true}
      />
    );
  }

  // Removes connection preview, if connection is detected set 'to' and 'from' nodes
  function handleAnchorDragEnd(e, id) {
    setConnectionPreview(null);
    const stage = e.target.getStage();
    const mousePos = stage.getPointerPosition();
    const connectionTo = detectConnection(mousePos, id, nodes);
    if (connectionTo !== null) {
      setConnections([
        ...connections,
        {
          to: connectionTo,
          from: id
        }
      ]);
    }
  }

  // Create default nodes using NodeConfig information
  const nodeObjs = Object.keys(nodes).map((key) => {
    const { x, y, name } = nodes[key];
    return (
      <Group
        key={key}
        x={x}
        y={y}
        onClick={() => handleSelection(key)}
        draggable
        onDragMove={(e) => handleNodeDrag(e, key)}
        perfectDrawEnabled={false}
      >
        <Rect
          width={NODE_SIZE.width}
          height={NODE_SIZE.height}
          cornerRadius={NODE_SIZE.cornerRadius}
          fill={NODE_SIZE.fill}
          shadowEnabled={true}
          shadowOffset={{x:10, y:10}}
          shadowBlur={10}
          shadowOpacity={.1}
        />
        <Rect
          width={NODE_SIZE.icon}
          height={NODE_SIZE.icon}
          cornerRadius={NODE_SIZE.cornerRadius}
          x={NODE_SIZE.iconPosition}
          y={NODE_SIZE.iconPosition}
          fill={NODE_SIZE.iconFill}
        />
        <Text text={name} x={120} y={45} fontSize={30}/>
      </Group>
      
    );
  });
  // Connection lines between nodes
  const connectionObjs = connections.map((connection) => {
    const fromNode = nodes[connection.from];
    const toNode = nodes[connection.to];
    const lineEnd = {
      x: toNode.x - fromNode.x,
      y: toNode.y - fromNode.y
    };

    const controlPoint1 = {
      x: 0,
      y: 0,
    };

    // Makes control point tracking run of new point -> on convex side of curve
    const controlPoint2 = {
      x: lineEnd.x,
      y: 0
    };

    const points = createConnectionPoints({ x: 0, y: 0 }, lineEnd, controlPoint1, controlPoint2);
    return (
      <Line
        x={fromNode.x + NODE_SIZE.width / 2}
        y={fromNode.y + NODE_SIZE.height / 2}
        points={points}
        stroke="grey"
        strokeWidth={3}
        //tension={.5}
        bezier={true}
      />
    );
  });
  const borders =
    selectedNode !== null ? (
      <Border
        id={selectedNode}
        node={nodes[selectedNode]}
        onAnchorDragEnd={(e) => handleAnchorDragEnd(e, selectedNode)}
        onAnchorDragMove={handleAnchorDragMove}
        onAnchorDragStart={handleAnchorDragStart}
      />
    ) : null;
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer name='connectionLines'>
        {connectionObjs}
      </Layer>
      <Layer>
        {nodeObjs}
        {borders}
        {connectionPreview}
        <Text x={20} y={20} fontSize={24} text="Click a Tool Node to select it. Drag the anchor to create a connection between other nodes" />
      </Layer>
    </Stage>
  );
};

export default App;