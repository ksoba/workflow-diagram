import React, {Component, useRef} from 'react'
import { Stage, Layer, Rect, Group, Text, Circle, Line} from "react-konva";
import Konva from 'konva';
import './App.css';
import { render } from '@testing-library/react';

const App = () => {
  var width = window.innerWidth;
  var height = window.innerHeight;

  var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
  });

  var layer = new Konva.Layer();
  stage.add(layer);

  // add default shape
  var shape = new Konva.Circle({
    x: stage.width() / 2,
    y: stage.height() / 2,
    radius: 50,
    fill: 'red',
    shadowBlur: 10,
  });
  layer.add(shape);

  stage.on('dblclick dbltap', function () {
    // add a new shape
    var newShape = new Konva.Circle({
      x: stage.getPointerPosition().x,
      y: stage.getPointerPosition().y,
      radius: 10 + Math.random() * 30,
      fill: Konva.Util.getRandomColor(),
      shadowBlur: 10,
    });
    layer.add(newShape);
  });

  // setup menu
  let currentShape;
  var menuNode = document.getElementById('menu');
  document.getElementById('pulse-button').addEventListener('click', () => {
    currentShape.to({
      scaleX: 2,
      scaleY: 2,
      onFinish: () => {
        currentShape.to({ scaleX: 1, scaleY: 1 });
      },
    });
  });

  document.getElementById('delete-button').addEventListener('click', () => {
    currentShape.destroy();
  });

  window.addEventListener('click', () => {
    // hide menu
    menuNode.style.display = 'none';
  });

  stage.on('contextmenu', function (e) {
    // prevent default behavior
    e.evt.preventDefault();
    if (e.target === stage) {
      // if we are on empty place of the stage we will do nothing
      return;
    }
    currentShape = e.target;
    // show menu
    menuNode.style.display = 'initial';
    var containerRect = stage.container().getBoundingClientRect();
    menuNode.style.top =
      containerRect.top + stage.getPointerPosition().y + 4 + 'px';
    menuNode.style.left =
      containerRect.left + stage.getPointerPosition().x + 4 + 'px';
  });
}

export default App;

