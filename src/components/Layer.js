import './Layer.scss';
import Neuron from './Neuron';
import React from 'react';
import { v4 as uuid } from 'uuid';

function Layer({layer, ...props}) {

  const [neurons, setNeurons] = React.useState(layer.neurons);

  const onAddNeuron = () => {
    layer.neurons = [...neurons, {
      id: uuid(),
      type: layer.type,
      label: 'New Neuron'
    }];
    setNeurons(layer.neurons);
  };

  return (
    <div className="Layer">
      <div className="Layer-neurons">
        {neurons.map((neuron) => (
          <Neuron
            key={neuron.id}
            neuron={neuron}
            onStartConnection={props.onStartConnection}
            onCompleteConnection={props.onCompleteConnection}
            onChange={props.onChange}
          />
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
