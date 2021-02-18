import './TrainedNetwork.scss';
import Neuron from './Neuron';
import TensorFlowNetwork from './TensorFlowNetwork';
import React from 'react';
import { v4 as uuid } from 'uuid';

const network = [
  [
    {
      'id': uuid(),
      'label': 'Crust',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Cherries',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Egg',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Sugar',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Soap',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Onion',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Tomato',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Cheese',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Blueberries',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Pecan',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Cashew',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Peach',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Corn',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Chocolate',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Pumpkin',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Coconut',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Honey',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Strawberry',
      'type': 'input'
    },
    {
      'id': uuid(),
      'label': 'Spinach',
      'type': 'input'
    }
  ],
  [
    {
      'id': uuid(),
      'label': 'Disgusting',
      'type': 'output'
    },
    {
      'id': uuid(),
      'label': 'Sweet',
      'type': 'output'
    },
    {
      'id': uuid(),
      'label': 'Quiche',
      'type': 'output'
    },
    {
      'id': uuid(),
      'label': 'Pizza',
      'type': 'output'
    }
  ]
];

function TrainedNetwork({inputs, ...props}) {

  const [inputLayer, setInputLayer] = React.useState(network[0]);
  const [outputLayer, setOutputLayer] = React.useState(network[1]);

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

  return (
    <div className="TrainedNetwork">
      <div className="TrainedNetwork-layers">
        <div className="Layer">
          <div className="Layer-neurons">
            {inputLayer.map((neuron, index) => (
              <Neuron
                key={neuron.id}
                neuron={neuron}
                active={inputs[index]}
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
                active={neuron.active}
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
