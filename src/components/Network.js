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

  const [network, setNetwork] = React.useState(testData);
  const [connections, setConnections] = React.useState([]);
  const [dragging, setDragging] = React.useState(false);
  const [mouseX, setMouseX] = React.useState();
  const [mouseY, setMouseY] = React.useState();

  React.useEffect(() => {
    onChange();
  }, [connections]);

  const isNeuronAdjacent = (n1, n2) => {
    for (let i = 0; i < network.length - 1; i++) {
      if (network[i].neurons.find(neuron => neuron.id === n1.id)) {
        return network[i+1].neurons.find(neuron => neuron.id === n2.id)
      }
    }
  }

  const neuronInputs = (neuron) => {
    let inputs = [];
    for (let i = 0; i < connections.length; i++) {
      if (connections[i].to.id === neuron.id) {
        inputs.push(connections[i]);
      }
    }
    return inputs;
  }

  const onAddLayer = () => {
    network.splice(network.length - 1, 0, {
      'id': uuid(),
      'label': 'Hidden Layer',
      'neurons': [{
        'id': uuid(),
        'label': 'Neuron'
      }]
    });
    onChange();
  }

  const onStartConnection = (neuron) => {
    setConnections([...connections, {
      from: neuron,
      to: false,
      weight: 0
    }]);
    setDragging(true);
  }

  const onCompleteConnection = (neuron, weight) => {
    if (dragging) {
      let newConnections = [...connections];
      let connection = newConnections.pop();
      if (isNeuronAdjacent(connection.from, neuron)) {
        connection.to = neuron;
        connection.weight = weight;

        // Remove any existing connections
        newConnections = newConnections.filter(item => {
          return !(item.from.id === connection.from.id && item.to.id === neuron.id);
        });

        newConnections.push(connection);
      }
      setConnections(newConnections);
      setDragging(false);
    }
  }

  const onChange = () => {
    for (let i = 1; i < network.length; i++) {
      for (let j = 0; j < network[i].neurons.length; j++) {
        const inputs = neuronInputs(network[i].neurons[j]);
        let activation = 0;
        for (let k = 0; k < inputs.length; k++) {
          if (inputs[k].weight > 0 && inputs[k].from.active) {
            activation++;
          }
          if (inputs[k].weight > 0 && !inputs[k].from.active) {
            activation -= 1000;
          }
          if (inputs[k].weight < 0 && inputs[k].from.active) {
            activation -= 1000;
          }
        }
        network[i].neurons[j].active = activation > 0;
      }
    }
    setNetwork([...network]);
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
        <div className="Network-layers">
          {network.map(layer => (
            <Layer
              key={layer.id}
              layer={layer}
              onStartConnection={onStartConnection}
              onCompleteConnection={onCompleteConnection}
              onChange={onChange}
            />
          ))}
        </div>
        <button className="App-button" onClick={onAddLayer}>Add Layer</button>
      </div>
      <Connections connections={connections} mouseX={mouseX} mouseY={mouseY} />
    </>
  );
}

export default Network;
