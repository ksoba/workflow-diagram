<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/konva@8.3.2/konva.min.js"></script>
    <meta charset="utf-8" />
    <title>Konva Context Menu Demo</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #f0f0f0;
      }

      #menu {
        display: none;
        position: absolute;
        width: 60px;
        background-color: white;
        box-shadow: 0 0 5px grey;
        border-radius: 3px;
      }

      #menu button {
        width: 100%;
        background-color: white;
        border: none;
        margin: 0;
        padding: 10px;
      }

      #menu button:hover {
        background-color: lightgray;
      }
    </style>
  </head>

  <body>
    <div id="container"></div>
    <div id="menu">
      <div>
        <button id="pulse-button">Pulse</button
        ><button id="delete-button">Delete</button>
      </div>
    </div>
    <script>
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
    </script>
  </body>
</html>