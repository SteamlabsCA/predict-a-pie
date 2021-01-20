import './Network.scss';
import Connections from './Connections';
import Layer from './Layer';
import React from 'react';
import { v4 as uuid } from 'uuid';

const testData = [
  {
    'id': uuid(),
    'type': 'input',
    'label': 'Input Layer',
    'neurons': [{
      'id': uuid(),
      'type': 'input',
      'label': 'Neuron'
    }]
  },
  {
    'id': uuid(),
    'label': 'Hidden Layer',
    'neurons': [{
      'id': uuid(),
      'label': 'Neuron'
    }]
  },
  {
    'id': uuid(),
    'type': 'output',
    'label': 'Output Layer',
    'neurons': [{
      'id': uuid(),
      'type': 'output',
      'label': 'Neuron'
    }]
  }
];

function Network() {

  let network = testData;

  const [connections, setConnections] = React.useState([]);
  const [dragging, setDragging] = React.useState(false);
  const [mouseX, setMouseX] = React.useState();
  const [mouseY, setMouseY] = React.useState();

  const onStartConnection = (neuron) => {
    const rect = neuron.ref.current.getBoundingClientRect();
    const x = rect.left + rect.width - 11;
    const y = rect.top + rect.height / 2;
    setConnections([...connections, {x1: x, y1: y, x2: false, y2: false}]);
    setDragging(true);
  }

  const onMouseMove = (event) => {
    setMouseX(event.clientX);
    setMouseY(event.clientY);
  }

  const onMouseUp = () => {
    if (dragging) {
      setConnections(connections.slice(0, -1));
      setDragging(false);
    }
  }

  return (
    <>
      <div className="Network" onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
        {network.map(layer => (
          <Layer
            key={layer.id}
            layer={layer}
            onStartConnection={onStartConnection}
          />
        ))}
        <Connections connections={connections} mouseX={mouseX} mouseY={mouseY} />
      </div>
    </>
  );
}

export default Network;
