import './Layer.scss';
import Neuron from './Neuron';
import React from 'react';
import { v4 as uuid } from 'uuid';

function Layer({layer, ...props}) {

  const [neurons, setNeurons] = React.useState(layer.neurons);
  const [dragging, setDragging] = React.useState(false);

  const onAddNeuron = () => {
    layer.neurons = [...neurons, {
      id: uuid(),
      type: layer.type,
      label: 'New Neuron'
    }];
    setNeurons(layer.neurons);
  };

  const onDragStart = (neuron) => {
    if (!dragging) {
      console.log('Drag start');
      setDragging(neuron);
    }
  };

  const onDragCancel = () => {
    if (dragging) {
      neurons.map(neuron => {
        if (neuron.id == dragging.id) {
          neuron.style = {};
        }
      });
      console.log('Drag cancelled');
      setDragging(false);
    }
  };

  const onDragEnd = () => {
    if (dragging) {
      neurons.map(neuron => {
        if (neuron.id == dragging.id) {
          neuron.style = {};
        }
      });
      console.log('Drag end');
      setDragging(false);
    }
  }

  const onDragging = () => {
    if (dragging) {
      neurons.map(neuron => {
        if (neuron.id == dragging.id) {
          neuron.style = {
            'background': 'red'
          };
        }
      });
      console.log('Dragging');
    }
  }

  return (
    <div className="Layer" onMouseUp={onDragEnd} onMouseLeave={onDragCancel} onMouseMove={onDragging}>
      <div className="Layer-neurons">
        {neurons.map((neuron) => (
          <Neuron
            key={neuron.id}
            neuron={neuron}
            onDragStart={onDragStart}
            onStartConnection={props.onStartConnection}
            onCompleteConnection={props.onCompleteConnection}
            onChange={props.onChange}
            style={neuron.style}
          />
        ))}
        <button className="App-button" onClick={onAddNeuron}>Add New Node</button>
      </div>
      <div className="Layer-label">
        {layer.label}
      </div>
    </div>
  )
}

export default Layer;
