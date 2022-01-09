import React, {Component} from 'react'
import { Stage, Layer, Rect, Group, Text, Circle, Line} from "react-konva";
import Konva from 'konva';
import './App.css';

const Dialog = () => {
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

class App extends Component {
  
  state = {
    isDragging: false,
    isSelected: false,
    isHover: false,
    x: 200,
    y: 200,
    x1: 600,
    y2: 600,
  };
  
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
        <Stage width={window.innerWidth} height={window.innerHeight} ref={'stageRef'}>
          <Layer>
            <Text text="Double-click to search tools" fontSize={25} x={20} y={20} />
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
              x={this.state.x1}
              y={this.state.y2}
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