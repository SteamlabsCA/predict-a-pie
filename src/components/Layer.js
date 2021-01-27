import './Layer.scss';
import Neuron from './Neuron';
import React from 'react';
import { v4 as uuid } from 'uuid';

function Layer({layer, ...props}) {

  const [neurons, setNeurons] = React.useState(layer.neurons);
  const [mouseY, setMouseY] = React.useState(false);
  const [originY, setOriginY] = React.useState(false);
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
      setOriginY(mouseY);
      setDragging(neuron);
    }
  };

  const onDragCancel = () => {
    if (dragging) {
      neurons.map(neuron => neuron.style = {});
      setDragging(false);
    }
  };

  const onDragEnd = (event) => {
    if (dragging) {

      // Determine change in index of dragged neuron
      const deltaY = event.clientY - originY;
      const neuronStyle = getComputedStyle(dragging.ref.current);
      const neuronHeight = dragging.ref.current.offsetHeight + parseInt(neuronStyle.marginTop) + parseInt(neuronStyle.marginBottom);
      const draggingIndex = neurons.findIndex(neuron => neuron.id === dragging.id);
      const deltaIndex = Math.trunc(deltaY / neuronHeight);

      // Reorder neuron array
      if (Math.abs(deltaIndex) > 0) {
        const neuron = neurons.splice(draggingIndex, 1);
        neurons.splice(draggingIndex + deltaIndex, 0, neuron[0]);
      }

      neurons.map(neuron => neuron.style = {});
      setNeurons([...neurons]);
      setDragging(false);
    }
  }

  const onDragging = (event) => {
    setMouseY(event.clientY);
    if (dragging) {

      // Determine change in index of dragged neuron
      const deltaY = event.clientY - originY;
      const neuronStyle = getComputedStyle(dragging.ref.current);
      const neuronHeight = dragging.ref.current.offsetHeight + parseInt(neuronStyle.marginTop) + parseInt(neuronStyle.marginBottom);
      const draggingIndex = neurons.findIndex(neuron => neuron.id === dragging.id);
      const deltaIndex = Math.trunc(deltaY / neuronHeight);

      // Adjust position of each neuron accordingly
      neurons.map((neuron, index) => {
        if (neuron.id === dragging.id) {
          neuron.style = {
            'top': deltaY + 'px',
            'zIndex': 1
          };
        } else {
          neuron.style = {}
        }
        if (deltaIndex < 0) {
          if (index >= draggingIndex + deltaIndex && index < draggingIndex) {
            neuron.style = {
              'top': neuronHeight + 'px',
            };
          }
        }
        if (deltaIndex > 0) {
          if (index > draggingIndex && index <= draggingIndex + deltaIndex) {
            neuron.style = {
              'top': -neuronHeight + 'px',
            };
          }
        }
        return neuron;
      });
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
