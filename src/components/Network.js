import './Network.scss';
import Connections from './Connections';
import Layer from './Layer';
import React from 'react';
import { v4 as uuid } from 'uuid';

const initialData = [
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

  const [network, setNetwork] = React.useState(initialData);
  const [connections, setConnections] = React.useState([]);
  const [dragging, setDragging] = React.useState(false);
  const [mouseX, setMouseX] = React.useState();
  const [mouseY, setMouseY] = React.useState();

  React.useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
  }, [])

  React.useEffect(() => {
    onChange();
  }, [connections]);

  const isNeuronAdjacent = (n1, n2) => {
    for (let i = 0; i < network.length - 1; i++) {
      if (network[i].neurons.find(neuron => neuron.id === n1.id)) {
        return network[i + 1].neurons.find(neuron => neuron.id === n2.id)
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

    // Break existing connections
    const outputNeuronIds = network[network.length - 1].neurons.map(neuron => neuron.id);
    let newConnections = [...connections];
    newConnections = newConnections.filter(connection => {
      return !outputNeuronIds.includes(connection.to.id);
    });
    setConnections(newConnections);

    // Add new layer
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
      positive: true,
      weight: 0,
      active: false
    }]);
    setDragging(true);
  }

  const onCompleteConnection = (neuron, positive) => {
    if (dragging) {
      let newConnections = [...connections];
      let connection = newConnections.pop();
      if (isNeuronAdjacent(connection.from, neuron)) {
        connection.to = neuron;
        connection.positive = positive;

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

  const onDeleteConnection = (connection) => {
    setConnections(connections.filter(item => {
      return !(item.from.id === connection.from.id && item.to.id === connection.to.id);
    }));
  }

  const onDeleteNeuron = (neuron) => {
    let newConnections = connections.filter(connection => {
      return connection.from.id !== neuron.id && connection.to.id !== neuron.id;
    });
    setConnections(newConnections);
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
      <div className={(connections.length === 0 && network.length < 3) ? 'Network Network-empty' : 'Network'} onMouseMove={onMouseMove}>
        <div className="Network-container">
          <div className="Network-layers">
            {network.map(layer => (
              <Layer
                key={layer.id}
                layer={layer}
                onStartConnection={onStartConnection}
                onCompleteConnection={onCompleteConnection}
                onDeleteNeuron={onDeleteNeuron}
                onChange={onChange}
              />
            ))}
            <div className="Network-instruction">
              <p>Click and drag to create connections between nodes.</p>
            </div>
          </div>
          <div className="Network-instructions">
            <div className="Network-instruction">
              <p>Add new input nodes to process new ingredients.</p>
            </div>
            <div className="Network-instruction">
              <p>Add a hidden layer to detect more complex combinations.</p>
              <button className="Network-button" onClick={onAddLayer}>Add Layer</button>
            </div>
            <div className="Network-instruction">
              <p>Add new input nodes to process new ingredients.</p>
            </div>
          </div>
        </div>
      </div>
      <Connections
        connections={connections}
        mouseX={mouseX}
        mouseY={mouseY}
        onDeleteConnection={onDeleteConnection}
      />
    </>
  );
}

export default Network;
