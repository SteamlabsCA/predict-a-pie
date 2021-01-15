import './Layer.scss';
import Neuron from './Neuron';

function Layer({label, onAddNeuron}) {
  return (
    <div class="Layer">
      <div class="Layer-neurons">
        <Neuron />
        <button onClick={onAddNeuron}>Add New Node</button>
      </div>
      <div class="Layer-label">
        {label}
      </div>
    </div>
  )
}

export default Layer;
