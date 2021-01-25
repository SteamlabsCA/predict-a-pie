import './Neuron.scss';
import positive from '../assets/positive.svg';
import negative from '../assets/negative.svg';
import ContentEditable from './ContentEditable';
import Output from './Output';
import ToggleSwitch from './ToggleSwitch';
import React from 'react';

function Neuron({neuron, ...props}) {

  neuron.ref = React.createRef();

  const onLabelChange = (value) => {
    neuron.label = value;
  }

  const onToggle = () => {
    neuron.active = !neuron.active;
    props.onChange();
  }

  const onStartConnection = (event) => {
    event.preventDefault();
    props.onStartConnection(neuron);
  }

  const onCompleteConnection = (event, weight) => {
    event.preventDefault();
    event.stopPropagation();
    props.onCompleteConnection(neuron, weight);
  }

  switch (neuron.type) {

    case 'input':
      return (
        <div id={'n-' + neuron.id} className={neuron.active ? 'Neuron Neuron-active' : 'Neuron'} ref={neuron.ref}>
          <ToggleSwitch onToggle={onToggle} />
          <div className="Neuron-input"></div>
          <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
          <div className="Neuron-output" onMouseDown={onStartConnection}></div>
        </div>
      );

    case 'output':
      return (
        <div id={'n-' + neuron.id} className={neuron.active ? 'Neuron Neuron-active' : 'Neuron'} ref={neuron.ref}>
          <div className="Neuron-input Neuron-positive" onMouseUp={(event) => onCompleteConnection(event, 1)}>
            <img src={positive} alt="Positive terminal" />
          </div>
          <div className="Neuron-input Neuron-negative" onMouseUp={(event) => onCompleteConnection(event, -100)}>
            <img src={negative} alt="Negative terminal" />
          </div>
          <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
          <div className="Neuron-output"></div>
          <Output active={neuron.active} />
        </div>
      );

    default:
      return (
        <div id={'n-' + neuron.id} className={neuron.active ? 'Neuron Neuron-active' : 'Neuron'} ref={neuron.ref}>
          <div className="Neuron-input Neuron-positive" onMouseUp={(event) => onCompleteConnection(event, 1)}>
            <img src={positive} alt="Positive terminal" />
          </div>
          <div className="Neuron-input Neuron-negative" onMouseUp={(event) => onCompleteConnection(event, -100)}>
            <img src={negative} alt="Negative terminal" />
          </div>
          <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
          <div className="Neuron-output" onMouseDown={onStartConnection}></div>
        </div>
      );
  }
}

export default Neuron;
