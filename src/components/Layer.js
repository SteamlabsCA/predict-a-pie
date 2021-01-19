import './Layer.scss';
import Neuron from './Neuron';
import React from 'react';

function Layer({layer}) {

  const [neurons, setNeurons] = React.useState(layer.neurons);

  const onAddNeuron = () => {
    layer.neurons = [...neurons, {
      id: neurons.length + 1,
      label: 'New Neuron'
    }];
    setNeurons(layer.neurons);
  };

  return (
    <div className="Layer">
      <div className="Layer-neurons">
        {neurons.map((neuron) => (
          <Neuron key={neuron.id} neuron={neuron} />
        ))}
        <button onClick={onAddNeuron}>Add New Node</button>
      </div>
      <div className="Layer-label">
        {layer.label}
      </div>
    </div>
  )
}

export default Layer;
