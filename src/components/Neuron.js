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

  const onStartConnection = (event) => {
    event.preventDefault();
    props.onStartConnection(neuron);
  }

  switch (neuron.type) {

    case 'input':
      return (
        <div className="Neuron" ref={neuron.ref}>
          <ToggleSwitch />
          <div className="Neuron-input"></div>
          <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
          <div className="Neuron-output" onMouseDown={onStartConnection}></div>
        </div>
      );

    case 'output':
      return (
        <div className="Neuron" ref={neuron.ref}>
          <div className="Neuron-input Neuron-positive">
            <img src={positive} alt="Positive terminal" />
          </div>
          <div className="Neuron-input Neuron-negative">
            <img src={negative} alt="Negative terminal" />
          </div>
          <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
          <div className="Neuron-output"></div>
          <Output />
        </div>
      );

    default:
      return (
        <div className="Neuron" ref={neuron.ref}>
          <div className="Neuron-input Neuron-positive">
            <img src={positive} alt="Positive terminal" />
          </div>
          <div className="Neuron-input Neuron-negative">
            <img src={negative} alt="Negative terminal" />
          </div>
          <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
          <div className="Neuron-output" onMouseDown={onStartConnection}></div>
        </div>
      );
  }
}

export default Neuron;
