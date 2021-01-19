import './Network.scss';
import Layer from './Layer';

const testData = [
  {
    'id': 1,
    'label': 'Hidden Layer',
    'neurons': [{
      'id': 1,
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
    <div className="Network">
      {network.map(layer => (
        <Layer
          key={layer.id}
          layer={layer}
        />
      ))}
      <button onClick={test}>Test</button>
    </div>
  );
}

export default Network;
