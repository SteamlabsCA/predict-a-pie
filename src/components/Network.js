import './Network.scss';
import Layer from './Layer';
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

  const test = () => {
    console.log(network);
  }

  return (
    <>
      <div className="Network">
        {network.map(layer => (
          <Layer
            key={layer.id}
            layer={layer}
          />
        ))}
      </div>
      <button onClick={test}>Test</button>
    </>
  );
}

export default Network;
