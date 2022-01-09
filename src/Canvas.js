import { Container } from 'konva/lib/Container';
import React, {Component} from 'react'
import { Stage, Layer, Rect, Group, Text, Star } from "react-konva";

const Canvas = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const stage = new Stage({
    Container: 'container',
    width: width,
    height: height,
  });

  const layer = new Layer();

  const toolNodeGroup = new Group({
    x: stage.getPointPosition().x,
    y: stage.getPointPosition().y,
    draggable: true,
  });

  const toolNodeBox = new Rect({
    x: 0,
    y: 0,
    width: 300,
    height: 150,
    cornerRadius: 50,
    fill: 'white',
    stroke: '#222',
    strokeWidth: 1,
  });

  const toolTitle = new Text({
    x: 0,
    y: 0,
    text: 'Revit',
  });

  toolNodeGroup.add(toolNodeBox);
  toolNodeGroup.add(toolTitle);

  layer.add(toolNodeGroup);
  stage.add(layer);

  return(stage);

}
export default Canvas;