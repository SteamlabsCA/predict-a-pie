import './Layer.scss';
import trashcan from '../assets/trashcan.svg';
import Neuron from './Neuron';
import React from 'react';
import { v4 as uuid } from 'uuid';

function Layer({layer, ...props}) {

  const trash = React.createRef();

  const [neurons, setNeurons] = React.useState(layer.neurons);
  const [mouseY, setMouseY] = React.useState(false);
  const [originY, setOriginY] = React.useState(false);
  const [dragging, setDragging] = React.useState(false);
  const [overTrash, setOverTrash] = React.useState(false);

  const onAddNeuron = () => {
    layer.neurons = [...neurons, {
      id: uuid(),
      type: layer.type,
      label: 'New Neuron'
    }];
    setNeurons(layer.neurons);
  };

  const onDeleteNeuron = () => {
    layer.neurons = neurons.filter(neuron => neuron.id !== dragging.id);
    props.onDeleteNeuron(dragging);
    neurons.map(neuron => neuron.style = {});
    setNeurons(layer.neurons);
    setDragging(false);
    setOverTrash(false);
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
      setOverTrash(false);
    }
  };

  const onDragEnd = (event) => {
    if (dragging) {

      // Trash neuron
      const rect = trash.current.getBoundingClientRect();
      if (event.clientX > rect.left && event.clientX < rect.right && event.clientY > rect.top && event.clientY < rect.bottom) {
        onDeleteNeuron();
        return;
      }

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
      setOverTrash(false);
    }
  }

  const onDragging = (event) => {
    setMouseY(event.clientY);
    if (dragging) {

      // Over trashcan
      const rect = trash.current.getBoundingClientRect();
      if (event.clientX > rect.left && event.clientX < rect.right && event.clientY > rect.top && event.clientY < rect.bottom) {
        setOverTrash(true);
      } else {
        setOverTrash(false);
      }

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
            'top': deltaY + 'px'
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
    <div
      className={dragging ? 'Layer Layer-dragging' : 'Layer'}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragCancel}
      onMouseMove={onDragging}
    >
      <div className={overTrash ? 'Layer-neurons Layer-trash-hover' : 'Layer-neurons'}>
        {neurons.map((neuron) => (
          <Neuron
            key={neuron.id}
            neuron={neuron}
            onDragStart={onDragStart}
            onStartConnection={props.onStartConnection}
            onCompleteConnection={props.onCompleteConnection}
            onChange={props.onChange}
            style={neuron.style}
            editable
            dragging={neuron.id === dragging.id}
          />
        ))}
        {dragging &&
          <div ref={trash} className="Layer-trash" onMouseUp={onDeleteNeuron}>
            <img src={trashcan} alt="Trash can" />
          </div>
        }
        {!dragging &&
          <button className="App-button" onClick={onAddNeuron}>Add New Node</button>
        }
      </div>
      <div className="Layer-label">
        {layer.label}
      </div>
    </div>
  )
}

export default Layer;
