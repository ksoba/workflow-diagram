import React, {Component} from 'react'
import { Stage, Layer, Rect, Group, Text, Circle, Line} from "react-konva";
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
    x: 200,
    y: 200,
  };

  toolNode = {
    name: 'Enscape',
    width:300,
    height:120,
    selectColor:'#ec008c'
  };

  render() {
    return (
      <main className='app'>
        <Stage width={window.innerWidth} height={window.innerHeight}>
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
              <Group visible={this.state.isSelected ? true : false}>
                <Circle
                  x={(this.toolNode.width / 2)}
                  y={0}
                  radius={10}
                  fill={this.toolNode.selectColor}
                  opacity={0.5}
                  
                />
                <Circle
                  x={(this.toolNode.width / 2)}
                  y={this.toolNode.height}
                  radius={10}
                  fill={this.toolNode.selectColor}
                  opacity={0.5}
                />
                <Circle
                  x={0}
                  y={this.toolNode.height/2}
                  radius={10}
                  fill={this.toolNode.selectColor}
                  opacity={0.5}
                />
                <Circle
                  x={(this.toolNode.width)}
                  y={this.toolNode.height/2}
                  radius={10}
                  fill={this.toolNode.selectColor}
                  opacity={0.5}
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
            
            
          </Layer>
        </Stage>   
      </main>
      );
  }
  
}




export default App;