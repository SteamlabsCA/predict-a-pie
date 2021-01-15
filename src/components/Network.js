import './Network.scss';
import Layer from './Layer';

const testData = [
  {
    'id': 1,
    'label': 'Hidden Layer',
    'neurons': [{
      'label': 'Neuron'
    }]
  }
];

function Network() {
  let layers = testData;

  const addNeuron = (event) => {
    console.log(event);
  }


  return (
    <div class="Network">
      {layers.map(({id, label, neurons}) => <Layer key={id} label={label} onAddNeuron={(event) => addNeuron(event)} />)}
    </div>
  );
}

export default Network;
