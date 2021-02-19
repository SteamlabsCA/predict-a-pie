import './TrainedNetwork.scss';
import Neuron from './Neuron';
import TensorFlowNetwork from './TensorFlowNetwork';
import React from 'react';
import { v4 as uuid } from 'uuid';

function TrainedNetwork({inputs, ingredients, classifications, ...props}) {

  const [inputLayer, setInputLayer] = React.useState(
    ingredients.map(ingredient => {
      return {
        'id': uuid(),
        'label': ingredient,
        'type': 'input'
      };
    })
  );
  const [outputLayer, setOutputLayer] = React.useState(
    classifications.map(classification => {
      return {
        'id': uuid(),
        'label': classification,
        'type': 'output'
      };
    })
  );

  const onChange = (index) => {
    inputs[index] = inputs[index] === 0 ? 1 : 0;
    setInputLayer([...inputLayer]);
    props.onChange(inputs);
  };

  const onPrediction = (result) => {
    const max = Math.max(...result);
    result.map((output, index) => {
      outputLayer[index].confidence = Math.round(output * 100);
      outputLayer[index].active = output === max;
    });
    setOutputLayer([...outputLayer]);
  };

  React.useEffect(() => {
    for (let i = 0; i < inputLayer.length; i++) {
      inputLayer[i].active = inputs[i];
    }
    setInputLayer([...inputLayer]);
  }, [inputs]);

  return (
    <div className="TrainedNetwork">
      <div className="TrainedNetwork-layers">
        <div className="Layer">
          <div className="Layer-neurons">
            {inputLayer.map((neuron, index) => (
              <Neuron
                key={neuron.id}
                neuron={neuron}
                onChange={() => onChange(index)}
                small
              />
            ))}
          </div>
        </div>
        <TensorFlowNetwork
          src="/model.json"
          inputs={inputLayer}
          outputs={outputLayer}
          onPrediction={onPrediction}
        />
        <div className="Layer">
          <div className="Layer-neurons">
            {outputLayer.map(neuron => (
              <Neuron
                key={neuron.id}
                neuron={neuron}
                small
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainedNetwork;