/*const Dialog = () => {
  return (
      <div className="dialog">
          <div>
              <h2>Search</h2>
          </div>
          <div>
              <p>Rhino</p>
              <p>Revit</p>
          </div>
      </div>
  )
}
const handleDblClick = () => {
  layer2.add(<ColoredRect/>) 
}
class ColoredRect extends React.Component {
  state = {
    color: 'green'
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      layerX: 0,
      layerY: 0,
      layerScale: 1,
      groups: [],
      points: [],
      paths: [],
      isDragging: false,
      isSelected: false,
      isHover: false
    };
  }
  
  toolNode = {
    name: 'Enscape',
    width:300,
    height:120,
    selectColor:'#ec008c',
    radius:8
  };

    render() {
    return (
      <main className='app'>
        <Stage 
          width={window.innerWidth} 
          height={window.innerHeight} 
          ref={'stageRef'}
          >
          <Layer
            scaleX={this.state.layerScale}
            scaleY={this.state.layerScale}
            x={this.state.layerX}
            y={this.state.layerY}
            
            onDragEnd={() => {
              this.setState({
                  layerX: this.refs.layer2.x(),
                  layerY: this.refs.layer2.y()
              })
            }}
            onDblClick = {handleDblClick}
          ref="layer2"
          >
            <Text text="Double-click to search tools" fontSize={25} x={20} y={20} />
            <ColoredRect />
            {this.state.groups.map(eachGroup => {
              return (
                <Group
                   
                  onDragStart={() => {
                    this.setState({
                      isDragging: true
                    });
                  }}
                  onDragEnd={e => {
                    this.setState({
                      isDragging: false,
                      x: e.target.x(),
                      y: e.target.y()
                    });
                  }}

                  x={250}
                  y={250}
                  name={eachGroup.name}
                  ref={eachGroup.ref}
                  draggable

                  onClick={() => {
                    this.setState({
                      isSelected: this.state.isSelected ? false : true,
                    })
                  }}>
                  <Group visible={this.state.isSelected ? true : false} name='circleGroup'>
                    <Circle
                      name='top'
                      x={(this.toolNode.width / 2)}
                      y={-this.toolNode.radius * 2}
                      radius={this.toolNode.radius}
                      fill={this.toolNode.selectColor}
                    />
                    <Circle
                      name='bot'
                      x={(this.toolNode.width / 2)}
                      y={this.toolNode.height + this.toolNode.radius * 2}
                      radius={this.toolNode.radius}
                      fill={this.toolNode.selectColor}
                    />
                    <Circle
                      name='left'
                      x={- this.toolNode.radius * 2}
                      y={this.toolNode.height/2}
                      radius={this.toolNode.radius}
                      fill={this.toolNode.selectColor}
                    />
                    <Circle
                      name='right'
                      x={(this.toolNode.width) + this.toolNode.radius * 2}
                      y={this.toolNode.height/2}
                      radius={this.toolNode.radius}
                      fill={this.toolNode.selectColor}
                    />
                  </Group>

                  <Rect
                    width={this.toolNode.width}
                    height={this.toolNode.height}
                    cornerRadius={25}
                    fill={"white"}
                    stroke={this.toolNode.selectColor}
                    strokeWidth={1}
                    strokeEnabled={this.state.isSelected ? true : false}
                  />

                  <Rect
                    width={80}
                    height={80}
                    x={20}
                    y={20}
                    cornerRadius={15}
                    fill={"#ddd"}
                  />

                  <Text
                    text={this.toolNode.name}
                    fontFamily={'Poppins Regular'}
                    fontSize={30}
                    x={120}
                    y={45}
                  />
                  
                  
                </Group>
              )
            })}
            <Group
              draggable
              onDragStart={() => {
                this.setState({
                  isDragging: true
                });
              }}
              onDragEnd={e => {
                this.setState({
                  isDragging: false,
                  x: e.target.x(),
                  y: e.target.y()
                });
              }}
              x={this.state.x}
              y={this.state.y}
              onClick={() => {
                this.setState({
                  isSelected: this.state.isSelected ? false : true,
                })
              }}>
              <Group visible={this.state.isSelected ? true : false} name='circleGroup'>
                <Circle
                  name='top'
                  x={(this.toolNode.width / 2)}
                  y={-this.toolNode.radius * 2}
                  radius={this.toolNode.radius}
                  fill={this.toolNode.selectColor}
                />
                <Circle
                  name='bot'
                  x={(this.toolNode.width / 2)}
                  y={this.toolNode.height + this.toolNode.radius * 2}
                  radius={this.toolNode.radius}
                  fill={this.toolNode.selectColor}
                />
                <Circle
                  name='left'
                  x={- this.toolNode.radius * 2}
                  y={this.toolNode.height/2}
                  radius={this.toolNode.radius}
                  fill={this.toolNode.selectColor}
                />
                <Circle
                  name='right'
                  x={(this.toolNode.width) + this.toolNode.radius * 2}
                  y={this.toolNode.height/2}
                  radius={this.toolNode.radius}
                  fill={this.toolNode.selectColor}
                />
              </Group>

              <Rect
                width={this.toolNode.width}
                height={this.toolNode.height}
                cornerRadius={25}
                fill={"white"}
                stroke={this.toolNode.selectColor}
                strokeWidth={1}
                strokeEnabled={this.state.isSelected ? true : false}
              />

              <Rect
                width={80}
                height={80}
                x={20}
                y={20}
                cornerRadius={15}
                fill={"#ddd"}
              />

              <Text
                text={this.toolNode.name}
                fontFamily={'Poppins Regular'}
                fontSize={30}
                x={120}
                y={45}
              />
              
              
            </Group>
            <Group
              draggable
              onDragStart={() => {
                this.setState({
                  isDragging: true
                });
              }}
              onDragEnd={e => {
                this.setState({
                  isDragging: false,
                  x1: e.target.x(),
                  y2: e.target.y()
                });
              }}
              x={450}
              y={450}
              onClick={() => {
                this.setState({
                  isSelected: this.state.isSelected ? false : true,
                })
              }}>
              <Group visible={this.state.isSelected ? true : false} name='circleGroup'>
                <Circle
                  name='top'
                  x={(this.toolNode.width / 2)}
                  y={-this.toolNode.radius * 2}
                  radius={this.toolNode.radius}
                  fill={this.toolNode.selectColor}
                />
                <Circle
                  name='bot'
                  x={(this.toolNode.width / 2)}
                  y={this.toolNode.height + this.toolNode.radius * 2}
                  radius={this.toolNode.radius}
                  fill={this.toolNode.selectColor}
                />
                <Circle
                  name='left'
                  x={- this.toolNode.radius * 2}
                  y={this.toolNode.height/2}
                  radius={this.toolNode.radius}
                  fill={this.toolNode.selectColor}
                />
                <Circle
                  name='right'
                  x={(this.toolNode.width) + this.toolNode.radius * 2}
                  y={this.toolNode.height/2}
                  radius={this.toolNode.radius}
                  fill={this.toolNode.selectColor}
                />
              </Group>

              <Rect
                width={this.toolNode.width}
                height={this.toolNode.height}
                cornerRadius={25}
                fill={"white"}
                stroke={this.toolNode.selectColor}
                strokeWidth={1}
                strokeEnabled={this.state.isSelected ? true : false}
              />

              <Rect
                width={80}
                height={80}
                x={20}
                y={20}
                cornerRadius={15}
                fill={"#ddd"}
              />

              <Text
                text={'Revit'}
                fontFamily={'Poppins Regular'}
                fontSize={30}
                x={120}
                y={45}
              />
              
              
            </Group>
            <Line
              onClick={() => {
                this.setState({
                  isSelected: this.state.isSelected ? false : true,
                })
              }}
              points={[this.state.x + this.toolNode.width + this.toolNode.radius * 2,
                this.state.y  + this.toolNode.height / 2,
                this.state.x1 - this.toolNode.radius * 2,
                this.state.y2 + this.toolNode.height / 2]}
              stroke={this.state.isSelected ? this.toolNode.selectColor : 'grey'}
              strokeWidth={this.toolNode.radius * 2}
              opacity={1}
              lineCap='round'
            />
          </Layer>
          <Layer>

          </Layer>
        </Stage>   
      </main>
      );
  }
  
}




export default App;
*/